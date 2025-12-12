/**
 * main.js - Main JavaScript File
 * Initializes all components and sets up event listeners
 */

// Global variables
let heroSwiper = null;
let webSwiper = null;
let mobileSwiper = null;
let iotSwiper = null;
let imageSwipers = [];

// Initialize page when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio initialized');
    
    // Initialize all components
    initTheme();
    setupEventListeners();
    
    // Initialize all navigation systems
    setupSkillsNavigation();
    setupWebAppsNavigation();
    setupMobileAppsNavigation();
    setupIoTProjectsNavigation();
    
    // Initialize hero swiper
    initHeroSwiper();
    
    // Set current year in footer
    updateCurrentYear();
    
    // Setup swiper close buttons
    setupSwiperCloseButtons();
    
    // Add event listeners for CV downloads
    setupCvDownloadTracking();
    
    // Initialize all sections
    initAllSections();
});

/**
 * Initialize all sections of the portfolio
 */
function initAllSections() {
    console.log('Initializing all sections...');
    
    // Load hero slides
    loadHeroSlides();
    
    // Load skills data
    loadSkillsData();
    
    // Note: Project data is loaded from separate data files
    // and initialized by their respective modules
}

/**
 * Update current year in footer
 */
function updateCurrentYear() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
}

/**
 * Setup CV download tracking
 */
function setupCvDownloadTracking() {
    document.querySelectorAll('.cv-popup-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const cvType = this.querySelector('i').className.includes('code') ? 'web' : 'iot';
            showToast(`Opening ${cvType === 'web' ? 'Web Developer' : 'IoT Engineer'} CV...`, 'info');
            
            // You can add analytics here if needed
            console.log(`CV Downloaded: ${cvType}`);
        });
    });
}

/**
 * Setup event listeners for common elements
 */
function setupEventListeners() {
    // Theme toggles
    const desktopThemeToggle = document.getElementById('theme-toggle-desktop');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    
    if (desktopThemeToggle) {
        desktopThemeToggle.addEventListener('click', toggleTheme);
    }
    
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', toggleTheme);
    }
    
    // Mobile menu
    const burgerBtn = document.getElementById('burger-btn');
    if (burgerBtn) {
        burgerBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu when clicking on links
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const mobileMenu = document.getElementById('mobile-menu');
        const burgerBtn = document.getElementById('burger-btn');
        
        if (mobileMenu && burgerBtn && !mobileMenu.contains(event.target) && 
            !burgerBtn.contains(event.target) && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Close mobile menu with Escape key
    document.addEventListener('keydown', function(event) {
        const mobileMenu = document.getElementById('mobile-menu');
        if (event.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

/**
 * Toggle between light and dark theme
 */
function toggleTheme() {
    const isDark = document.body.classList.contains('theme-dark');
    document.body.classList.toggle('theme-dark');
    document.body.classList.toggle('theme-light');
    
    const newTheme = document.body.classList.contains('theme-dark') ? 'dark' : 'light';
    localStorage.setItem('portfolio-theme', newTheme);
    
    updateThemeIcons();
    showToast(`Switched to ${isDark ? 'Light' : 'Dark'} Mode`, 'success');
    closeMobileMenu();
}

/**
 * Update theme icons based on current theme
 */
function updateThemeIcons() {
    const isDark = document.body.classList.contains('theme-dark');
    const iconClass = isDark ? 'fas fa-sun' : 'fas fa-moon';
    
    // Update desktop icon
    const desktopIcon = document.querySelector('#theme-toggle-desktop i');
    if (desktopIcon) desktopIcon.className = iconClass;
    
    // Update mobile icon
    const mobileIcon = document.querySelector('#mobile-theme-toggle i');
    if (mobileIcon) mobileIcon.className = iconClass;
    
    // Update mobile text
    const mobileText = document.querySelector('#mobile-theme-toggle span');
    if (mobileText) mobileText.textContent = isDark ? 'Light Mode' : 'Dark Mode';
}

/**
 * Initialize theme from localStorage or system preference
 */
function initTheme() {
    const savedTheme = localStorage.getItem('portfolio-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        document.body.className = savedTheme === 'dark' ? 'theme-dark' : 'theme-light';
    } else {
        document.body.className = prefersDark ? 'theme-dark' : 'theme-light';
    }
    
    updateThemeIcons();
}

/**
 * Toggle mobile menu visibility
 */
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const burgerIcon = document.getElementById('burger-btn').querySelector('i');
    
    if (!mobileMenu || !burgerIcon) return;
    
    mobileMenu.classList.toggle('active');
    
    if (mobileMenu.classList.contains('active')) {
        burgerIcon.className = 'fas fa-times';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
        burgerIcon.className = 'fas fa-bars';
        document.body.style.overflow = ''; // Restore scrolling
    }
}

/**
 * Close mobile menu
 */
function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const burgerIcon = document.getElementById('burger-btn').querySelector('i');
    
    if (!mobileMenu || !burgerIcon) return;
    
    mobileMenu.classList.remove('active');
    burgerIcon.className = 'fas fa-bars';
    document.body.style.overflow = ''; // Restore scrolling
}

/**
 * Setup swiper close buttons
 */
function setupSwiperCloseButtons() {
    // Web Swiper Close Button
    const webCloseBtn = document.getElementById('web-swiper-close-btn');
    if (webCloseBtn) {
        webCloseBtn.addEventListener('click', function() {
            document.getElementById('web-swiper-container').style.display = 'none';
            // Remove active class from all web nav buttons
            document.querySelectorAll('#web-apps-nav .skill-nav-btn').forEach(btn => {
                btn.classList.remove('active');
            });
        });
    }
    
    // Mobile Swiper Close Button
    const mobileCloseBtn = document.getElementById('mobile-swiper-close-btn');
    if (mobileCloseBtn) {
        mobileCloseBtn.addEventListener('click', function() {
            document.getElementById('mobile-swiper-container').style.display = 'none';
            // Remove active class from all mobile nav buttons
            document.querySelectorAll('#mobile-apps-nav .skill-nav-btn').forEach(btn => {
                btn.classList.remove('active');
            });
        });
    }
    
    // IoT Swiper Close Button
    const iotCloseBtn = document.getElementById('iot-swiper-close-btn');
    if (iotCloseBtn) {
        iotCloseBtn.addEventListener('click', function() {
            document.getElementById('iot-swiper-container').style.display = 'none';
            // Remove active class from all iot nav buttons
            document.querySelectorAll('#iot-projects-nav .skill-nav-btn').forEach(btn => {
                btn.classList.remove('active');
            });
        });
    }
}

/**
 * Hide all swiper containers
 */
function hideAllSwiperContainers() {
    const containers = [
        'web-swiper-container',
        'mobile-swiper-container', 
        'iot-swiper-container'
    ];
    
    containers.forEach(id => {
        const container = document.getElementById(id);
        if (container) {
            container.style.display = 'none';
        }
    });
}

// Export functions for use in other modules (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        updateCurrentYear,
        toggleTheme,
        initTheme,
        toggleMobileMenu,
        closeMobileMenu,
        hideAllSwiperContainers
    };
}