/**
 * IoT Projects Carousel
 * Similar to Web and Mobile Projects Carousel but for IoT projects
 */

(function() {
    const IoTProjectsCarousel = {
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
            const filterContainer = document.querySelector('.iot-filter');
            const carouselContainer = document.querySelector('.iot-carousel');

            if (!filterContainer || !carouselContainer) {
                console.warn('IoT Projects containers not found');
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
                    if (window.iotProjectsData) {
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
            Object.keys(window.iotProjectsData).forEach(cat => {
                all = all.concat(window.iotProjectsData[cat]);
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
            const categories = Object.keys(window.iotProjectsData);
            const labels = {
                'InternetofThings': 'IoT Apps',
                'others': 'Others Apps'
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
            document.querySelectorAll('.iot-filter .filter-btn').forEach(btn => {
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
                document.querySelectorAll('.iot-filter .filter-btn').forEach(btn => {
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
                'InternetofThings': 'IoT Apps',
                'others': 'Others Apps'
            };
            const displayCategory = categoryLabels[project.category] || project.category;
            
            let linksHTML = '';
            if (project.links && project.links.length > 0) {
                project.links.forEach(link => {
                    const isDemo = link.name && link.name.toLowerCase().includes('demo');
                    const btnText = link.name || 'View';
                    linksHTML += `
                        <a href="${link.url}" target="_blank" class="card-link-btn ${isDemo ? 'live' : 'github'}">
                            <span>${btnText}</span>
                        </a>
                    `;
                });
            }

            return `
                <div class="project-card" data-category="${project.category}" onclick="openProjectPopup(${project.popupIndex || 0}, 'iot')">
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
                    <button class="custom-prev-btn" id="iotPrevBtn">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <div class="swiper iot-projects-swiper">
                        <div class="swiper-wrapper">
                            ${this.allProjects.map(p => `
                                <div class="swiper-slide">${this.createCardHTML(p)}</div>
                            `).join('')}
                        </div>
                        <div class="swiper-button-prev"></div>
                        <div class="swiper-button-next"></div>
                        <div class="swiper-pagination"></div>
                    </div>
                    <button class="custom-next-btn" id="iotNextBtn">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            `;

            this.initSwiper();
            this.initCustomButtons();
        },

        // Initialize Swiper
        initSwiper: function() {
            if (typeof Swiper === 'undefined') {
                setTimeout(() => this.initSwiper(), 100);
                return;
            }

            const swiperEl = document.querySelector('.iot-projects-swiper');
            if (!swiperEl) return;

            this.swiperInstance = new Swiper(swiperEl, {
                ...this.config,
                pagination: {
                    el: '.iot-projects-swiper .swiper-pagination',
                    clickable: true,
                    dynamicBullets: true
                },
                navigation: {
                    nextEl: '.iot-projects-swiper .swiper-button-next',
                    prevEl: '.iot-projects-swiper .swiper-button-prev'
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
            const prevBtn = document.getElementById('iotPrevBtn');
            const nextBtn = document.getElementById('iotNextBtn');

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
        document.addEventListener('DOMContentLoaded', () => IoTProjectsCarousel.init());
    } else {
        IoTProjectsCarousel.init();
    }

})();
