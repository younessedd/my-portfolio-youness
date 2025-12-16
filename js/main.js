/**
 * main.js - Main JavaScript File
 * Coordinates all components and provides utility functions
 */

// Global variables
let heroSwiper = null;
let imageSwipers = [];

/**
 * Initialize the entire application
 */
function initPortfolio() {
    console.log('🚀 Portfolio initializing...');
    
    // Initialize all components
    initTheme();
    setupEventListeners();
    
    // Set current year in footer
    updateCurrentYear();
    
    // Add event listeners for CV downloads
    setupCvDownloadTracking();
    
    // Setup click outside to close swipers
    setupSwiperCloseListeners();
    
    // Setup keyboard listeners
    setupKeyboardListeners();
    
    console.log('✅ Portfolio initialized successfully');
}

/**
 * Initialize theme (dark/light mode)
 */
function initTheme() {
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
    
    if (savedTheme === 'dark') {
        document.body.classList.remove('theme-light');
        document.body.classList.add('theme-dark');
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.body.classList.remove('theme-dark');
        document.body.classList.add('theme-light');
        document.documentElement.setAttribute('data-theme', 'light');
    }
    
    // Update theme toggle buttons
    updateThemeUI(savedTheme);
}

/**
 * Update theme UI elements
 */
function updateThemeUI(theme) {
    const isDark = theme === 'dark';
    const iconClass = isDark ? 'fas fa-sun' : 'fas fa-moon';
    const text = isDark ? 'Light Mode' : 'Dark Mode';
    
    // Update desktop toggle
    const desktopIcon = document.querySelector('#theme-toggle-desktop i');
    if (desktopIcon) desktopIcon.className = iconClass;
    
    // Update mobile toggle
    const mobileIcon = document.querySelector('#mobile-theme-toggle i');
    if (mobileIcon) mobileIcon.className = iconClass;
    
    const mobileText = document.querySelector('#mobile-theme-toggle span');
    if (mobileText) mobileText.textContent = text;
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
    // Mobile menu toggle
    const burgerBtn = document.getElementById('burger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (burgerBtn && mobileMenu) {
        burgerBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            const icon = this.querySelector('i');
            if (icon) {
                icon.className = mobileMenu.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
            }
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking on links
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                burgerBtn.querySelector('i').className = 'fas fa-bars';
                document.body.style.overflow = '';
            });
        });
    }
    
    // Theme toggles
    const desktopThemeToggle = document.getElementById('theme-toggle-desktop');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    
    if (desktopThemeToggle) {
        desktopThemeToggle.addEventListener('click', toggleTheme);
    }
    
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', toggleTheme);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                // Close mobile menu if open
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    burgerBtn.querySelector('i').className = 'fas fa-bars';
                    document.body.style.overflow = '';
                }
                
                const headerHeight = document.querySelector('header').offsetHeight || 80;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Toggle between light and dark theme
 */
