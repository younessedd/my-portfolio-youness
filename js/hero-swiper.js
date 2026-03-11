/**
 * Hero Swiper Manager
 *
 * This module manages the hero section swiper slider with advanced functionality including:
 * - Dynamic slide loading from configuration data
 * - Autoplay with splash screen synchronization
 * - Keyboard navigation and hover controls
 * - Responsive design with breakpoint-specific settings
 * - Accessibility features
 */

// Hero Swiper Manager object containing all functionality
const HeroSwiperManager = {
    // Property to store the Swiper instance
    swiper: null,

    // Configuration object containing slides data and swiper settings
    config: {
        // Array of hero slide objects with content and styling
        slides: [
            {
                // Unique slide identifier
                id: 1,
                // Slide title with HTML formatting
                title: "Full Stack <span>Web Developer</span><br>Front-end & Back-end",
                // Detailed slide description
                description: "I develop modern and performant web applications with HTML, CSS, JavaScript, React.js and Laravel.",
                // Background image path for the slide
                backgroundImage: "images/hero/web.webp",
                // Array of button objects for slide actions
                buttons: [
                    { text: "Web Projects", href: "#web-apps", class: "btn" },
                    { text: "Download CV", href: "#cv", class: "btn btn-secondary" }
                ]
            },
            {
                // Second hero slide configuration
                id: 2,
                title: "Mobile <span>Developer</span><br>Android & Cross-Platform",
                description: "Creating mobile applications with App Inventor, Kodular and Flutter (beginner level), focused on performance and simplicity.",
                backgroundImage: "images/hero/mob.webp",
                buttons: [
                    { text: "Download CV", href: "#cv", class: "btn btn-secondary" },
                    { text: "Mobile Apps", href: "#mobile-apps", class: "btn" }
                ]
            },
            {
                // Third hero slide configuration
                id: 3,
                title: "IoT & <span>Smart Home</span><br>Arduino • ESP32 • Automation",
                description: "Designing IoT and smart home systems for intelligent homes, integrating sensors, actuators, automation and remote supervision.",
                backgroundImage: "images/hero/iot.webp",
                buttons: [
                    { text: "IoT Projects", href: "#iot-projects", class: "btn" },
                    { text: "Download CV", href: "#cv", class: "btn btn-secondary" }
                ]
            },
            {
                // Fourth hero slide configuration
                id: 4,
                title: "Electrical <span>Maintenance</span><br>Industrial & Automation",
                description: "Industrial and domestic electrical maintenance: diagnostics, troubleshooting, improvement and modernization of installations.",
                backgroundImage: "images/hero/elec.webp",
                buttons: [
                    { text: "Contact Me", href: "#contact", class: "btn" },
                    { text: "View Skills", href: "#skills", class: "btn btn-secondary" }
                ]
            }
        ],

        // Swiper configuration object with all slider settings
        swiperConfig: {
            // Horizontal sliding direction
            direction: 'horizontal',
            // Enable infinite loop scrolling
            loop: true,
            // Transition speed in milliseconds
            speed: 1000,
            // Autoplay configuration
            autoplay: {
                // Delay between slides in milliseconds
                delay: 5000,
                // Continue autoplay after user interaction
                disableOnInteraction: false,
                // Initially disabled to sync with splash screen
                enabled: false,
            },
            // Fade transition effect
            effect: 'fade',
            // Fade effect configuration
            fadeEffect: {
                // Enable cross-fade for smoother transitions
                crossFade: true
            },
            // Pagination dots configuration
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            // Navigation arrows configuration
            navigation: {
                nextEl: '.hero-swiper .swiper-button-next',
                prevEl: '.hero-swiper .swiper-button-prev',
            },
            // Responsive breakpoints with different settings
            breakpoints: {
                // Mobile breakpoint (320px and up)
                320: {
                    autoplay: {
                        delay: 5000,
                        // Autoplay initially disabled
                        enabled: false,
                    }
                },
                // Tablet breakpoint (768px and up)
                768: {
                    autoplay: {
                        delay: 5000,
                        // Autoplay initially disabled
                        enabled: false,
                    }
                },
                // Desktop breakpoint (1024px and up)
                1024: {
                    autoplay: {
                        delay: 5000,
                        // Autoplay initially disabled
                        enabled: false,
                    }
                }
            },
            // Accessibility configuration
            a11y: {
                // Screen reader messages for navigation
                prevSlideMessage: 'Previous slide',
                nextSlideMessage: 'Next slide',
                firstSlideMessage: 'This is the first slide',
                lastSlideMessage: 'This is the last slide',
            }
        }
    },

    // Initialize the hero swiper manager
    init: function() {
        // Load slide content into DOM
        this.loadSlides();
        // Initialize the swiper instance
        this.initSwiper();
        // Set up event listeners for interactions
        this.setupEventListeners();
        // Configure splash screen synchronization
        this.setupSplashScreenListener();
        // Log initialization completion
        console.log('Hero swiper manager initialized');
    },

    // Set up listener for splash screen visibility changes
    setupSplashScreenListener: function() {
        // Create mutation observer to watch for class changes on body
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                // Check if class attribute changed
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const body = document.body;
                    // Check if splash screen is now hidden
                    if (body.classList.contains('splash-hidden')) {
                        // Start autoplay after splash screen hides
                        this.startAutoplayAfterDelay();
                    }
                }
            });
        });

        // Start observing body element for class changes
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['class']
        });

        // Check if splash screen is already hidden (in case it loads quickly)
        if (document.body.classList.contains('splash-hidden')) {
            this.startAutoplayAfterDelay();
        }
    },

    // Start autoplay after a delay to allow smooth transition from splash screen
    startAutoplayAfterDelay: function() {
        // Wait 2 seconds after splash screen hides before starting autoplay
        setTimeout(() => {
            if (this.swiper && this.swiper.autoplay) {
                // Enable autoplay globally
                this.swiper.params.autoplay.enabled = true;

                // Enable autoplay for current breakpoint
                const currentBreakpoint = this.swiper.currentBreakpoint;
                if (this.swiper.params.breakpoints[currentBreakpoint]) {
                    this.swiper.params.breakpoints[currentBreakpoint].autoplay.enabled = true;
                }

                // Start the autoplay
                this.swiper.autoplay.start();
                console.log('Hero autoplay started after splash screen');
            }
        }, 2000);
    },

    // Load hero slides into the DOM from configuration
    loadSlides: function() {
        // Get the swiper wrapper element
        const swiperWrapper = document.querySelector('.hero-swiper .swiper-wrapper');

        if (!swiperWrapper) {
            console.error('Swiper wrapper not found');
            return;
        }

        // Clear any existing content
        swiperWrapper.innerHTML = '';

        // Create and append slide elements
        this.config.slides.forEach(slide => {
            const slideElement = this.createSlideElement(slide);
            swiperWrapper.appendChild(slideElement);
        });

        // Log the number of slides loaded
        console.log(`Loaded ${this.config.slides.length} hero slides`);
    },

    // Create individual slide HTML element from slide data
    createSlideElement: function(slide) {
        // Create slide container div
        const slideDiv = document.createElement('div');
        slideDiv.className = 'swiper-slide hero-slide';

        // Set background image with cover sizing and center positioning
        slideDiv.style.background = `url('${slide.backgroundImage}')`;
        slideDiv.style.backgroundSize = 'cover';
        slideDiv.style.backgroundPosition = 'center';

        // Generate buttons HTML from button array
        const buttonsHTML = slide.buttons.map(button =>
            `<a href="${button.href}" class="${button.class}">${button.text}</a>`
        ).join('');

        // Set slide inner HTML with content structure
        slideDiv.innerHTML = `
            <div class="container">
                <div class="hero-content">
                    <h1>${slide.title}</h1>
                    <p>${slide.description}</p>
                    <div class="hero-btns center-buttons">
                        ${buttonsHTML}
                    </div>
                </div>
            </div>
        `;

        return slideDiv;
    },

    // Initialize the Swiper instance with configuration
    initSwiper: function() {
        // Get the swiper container element
        const swiperElement = document.querySelector('.hero-swiper');

        if (!swiperElement) {
            console.error('Hero swiper element not found');
            return;
        }

        try {
            // Create new Swiper instance with configuration
            this.swiper = new Swiper('.hero-swiper', this.config.swiperConfig);

            // Add swiper event listeners
            this.swiper.on('init', function() {
                console.log('Hero swiper initialized');
            });

            this.swiper.on('slideChange', function() {
                console.log('Slide changed to:', this.realIndex);
            });

            console.log('Swiper instance created');
        } catch (error) {
            console.error('Failed to initialize swiper:', error);
        }
    },

    // Set up various event listeners for swiper interactions
    setupEventListeners: function() {
        // Keyboard navigation for arrow keys
        document.addEventListener('keydown', (e) => this.handleKeyboardNavigation(e));

        // Pause autoplay on hover for better user experience
        const heroContainer = document.querySelector('.hero-swiper');
        if (heroContainer && this.swiper) {
            // Pause autoplay when mouse enters hero area
            heroContainer.addEventListener('mouseenter', () => {
                if (this.swiper.autoplay) {
                    this.swiper.autoplay.stop();
                }
            });

            // Resume autoplay when mouse leaves hero area
            heroContainer.addEventListener('mouseleave', () => {
                if (this.swiper.autoplay) {
                    this.swiper.autoplay.start();
                }
            });
        }
    },

    // Handle keyboard navigation with arrow keys
    handleKeyboardNavigation: function(e) {
        // Exit if swiper not initialized
        if (!this.swiper) return;

        // Navigate to previous slide on left arrow
        if (e.key === 'ArrowLeft') {
            this.swiper.slidePrev();
        }
        // Navigate to next slide on right arrow
        else if (e.key === 'ArrowRight') {
            this.swiper.slideNext();
        }
    },

    // Navigate to specific slide by index
    goToSlide: function(index) {
        // Validate index and swiper existence
        if (this.swiper && index >= 0 && index < this.config.slides.length) {
            this.swiper.slideToLoop(index);
        }
    },

    // Start autoplay manually
    startAutoplay: function() {
        if (this.swiper && this.swiper.autoplay) {
            this.swiper.autoplay.start();
        }
    },

    // Stop autoplay manually
    stopAutoplay: function() {
        if (this.swiper && this.swiper.autoplay) {
            this.swiper.autoplay.stop();
        }
    },

    // Destroy swiper instance and clean up
    destroy: function() {
        if (this.swiper) {
            this.swiper.destroy(true, true);
            this.swiper = null;
        }
    },

    // Get current active slide index
    getCurrentSlide: function() {
        return this.swiper ? this.swiper.realIndex : 0;
    }
};

// Initialize hero swiper when DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
    HeroSwiperManager.init();
});

// Make HeroSwiperManager available globally for external access
window.HeroSwiperManager = HeroSwiperManager;