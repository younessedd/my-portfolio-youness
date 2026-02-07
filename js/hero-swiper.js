/**
 * hero-swiper.js - Hero Swiper Slider
 * Manages the hero section swiper slider with autoplay and navigation
 */

const HeroSwiperManager = {
    // Swiper instance
    swiper: null,
    
    // Configuration
    config: {
        // Hero slides data
slides: [
    {
        id: 1,
        title: "Full Stack <span>Web Developer</span><br>Front-end & Back-end",
        description: "I develop modern and performant web applications with HTML, CSS, JavaScript, React.js and Laravel.",
        backgroundImage: "images/hero/web.webp",
        buttons: [
            { text: "Web Projects", href: "#web-apps", class: "btn" },
            { text: "Download CV", href: "#cv", class: "btn btn-secondary" }
        ]
    },
    {
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

        
        // Swiper configuration
        swiperConfig: {
            direction: 'horizontal',
            loop: true,
            speed: 1000,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
                enabled: false, // Initially disabled
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: '.hero-swiper .swiper-button-next',
                prevEl: '.hero-swiper .swiper-button-prev',
            },
            breakpoints: {
                320: {
                    autoplay: {
                        delay: 5000,
                        enabled: false, // Initially disabled
                    }
                },
                768: {
                    autoplay: {
                        delay: 5000,
                        enabled: false, // Initially disabled
                    }
                },
                1024: {
                    autoplay: {
                        delay: 5000,
                        enabled: false, // Initially disabled
                    }
                }
            },
            a11y: {
                prevSlideMessage: 'Previous slide',
                nextSlideMessage: 'Next slide',
                firstSlideMessage: 'This is the first slide',
                lastSlideMessage: 'This is the last slide',
            }
        }
    },
    
    /**
     * Initialize hero swiper
     */
    init: function() {
        this.loadSlides();
        this.initSwiper();
        this.setupEventListeners();
        this.setupSplashScreenListener();
        console.log('Hero swiper manager initialized');
    },
    
    /**
     * Setup splash screen listener
     */
    setupSplashScreenListener: function() {
        // Listen for splash screen to be hidden
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const body = document.body;
                    if (body.classList.contains('splash-hidden')) {
                        // Splash screen is hidden, start autoplay
                        this.startAutoplayAfterDelay();
                    }
                }
            });
        });
        
        // Start observing the body for class changes
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['class']
        });
        
        // Also check if splash is already hidden
        if (document.body.classList.contains('splash-hidden')) {
            this.startAutoplayAfterDelay();
        }
    },
    
    /**
     * Start autoplay after a delay
     */
    startAutoplayAfterDelay: function() {
        // Wait 2 seconds after splash is hidden before starting autoplay
        setTimeout(() => {
            if (this.swiper && this.swiper.autoplay) {
                // Enable autoplay for all breakpoints
                this.swiper.params.autoplay.enabled = true;
                
                // Update autoplay settings for current breakpoint
                const currentBreakpoint = this.swiper.currentBreakpoint;
                if (this.swiper.params.breakpoints[currentBreakpoint]) {
                    this.swiper.params.breakpoints[currentBreakpoint].autoplay.enabled = true;
                }
                
                // Start autoplay
                this.swiper.autoplay.start();
                console.log('Hero autoplay started after splash screen');
            }
        }, 2000);
    },
    
    /**
     * Load slides into DOM
     */
    loadSlides: function() {
        const swiperWrapper = document.querySelector('.hero-swiper .swiper-wrapper');
        
        if (!swiperWrapper) {
            console.error('Swiper wrapper not found');
            return;
        }
        
        // Clear existing content
        swiperWrapper.innerHTML = '';
        
        // Add slides
        this.config.slides.forEach(slide => {
            const slideElement = this.createSlideElement(slide);
            swiperWrapper.appendChild(slideElement);
        });
        
        console.log(`Loaded ${this.config.slides.length} hero slides`);
    },
    
    /**
     * Create slide HTML element
     */
    createSlideElement: function(slide) {
        const slideDiv = document.createElement('div');
        slideDiv.className = 'swiper-slide hero-slide';
        slideDiv.style.background = `url('${slide.backgroundImage}')`;
        slideDiv.style.backgroundSize = 'cover';
        slideDiv.style.backgroundPosition = 'center';
        
        // Create buttons HTML
        const buttonsHTML = slide.buttons.map(button => 
            `<a href="${button.href}" class="${button.class}">${button.text}</a>`
        ).join('');
        
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
    
    /**
     * Initialize Swiper instance
     */
    initSwiper: function() {
        const swiperElement = document.querySelector('.hero-swiper');
        
        if (!swiperElement) {
            console.error('Hero swiper element not found');
            return;
        }
        
        try {
            this.swiper = new Swiper('.hero-swiper', this.config.swiperConfig);
            
            // Add event listeners for the swiper
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
    
    /**
     * Setup event listeners
     */
    setupEventListeners: function() {
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboardNavigation(e));
        
        // Pause autoplay on hover
        const heroContainer = document.querySelector('.hero-swiper');
        if (heroContainer && this.swiper) {
            heroContainer.addEventListener('mouseenter', () => {
                if (this.swiper.autoplay) {
                    this.swiper.autoplay.stop();
                }
            });
            
            heroContainer.addEventListener('mouseleave', () => {
                if (this.swiper.autoplay) {
                    this.swiper.autoplay.start();
                }
            });
        }
    },
    
    /**
     * Handle keyboard navigation
     */
    handleKeyboardNavigation: function(e) {
        if (!this.swiper) return;
        
        if (e.key === 'ArrowLeft') {
            this.swiper.slidePrev();
        } else if (e.key === 'ArrowRight') {
            this.swiper.slideNext();
        }
    },
    
    /**
     * Go to specific slide
     * @param {number} index - Slide index (0-based)
     */
    goToSlide: function(index) {
        if (this.swiper && index >= 0 && index < this.config.slides.length) {
            this.swiper.slideToLoop(index);
        }
    },
    
    /**
     * Start autoplay
     */
    startAutoplay: function() {
        if (this.swiper && this.swiper.autoplay) {
            this.swiper.autoplay.start();
        }
    },
    
    /**
     * Stop autoplay
     */
    stopAutoplay: function() {
        if (this.swiper && this.swiper.autoplay) {
            this.swiper.autoplay.stop();
        }
    },
    
    /**
     * Destroy swiper instance
     */
    destroy: function() {
        if (this.swiper) {
            this.swiper.destroy(true, true);
            this.swiper = null;
        }
    },
    
    /**
     * Get current slide index
     * @returns {number} Current slide index
     */
    getCurrentSlide: function() {
        return this.swiper ? this.swiper.realIndex : 0;
    }
};

// Initialize hero swiper when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    HeroSwiperManager.init();
});

// Make available globally
window.HeroSwiperManager = HeroSwiperManager;