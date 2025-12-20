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
        title: "Développeur <span>Web Full Stack</span><br>Front-end & Back-end",
        description: "Je développe des applications web modernes et performantes avec HTML, CSS, JavaScript, React.js et Laravel.",
        backgroundImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        buttons: [
            { text: "Web Projects", href: "#web-apps", class: "btn" },
            { text: "Download CV", href: "#cv", class: "btn btn-secondary" }
        ]
    },
    {
        id: 2,
        title: "Développeur <span>Mobile</span><br>Android & Cross-Platform",
        description: "Création d’applications mobiles avec App Inventor, Kodular et Flutter (niveau débutant), orientées performance et simplicité.",
        backgroundImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        buttons: [
         { text: "Download CV", href: "#cv", class: "btn btn-secondary" },
            { text: "Mobile Apps", href: "#mobile-apps", class: "btn" }
           
     
        ]
    },
    {
        id: 3,
        title: "IoT & <span>Domotique</span><br>Smart Home • Arduino • ESP32",
        description: "Conception de systèmes IoT et domotiques pour maisons intelligentes, intégrant capteurs, actionneurs, automatisation et supervision à distance.",
        backgroundImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        buttons: [
            { text: "IoT Projects", href: "#iot-projects", class: "btn" },
            { text: "Download CV", href: "#cv", class: "btn btn-secondary" }
        
        ]
    },
    {
        id: 4,
        title: "Électricité, <span>Automatisation & Domotique</span>",
        description: "Technicien en électricité industrielle et domestique, automatisation et domotique, spécialisé en électronique analogique et numérique.",
        backgroundImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        buttons: [
          { text: "Contact Me", href: "#contact", class: "btn btn-outline" },
            { text: "View Skills", href: "#skills", class: "btn btn-secondary" }
        ]
    },
    {
        id: 5,
        title: "Maintenance <span>Électrique</span><br>Industrielle & Domotique",
        description: "Maintenance électrique industrielle, domestique et domotique : diagnostic, dépannage, amélioration et modernisation des installations.",
        backgroundImage: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        buttons: [
            { text: "View Skills", href: "#skills", class: "btn btn-secondary" },
            { text: "Contact Me", href: "#contact", class: "btn btn-outline" }
            
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