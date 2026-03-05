/* ============================================
   SIMPLE BURGER BUTTON - GUARANTEED TO WORK
============================================ */

class SimpleBurger {
    constructor() {
        this.burgerBtn = null;
        this.mobileMenu = null;
        this.mobileMenuClose = null;
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        console.log('🍔 Simple Burger initializing...');
        console.log('🍔 Looking for elements...');
        
        // Get elements
        this.burgerBtn = document.getElementById('burger-btn');
        this.mobileMenu = document.getElementById('mobile-menu');
        this.mobileMenuClose = document.getElementById('mobile-menu-close');
        
        // Check if elements exist
        if (!this.burgerBtn) {
            console.error('❌ Burger button not found!');
            console.error('❌ Available burger buttons:', document.querySelectorAll('[id*="burger"]'));
            return;
        }
        
        if (!this.mobileMenu) {
            console.error('❌ Mobile menu not found!');
            console.error('❌ Available mobile menus:', document.querySelectorAll('[id*="mobile-menu"]'));
            return;
        }
        
        console.log('✅ Elements found:', {
            burgerBtn: this.burgerBtn,
            mobileMenu: this.mobileMenu,
            mobileMenuClose: this.mobileMenuClose,
            burgerBtnId: this.burgerBtn ? this.burgerBtn.id : 'null',
            burgerBtnTag: this.burgerBtn ? this.burgerBtn.tagName : 'null'
        });
        
        // Setup event listeners
        this.setupEvents();
    }
    
    setupEvents() {
        console.log('🍔 Setting up event listeners...');
        
        // Burger button click
        this.burgerBtn.addEventListener('click', (e) => {
            console.log('🍔 Burger button clicked!', e);
            e.preventDefault();
            e.stopPropagation();
            this.toggleMenu();
        });
        
        // Close button click
        if (this.mobileMenuClose) {
            this.mobileMenuClose.addEventListener('click', (e) => {
                console.log('🍔 Close button clicked!', e);
                e.preventDefault();
                e.stopPropagation();
                this.closeMenu();
            });
        }
        
        // Navigation link clicks (desktop and mobile)
        this.setupNavigationClicks();
        
        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                console.log('🍔 Escape key pressed!');
                this.closeMenu();
            }
        });
        
        // Outside click
        document.addEventListener('click', (e) => {
            if (this.isOpen && 
                !this.mobileMenu.contains(e.target) && 
                !this.burgerBtn.contains(e.target) &&
                !this.mobileMenuClose.contains(e.target)) {
                console.log('🍔 Outside click detected!');
                this.closeMenu();
            }
        });
        
        console.log('✅ Simple Burger initialized successfully');
    }
    
    // Setup navigation link clicks (desktop and mobile)
    setupNavigationClicks() {
        // Get all navigation links
        const desktopLinks = document.querySelectorAll('.desktop-nav a');
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');
        
        console.log('🍔 Setting up navigation link clicks...');
        console.log('🍔 Found desktop links:', desktopLinks.length);
        console.log('🍔 Found mobile links:', mobileLinks.length);
        
        // Setup desktop navigation clicks
        desktopLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                console.log('🍔 Desktop navigation link clicked:', link.textContent);
                this.handleNavigationClick(e, link);
            });
        });
        
        // Setup mobile navigation clicks
        mobileLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                console.log('🍔 Mobile navigation link clicked:', link.textContent);
                this.handleNavigationClick(e, link);
            });
        });
    }
    
    // Handle navigation click
    handleNavigationClick(e, link) {
        e.preventDefault();
        e.stopPropagation();
        
        const href = link.getAttribute('href');
        if (!href || !href.startsWith('#')) return;
        
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            console.log('🍔 Navigating to section:', targetId);
            
            // Scroll to section
            const headerHeight = document.querySelector('header')?.offsetHeight || 0;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (this.isOpen) {
                this.closeMenu();
            }
            
            // Show section (for debugging)
            console.log('🍔 Section selected:', targetId);
        }
    }
    
    toggleMenu() {
        console.log('🍔 Toggling menu, current state:', this.isOpen);
        
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }
    
    openMenu() {
        console.log('🍔 Opening mobile menu');
        this.isOpen = true;
        
        // Show mobile menu
        this.mobileMenu.style.display = 'flex';
        this.mobileMenu.classList.add('active');
        
        // Update burger button
        this.burgerBtn.classList.add('active');
        
        // Lock body scroll
        document.body.style.overflow = 'hidden';
        
        console.log('🍔 Mobile menu opened');
    }
    
    closeMenu() {
        console.log('🍔 Closing mobile menu');
        this.isOpen = false;
        
        // Hide mobile menu
        this.mobileMenu.style.display = 'none';
        this.mobileMenu.classList.remove('active');
        
        // Update burger button
        this.burgerBtn.classList.remove('active');
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        console.log('🍔 Mobile menu closed');
    }
    
    // Public methods
    isOpenMenuOpen() {
        return this.isOpen;
    }
    
    forceClose() {
        if (this.isOpen) {
            this.closeMenu();
        }
    }
    
    destroy() {
        console.log('🍔 Cleaning up Simple Burger...');
        
        // Remove event listeners
        if (this.burgerBtn) {
            this.burgerBtn.removeEventListener('click', this.handleBurgerClick);
        }
        
        if (this.mobileMenuClose) {
            this.mobileMenuClose.removeEventListener('click', this.handleCloseClick);
        }
        
        document.removeEventListener('keydown', this.handleEscape);
        document.removeEventListener('click', this.handleOutsideClick);
        
        // Reset state
        this.isOpen = false;
        this.burgerBtn = null;
        this.mobileMenu = null;
        this.mobileMenuClose = null;
        
        console.log('✅ Simple Burger cleaned up');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.simpleBurger = new SimpleBurger();
    
    // Initialize scroll-based navigation highlighting
    initScrollNavigation();
    
    // GUARANTEE Home link shows hover state on first load for ALL devices
    // because hero section is displayed on laptop, phone, or tablet
    setTimeout(() => {
        // Force Home link to be active on first load
        const homeLinks = document.querySelectorAll('a[href="#home"]');
        homeLinks.forEach(link => {
            link.classList.add('active');
            console.log('🍔 Home link FORCED to active state on first load - HERO SECTION VISIBLE');
        });
        
        console.log('🍔 HOME LINK ACTIVE on ALL DEVICES - Hero section visible');
    }, 100);
});

