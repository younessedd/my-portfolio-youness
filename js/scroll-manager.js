/**
 * Scroll Manager - Comprehensive Scroll Control System
 * Handles scroll locking for popups and smooth scrolling throughout the app
 */

class ScrollManager {
    constructor() {
        this.isLocked = false;
        this.scrollPosition = 0;
        this.scrollbarWidth = 0;
        this.lockedElements = new Set();
        
        // Performance optimization
        this.ticking = false;
        this.scrollHandlers = [];
        
        this.init();
    }
    
    init() {
        // Calculate scrollbar width once
        this.calculateScrollbarWidth();
        
        // Setup smooth scrolling for anchor links
        this.setupSmoothScrolling();
        
        // Setup scroll performance optimization
        this.setupScrollOptimization();
        
        // Setup mobile touch handling
        this.setupMobileTouchHandling();
        
        // Handle resize events
        window.addEventListener('resize', () => this.handleResize());
        
        console.log('🔄 Scroll Manager initialized');
    }
    
    /**
     * Calculate scrollbar width to prevent layout shift when locking scroll
     */
    calculateScrollbarWidth() {
        const outer = document.createElement('div');
        outer.style.visibility = 'hidden';
        outer.style.overflow = 'scroll';
        document.body.appendChild(outer);
        
        const inner = document.createElement('div');
        outer.appendChild(inner);
        
        this.scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
        outer.parentNode.removeChild(outer);
    }
    
    /**
     * Lock body scroll when popup opens
     * @param {string} popupId - ID of the popup that's locking scroll
     */
    lockScroll(popupId = 'default') {
        // Only lock scroll for mobile menu, not for popups
        if (popupId !== 'mobile-menu') {
            console.log(`📱 Popup ${popupId} opened - scroll remains enabled`);
            return;
        }
        
        if (this.isLocked && this.lockedElements.has(popupId)) {
            return; // Already locked by this popup
        }
        
        // Store current scroll position
        this.scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add to locked elements set
        this.lockedElements.add(popupId);
        
        if (!this.isLocked) {
            // Lock the scroll
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.top = `-${this.scrollPosition}px`;
            document.body.style.width = '100%';
            document.body.style.paddingRight = `${this.scrollbarWidth}px`;
            
            // Add CSS class for additional mobile touch handling
            document.body.classList.add('scroll-locked');
            
            // Add padding to fixed elements (like header) to prevent jump
            this.addPaddingToFixedElements();
            
            this.isLocked = true;
            console.log(`🔒 Scroll locked by: ${popupId}`);
        }
    }
    
    /**
     * Unlock body scroll when popup closes
     * @param {string} popupId - ID of the popup that's unlocking scroll
     */
    unlockScroll(popupId = 'default') {
        if (!this.lockedElements.has(popupId)) {
            return; // Not locked by this popup
        }
        
        // Remove from locked elements set
        this.lockedElements.delete(popupId);
        
        if (this.lockedElements.size === 0 && this.isLocked) {
            // Only unlock if no other popups are locking scroll
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.paddingRight = '';
            
            // Remove CSS class for mobile touch handling
            document.body.classList.remove('scroll-locked');
            
            // Remove padding from fixed elements
            this.removePaddingFromFixedElements();
            
            // Restore scroll position
            window.scrollTo(0, this.scrollPosition);
            
            this.isLocked = false;
            console.log(`🔓 Scroll unlocked by: ${popupId}`);
        } else {
            console.log(`🔒 Scroll remains locked by other popups`);
        }
    }
    
    /**
     * Add padding to fixed elements to compensate for scrollbar
     */
    addPaddingToFixedElements() {
        const fixedElements = document.querySelectorAll(
            'header, .fixed, [style*="position: fixed"], [style*="position:fixed"]'
        );
        
        fixedElements.forEach(element => {
            const currentPaddingRight = parseInt(window.getComputedStyle(element).paddingRight) || 0;
            element.style.paddingRight = `${currentPaddingRight + this.scrollbarWidth}px`;
            element.setAttribute('data-scroll-padding', 'true');
        });
    }
    
