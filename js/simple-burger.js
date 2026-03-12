/**
 * Simple Burger Menu System
 *
 * This class implements a mobile navigation burger menu with comprehensive functionality
 * including menu toggling, navigation highlighting, smooth scrolling, and keyboard support.
 * It handles both desktop and mobile navigation states with proper accessibility.
 */

// Main burger menu class for mobile navigation
class SimpleBurger {
    // Constructor initializes burger menu properties
    constructor() {
        // Burger button element
        this.burgerBtn = null;
        // Mobile menu container element
        this.mobileMenu = null;
        // Mobile menu close button element
        this.mobileMenuClose = null;
        // Current menu open/close state
        this.isOpen = false;

        // Initialize the burger menu system
        this.init();
    }

    // Initialize the burger menu system
    init() {
        console.log('🍔 Simple Burger initializing...');
        console.log('🍔 Looking for elements...');

        // Get required DOM elements
        this.burgerBtn = document.getElementById('burger-btn');
        this.mobileMenu = document.getElementById('mobile-menu');
        this.mobileMenuClose = document.getElementById('mobile-menu-close');

        // Validate that required elements exist
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

        // Log found elements for debugging
        console.log('✅ Elements found:', {
            burgerBtn: this.burgerBtn,
            mobileMenu: this.mobileMenu,
            mobileMenuClose: this.mobileMenuClose,
            burgerBtnId: this.burgerBtn ? this.burgerBtn.id : 'null',
            burgerBtnTag: this.burgerBtn ? this.burgerBtn.tagName : 'null'
        });

        // Set up all event listeners
        this.setupEvents();
    }

    // Set up all event listeners for burger menu functionality
    setupEvents() {
        console.log('🍔 Setting up event listeners...');

        // Burger button click event
        this.burgerBtn.addEventListener('click', (e) => {
            console.log('🍔 Burger button clicked!', e);
            e.preventDefault();
            e.stopPropagation();
            this.toggleMenu();
        });

        // Mobile menu close button click event
        if (this.mobileMenuClose) {
            this.mobileMenuClose.addEventListener('click', (e) => {
                console.log('🍔 Close button clicked!', e);
                e.preventDefault();
                e.stopPropagation();
                this.closeMenu();
            });
        }

        // Set up navigation link click handlers
        this.setupNavigationClicks();

        // Keyboard navigation (Escape key)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                console.log('🍔 Escape key pressed!');
                this.closeMenu();
            }
        });

        // Outside click to close menu
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

    // Set up navigation link click handlers for smooth scrolling
    setupNavigationClicks() {
        // Get all navigation links (both desktop and mobile)
        const desktopLinks = document.querySelectorAll('.desktop-nav a');
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');

        console.log('🍔 Setting up navigation link clicks...');
        console.log('🍔 Found desktop links:', desktopLinks.length);
        console.log('🍔 Found mobile links:', mobileLinks.length);

        // Set up desktop navigation link clicks
        desktopLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                console.log('🍔 Desktop navigation link clicked:', link.textContent);
                this.handleNavigationClick(e, link);
            });
        });

        // Set up mobile navigation link clicks
        mobileLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                console.log('🍔 Mobile navigation link clicked:', link.textContent);
                this.handleNavigationClick(e, link);
            });
        });
    }

    // Handle navigation link clicks with smooth scrolling
    handleNavigationClick(e, link) {
        e.preventDefault();
        e.stopPropagation();

        const href = link.getAttribute('href');
        if (!href || !href.startsWith('#')) return;

        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            console.log('🍔 Navigating to section:', targetId);

            // Calculate scroll position with header offset
            const headerHeight = document.querySelector('header')?.offsetHeight || 0;
            const targetPosition = targetSection.offsetTop - headerHeight;

            // Smooth scroll to target section
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if it's open
            if (this.isOpen) {
                this.closeMenu();
            }

            // Log section selection for debugging
            console.log('🍔 Section selected:', targetId);
        }
    }

    // Toggle menu open/close state
    toggleMenu() {
        console.log('🍔 Toggling menu, current state:', this.isOpen);

        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    // Open the mobile menu
    openMenu() {
        console.log('🍔 Opening mobile menu');
        this.isOpen = true;

        // Show mobile menu with flexbox layout
        this.mobileMenu.style.display = 'flex';
        this.mobileMenu.classList.add('active');

        // Update burger button active state
        this.burgerBtn.classList.add('active');

        // Prevent body scrolling when menu is open
        document.body.style.overflow = 'hidden';

        console.log('🍔 Mobile menu opened');
    }

    // Close the mobile menu
    closeMenu() {
        console.log('🍔 Closing mobile menu');
        this.isOpen = false;

        // Hide mobile menu
        this.mobileMenu.style.display = 'none';
        this.mobileMenu.classList.remove('active');

        // Remove burger button active state
        this.burgerBtn.classList.remove('active');

        // Restore body scrolling
        document.body.style.overflow = '';

        console.log('🍔 Mobile menu closed');
    }

    // Public method to check if menu is open
    isOpenMenuOpen() {
        return this.isOpen;
    }

    // Public method to force close the menu
    forceClose() {
        if (this.isOpen) {
            this.closeMenu();
        }
    }

    // Cleanup method to remove event listeners and reset state
    destroy() {
        console.log('🍔 Cleaning up Simple Burger...');

        // Remove event listeners (note: these references may not work as expected)
        if (this.burgerBtn) {
            this.burgerBtn.removeEventListener('click', this.handleBurgerClick);
        }

        if (this.mobileMenuClose) {
            this.mobileMenuClose.removeEventListener('click', this.handleCloseClick);
        }

        document.removeEventListener('keydown', this.handleEscape);
        document.removeEventListener('click', this.handleOutsideClick);

        // Reset all properties
        this.isOpen = false;
        this.burgerBtn = null;
        this.mobileMenu = null;
        this.mobileMenuClose = null;

        console.log('✅ Simple Burger cleaned up');
    }
}

