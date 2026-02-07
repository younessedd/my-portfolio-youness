/* ============================================
   CLEAN HEADER JAVASCRIPT
   Simple navigation with active states
============================================ */

class CleanHeader {
    constructor() {
        this.header = document.querySelector('header');
        this.burgerBtn = document.getElementById('burger-btn');
        this.mobileMenu = document.getElementById('mobile-menu');
        this.navLinks = document.querySelectorAll('.desktop-nav a');
        this.mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        
        this.init();
    }
    
    init() {
        // Setup burger menu toggle
        this.setupBurgerMenu();
        
        // Setup navigation
        this.setupNavigation();
        
        console.log('✅ Clean Header initialized');
    }
    
    // Setup burger menu functionality
    setupBurgerMenu() {
        if (this.burgerBtn) {
            this.burgerBtn.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.mobileMenu.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });
        
        // Close on outside click
        document.addEventListener('click', (e) => {
            if (this.mobileMenu.classList.contains('active') && 
                !this.mobileMenu.contains(e.target) && 
                !this.burgerBtn.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }
    
    // Toggle mobile menu
    toggleMobileMenu() {
        const isOpen = this.mobileMenu.classList.contains('active');
        
        if (isOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }
    
    // Open mobile menu
    openMobileMenu() {
        this.mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close mobile menu
    closeMobileMenu() {
        this.mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Setup navigation with IntersectionObserver
    setupNavigation() {
        // Get all sections
        const sections = document.querySelectorAll('section[id]');
        
        if (sections.length === 0) return;
        
        // Setup IntersectionObserver
        const options = {
            threshold: 0.5,
            rootMargin: '-20% 0px -20% 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.setActiveSection(entry.target.id);
                }
            });
        }, options);
        
        // Observe all sections
        sections.forEach(section => {
            observer.observe(section);
        });
        
        // Setup click handlers
        this.setupClickHandlers();
    }
    
    // Setup click handlers for navigation
    setupClickHandlers() {
        // Desktop navigation
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e, link));
        });
        
        // Mobile navigation
        this.mobileNavLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e, link));
        });
    }
    
    // Handle navigation click
    handleNavClick(e, link) {
        e.preventDefault();
        
        const href = link.getAttribute('href');
        if (!href || !href.startsWith('#')) return;
        
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            // Set active state immediately
            this.setActiveSection(targetId);
            
            // Smooth scroll to section
            const headerHeight = this.header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu
            this.closeMobileMenu();
        }
    }
    
    // Set active section
    setActiveSection(sectionId) {
        // Remove active class from all links
        this.navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        this.mobileNavLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to current section links
        const activeLinks = document.querySelectorAll(`a[href="#${sectionId}"]`);
        
        activeLinks.forEach(link => {
            link.classList.add('active');
        });
        
        console.log(`📍 Active section: ${sectionId}`);
    }
    
    // Public method to manually activate section
    activateSection(sectionId) {
        this.setActiveSection(sectionId);
    }
    
    // Cleanup method
    destroy() {
        // Remove event listeners
        document.removeEventListener('keydown', this.handleEscape);
        document.removeEventListener('click', this.handleOutsideClick);
        
        // Reset classes
        this.mobileMenu.classList.remove('active');
        
        // Reset active states
        this.navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        this.mobileNavLinks.forEach(link => {
            link.classList.remove('active');
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.cleanHeader = new CleanHeader();
});

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CleanHeader;
}