function toggleTheme() {
    const isDark = document.body.classList.contains('theme-dark');
    const newTheme = isDark ? 'light' : 'dark';
    
    if (newTheme === 'dark') {
        document.body.classList.remove('theme-light');
        document.body.classList.add('theme-dark');
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.body.classList.remove('theme-dark');
        document.body.classList.add('theme-light');
        document.documentElement.setAttribute('data-theme', 'light');
    }
    
    localStorage.setItem('portfolio-theme', newTheme);
    updateThemeUI(newTheme);
    
    // Show toast notification
    if (typeof showToast === 'function') {
        showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`, 'success');
    }
}

/**
 * Update current year in footer
 */
function updateCurrentYear() {
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        if (element) {
            element.textContent = currentYear;
        }
    });
    
    // Also update footer-bottom year
    const footerBottomYear = document.getElementById('current-year');
    if (footerBottomYear) {
        footerBottomYear.textContent = currentYear;
    }
}

/**
 * Setup CV download tracking
 */
function setupCvDownloadTracking() {
    const cvLinks = document.querySelectorAll('a[href*="cv"]');
    
    cvLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('CV downloaded: ', this.href);
        });
    });
}

/**
 * Setup click outside to close swipers
 */
function setupSwiperCloseListeners() {
    document.addEventListener('click', function(e) {
        const webSwiperContainer = document.getElementById('web-swiper-container');
        const mobileSwiperContainer = document.getElementById('mobile-swiper-container');
        const iotSwiperContainer = document.getElementById('iot-swiper-container');
        const skillsSwiperContainer = document.getElementById('skills-swiper-container');
        
        // Check Web Apps swiper
        if (webSwiperContainer && webSwiperContainer.style.display === 'block') {
            const webNav = document.getElementById('web-apps-nav');
            const isClickInsideWebSwiper = webSwiperContainer.contains(e.target);
            const isClickOnWebNav = webNav && (webNav.contains(e.target) || e.target.closest('#web-apps-nav'));
            
            if (!isClickInsideWebSwiper && !isClickOnWebNav) {
                if (typeof WebProjectsManager !== 'undefined' && typeof WebProjectsManager.closePopup === 'function') {
                    WebProjectsManager.closePopup();
                }
                return;
            }
        }
        
        // Check Mobile Apps swiper
        if (mobileSwiperContainer && mobileSwiperContainer.style.display === 'block') {
            const mobileNav = document.getElementById('mobile-apps-nav');
            const isClickInsideMobileSwiper = mobileSwiperContainer.contains(e.target);
            const isClickOnMobileNav = mobileNav && (mobileNav.contains(e.target) || e.target.closest('#mobile-apps-nav'));
            
            if (!isClickInsideMobileSwiper && !isClickOnMobileNav) {
                if (typeof MobileProjectsManager !== 'undefined' && typeof MobileProjectsManager.closePopup === 'function') {
                    MobileProjectsManager.closePopup();
                }
                return;
            }
        }
        
        // Check IoT Projects swiper
        if (iotSwiperContainer && iotSwiperContainer.style.display === 'block') {
            const iotNav = document.getElementById('iot-projects-nav');
            const isClickInsideIotSwiper = iotSwiperContainer.contains(e.target);
            const isClickOnIotNav = iotNav && (iotNav.contains(e.target) || e.target.closest('#iot-projects-nav'));
            
            if (!isClickInsideIotSwiper && !isClickOnIotNav) {
                if (typeof IoTProjectsManager !== 'undefined' && typeof IoTProjectsManager.closePopup === 'function') {
                    IoTProjectsManager.closePopup();
                }
                return;
            }
        }
        
        // Check Skills swiper
        if (skillsSwiperContainer && skillsSwiperContainer.style.display === 'block') {
            const skillsNav = document.getElementById('skills-nav');
            const isClickInsideSkillsSwiper = skillsSwiperContainer.contains(e.target);
            const isClickOnSkillsNav = skillsNav && (skillsNav.contains(e.target) || e.target.closest('#skills-nav'));
            
            if (!isClickInsideSkillsSwiper && !isClickOnSkillsNav) {
                if (typeof SkillsManager !== 'undefined' && typeof SkillsManager.closePopup === 'function') {
                    SkillsManager.closePopup();
                }
                return;
            }
        }
    });
}

/**
 * Setup keyboard listeners
 */
function setupKeyboardListeners() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close Web Apps swiper
            const webSwiperContainer = document.getElementById('web-swiper-container');
            if (webSwiperContainer && webSwiperContainer.style.display === 'block') {
                if (typeof WebProjectsManager !== 'undefined' && typeof WebProjectsManager.closePopup === 'function') {
                    WebProjectsManager.closePopup();
                }
                return;
            }
            
            // Close Mobile Apps swiper
            const mobileSwiperContainer = document.getElementById('mobile-swiper-container');
            if (mobileSwiperContainer && mobileSwiperContainer.style.display === 'block') {
                if (typeof MobileProjectsManager !== 'undefined' && typeof MobileProjectsManager.closePopup === 'function') {
                    MobileProjectsManager.closePopup();
                }
                return;
            }
            
            // Close IoT Projects swiper
            const iotSwiperContainer = document.getElementById('iot-swiper-container');
            if (iotSwiperContainer && iotSwiperContainer.style.display === 'block') {
                if (typeof IoTProjectsManager !== 'undefined' && typeof IoTProjectsManager.closePopup === 'function') {
                    IoTProjectsManager.closePopup();
                }
                return;
            }
            
            // Close Skills swiper
            const skillsSwiperContainer = document.getElementById('skills-swiper-container');
            if (skillsSwiperContainer && skillsSwiperContainer.style.display === 'block') {
                if (typeof SkillsManager !== 'undefined' && typeof SkillsManager.closePopup === 'function') {
                    SkillsManager.closePopup();
                }
                return;
            }
            
            // Close mobile menu
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                const burgerBtn = document.getElementById('burger-btn');
                if (burgerBtn) {
                    burgerBtn.querySelector('i').className = 'fas fa-bars';
                }
                document.body.style.overflow = '';
            }
        }
    });
}

/**
 * Handle window resize
 */
function handleResize() {
    // Close mobile menu on larger screens
    const mobileMenu = document.getElementById('mobile-menu');
    if (window.innerWidth > 768 && mobileMenu && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        const burgerBtn = document.getElementById('burger-btn');
        if (burgerBtn) {
            burgerBtn.querySelector('i').className = 'fas fa-bars';
        }
        document.body.style.overflow = '';
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initPortfolio();
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    // Add scroll listener for active nav links
    window.addEventListener('scroll', updateActiveNavLink);
});

/**
 * Update active navigation link based on scroll position
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-nav a');
    
    let currentSection = '';
    const headerHeight = document.querySelector('header').offsetHeight || 80;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - headerHeight - 100)) {
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
}