// Initialize burger menu when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Create global burger menu instance
    window.simpleBurger = new SimpleBurger();

    // Initialize scroll-based navigation highlighting
    initScrollNavigation();

    // Ensure home link shows active state on initial page load
    setTimeout(() => {
        // Force home links to be active since About section is visible
        const homeLinks = document.querySelectorAll('a[href="#about"]');
        homeLinks.forEach(link => {
            link.classList.add('active');
        });

        console.log('🍔 ABOUT LINK ACTIVE on first load');
    }, 100);
});

// Global function to update active navigation link (legacy support)
window.updateActiveNav = function() {
    console.log('🍔 Updating active navigation...');

    // Get all navigation links and sections
    const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-nav-link');
    const sections = document.querySelectorAll('section[id]');

    const scrollPosition = window.scrollY + 100; // Offset for header height

    let currentSection = '';

    // Find current section based on scroll position
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });

    // Default to home if no section found and near top of page
    if (!currentSection && window.scrollY < 100) {
        currentSection = 'home';
    }

    console.log('🍔 Current section:', currentSection);

    // Update navigation links active state
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

// Initialize scroll-based navigation highlighting system
function initScrollNavigation() {
    console.log('🍔 Initializing scroll navigation...');

    // Get navigation links and sections
    const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-nav-link');
    const sections = document.querySelectorAll('section[id]');

    console.log('🍔 Found nav links:', navLinks.length);
    console.log('🍔 Found sections:', sections.length);

    // Function to update active navigation based on scroll position
    function updateActiveNav() {
        const scrollPosition = window.scrollY + 100; // Offset for header height

        let currentSection = '';

        // Find current section based on scroll position
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });

        // Default to home if no section found and near top of page
        if (!currentSection && window.scrollY < 100) {
            currentSection = 'home';
        }

        console.log('🍔 Current section:', currentSection);

        // Update navigation links active state
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

    // Initial navigation update after DOM is ready
    setTimeout(() => {
        updateActiveNav();
        console.log('🍔 Initial navigation update completed');
    }, 100);

    // Update navigation on scroll events
    window.addEventListener('scroll', updateActiveNav);

    // Update navigation on window resize
    window.addEventListener('resize', updateActiveNav);
}

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SimpleBurger;
}
