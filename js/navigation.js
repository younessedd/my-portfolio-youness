/**
 * navigation.js - Navigation Management
 * SIMPLE & WORKING VERSION: Hamburger works on first click
 */

const NavigationManager = {
    // Initialize
    init: function() {
        console.log('🚀 Initializing Navigation...');
        this.setupHamburger();
        this.setupMobileLinks();
        this.setupThemeToggle();
        this.setupSmoothScroll();
        console.log('✅ Navigation Ready');
    },

    // 1. HAMBURGER - SIMPLE & WORKING
    setupHamburger: function() {
        const burgerBtn = document.getElementById('burger-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (!burgerBtn || !mobileMenu) {
            console.error('❌ Hamburger elements not found!');
            return;
        }
        
        console.log('🍔 Found hamburger elements');
        
        // SIMPLE CLICK HANDLER - WORKS ON FIRST CLICK
        burgerBtn.addEventListener('click', function(e) {
            console.log('🎯 Hamburger clicked!');
            e.stopPropagation();
            e.preventDefault();
            
            // Toggle menu
            mobileMenu.classList.toggle('active');
            
            // Toggle icon
            const icon = this.querySelector('i');
            if (icon) {
                icon.className = mobileMenu.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
            }
            
            // Toggle body scroll
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
            
            console.log('📱 Menu state:', mobileMenu.classList.contains('active') ? 'OPEN' : 'CLOSED');
        });
        
        // Close when clicking outside
        document.addEventListener('click', function(e) {
            if (mobileMenu.classList.contains('active') &&
                !mobileMenu.contains(e.target) &&
                !burgerBtn.contains(e.target)) {
                
                mobileMenu.classList.remove('active');
                burgerBtn.querySelector('i').className = 'fas fa-bars';
                document.body.style.overflow = '';
            }
        });
        
        // Close with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                burgerBtn.querySelector('i').className = 'fas fa-bars';
                document.body.style.overflow = '';
            }
        });
    },

    // 2. MOBILE LINKS - Close menu when clicked
    setupMobileLinks: function() {
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');
        
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                console.log('📱 Mobile link clicked:', this.textContent);
                
                // Close mobile menu
                const mobileMenu = document.getElementById('mobile-menu');
                const burgerBtn = document.getElementById('burger-btn');
                
                if (mobileMenu) mobileMenu.classList.remove('active');
                if (burgerBtn) burgerBtn.querySelector('i').className = 'fas fa-bars';
                document.body.style.overflow = '';
            });
        });
    },

    // 3. THEME TOGGLE - FIXED FOR MOBILE
    setupThemeToggle: function() {
        const themeToggleDesktop = document.getElementById('theme-toggle-desktop');
        const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
        
        const toggleTheme = () => {
            const isDark = document.body.classList.contains('theme-dark');
            const newTheme = isDark ? 'light' : 'dark';
            
            if (newTheme === 'dark') {
                document.body.classList.remove('theme-light');
                document.body.classList.add('theme-dark');
                document.documentElement.setAttribute('data-theme', 'dark');
            } else {
                document.body.classList.remove('theme-dark');
                document.body.classList.add('theme-light');
                document.documentElement.setAttribute('data-theme', 'light');
            }
            
            localStorage.setItem('portfolio-theme', newTheme);
            updateThemeUI(newTheme);
            
            if (typeof showToast === 'function') {
                showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`, 'success');
            }
        };
        
        const updateThemeUI = (theme) => {
            const isDark = theme === 'dark';
            const iconClass = isDark ? 'fas fa-sun' : 'fas fa-moon';
            const text = isDark ? 'Light Mode' : 'Dark Mode';
            
            const desktopIcon = document.querySelector('#theme-toggle-desktop i');
            if (desktopIcon) desktopIcon.className = iconClass;
            
            const mobileIcon = document.querySelector('#mobile-theme-toggle i');
            if (mobileIcon) mobileIcon.className = iconClass;
            
            const mobileText = document.querySelector('#mobile-theme-toggle span');
            if (mobileText) mobileText.textContent = text;
        };
        
        if (themeToggleDesktop) {
            themeToggleDesktop.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleTheme();
            });
        }
        
        if (mobileThemeToggle) {
            mobileThemeToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleTheme();
                
                // Close mobile menu after theme change
                const mobileMenu = document.getElementById('mobile-menu');
                const burgerBtn = document.getElementById('burger-btn');
                if (mobileMenu) mobileMenu.classList.remove('active');
                if (burgerBtn) burgerBtn.querySelector('i').className = 'fas fa-bars';
                document.body.style.overflow = '';
            });
        }
    },

    // 4. SMOOTH SCROLL
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

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => NavigationManager.init());
} else {
    NavigationManager.init();
}

// Emergency fix: Direct event binding as fallback
setTimeout(() => {
    const burgerBtn = document.getElementById('burger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (burgerBtn && mobileMenu) {
        console.log('⚡ Applying emergency hamburger fix...');
        
        // Force remove all existing events
        burgerBtn.onclick = null;
        
        // Add direct onclick
        burgerBtn.onclick = function(e) {
            e.stopPropagation();
            e.preventDefault();
            
            mobileMenu.classList.toggle('active');
            
            const icon = this.querySelector('i');
            if (icon) {
                icon.className = mobileMenu.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
            }
            
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
            
            console.log('⚡ Emergency fix: Menu toggled');
            return false;
        };
    }
}, 1000);