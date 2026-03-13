/**
 * Mobile Projects Carousel
 * Similar to Web Projects Carousel but for mobile apps
 */

(function() {
    const MobileProjectsCarousel = {
        swiperInstance: null,
        allProjects: [],
        categoryIndices: {},

        config: {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            speed: 600,
            grabCursor: true,
            keyboard: {
                enabled: true
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30
                },
                1440: {
                    slidesPerView: 4,
                    spaceBetween: 30
                }
            }
        },

        init: function() {
            const filterContainer = document.querySelector('.mobile-filter');
            const carouselContainer = document.querySelector('.mobile-carousel');

            if (!filterContainer || !carouselContainer) {
                console.warn('Mobile Projects containers not found');
                return;
            }

            this.waitForData().then(() => {
                this.renderFilters(filterContainer);
                this.renderCarousel(carouselContainer);
            });
        },

        waitForData: function() {
            return new Promise((resolve) => {
                const check = () => {
                    if (window.mobileProjectsData) {
                        this.getAllProjects();
                        resolve();
                    } else {
                        setTimeout(check, 100);
                    }
                };
                check();
            });
        },

        getAllProjects: function() {
            let all = [];
            Object.keys(window.mobileProjectsData).forEach(cat => {
                all = all.concat(window.mobileProjectsData[cat]);
            });
            this.allProjects = all;
            
            // Build category index
            this.categoryIndices = {};
            this.allProjects.forEach((project, index) => {
                if (!this.categoryIndices[project.category]) {
                    this.categoryIndices[project.category] = index;
                }
            });
        },

        // Render filter buttons
        renderFilters: function(container) {
            const categories = Object.keys(window.mobileProjectsData);
            const labels = {
                'quiz_apps': 'Quiz Apps',
                'others_apps': 'Others Apps'
            };
            
            container.innerHTML = `
                <div class="filter-buttons">
                    ${categories.map(cat => `
                        <button class="filter-btn" data-category="${cat}">
                            ${labels[cat] || cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                    `).join('')}
                </div>
            `;

            // Add click handler
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
            document.querySelectorAll('.mobile-filter .filter-btn').forEach(btn => {
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
                document.querySelectorAll('.mobile-filter .filter-btn').forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.category === activeCategory);
                });
            }
        },

        // Create project card HTML
        createCardHTML: function(project) {
            const imageUrl = project.images && project.images[0] ? project.images[0] : '';
            const description = project.description ? project.description.substring(0, 100) + '...' : '';
            const technologies = project.technologies ? project.technologies.slice(0, 4) : [];
            
            // Map category keys to display labels
            const categoryLabels = {
                'quiz_apps': 'Quiz Apps',
                'others_apps': 'Others Apps'
            };
            const displayCategory = categoryLabels[project.category] || project.category;
            
            let linksHTML = '';
            if (project.links && project.links.length > 0) {
                project.links.forEach(link => {
                    const icon = link.icon || 'fa-link';
                    const isPlayStore = link.name && link.name.toLowerCase().includes('play');
                    const btnText = isPlayStore ? 'Google Play' : (link.name || 'Download');
                    linksHTML += `
                        <a href="${link.url}" target="_blank" class="card-link-btn ${isPlayStore ? 'play' : 'live'}">
                            <span>${btnText}</span>
                        </a>
                    `;
                });
            }

            return `
                <div class="project-card" data-category="${project.category}" onclick="openProjectPopup(${project.popupIndex || 0}, 'mobile')">
                    <div class="card-image-wrapper">
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

        // Render carousel with all projects
        renderCarousel: function(container) {
            container.innerHTML = `
                <div class="carousel-container">
                    <div class="swiper mobile-projects-swiper">
                        <div class="swiper-wrapper">
                            ${this.allProjects.map(p => `
                                <div class="swiper-slide">${this.createCardHTML(p)}</div>
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

            const swiperEl = document.querySelector('.mobile-projects-swiper');
            if (!swiperEl) return;

            this.swiperInstance = new Swiper(swiperEl, {
                ...this.config,
                pagination: {
                    el: '.mobile-projects-swiper .swiper-pagination',
                    clickable: true,
                    dynamicBullets: true
                },
                navigation: {
                    nextEl: '.mobile-projects-swiper .swiper-button-next',
                    prevEl: '.mobile-projects-swiper .swiper-button-prev'
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
            const prevBtn = document.getElementById('mobilePrevBtn');
            const nextBtn = document.getElementById('mobileNextBtn');

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
        document.addEventListener('DOMContentLoaded', () => MobileProjectsCarousel.init());
    } else {
        MobileProjectsCarousel.init();
    }

})();
