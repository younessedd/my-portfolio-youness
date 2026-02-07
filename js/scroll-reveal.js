/* ============================================
   SCROLL REVEAL ANIMATION SYSTEM
   Pure JavaScript (Intersection Observer API)
============================================ */

class ScrollReveal {
    constructor(options = {}) {
        this.options = {
            threshold: options.threshold || 0.1,
            rootMargin: options.rootMargin || '0px 0px -50px 0px',
            staggerDelay: options.staggerDelay || 100,
            ...options
        };
        
        this.elements = [];
        this.observer = null;
        this.init();
    }
    
    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }
    
    setup() {
        // Find all elements with reveal classes
        this.elements = document.querySelectorAll(`
            .reveal,
            .reveal.from-left,
            .reveal.from-right,
            .reveal.from-bottom,
            .reveal.from-top,
            .reveal.zoom,
            .reveal-stagger,
            .reveal-grid,
            .reveal-form,
            .cv-card
        `);
        
        if (this.elements.length === 0) {
            console.log('ScrollReveal: No elements found with reveal classes');
            return;
        }
        
        console.log(`ScrollReveal: Found ${this.elements.length} elements to animate`);
        
        // Create Intersection Observer for bidirectional animations
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                this.animateElement(entry.target, entry.isIntersecting);
            });
        }, {
            threshold: this.options.threshold,
            rootMargin: this.options.rootMargin
        });
        
        // Observe all elements
        this.elements.forEach(element => {
            this.observer.observe(element);
        });
    }
    
    animateElement(element, isIntersecting) {
        if (isIntersecting) {
            // Element is entering viewport - add active class
            element.classList.add('active');
            
            // Handle staggered animations for child elements
            if (element.classList.contains('reveal-stagger')) {
                this.animateStaggeredChildren(element, isIntersecting);
            } else if (element.classList.contains('reveal-grid')) {
                this.animateGridChildren(element, isIntersecting);
            } else if (element.classList.contains('reveal-form')) {
                this.animateFormChildren(element, isIntersecting);
            }
        } else {
            // Element is exiting viewport - remove active class for bidirectional animation
            element.classList.remove('active');
            
            // Handle staggered animations for child elements when exiting
            if (element.classList.contains('reveal-stagger')) {
                this.animateStaggeredChildren(element, isIntersecting);
            } else if (element.classList.contains('reveal-grid')) {
                this.animateGridChildren(element, isIntersecting);
            } else if (element.classList.contains('reveal-form')) {
                this.animateFormChildren(element, isIntersecting);
            }
        }
    }
    
    animateStaggeredChildren(parent, isIntersecting) {
        const children = parent.children;
        Array.from(children).forEach((child, index) => {
            if (isIntersecting) {
                setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                }, index * this.options.staggerDelay);
            } else {
                // Reset styles when element exits viewport
                child.style.opacity = '0';
                child.style.transform = 'translateY(30px)';
            }
        });
    }
    
    animateGridChildren(parent, isIntersecting) {
        const children = parent.children;
        Array.from(children).forEach((child, index) => {
            if (isIntersecting) {
                setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                }, index * (this.options.staggerDelay * 0.5));
            } else {
                // Reset styles when element exits viewport
                child.style.opacity = '0';
                child.style.transform = 'translateY(20px)';
            }
        });
    }
    
    animateFormChildren(parent, isIntersecting) {
        const formGroups = parent.querySelectorAll('.form-group');
        Array.from(formGroups).forEach((group, index) => {
            if (isIntersecting) {
                setTimeout(() => {
                    group.style.opacity = '1';
                    group.style.transform = 'translate(0)';
                }, index * (this.options.staggerDelay * 1.2));
            } else {
                // Reset styles when element exits viewport
                group.style.opacity = '0';
                if (index === 0) {
                    group.style.transform = 'translateX(-30px)';
                } else if (index === 1) {
                    group.style.transform = 'translateX(30px)';
                } else {
                    group.style.transform = 'translateY(20px)';
                }
            }
        });
    }
    
    // Public method to manually trigger animation for specific elements
    reveal(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            this.animateElement(element);
        });
    }
    
    // Public method to add new elements to be observed
    observe(selector) {
        const newElements = document.querySelectorAll(selector);
        newElements.forEach(element => {
            if (!this.elements.includes(element)) {
                this.elements.push(element);
                if (this.observer) {
                    this.observer.observe(element);
                }
            }
        });
    }
    
    // Cleanup method
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
        this.elements = [];
    }
}

// Initialize Scroll Reveal when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Create global instance
    window.scrollReveal = new ScrollReveal({
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
        staggerDelay: 100
    });
    
    console.log('ScrollReveal: Animation system initialized');
});

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ScrollReveal;
}
