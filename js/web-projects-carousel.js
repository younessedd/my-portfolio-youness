/**
 * Web Projects Carousel Module
 * Dynamically renders project cards from window.webProjectsData
 * with auto-updating category navigation based on centered slide
 */

(function() {
    'use strict';

    const WebProjectsCarousel = {
        swiperInstance: null,
        allProjects: [],
        categoryIndices: {},
        
        // Configuration
        config: {
            breakpoints: {
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1440: { slidesPerView: 4 }
            },
            speed: 700,
            spaceBetween: 30,
            loop: true
        },

        // Initialize the module
        init: function() {
            const filterContainer = document.querySelector('.web-filter');
            const carouselContainer = document.querySelector('.web-carousel');

            if (!filterContainer || !carouselContainer) {
                console.warn('Web Projects containers not found');
                return;
            }

            this.waitForData().then(() => {
                this.allProjects = this.getAllProjects();
                this.buildCategoryIndex();
                this.renderFilters(filterContainer);
                this.renderCarousel(carouselContainer);
            });
        },

        // Wait for data to be available
        waitForData: function() {
            return new Promise((resolve) => {
                const check = async () => {
                    if (typeof window.DataManager !== 'undefined' && window.DataManager.isReady()) {
                        await window.DataManager.init();
                        resolve();
                    } else if (typeof window.webProjectsData !== 'undefined') {
                        resolve();
                    } else {
                        setTimeout(check, 100);
                    }
                };
                check();
            });
        },

        // Get all projects merged from all categories (dynamic from data files)
        getAllProjects: function() {
            let all = [];
            const categories = window.DataManager.getWebCategories();
            categories.forEach(cat => {
                const projects = window.DataManager.getWebProjectsByCategory(cat);
                all = all.concat(projects);
            });
            return all;
        },

        // Build index of first occurrence of each category
        buildCategoryIndex: function() {
            this.categoryIndices = {};
            this.allProjects.forEach((project, index) => {
                if (!this.categoryIndices[project.category]) {
                    this.categoryIndices[project.category] = index;
                }
            });
        },

        // Render filter buttons dynamically based on data categories
        renderFilters: function(container) {
            const categories = window.DataManager.getWebCategories();
            
            container.innerHTML = `
                <div class="filter-buttons">
                    ${categories.map(cat => `
                        <button class="filter-btn" data-category="${cat}">
                            ${window.DataManager.formatCategoryLabel(cat)}
                        </button>
                    `).join('')}
                </div>
            `;

            // Add click handler for scrolling to category
            container.querySelectorAll('.filter-btn').forEach(btn => {
                btn.addEventListener('click', (e) => this.scrollToCategory(e.target.dataset.category));
            });
        },

        // Scroll to first card of a specific category
        scrollToCategory: function(category) {
            if (!this.swiperInstance || this.categoryIndices[category] === undefined) return;
            
            const targetIndex = this.categoryIndices[category];
            this.swiperInstance.slideTo(targetIndex);
            
            // Update active button state
            document.querySelectorAll('.web-filter .filter-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.category === category);
            });
        },

        // Update active category button based on centered slide
        updateActiveCategory: function() {
            if (!this.swiperInstance) return;
            
            const realIndex = this.swiperInstance.realIndex;
            const centeredProject = this.allProjects[realIndex];
            
            if (centeredProject) {
                const activeCategory = centeredProject.category;
                document.querySelectorAll('.web-filter .filter-btn').forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.category === activeCategory);
                });
            }
        },

        // Create project card HTML
        createCardHTML: function(project, index) {
            const imageUrl = project.images && project.images[0] ? project.images[0] : '';
            const description = project.description ? project.description.substring(0, 100) + '...' : '';
            const technologies = project.technologies ? project.technologies.slice(0, 4) : [];
            
            // Map category keys to display labels (same as button labels)
            const categoryLabels = {
                'frontend_apps': 'Frontend Apps',
                'backend_apps': 'Backend Apps',
                'fullstack_apps': 'Fullstack Apps',
                'others_apps': 'Others Apps'
            };
            const displayCategory = categoryLabels[project.category] || project.category;
            
            let linksHTML = '';
            if (project.links && project.links.length > 0) {
                project.links.forEach(link => {
                    const icon = link.icon || 'fa-link';
                    const isGitHub = link.name && link.name.toLowerCase().includes('github');
                    const btnText = isGitHub ? 'GitHub' : (link.name || 'Live Demo');
                    linksHTML += `
                        <a href="${link.url}" target="_blank" class="card-link-btn ${isGitHub ? 'github' : 'live'}" onclick="event.stopPropagation()">
                            <span>${btnText}</span>
                        </a>
                    `;
                });
            }

            return `
                <div class="project-card" data-category="${project.category}" onclick="openProjectPopup(${index}, 'web')">
                    <div class="card-image-wrapper">
                        <span class="card-category-label">${window.DataManager.formatCategoryLabel(project.category)}</span>
                        <img src="${imageUrl}" alt="${project.title}" 
                             class="card-image" 
                             onerror="this.src='https://via.placeholder.com/400x250?text=No+Image'">
                    </div>
                    <div class="card-content">
                        <h3 class="card-title">${project.title}</h3>
                        <p class="card-description">${description}</p>
                        <div class="card-technologies">
                            ${technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                        <div class="card-links">
                            ${linksHTML}
                        </div>
                    </div>
                </div>
            `;
        },

        // Render carousel with all projects (no filtering - continuous loop)
        renderCarousel: function(container) {
            container.innerHTML = `
                <div class="carousel-container">
                    <div class="swiper web-projects-swiper">
                        <div class="swiper-wrapper">
                            ${this.allProjects.map((project, index) => `
                                <div class="swiper-slide">${this.createCardHTML(project, index)}</div>
                            `).join('')}
                        </div>
                        <div class="swiper-button-prev"></div>
                        <div class="swiper-button-next"></div>
                        <div class="swiper-pagination"></div>
                    </div>
                </div>
            `;

            this.initSwiper();
        },

        // Initialize Swiper
        initSwiper: function() {
            if (typeof Swiper === 'undefined') {
                setTimeout(() => this.initSwiper(), 100);
                return;
            }

            const swiperEl = document.querySelector('.web-projects-swiper');
            if (!swiperEl) return;

            this.swiperInstance = new Swiper(swiperEl, {
                ...this.config,
                navigation: {
                    nextEl: '.web-projects-swiper .swiper-button-next',
                    prevEl: '.web-projects-swiper .swiper-button-prev'
                },
                pagination: {
                    el: '.web-projects-swiper .swiper-pagination',
                    clickable: true,
                    dynamicBullets: true
                },
                breakpoints: this.config.breakpoints,
                on: {
                    slideChange: () => this.updateActiveCategory(),
                    realIndexChange: () => this.updateActiveCategory()
                }
            });

            // Set initial active category
            setTimeout(() => this.updateActiveCategory(), 100);
        },

        // Initialize custom navigation buttons
        initCustomButtons: function() {
            const prevBtn = document.getElementById('webPrevBtn');
            const nextBtn = document.getElementById('webNextBtn');

            if (prevBtn && this.swiperInstance) {
                prevBtn.addEventListener('click', () => {
                    this.swiperInstance.slidePrev();
                });
            }

            if (nextBtn && this.swiperInstance) {
                nextBtn.addEventListener('click', () => {
                    this.swiperInstance.slideNext();
                });
            }
        }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => WebProjectsCarousel.init());
    } else {
        WebProjectsCarousel.init();
    }

})();
