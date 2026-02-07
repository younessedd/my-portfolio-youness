/* ============================================
   IMAGE PRELOADING FOR FAST POPUPS
   Preload images on hover/click for instant display
============================================ */

class PopupImagePreloader {
    constructor() {
        this.preloadedImages = new Map();
        this.init();
    }

    init() {
        // Add hover listeners to project cards
        this.addHoverListeners();
        // Add click listeners for immediate preloading
        this.addClickListeners();
    }

    addHoverListeners() {
        // Preload images on hover with debounce
        const projectCards = document.querySelectorAll('.project-card, .skill-card, .mobile-app-card, .iot-card');
        
        projectCards.forEach(card => {
            let hoverTimeout;
            
            card.addEventListener('mouseenter', () => {
                // Start preloading after 200ms of hover
                hoverTimeout = setTimeout(() => {
                    this.preloadProjectImages(card);
                }, 200);
            });
            
            card.addEventListener('mouseleave', () => {
                // Cancel preloading if hover ends
                clearTimeout(hoverTimeout);
            });
        });
    }

    addClickListeners() {
        // Immediate preload on click
        const projectCards = document.querySelectorAll('.project-card, .skill-card, .mobile-app-card, .iot-card');
        
        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                this.preloadProjectImages(card);
            });
        });
    }

    preloadProjectImages(card) {
        // Get project data from card
        const projectId = card.dataset.projectId || card.dataset.skillId;
        if (!projectId) return;

        // Find project data and preload images
        this.preloadWebProjectImages(projectId);
        this.preloadMobileProjectImages(projectId);
        this.preloadIoTProjectImages(projectId);
        this.preloadSkillImages(projectId);
    }

    preloadWebProjectImages(projectId) {
        const project = window.webProjectsData?.frontend?.find(p => p.id === projectId) ||
                       window.webProjectsData?.backend?.find(p => p.id === projectId) ||
                       window.webProjectsData?.fullstack?.find(p => p.id === projectId);
        
        if (project?.images) {
            project.images.forEach(imageSrc => {
                this.preloadImage(imageSrc);
            });
        }
    }

    preloadMobileProjectImages(projectId) {
        const categories = ['quiz', 'utility', 'smartHome'];
        
        for (const category of categories) {
            const projects = window.mobileProjectsData?.[category] || [];
            const project = projects.find(p => p.id === projectId);
            
            if (project?.images) {
                project.images.forEach(imageSrc => {
                    this.preloadImage(imageSrc);
                });
                break;
            }
        }
    }

    preloadIoTProjectImages(projectId) {
        const categories = ['home', 'industrial', 'sensors', 'othersiot'];
        
        for (const category of categories) {
            const projects = window.iotProjectsData?.[category] || [];
            const project = projects.find(p => p.id === projectId);
            
            if (project?.images) {
                project.images.forEach(imageSrc => {
                    this.preloadImage(imageSrc);
                });
                break;
            }
        }
    }

    preloadSkillImages(projectId) {
        const categories = ['frontend', 'backend', 'tools', 'other'];
        
        for (const category of categories) {
            const skills = window.skillsData?.[category] || [];
            const skill = skills.find(s => s.id === projectId);
            
            if (skill?.image) {
                this.preloadImage(skill.image);
                break;
            }
        }
    }

    preloadImage(src) {
        // Skip if already preloaded
        if (this.preloadedImages.has(src)) return;

        // Create and cache the image
        const img = new Image();
        img.onload = () => {
            this.preloadedImages.set(src, img);
        };
        img.onerror = () => {
            // Cache failed attempts to avoid retrying
            this.preloadedImages.set(src, null);
        };
        
        // Start loading with high priority
        img.src = src;
        img.fetchpriority = 'high';
    }

    // Check if image is preloaded
    isPreloaded(src) {
        return this.preloadedImages.has(src);
    }

    // Get preloaded image
    getPreloadedImage(src) {
        return this.preloadedImages.get(src);
    }
}

// Initialize preloader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.popupImagePreloader = new PopupImagePreloader();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PopupImagePreloader;
}
