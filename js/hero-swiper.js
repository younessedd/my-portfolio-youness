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
                title: "Hello, I'm a <span>Junior Web Developer</span> <br>& IoT Maker",
                description: "I build modern web experiences and smart connected applications. My passion is turning ideas into reality using technology.",
                backgroundImage: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                buttons: [
                    { text: "View Web Apps", href: "#web-apps", class: "btn" },
                    { text: "Contact Me", href: "#contact", class: "btn btn-outline" },
                    { text: "Download CV", href: "#cv", class: "btn btn-secondary" }
                ]
            },
            {
                id: 2,
                title: "Creative <span>Problem Solver</span> & <br>Innovative Thinker",
                description: "Combining web development skills with IoT expertise to create cutting-edge solutions that bridge the digital and physical worlds.",
                backgroundImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                buttons: [
                    { text: "View IoT Projects", href: "#iot-projects", class: "btn" },
                    { text: "My Skills", href: "#skills", class: "btn btn-outline" },
                    { text: "Let's Collaborate", href: "#contact", class: "btn btn-secondary" }
                ]
            },
            {
                id: 3,
                title: "Electrical Engineer & <span>Automation Specialist</span>",
                description: "Expert in industrial electrical maintenance, control systems, and automation with hands-on experience in IoT integration.",
                backgroundImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                buttons: [
                    { text: "Mobile Apps", href: "#mobile-apps", class: "btn" },
                    { text: "IoT Projects", href: "#iot-projects", class: "btn btn-outline" },
                    { text: "Download CV", href: "#cv", class: "btn btn-secondary" }
                ]
            },
            {
                id: 4,
                title: "Passionate About <span>Technology</span> & <br>Continuous Learning",
                description: "Always exploring new technologies, frameworks, and methodologies to deliver innovative solutions that make a difference.",
                backgroundImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                buttons: [
                    { text: "Web Projects", href: "#web-apps", class: "btn" },
                    { text: "Hire Me", href: "#contact", class: "btn btn-outline" },
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
                        delay: 4000,
                    }
                },
                768: {
                    autoplay: {
                        delay: 5000,
                    }
                },
                1024: {
                    autoplay: {
                        delay: 6000,
                    }
                }
            },
            a11y: {
                prevSlideMessage: 'Previous slide',
                nextSlideMessage: 'Next slide',
                firstSlideMessage: 'This is the first slide',
                lastSlideMessage: 'This is the last slide',
            },
            on: {
                init: function() {
                    console.log('Hero swiper initialized');
                },
                slideChange: function() {
                    console.log('Slide changed to:', this.realIndex);
                }
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
        console.log('Hero swiper manager initialized');
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
        slideDiv.style.background = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${slide.backgroundImage}')`;
        
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
        
        this.swiper = new Swiper('.hero-swiper', this.config.swiperConfig);
        console.log('Swiper instance created');
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
                this.swiper.autoplay.stop();
                console.log('Autoplay paused');
            });
            
            heroContainer.addEventListener('mouseleave', () => {
                this.swiper.autoplay.start();
                console.log('Autoplay resumed');
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
            console.log('Previous slide (keyboard)');
        } else if (e.key === 'ArrowRight') {
            this.swiper.slideNext();
            console.log('Next slide (keyboard)');
        }
    },
    
    /**
     * Go to specific slide
     * @param {number} index - Slide index (0-based)
     */
    goToSlide: function(index) {
        if (this.swiper && index >= 0 && index < this.config.slides.length) {
            this.swiper.slideToLoop(index);
            console.log(`Navigated to slide ${index}`);
        }
    },
    
    /**
     * Start autoplay
     */
    startAutoplay: function() {
        if (this.swiper) {
            this.swiper.autoplay.start();
            console.log('Autoplay started');
        }
    },
    
    /**
     * Stop autoplay
     */
    stopAutoplay: function() {
        if (this.swiper) {
            this.swiper.autoplay.stop();
            console.log('Autoplay stopped');
        }
    },
    
    /**
     * Destroy swiper instance
     */
    destroy: function() {
        if (this.swiper) {
            this.swiper.destroy(true, true);
            this.swiper = null;
            console.log('Swiper destroyed');
        }
    },
    
    /**
     * Get current slide index
     * @returns {number} Current slide index
     */
    getCurrentSlide: function() {
        return this.swiper ? this.swiper.realIndex : 0;
    },
    
    /**
     * Add a new slide dynamically
     * @param {Object} slide - Slide data
     */
    addSlide: function(slide) {
        this.config.slides.push(slide);
        
        if (this.swiper) {
            const slideElement = this.createSlideElement(slide);
            this.swiper.appendSlide(slideElement);
            console.log('Slide added:', slide.title);
        }
    }
};

// Initialize hero swiper when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    HeroSwiperManager.init();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HeroSwiperManager;
}