/**
 * Main Portfolio JavaScript File
 *
 * This script handles the core functionality of the portfolio website including:
 * - Mobile navigation menu
 * - Smooth scrolling navigation
 * - CV download tracking
 * - Keyboard navigation
 * - Active navigation highlighting
 * - Image preloading for performance
 * - Popup close handlers (legacy code for popup system)
 */

// Global variables for managing swiper instances
let imageSwipers = [];

// Global popup opening functions (legacy code for popup system - may be unused)
function openWebPopup() {
    if (typeof WebProjectsManager !== 'undefined' && typeof WebProjectsManager.showCategory === 'function') {
        WebProjectsManager.showCategory('frontend', 'Frontend');
    }
}

function openMobilePopup() {
    if (typeof MobileProjectsManager !== 'undefined' && typeof MobileProjectsManager.showCategory === 'function') {
        MobileProjectsManager.showCategory('quiz', 'Quiz Apps');
    }
}

function openSkillsPopup() {
    if (typeof SkillsManager !== 'undefined' && typeof SkillsManager.showCategory === 'function') {
        SkillsManager.showCategory('webDevelopment', 'Web Development');
    }
}

function openIoTPopup() {
    if (typeof IoTProjectsManager !== 'undefined' && typeof IoTProjectsManager.showCategory === 'function') {
        IoTProjectsManager.showCategory('home', 'Smart Home');
    }
}

// Main portfolio initialization function
function initPortfolio() {
    console.log('🚀 Initializing portfolio...');

    // Set up all event listeners and interactions
    setupEventListeners();

    // Update copyright year in footer
    updateCurrentYear();

    // Add tracking for CV downloads
    setupCvDownloadTracking();

    // Set up keyboard event listeners
    setupKeyboardListeners();

    console.log('✅ Portfolio initialized successfully');
}

// Set up all event listeners for interactive elements
function setupEventListeners() {
    // Mobile navigation menu setup
    const burgerBtn = document.getElementById('burger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    let isMenuOpen = false;

    if (burgerBtn && mobileMenu) {
        // Toggle mobile menu on burger button click
        burgerBtn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                // Open menu
                mobileMenu.style.display = 'block';
                mobileMenu.classList.add('active');
                this.classList.add('active');
                icon.className = 'fas fa-times';
                document.body.style.overflow = 'hidden';
            } else {
                // Close menu
                mobileMenu.style.display = 'none';
                mobileMenu.classList.remove('active');
                this.classList.remove('active');
                icon.className = 'fas fa-bars';
                document.body.style.overflow = '';
            }
        });

        // Close mobile menu when navigation links are clicked
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.style.display = 'none';
                mobileMenu.classList.remove('active');
                burgerBtn.classList.remove('active');
                burgerBtn.querySelector('i').className = 'fas fa-bars';
                document.body.style.overflow = '';
                isMenuOpen = false;
            });
        });
        
        // Close mobile menu when logo is clicked in responsive mode
        const logo = document.querySelector('.logo');
        if (logo) {
            logo.addEventListener('click', function(e) {
                // Only close menu if it's open
                if (mobileMenu.style.display === 'block') {
                    e.preventDefault();
                    mobileMenu.style.display = 'none';
                    mobileMenu.classList.remove('active');
                    burgerBtn.classList.remove('active');
                    burgerBtn.querySelector('i').className = 'fas fa-bars';
                    document.body.style.overflow = '';
                    isMenuOpen = false;
                    // Scroll to about section
                    const aboutSection = document.getElementById('about');
                    if (aboutSection) {
                        aboutSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        }
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                // Close mobile menu if it's open
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    burgerBtn.querySelector('i').className = 'fas fa-bars';
                    document.body.style.overflow = '';
                }

                const headerHeight = document.querySelector('header').offsetHeight || 80;
                const targetPosition = targetElement.offsetTop - headerHeight;

                // Smooth scroll to target position
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Update current year in footer copyright
function updateCurrentYear() {
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();

    yearElements.forEach(element => {
        if (element) {
            element.textContent = currentYear;
        }
    });

    // Update bottom footer year element
    const footerBottomYear = document.getElementById('current-year');
    if (footerBottomYear) {
        footerBottomYear.textContent = currentYear;
    }
}

// Set up tracking for CV download links
function setupCvDownloadTracking() {
    const cvLinks = document.querySelectorAll('a[href*="cv"]');

    cvLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('CV downloaded: ', this.href);
        });
    });
}

// Set up click-outside listeners for closing popups (legacy popup system)
function setupSwiperCloseListeners() {
    document.addEventListener('click', function(e) {
        const webSwiperContainer = document.getElementById('web-swiper-container');
        const mobileSwiperContainer = document.getElementById('mobile-swiper-container');
        const iotSwiperContainer = document.getElementById('iot-swiper-container');
        const skillsSwiperContainer = document.getElementById('skills-swiper-container');

        // Handle web projects popup close
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

        // Handle mobile projects popup close
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

        // Handle IoT projects popup close
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

        // Handle skills popup close
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

// Set up keyboard event listeners for accessibility and shortcuts
function setupKeyboardListeners() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close web projects popup
            const webSwiperContainer = document.getElementById('web-swiper-container');
            if (webSwiperContainer && webSwiperContainer.style.display === 'block') {
                if (typeof WebProjectsManager !== 'undefined' && typeof WebProjectsManager.closePopup === 'function') {
                    WebProjectsManager.closePopup();
                }
                return;
            }

            // Close mobile projects popup
            const mobileSwiperContainer = document.getElementById('mobile-swiper-container');
            if (mobileSwiperContainer && mobileSwiperContainer.style.display === 'block') {
                if (typeof MobileProjectsManager !== 'undefined' && typeof MobileProjectsManager.closePopup === 'function') {
                    MobileProjectsManager.closePopup();
                }
                return;
            }

            // Close IoT projects popup
            const iotSwiperContainer = document.getElementById('iot-swiper-container');
            if (iotSwiperContainer && iotSwiperContainer.style.display === 'block') {
                if (typeof IoTProjectsManager !== 'undefined' && typeof IoTProjectsManager.closePopup === 'function') {
                    IoTProjectsManager.closePopup();
                }
                return;
            }

            // Close skills popup
            const skillsSwiperContainer = document.getElementById('skills-swiper-container');
            if (skillsSwiperContainer && skillsSwiperContainer.style.display === 'block') {
                if (typeof SkillsManager !== 'undefined' && typeof SkillsManager.closePopup === 'function') {
                    SkillsManager.closePopup();
                }
                return;
            }

            // Close mobile navigation menu
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

// Handle window resize events
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

    // Add window resize listener
    window.addEventListener('resize', handleResize);

    // Add scroll listener for active navigation highlighting
    window.addEventListener('scroll', updateActiveNavLink);

    // Set about link to active state initially since about section is visible
    setTimeout(() => {
        const aboutLinks = document.querySelectorAll('a[href="#about"]');
        aboutLinks.forEach(link => {
            link.classList.add('active');
            console.log('🍔 ABOUT LINK SET TO ACTIVE STATE - APP OPENED FIRST TIME - ABOUT SECTION VISIBLE');
        });

        console.log('🍔 ABOUT LINK ACTIVE - About section visible on app first open');
    }, 100);
});

// Update active navigation link based on scroll position
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