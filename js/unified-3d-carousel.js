/**
 * Unified 3D Carousel System
 * Provides 3D hexagon-style carousel for Web, Mobile, and IoT sections
 */

(function() {
    'use strict';

    const Unified3DCarousel = {
        instances: {},

        sectionConfig: {
            web: {
                getCategories: () => window.DataManager.getWebCategories(),
                getProjectsByCategory: (cat) => window.DataManager.getWebProjectsByCategory(cat),
                swiperClass: 'web-projects-swiper',
                filterClass: 'web-filter',
                carouselClass: 'web-carousel',
                popupType: 'web'
            },
            mobile: {
                getCategories: () => window.DataManager.getMobileCategories(),
                getProjectsByCategory: (cat) => window.DataManager.getMobileProjectsByCategory(cat),
                swiperClass: 'mobile-projects-swiper',
                filterClass: 'mobile-filter',
                carouselClass: 'mobile-carousel',
                popupType: 'mobile'
            },
            iot: {
                getCategories: () => window.DataManager.getIotCategories(),
                getProjectsByCategory: (cat) => window.DataManager.getIotProjectsByCategory(cat),
                swiperClass: 'iot-projects-swiper',
                filterClass: 'iot-filter',
                carouselClass: 'iot-carousel',
                popupType: 'iot'
            }
        },

        config: {
            speed: 700,
            spaceBetween: 30,
            loop: true,
            centeredSlides: true,
            slidesPerView: 3,
            effect: 'coverflow',
            coverflowEffect: {
                rotate: 0,
                stretch: 10,
                depth: 100,
                modifier: 1,
                slideShadows: false
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                640: {
                    slidesPerView: 3,
                    spaceBetween: 20
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30
                },
                1440: {
                    slidesPerView: 3,
                    spaceBetween: 40
                }
            }
        },

        init: function(section) {
            const config = this.sectionConfig[section];
            if (!config) {
                console.warn(`Unknown section: ${section}`);
                return;
            }

            const filterContainer = document.querySelector(`.${config.filterClass}`);
            const carouselContainer = document.querySelector(`.${config.carouselClass}`);

            if (!filterContainer || !carouselContainer) {
                console.warn(`${section} Projects containers not found`);
                return;
            }

            this.waitForData().then(() => {
                this.instances[section] = {
                    swiperInstance: null,
                    allProjects: this.getAllProjects(section),
                    categoryIndices: this.buildCategoryIndex(section),
                    currentCategory: 'all'
                };
                this.renderCategories(section, filterContainer);
                this.renderCarousel(section, carouselContainer);
            });
        },

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

        getAllProjects: function(section) {
            const config = this.sectionConfig[section];
            let all = [];
            const categories = config.getCategories();
            categories.forEach(cat => {
                const projects = config.getProjectsByCategory(cat);
                all = all.concat(projects);
            });
            return all;
        },

        buildCategoryIndex: function(section) {
            const instance = this.instances[section];
            if (!instance) return {};
            
            const indices = {};
            instance.allProjects.forEach((project, index) => {
                if (!indices[project.category]) {
                    indices[project.category] = index;
                }
            });
            return indices;
        },

        renderCategories: function(section, container) {
            const config = this.sectionConfig[section];
            const categories = config.getCategories();
            
            container.innerHTML = `
                <div class="filter-buttons">
                    <button class="filter-btn active" data-category="all">All</button>
                    ${categories.map(cat => `
                        <button class="filter-btn" data-category="${cat}">
                            ${window.DataManager.formatCategoryLabel(cat)}
                        </button>
                    `).join('')}
                </div>
            `;

            container.querySelectorAll('.filter-btn').forEach(btn => {
                btn.addEventListener('click', (e) => this.handleFilterClick(section, e.target.dataset.category));
            });
        },

        handleFilterClick: function(section, category) {
            const instance = this.instances[section];
            const config = this.sectionConfig[section];
            
            instance.currentCategory = category;
            
            // Update active button state
            document.querySelectorAll(`.${config.filterClass} .filter-btn`).forEach(btn => {
                btn.classList.toggle('active', btn.dataset.category === category);
            });
            
            // Filter projects based on category
            if (category === 'all') {
                instance.filteredProjects = instance.allProjects;
            } else {
                instance.filteredProjects = config.getProjectsByCategory(category);
            }
            
            // Re-render carousel with filtered projects
            this.renderFilteredCarousel(section);
        },

        renderFilteredCarousel: function(section) {
            const config = this.sectionConfig[section];
            const instance = this.instances[section];
            const container = document.querySelector(`.${config.carouselClass}`);
            
            if (!container || !instance.swiperInstance) return;
            
            // Get the swiper wrapper
            const wrapper = container.querySelector('.swiper-wrapper');
            if (!wrapper) return;
            
            // Update slides with filtered projects
            wrapper.innerHTML = instance.filteredProjects.map((project, index) => `
                <div class="swiper-slide">${this.createCardHTML(section, project, index)}</div>
            `).join('');
            
            // Destroy old swiper and recreate
            instance.swiperInstance.destroy(false);
            
            // Reinitialize swiper
            this.initSwiper(section);
        },

        getProjects: function(section, category) {
            const config = this.sectionConfig[section];
            if (category && category !== 'all') {
                return config.getProjectsByCategory(category);
            }
            return this.instances[section]?.allProjects || [];
        },

        updateActiveCategory: function(section) {
            const instance = this.instances[section];
            const config = this.sectionConfig[section];
            
            if (!instance?.swiperInstance) return;
            
            // If "All" is selected, keep it active and don't update
            if (instance.currentCategory === 'all') {
                document.querySelectorAll(`.${config.filterClass} .filter-btn`).forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.category === 'all');
                });
                return;
            }
            
            // Get the centered card's category
            const realIndex = instance.swiperInstance.realIndex;
            const projects = instance.filteredProjects || instance.allProjects;
            const centeredProject = projects[realIndex];
            
            if (centeredProject) {
                const activeCategory = centeredProject.category;
                document.querySelectorAll(`.${config.filterClass} .filter-btn`).forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.category === activeCategory);
                });
            }
        },

        createCardHTML: function(section, project, index) {
            const config = this.sectionConfig[section];
            const imageUrl = project.images && project.images[0] ? project.images[0] : '';
            const description = project.description ? project.description.substring(0, 100) + '...' : '';
            const technologies = project.technologies ? project.technologies : [];
            
            let linksHTML = '';
            if (project.links && project.links.length > 0) {
                project.links.forEach(link => {
                    const btnText = link.name || 'View';
                    const isGitHub = link.name?.toLowerCase().includes('github');
                    const isPlay = link.name?.toLowerCase().includes('play');
                    let btnClass = 'live';
                    if (isGitHub) btnClass = 'github';
                    else if (isPlay) btnClass = 'play';
                    
                    linksHTML += `
                        <a href="${link.url}" target="_blank" class="card-link-btn ${btnClass}" onclick="event.stopPropagation()">
                            <span>${btnText}</span>
                        </a>
                    `;
                });
            }

            return `
                <div class="project-card" data-category="${project.category}" onclick="openProjectPopup(${index}, '${config.popupType}')">
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

        renderCarousel: function(section, container) {
            const config = this.sectionConfig[section];
            const instance = this.instances[section];
            
            container.innerHTML = `
                <div class="carousel-container">
                    <div class="swiper ${config.swiperClass}">
                        <div class="swiper-wrapper">
                            ${instance.allProjects.map((project, index) => `
                                <div class="swiper-slide">${this.createCardHTML(section, project, index)}</div>
                            `).join('')}
                        </div>
                        <div class="swiper-button-prev"></div>
                        <div class="swiper-button-next"></div>
                        <div class="carousel-pagination">
                            <span class="page-info swiper-pagination-current">1</span>
                            <span>/</span>
                            <span class="page-total swiper-pagination-total">${instance.allProjects.length}</span>
                        </div>
                    </div>
                </div>
            `;

            this.initSwiper(section);
        },

        initSwiper: function(section) {
            if (typeof Swiper === 'undefined') {
                setTimeout(() => this.initSwiper(section), 100);
                return;
            }

            const config = this.sectionConfig[section];
            const instance = this.instances[section];
            const swiperEl = document.querySelector(`.${config.swiperClass}`);
            
            if (!swiperEl) return;

            instance.swiperInstance = new Swiper(swiperEl, {
                speed: this.config.speed,
                spaceBetween: this.config.spaceBetween,
                loop: this.config.loop,
                centeredSlides: this.config.centeredSlides,
                slidesPerView: this.config.slidesPerView,
                effect: this.config.effect,
                coverflowEffect: this.config.coverflowEffect,
                navigation: {
                    nextEl: `.${config.swiperClass} .swiper-button-next`,
                    prevEl: `.${config.swiperClass} .swiper-button-prev`
                },
                pagination: {
                    el: `.${config.swiperClass} .swiper-pagination`,
                    clickable: true,
                    dynamicBullets: true
                },
                breakpoints: this.config.breakpoints,
                on: {
                    slideChange: () => {
                        this.updateActiveCategory(section);
                        this.updatePaginationNumbers(section);
                    },
                    realIndexChange: () => {
                        this.updateActiveCategory(section);
                        this.updatePaginationNumbers(section);
                    }
                }
            });

            setTimeout(() => this.updateActiveCategory(section), 100);
        },

        updatePaginationNumbers: function(section) {
            const config = this.sectionConfig[section];
            const instance = this.instances[section];
            const currentEl = document.querySelector(`.${config.swiperClass} .swiper-pagination-current`);
            const totalEl = document.querySelector(`.${config.swiperClass} .swiper-pagination-total`);
            if (currentEl && totalEl && instance.swiperInstance) {
                const realIndex = instance.swiperInstance.realIndex + 1;
                currentEl.textContent = realIndex;
            }
        }
    };

    window.Unified3DCarousel = Unified3DCarousel;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            Unified3DCarousel.init('web');
            Unified3DCarousel.init('mobile');
            Unified3DCarousel.init('iot');
        });
    } else {
        Unified3DCarousel.init('web');
        Unified3DCarousel.init('mobile');
        Unified3DCarousel.init('iot');
    }

})();
