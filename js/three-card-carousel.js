/**
 * 3-Card Carousel System
 * Shows 3 cards: Left + Center (active) + Right
 * With 3D effects and infinite scroll
 */

(function() {
    'use strict';

    class ThreeCardCarousel {
        constructor(section, dataSource, filterSelector, carouselSelector) {
            this.section = section;
            this.dataSource = dataSource;
            this.filterSelector = filterSelector;
            this.carouselSelector = carouselSelector;
            this.currentIndex = 0;
            this.projects = [];
            this.filteredProjects = [];
            this.currentCategory = 'all';
            this.autoScrollTimer = null;

            this.init();
        }

        init() {
            console.log(`[${this.section}] Carousel initializing...`);
            this.loadData();
            console.log(`[${this.section}] Loaded ${this.projects.length} projects`);
            this.setupFilterButtons();
            this.render();
            this.setupTouchSwipe();
            this.startAutoScroll();
            console.log(`[${this.section}] Carousel rendered`);
        }

        loadData() {
            const data = window[this.dataSource];
            if (!data) return;

            this.projects = [];
            Object.keys(data).forEach(category => {
                const categoryProjects = data[category].map(p => ({
                    ...p,
                    category: category
                }));
                this.projects = this.projects.concat(categoryProjects);
            });

            this.filteredProjects = [...this.projects];
        }

        getCategories() {
            const data = window[this.dataSource];
            return data ? Object.keys(data) : [];
        }

        formatCategoryLabel(category) {
            return category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        }

        setupFilterButtons() {
            const filterContainer = document.querySelector(this.filterSelector);
            if (!filterContainer) return;

            const categories = this.getCategories();
            
            filterContainer.innerHTML = `
                <div class="filter-buttons">
                    <button class="filter-btn active" data-category="all">All</button>
                    ${categories.map(cat => `
                        <button class="filter-btn" data-category="${cat}">
                            ${this.formatCategoryLabel(cat)}
                        </button>
                    `).join('')}
                </div>
            `;

            filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    this.handleFilterChange(e.target.dataset.category);
                });
            });
        }

        handleFilterChange(category) {
            this.currentCategory = category;
            this.currentIndex = 0;

            document.querySelectorAll(`${this.filterSelector} .filter-btn`).forEach(btn => {
                btn.classList.toggle('active', btn.dataset.category === category);
            });

            if (category === 'all') {
                this.filteredProjects = [...this.projects];
            } else {
                this.filteredProjects = this.projects.filter(p => p.category === category);
            }

            this.render();
        }

        getVisibleIndices() {
            const count = this.filteredProjects.length;
            if (count === 0) return [0, 0, 0];
            if (count === 1) return [0, 0, 0];
            if (count === 2) return [0, 1, 0];

            const prev = (this.currentIndex - 1 + count) % count;
            const curr = this.currentIndex;
            const next = (this.currentIndex + 1) % count;

            return [prev, curr, next];
        }

        createCardHTML(project, position) {
            if (!project) return '<div class="card-placeholder"></div>';

            // Handle different image formats
            let imageUrl = '';
            if (project.images && Array.isArray(project.images) && project.images.length > 0) {
                imageUrl = project.images[0];
            } else if (project.image) {
                imageUrl = project.image;
            } else if (project.img) {
                imageUrl = project.img;
            }
            
            // Use placeholder if no image
            if (!imageUrl) {
                imageUrl = 'images/ImageNotAvailable.webp';
            }
            
            const description = project.description ? project.description.substring(0, 80) + '...' : '';
            const technologies = project.technologies ? project.technologies.slice(0, 3) : [];

            let linksHTML = '';
            if (project.links && project.links.length > 0) {
                project.links.forEach(link => {
                    const isGitHub = link.name && link.name.toLowerCase().includes('github');
                    const btnText = isGitHub ? 'GitHub' : (link.name || 'Demo');
                    linksHTML += `
                        <a href="${link.url}" target="_blank" class="card-link-btn ${isGitHub ? 'github' : 'live'}" onclick="event.stopPropagation()">
                            <span>${btnText}</span>
                        </a>
                    `;
                });
            }

            return `
                <div class="three-card ${position}" onclick="window.${this.section}Carousel?.goToCenter()">
                    <div class="card-image-wrapper">
                        <img src="${imageUrl}" alt="${project.title}" 
                             class="card-image" 
                             onerror="this.src='images/ImageNotAvailable.webp'">
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
        }

        render() {
            const container = document.querySelector(this.carouselSelector);
            if (!container) return;

            const indices = this.getVisibleIndices();
            const count = this.filteredProjects.length;

            if (count === 0) {
                container.innerHTML = '<div class="no-projects">No projects found</div>';
                return;
            }

            container.innerHTML = `
                <div class="three-card-carousel">
                    <button class="nav-btn prev" onclick="window.${this.section}Carousel?.prev()">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2"/>
                        </svg>
                    </button>
                    
                    <div class="cards-container">
                        <div class="cards-wrapper">
                            ${this.createCardHTML(this.filteredProjects[indices[0]], 'left')}
                            ${this.createCardHTML(this.filteredProjects[indices[1]], 'center')}
                            ${this.createCardHTML(this.filteredProjects[indices[2]], 'right')}
                        </div>
                    </div>
                    
                    <button class="nav-btn next" onclick="window.${this.section}Carousel?.next()">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2"/>
                        </svg>
                    </button>
                </div>
                
                <div class="carousel-pagination">
                    <span class="page-info">${this.currentIndex + 1}</span>
                    <span>/</span>
                    <span class="page-total">${this.filteredProjects.length}</span>
                </div>
            `;
        }

        handleMouseMove(e) {
            const wrapper = e.currentTarget;
            const centerCard = wrapper.querySelector('.three-card.center');
            if (!centerCard) return;

            const rect = wrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            centerCard.style.transform = `scale(1.1) translateZ(30px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }

        handleMouseLeave() {
            const wrapper = document.querySelector(`${this.carouselSelector} .cards-wrapper`);
            const centerCard = wrapper?.querySelector('.three-card.center');
            if (centerCard) {
                centerCard.style.transform = 'scale(1.1) translateZ(30px)';
            }
        }

        setupTouchSwipe() {
            const container = document.querySelector(this.carouselSelector);
            if (!container) return;

            let touchStartX = 0;
            let touchEndX = 0;
            const minSwipeDistance = 50;

            container.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            container.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                const diff = touchStartX - touchEndX;
                
                if (Math.abs(diff) > minSwipeDistance) {
                    if (diff > 0) {
                        this.next();
                    } else {
                        this.prev();
                    }
                }
            }, { passive: true });
        }

        goTo(index) {
            if (index < 0 || index >= this.filteredProjects.length) return;
            this.currentIndex = index;
            this.render();
        }

        goToCenter() {
            // Clicking a card does nothing extra - it's already centered
        }

        next() {
            this.currentIndex = (this.currentIndex + 1) % this.filteredProjects.length;
            this.render();
        }

        prev() {
            this.currentIndex = (this.currentIndex - 1 + this.filteredProjects.length) % this.filteredProjects.length;
            this.render();
        }

        startAutoScroll() {
            this.stopAutoScroll();
            this.autoScrollTimer = setInterval(() => this.next(), 4000);
        }

        stopAutoScroll() {
            if (this.autoScrollTimer) {
                clearInterval(this.autoScrollTimer);
                this.autoScrollTimer = null;
            }
        }
    }

    // Initialize
    document.addEventListener('DOMContentLoaded', function() {
        const checkData = setInterval(() => {
            if (window.webProjectsData && window.mobileProjectsData && window.iotProjectsData) {
                clearInterval(checkData);
                
                window.webCarousel = new ThreeCardCarousel('web', 'webProjectsData', '.web-filter', '.web-carousel');
                window.mobileCarousel = new ThreeCardCarousel('mobile', 'mobileProjectsData', '.mobile-filter', '.mobile-carousel');
                window.iotCarousel = new ThreeCardCarousel('iot', 'iotProjectsData', '.iot-filter', '.iot-carousel');
            }
        }, 100);
        
        setTimeout(() => clearInterval(checkData), 5000);
    });

})();