    /**
     * Remove padding from fixed elements
     */
    removePaddingFromFixedElements() {
        const paddedElements = document.querySelectorAll('[data-scroll-padding="true"]');
        
        paddedElements.forEach(element => {
            const currentPaddingRight = parseInt(window.getComputedStyle(element).paddingRight) || 0;
            element.style.paddingRight = `${currentPaddingRight - this.scrollbarWidth}px`;
            element.removeAttribute('data-scroll-padding');
        });
    }
    
    /**
     * Setup smooth scrolling for anchor links
     */
    setupSmoothScrolling() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (!link) return;
            
            e.preventDefault();
            
            const targetId = link.getAttribute('href').slice(1);
            const targetElement = document.getElementById(targetId);
            
            if (!targetElement) return;
            
            // Close any open mobile menu
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                const burgerBtn = document.getElementById('burger-btn');
                if (burgerBtn) {
                    burgerBtn.querySelector('i').className = 'fas fa-bars';
                }
                this.unlockScroll('mobile-menu');
            }
            
            // Calculate target position with header offset
            const header = document.querySelector('header');
            const headerHeight = header ? header.offsetHeight : 80;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            // Smooth scroll to target
            this.smoothScrollTo(targetPosition, 800);
        });
    }
    
    /**
     * Smooth scroll to position with easing
     * @param {number} targetY - Target scroll position
     * @param {number} duration - Animation duration in ms
     */
    smoothScrollTo(targetY, duration = 800) {
        const startY = window.pageYOffset;
        const distance = targetY - startY;
        let startTime = null;
        
        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Easing function (ease-out-cubic)
            const ease = 1 - Math.pow(1 - progress, 3);
            
            window.scrollTo(0, startY + (distance * ease));
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };
        
        requestAnimationFrame(animation);
    }
    
    /**
     * Setup scroll performance optimization
     */
    setupScrollOptimization() {
        let scrollTimer;
        
        window.addEventListener('scroll', () => {
            if (!this.ticking) {
                requestAnimationFrame(() => {
                    // Execute scroll handlers
                    this.scrollHandlers.forEach(handler => handler());
                    this.ticking = false;
                });
                this.ticking = true;
            }
            
            // Debounced scroll end event
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                this.onScrollEnd();
            }, 150);
        }, { passive: true });
    }
    
    /**
     * Setup mobile touch handling for popup scroll prevention
     */
    setupMobileTouchHandling() {
        let touchStartY = 0;
        let touchStartX = 0;
        let isPopupElement = false;
        
        // Touch start event
        document.addEventListener('touchstart', (e) => {
            // Only prevent touch if scroll is locked (mobile menu open)
            if (!this.isLocked) return;
            
            touchStartY = e.touches[0].clientY;
            touchStartX = e.touches[0].clientX;
            
            // Check if touch is on popup element
            isPopupElement = this.isTouchOnPopup(e.target);
            
            // Prevent default if not on popup AND scroll is locked
            if (!isPopupElement) {
                e.preventDefault();
            }
        }, { passive: false });
        
        // Touch move event
        document.addEventListener('touchmove', (e) => {
            // Only prevent touch if scroll is locked (mobile menu open)
            if (!this.isLocked) return;
            
            const touchY = e.touches[0].clientY;
            const touchX = e.touches[0].clientX;
            const deltaY = touchY - touchStartY;
            const deltaX = touchX - touchStartX;
            
            // Check if touch is on popup element
            const isOnPopup = this.isTouchOnPopup(e.target);
            
            // Allow vertical scrolling inside popup content
            if (isOnPopup && this.isScrollableElement(e.target)) {
                // Allow vertical scroll but prevent horizontal
                if (Math.abs(deltaX) > Math.abs(deltaY)) {
                    e.preventDefault();
                }
                return;
            }
            
            // Prevent all other touch movements when scroll is locked
            e.preventDefault();
        }, { passive: false });
        
        // Touch end event
        document.addEventListener('touchend', (e) => {
            // Only handle if scroll is locked
            if (!this.isLocked) return;
            
            // Reset touch tracking
            touchStartY = 0;
            touchStartX = 0;
            isPopupElement = false;
        }, { passive: true });
        
        console.log('📱 Mobile touch handling setup complete - only locks scroll for mobile menu');
    }
    
    /**
     * Check if touch is on popup element
     */
    isTouchOnPopup(element) {
        if (!element) return false;
        
        // Check if element or its parents are popup containers
        let currentElement = element;
        while (currentElement && currentElement !== document.body) {
            if (currentElement.classList.contains('popup-container') ||
                currentElement.classList.contains('swiper-container') ||
                currentElement.classList.contains('popup-overlay') ||
                currentElement.classList.contains('swiper-slide') ||
                currentElement.classList.contains('project-info')) {
                return true;
            }
            currentElement = currentElement.parentElement;
        }
        
        return false;
    }
    
    /**
     * Check if element is scrollable
     */
    isScrollableElement(element) {
        if (!element) return false;
        
        const style = window.getComputedStyle(element);
        const overflowY = style.overflowY;
        const overflowX = style.overflowX;
        const height = element.clientHeight;
        const scrollHeight = element.scrollHeight;
        const width = element.clientWidth;
        const scrollWidth = element.scrollWidth;
        
        // Check if element has scrollable content
        const isVerticallyScrollable = (overflowY === 'scroll' || overflowY === 'auto') && scrollHeight > height;
        const isHorizontallyScrollable = (overflowX === 'scroll' || overflowX === 'auto') && scrollWidth > width;
        
        return isVerticallyScrollable || isHorizontallyScrollable;
    }
    
    /**
     * Handle scroll end event
     */
    onScrollEnd() {
        // Update active navigation links
        this.updateActiveNavigation();
        
        // Trigger custom scroll end event
        document.dispatchEvent(new CustomEvent('scrollEnd'));
    }
    
    /**
     * Update active navigation links based on scroll position
     */
    updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-nav a');
        
        if (sections.length === 0 || navLinks.length === 0) return;
        
        let currentSection = '';
        const headerHeight = document.querySelector('header')?.offsetHeight || 80;
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - headerHeight - 100)) {
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
    
    /**
     * Add custom scroll handler
     * @param {Function} handler - Scroll handler function
     */
    addScrollHandler(handler) {
        if (typeof handler === 'function') {
            this.scrollHandlers.push(handler);
        }
    }
    
    /**
     * Remove custom scroll handler
     * @param {Function} handler - Scroll handler function to remove
     */
    removeScrollHandler(handler) {
        const index = this.scrollHandlers.indexOf(handler);
        if (index > -1) {
            this.scrollHandlers.splice(index, 1);
        }
    }
    
    /**
     * Handle window resize
     */
    handleResize() {
        // Recalculate scrollbar width if needed
        if (this.isLocked) {
            this.calculateScrollbarWidth();
            this.addPaddingToFixedElements();
        }
    }
    
    /**
     * Check if scroll is currently locked
     * @returns {boolean}
     */
    isScrollLocked() {
        return this.isLocked;
    }
    
    /**
     * Get current scroll position
     * @returns {number}
     */
    getCurrentScrollPosition() {
        return window.pageYOffset || document.documentElement.scrollTop;
    }
    
    /**
     * Scroll to top smoothly
     * @param {number} duration - Animation duration
     */
    scrollToTop(duration = 800) {
        this.smoothScrollTo(0, duration);
    }
    
    /**
     * Scroll to element smoothly
     * @param {string|Element} element - Element or selector to scroll to
     * @param {number} duration - Animation duration
     * @param {number} offset - Additional offset from element
     */
    scrollToElement(element, duration = 800, offset = 0) {
        const targetElement = typeof element === 'string' ? document.querySelector(element) : element;
        if (!targetElement) return;
        
        const headerHeight = document.querySelector('header')?.offsetHeight || 80;
        const targetPosition = targetElement.offsetTop - headerHeight - offset;
        
        this.smoothScrollTo(targetPosition, duration);
    }
    
    /**
     * Cleanup method
     */
    destroy() {
        this.scrollHandlers = [];
        this.lockedElements.clear();
        
        if (this.isLocked) {
            this.unlockScroll('cleanup');
        }
    }
}

// Create global instance
window.scrollManager = new ScrollManager();

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ScrollManager;
}

console.log('📜 scroll-manager.js loaded - Comprehensive scroll control system ready');
