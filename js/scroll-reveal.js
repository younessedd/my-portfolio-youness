/**
 * Scroll Reveal Animation System
 *
 * This class implements a scroll-based reveal animation system using the Intersection Observer API.
 * It provides smooth animations for elements as they enter and exit the viewport.
 * Supports various animation types including staggered animations, grid animations, and form animations.
 *
 * Features:
 * - Bidirectional animations (elements animate in and out)
 * - Staggered animations for child elements
 * - Grid animations for portfolio layouts
 * - Form field animations
 * - Configurable thresholds and delays
 */

// Main ScrollReveal class for managing scroll-based animations
class ScrollReveal {
    // Constructor accepts configuration options
    constructor(options = {}) {
        // Merge default options with provided options
        this.options = {
            // Intersection threshold (0.1 = 10% of element visible)
            threshold: options.threshold || 0.1,
            // Root margin for triggering animations before elements are fully visible
            rootMargin: options.rootMargin || '0px 0px -50px 0px',
            // Delay between staggered animations in milliseconds
            staggerDelay: options.staggerDelay || 100,
            // Spread any additional options
            ...options
        };

        // Array to store elements being observed
        this.elements = [];
        // IntersectionObserver instance
        this.observer = null;
        // Initialize the animation system
        this.init();
    }

    // Initialize the scroll reveal system
    init() {
        // Wait for DOM to be fully loaded before setting up
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            // DOM is already loaded, set up immediately
            this.setup();
        }
    }

    // Set up the Intersection Observer and find elements to animate
    setup() {
        // Find all elements with reveal classes using CSS selectors
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

        // Exit if no elements found to animate
        if (this.elements.length === 0) {
            console.log('ScrollReveal: No elements found with reveal classes');
            return;
        }

        // Log number of elements found for debugging
        console.log(`ScrollReveal: Found ${this.elements.length} elements to animate`);

        // Create Intersection Observer for bidirectional animations
        this.observer = new IntersectionObserver((entries) => {
            // Process each intersection change
            entries.forEach(entry => {
                this.animateElement(entry.target, entry.isIntersecting);
            });
        }, {
            // Use configured threshold for intersection detection
            threshold: this.options.threshold,
            // Use configured root margin
            rootMargin: this.options.rootMargin
        });

        // Start observing all found elements
        this.elements.forEach(element => {
            this.observer.observe(element);
        });
    }

    // Animate individual element based on intersection state
    animateElement(element, isIntersecting) {
        if (isIntersecting) {
            // Element is entering viewport - add active class to trigger CSS animations
            element.classList.add('active');

            // Handle different animation types for child elements
            if (element.classList.contains('reveal-stagger')) {
                // Animate children with staggered timing
                this.animateStaggeredChildren(element, isIntersecting);
            } else if (element.classList.contains('reveal-grid')) {
                // Animate grid children
                this.animateGridChildren(element, isIntersecting);
            } else if (element.classList.contains('reveal-form')) {
                // Animate form elements
                this.animateFormChildren(element, isIntersecting);
            }
        } else {
            // Element is exiting viewport - remove active class for bidirectional animation
            element.classList.remove('active');

            // Reset child animations when exiting viewport
            if (element.classList.contains('reveal-stagger')) {
                this.animateStaggeredChildren(element, isIntersecting);
            } else if (element.classList.contains('reveal-grid')) {
                this.animateGridChildren(element, isIntersecting);
            } else if (element.classList.contains('reveal-form')) {
                this.animateFormChildren(element, isIntersecting);
            }
        }
    }

    // Animate children with staggered timing (one after another)
    animateStaggeredChildren(parent, isIntersecting) {
        // Get all child elements
        const children = parent.children;
        // Convert HTMLCollection to Array for forEach support
        Array.from(children).forEach((child, index) => {
            if (isIntersecting) {
                // Element entering viewport - animate in with delay
                setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                }, index * this.options.staggerDelay);
            } else {
                // Element exiting viewport - reset to initial state
                child.style.opacity = '0';
                child.style.transform = 'translateY(30px)';
            }
        });
    }

    // Animate grid children with faster staggered timing
    animateGridChildren(parent, isIntersecting) {
        const children = parent.children;
        Array.from(children).forEach((child, index) => {
            if (isIntersecting) {
                // Faster animation for grid layouts
                setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                }, index * (this.options.staggerDelay * 0.5));
            } else {
                // Reset grid children
                child.style.opacity = '0';
                child.style.transform = 'translateY(20px)';
            }
        });
    }

    // Animate form children with varied entrance directions
    animateFormChildren(parent, isIntersecting) {
        // Get all form groups within the parent
        const formGroups = parent.querySelectorAll('.form-group');
        Array.from(formGroups).forEach((group, index) => {
            if (isIntersecting) {
                // Animate form groups in with delay
                setTimeout(() => {
                    group.style.opacity = '1';
                    group.style.transform = 'translate(0)';
                }, index * (this.options.staggerDelay * 1.2));
            } else {
                // Reset form groups with varied exit directions
                group.style.opacity = '0';
                if (index === 0) {
                    // First form group exits to the left
                    group.style.transform = 'translateX(-30px)';
                } else if (index === 1) {
                    // Second form group exits to the right
                    group.style.transform = 'translateX(30px)';
                } else {
                    // Other form groups exit downward
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
            // Only add if not already being observed
            if (!this.elements.includes(element)) {
                this.elements.push(element);
                if (this.observer) {
                    this.observer.observe(element);
                }
            }
        });
    }

    // Cleanup method to disconnect observer and clear references
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
    // Create global instance with custom configuration
    window.scrollReveal = new ScrollReveal({
        // Trigger when 10% of element is visible
        threshold: 0.1,
        // Trigger 50px before element enters viewport
        rootMargin: '0px 0px -50px 0px',
        // 100ms delay between staggered animations
        staggerDelay: 100
    });

    console.log('ScrollReveal: Animation system initialized');
});

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ScrollReveal;
}
