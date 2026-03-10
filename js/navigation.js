/**
 * navigation.js - Navigation Management
 * Optimized: Fixed event handling and mobile menu toggle
 */

/**
 * navigation.js - Navigation Management
 * Optimized: Fixed event handling and mobile menu toggle
 */

const NavigationManager = {
    init: function() {
        console.log('🚀 Navigation initialization...');
        this.setupHamburger();
        this.setupMobileLinks();
        this.setupSmoothScroll();
        console.log('✅ Navigation ready');
    },

    // 1. Hamburger menu - Simple and working
    setupHamburger: function() {
        const burgerBtn = document.getElementById('burger-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (!burgerBtn || !mobileMenu) {
            console.error('❌ Hamburger elements not found!');
            return;
        }
        
        console.log('🍔 Found hamburger elements');
        
        // Simple click handler - إصلاح: التبديل بين عرض وإخفاء mobile-menu
        burgerBtn.addEventListener('click', function(e) {
            console.log('🎯 Hamburger clicked!');
            e.stopPropagation();
            
            // Toggle menu - إصلاح: استخدام mobile-menu بدلاً من desktop-nav
            const isActive = mobileMenu.classList.toggle('active');
            
            // Toggle icon
            const icon = this.querySelector('i');
            if (icon) {
                icon.className = isActive ? 'fas fa-times' : 'fas fa-bars';
            }
            
            console.log('📱 Menu state:', isActive ? 'OPEN' : 'CLOSED');
        });
        
        // Close when clicking outside
        document.addEventListener('click', function(e) {
            if (mobileMenu.classList.contains('active') &&
                !mobileMenu.contains(e.target) &&
                !burgerBtn.contains(e.target)) {
                
                mobileMenu.classList.remove('active');
                burgerBtn.querySelector('i').className = 'fas fa-bars';
            }
        });
        
        // Close with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                burgerBtn.querySelector('i').className = 'fas fa-bars';
            }
        });
    },

    // 2. Mobile links - Close menu on click
    setupMobileLinks: function() {
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');
        
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                console.log('📱 Mobile link clicked:', this.textContent);
                
                const mobileMenu = document.getElementById('mobile-menu');
                const burgerBtn = document.getElementById('burger-btn');
                
                if (mobileMenu) mobileMenu.classList.remove('active');
                if (burgerBtn) burgerBtn.querySelector('i').className = 'fas fa-bars';
            });
        });
    },

    // 3. Smooth scrolling
    setupSmoothScroll: function() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href === '#' || href === '') return;
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    
                    const headerHeight = document.querySelector('header').offsetHeight || 80;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    history.pushState(null, null, href);
                    
                    // Close mobile menu if open
                    const mobileMenu = document.getElementById('mobile-menu');
                    const burgerBtn = document.getElementById('burger-btn');
                    if (mobileMenu && mobileMenu.classList.contains('active')) {
                        mobileMenu.classList.remove('active');
                        if (burgerBtn) burgerBtn.querySelector('i').className = 'fas fa-bars';
                        document.body.style.overflow = '';
                    }
                }
            });
        });
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => NavigationManager.init());
} else {
    NavigationManager.init();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => NavigationManager.init());
} else {
    NavigationManager.init();
}