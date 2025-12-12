/**
 * navigation.js - Navigation Management
 * Handles mobile menu, smooth scrolling, and navigation interactions
 */

const NavigationManager = {
    // DOM Elements
    elements: {
        burgerBtn: null,
        mobileMenu: null,
        desktopNav: null,
        mobileNavLinks: null
    },
    
    // State
    isMobileMenuOpen: false,
    
    /**
     * Initialize navigation
     */
    init: function() {
        this.cacheElements();
        this.setupEventListeners();
        this.setupSmoothScrolling();
        console.log('Navigation manager initialized');
    },
    
    /**
     * Cache DOM elements
     */
    cacheElements: function() {
        this.elements.burgerBtn = document.getElementById('burger-btn');
        this.elements.mobileMenu = document.getElementById('mobile-menu');
        this.elements.desktopNav = document.querySelector('.desktop-nav');
        this.elements.mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    },
    
    /**
     * Setup all event listeners
     */
    setupEventListeners: function() {
        // Burger button click
        if (this.elements.burgerBtn) {
            this.elements.burgerBtn.addEventListener('click', () => this.toggleMobileMenu());
        }
        
        // Mobile nav link clicks
        this.elements.mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (event) => this.handleOutsideClick(event));
        
        // Close menu with Escape key
        document.addEventListener('keydown', (event) => this.handleKeydown(event));
        
        // Update navigation on resize
        window.addEventListener('resize', () => this.handleResize());
    },
    
    /**
     * Setup smooth scrolling for anchor links
     */
    setupSmoothScrolling: function() {
        // Select all links with hashes
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip if it's just "#" or empty
                if (href === '#' || href === '') return;
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    
                    // Calculate header height for offset
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without jumping
                    history.pushState(null, null, href);
                }
            });
        });
    },
    
    /**
     * Toggle mobile menu visibility
     */
    toggleMobileMenu: function() {
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
        
        if (this.elements.mobileMenu) {
            this.elements.mobileMenu.classList.toggle('active');
        }
        
        if (this.elements.burgerBtn) {
            const icon = this.elements.burgerBtn.querySelector('i');
            if (icon) {
                icon.className = this.isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars';
            }
        }
        
        // Toggle body scroll
        document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
        
        console.log('Mobile menu toggled:', this.isMobileMenuOpen);
    },
    
    /**
     * Close mobile menu
     */
    closeMobileMenu: function() {
        this.isMobileMenuOpen = false;
        
        if (this.elements.mobileMenu) {
            this.elements.mobileMenu.classList.remove('active');
        }
        
        if (this.elements.burgerBtn) {
            const icon = this.elements.burgerBtn.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-bars';
            }
        }
        
        document.body.style.overflow = '';
        
        console.log('Mobile menu closed');
    },
    
    /**
     * Handle clicks outside mobile menu
     */
    handleOutsideClick: function(event) {
        const { burgerBtn, mobileMenu } = this.elements;
        
        if (this.isMobileMenuOpen && 
            mobileMenu && !mobileMenu.contains(event.target) && 
            burgerBtn && !burgerBtn.contains(event.target)) {
            this.closeMobileMenu();
        }
    },
    
    /**
     * Handle keyboard events
     */
    handleKeydown: function(event) {
        // Close menu with Escape key
        if (event.key === 'Escape' && this.isMobileMenuOpen) {
            this.closeMobileMenu();
        }
    },
    
    /**
     * Handle window resize
     */
    handleResize: function() {
        // Close mobile menu on larger screens
        if (window.innerWidth > 768 && this.isMobileMenuOpen) {
            this.closeMobileMenu();
        }
    },
    
    /**
     * Update active navigation link based on scroll position
     */
    updateActiveNavLink: function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-nav a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const headerHeight = document.querySelector('header').offsetHeight;
            
            if (scrollY >= (sectionTop - headerHeight - 100)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    },
    
    /**
     * Initialize scroll spy for active navigation
     */
    initScrollSpy: function() {
        window.addEventListener('scroll', () => this.updateActiveNavLink());
        this.updateActiveNavLink(); // Initial call
    }
};

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    NavigationManager.init();
    NavigationManager.initScrollSpy();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NavigationManager;
}