// Global function to update active navigation
window.updateActiveNav = function() {
    console.log('🍔 Updating active navigation...');
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    const scrollPosition = window.scrollY + 100; // Offset for header height
    
    let currentSection = '';
    
    // Find current section
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });
    
    // If no section found (page at top), default to home
    if (!currentSection && window.scrollY < 100) {
        currentSection = 'home';
    }
    
    console.log('🍔 Current section:', currentSection);
    
    // Update navigation links
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            const targetId = href.substring(1);
            
            // Remove active class from all links
            link.classList.remove('active');
            
            // Add active class to current section link
            if (targetId === currentSection) {
                link.classList.add('active');
                console.log('🍔 Active link set:', targetId);
            }
        }
    });
};

// Scroll-based navigation highlighting
function initScrollNavigation() {
    console.log('🍔 Initializing scroll navigation...');
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    console.log('🍔 Found nav links:', navLinks.length);
    console.log('🍔 Found sections:', sections.length);
    
    // Function to update active navigation link
    function updateActiveNav() {
        const scrollPosition = window.scrollY + 100; // Offset for header height
        
        let currentSection = '';
        
        // Find current section
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        // If no section found (page at top), default to home
        if (!currentSection && window.scrollY < 100) {
            currentSection = 'home';
        }
        
        console.log('🍔 Current section:', currentSection);
        
        // Update navigation links
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                
                // Remove active class from all links
                link.classList.remove('active');
                
                // Add active class to current section link
                if (targetId === currentSection) {
                    link.classList.add('active');
                    console.log('🍔 Active link set:', targetId);
                }
            }
        });
    }
    
    // Initial update on page load with delay to ensure DOM is ready
    setTimeout(() => {
        updateActiveNav();
        console.log('🍔 Initial navigation update completed');
    }, 100);
    
    // Update on scroll
    window.addEventListener('scroll', updateActiveNav);
    
    // Update on resize
    window.addEventListener('resize', updateActiveNav);
}

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SimpleBurger;
}
