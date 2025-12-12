/**
 * web-projects.js - Web Projects Management
 * Handles web projects navigation, swiper initialization, and project display
 */

const WebProjectsManager = {
    // DOM Elements
    elements: {
        nav: null,
        swiperContainer: null,
        swiper: null,
        closeBtn: null
    },
    
    // State
    currentCategory: 'frontend',
    
    // Swiper instance
    swiperInstance: null,
    
    // Image swipers
    imageSwipers: [],
    
    /**
     * Initialize web projects
     */
    init: function() {
        this.cacheElements();
        this.setupNavigation();
        this.setupSwiperClose();
        console.log('Web projects manager initialized');
    },
    
    /**
     * Cache DOM elements
     */
    cacheElements: function() {
        this.elements.nav = document.getElementById('web-apps-nav');
        this.elements.swiperContainer = document.getElementById('web-swiper-container');
        this.elements.swiper = document.getElementById('webSwiper');
        this.elements.closeBtn = document.getElementById('web-swiper-close-btn');
    },
    
    /**
     * Setup category navigation
     */
    setupNavigation: function() {
        if (!this.elements.nav) return;
        
        const navButtons = this.elements.nav.querySelectorAll('.skill-nav-btn');
        
        navButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                this.showCategory(category);
            });
        });
        
        console.log('Web projects navigation setup complete');
    },
    
    /**
     * Setup swiper close button
     */
    setupSwiperClose: function() {
        if (this.elements.closeBtn) {
            this.elements.closeBtn.addEventListener('click', () => this.closeSwiper());
        }
    },
    
    /**
     * Show projects for a specific category
     * @param {string} category - Project category
     */
    showCategory: function(category) {
        this.currentCategory = category;
        
        // Get projects for this category
        const projects = this.getProjectsByCategory(category);
        
        if (projects.length === 0) {
            console.warn(`No projects found for category: ${category}`);
            return;
        }
        
        // Hide other swiper containers
        this.hideOtherContainers();
        
        // Show this swiper container
        if (this.elements.swiperContainer) {
            this.elements.swiperContainer.style.display = 'block';
        }
        
        // Initialize swiper with projects
        this.initializeSwiper(projects);
        
        // Update active button
        this.updateActiveButton(category);
        
        // Scroll to swiper
        setTimeout(() => {
            if (this.elements.swiperContainer) {
                this.elements.swiperContainer.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest' 
                });
            }
        }, 300);
        
        console.log(`Showing ${projects.length} projects for category: ${category}`);
        
        // Show toast notification
        if (typeof showToast === 'function') {
            const categoryName = this.getCategoryName(category);
            showToast(`Showing ${projects.length} ${categoryName} projects`, 'info');
        }
    },
    
    /**
     * Get projects by category
     * @param {string} category - Project category
     * @returns {Array} Array of projects
     */
    getProjectsByCategory: function(category) {
        // Projects are loaded from js/data/web-projects.js
        if (typeof webProjectsData !== 'undefined' && webProjectsData[category]) {
            return webProjectsData[category];
        }
        
        // Fallback to empty array
        console.warn(`No data found for category: ${category}`);
        return [];
    },
    
    /**
     * Get category display name
     * @param {string} category - Category key
     * @returns {string} Display name
     */
    getCategoryName: function(category) {
        const names = {
            'frontend': 'Frontend',
            'fullstack': 'Fullstack',
            'responsive': 'Responsive'
        };
        return names[category] || category;
    },
    
    /**
     * Initialize swiper with projects
     * @param {Array} projects - Array of project objects
     */
    initializeSwiper: function(projects) {
        // Destroy existing swiper
        if (this.swiperInstance) {
            this.swiperInstance.destroy(true, true);
            this.swiperInstance = null;
        }
        
        // Destroy image swipers
        this.imageSwipers.forEach(swiper => swiper.destroy(true, true));
        this.imageSwipers = [];
        
        // Clear swiper wrapper
        const wrapper = this.elements.swiper?.querySelector('.swiper-wrapper');
        if (wrapper) {
            wrapper.innerHTML = '';
        }
        
        if (projects.length === 0) {
            this.showNoProjectsMessage();
            return;
        }
        
        // Add projects to swiper
        projects.forEach((project, index) => {
            this.addProjectToSwiper(project, index);
        });
        
        // Initialize main swiper
        this.initMainSwiper();
        
        // Initialize image swipers after delay
        setTimeout(() => {
            this.initImageSwipers(projects);
        }, 100);
    },
    
    /**
     * Show message when no projects are found
     */
    showNoProjectsMessage: function() {
        const wrapper = this.elements.swiper?.querySelector('.swiper-wrapper');
        if (!wrapper) return;
        
        wrapper.innerHTML = `
            <div class="swiper-slide">
                <div class="project-card">
                    <div class="project-info" style="display: flex; align-items: center; justify-content: center;">
                        <h3 style="color: var(--text-secondary);">No projects found in this category</h3>
                    </div>
                </div>
            </div>
        `;
        
        // Initialize empty swiper
        this.swiperInstance = new Swiper(this.elements.swiper, {
            loop: false,
            allowTouchMove: false
        });
    },
    
    /**
     * Add project to swiper
     * @param {Object} project - Project object
     * @param {number} index - Project index
     */
    addProjectToSwiper: function(project, index) {
        const wrapper = this.elements.swiper?.querySelector('.swiper-wrapper');
        if (!wrapper) return;
        
        // Generate unique ID for image swiper
        const imageSwiperId = `web-image-swiper-${project.id}`;
        
        // Generate technology tags HTML
        const techTagsHTML = this.generateTechTagsHTML(project.technologies);
        
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        
        slide.innerHTML = `
            <div class="project-card">
                <div class="image-swiper-container">
                    <div class="swiper image-swiper ${imageSwiperId}">
                        <div class="swiper-wrapper">
                            ${project.images.map(img => `
                                <div class="swiper-slide image-slide">
                                    <img src="${img}" alt="${project.title}" class="project-image">
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                <div class="project-info">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    
                    <div class="project-features">
                        <h4 class="features-title">Key Features:</h4>
                        <ul class="features-list">
                            ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="project-technologies">
                        <h4 class="tech-title">Technologies:</h4>
                        <div class="tech-tags-container">
                            ${techTagsHTML}
                        </div>
                    </div>
                    
                    <div class="project-links">
                        ${project.links.map(link => `
                            <a href="${link.url}" class="project-link" target="_blank">
                                <i class="fas ${link.icon}"></i> ${link.name}
                            </a>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        
        wrapper.appendChild(slide);
    },
    
    /**
     * Generate technology tags HTML
     * @param {Array} technologies - Array of technology names
     * @returns {string} HTML string
     */
    generateTechTagsHTML: function(technologies) {
        // Technology class mapping
        const techClassMap = {
            "HTML5": "html5",
            "CSS3": "css3",
            "JavaScript": "javascript",
            "React.js": "react",
            "Laravel": "laravel",
            "PHP": "php",
            "MySQL": "mysql",
            "Bootstrap": "bootstrap",
            "Tailwind CSS": "tailwind",
            "Node.js": "nodejs",
            "Express": "express",
            "MongoDB": "mongodb",
            "Firebase": "firebase",
            "REST API": "rest",
            "API": "api",
            "Git": "git",
            "Responsive Design": "responsive",
            "UI/UX": "uiux",
            "Chart.js": "uiux",
            "Video.js": "uiux",
            "Google Maps API": "api",
            "Payment API": "api"
        };
        
        return technologies.map(tech => {
            const cleanTech = tech.replace(/\([^)]*\)/g, '').trim();
            const techClass = techClassMap[cleanTech] || 'api';
            return `<span class="tech-tag ${techClass}">${tech}</span>`;
        }).join('');
    },
    
    /**
     * Initialize main swiper
     */
    initMainSwiper: function() {
        if (!this.elements.swiper) return;
        
        const swiperConfig = {
            loop: true,
            navigation: {
                nextEl: `${this.elements.swiper.selector} .swiper-button-next`,
                prevEl: `${this.elements.swiper.selector} .swiper-button-prev`,
            },
            spaceBetween: 30,
            centeredSlides: true,
            speed: 600,
        };
        
        this.swiperInstance = new Swiper(this.elements.swiper, swiperConfig);
        console.log('Web projects swiper initialized');
    },
    
    /**
     * Initialize image swipers
     * @param {Array} projects - Array of project objects
     */
    initImageSwipers: function(projects) {
        projects.forEach((project, index) => {
            const imageSwiperId = `web-image-swiper-${project.id}`;
            const imageSwiperEl = document.querySelector(`.${imageSwiperId}`);
            
            if (imageSwiperEl) {
                const imageSwiper = new Swiper(imageSwiperEl, {
                    loop: true,
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: false,
                    },
                    effect: 'fade',
                    fadeEffect: {
                        crossFade: true
                    },
                    speed: 800,
                });
                
                this.imageSwipers.push(imageSwiper);
            }
        });
        
        console.log(`${this.imageSwipers.length} image swipers initialized`);
    },
    
    /**
     * Hide other swiper containers
     */
    hideOtherContainers: function() {
        // This function is handled by main.js
        if (typeof hideAllSwiperContainers === 'function') {
            hideAllSwiperContainers();
        }
    },
    
    /**
     * Close swiper container
     */
    closeSwiper: function() {
        if (this.elements.swiperContainer) {
            this.elements.swiperContainer.style.display = 'none';
            
            // Remove active class from all nav buttons
            if (this.elements.nav) {
                const navButtons = this.elements.nav.querySelectorAll('.skill-nav-btn');
                navButtons.forEach(btn => btn.classList.remove('active'));
            }
            
            console.log('Web projects swiper closed');
        }
    },
    
    /**
     * Update active navigation button
     * @param {string} category - Active category
     */
    updateActiveButton: function(category) {
        if (!this.elements.nav) return;
        
        // Remove active class from all buttons
        const navButtons = this.elements.nav.querySelectorAll('.skill-nav-btn');
        navButtons.forEach(button => button.classList.remove('active'));
        
        // Add active class to clicked button
        const activeButton = this.elements.nav.querySelector(`[data-category="${category}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }
    },
    
    /**
     * Get current category
     * @returns {string} Current category
     */
    getCurrentCategory: function() {
        return this.currentCategory;
    },
    
    /**
     * Add a new project
     * @param {string} category - Project category
     * @param {Object} project - Project object
     */
    addProject: function(category, project) {
        // This would update the webProjectsData and refresh the display
        console.log(`Adding project to ${category}:`, project.title);
        // Implementation depends on data structure
    }
};

// Initialize web projects when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    WebProjectsManager.init();
});

// Setup web apps navigation (called from main.js)
function setupWebAppsNavigation() {
    // This function is called from main.js
    console.log('Web apps navigation setup complete');
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        WebProjectsManager,
        setupWebAppsNavigation
    };
}