/**
 * theme.js - Theme Management بدون تأخير
 * الحل النهائي لمشكلة زر البرجر والرأس
 */

const ThemeManager = {
    LIGHT: 'light',
    DARK: 'dark',
    LIGHT_CLASS: 'theme-light',
    DARK_CLASS: 'theme-dark',
    STORAGE_KEY: 'portfolio-theme',
    
    // DOM Elements
    elements: {},
    
    /**
     * Initialize theme
     */
    init: function() {
        console.log('🎨 Theme Manager - Initializing');
        this.cacheElements();
        this.loadTheme();
        this.setupEventListeners();
    },
    
    /**
     * Cache DOM elements
     */
    cacheElements: function() {
        this.elements = {
            desktopToggle: document.getElementById('theme-toggle-desktop'),
            mobileToggle: document.getElementById('mobile-theme-toggle'),
            burgerBtn: document.getElementById('burger-btn'),
            mobileMenu: document.getElementById('mobile-menu'),
            header: document.querySelector('header')
        };
    },
    
    /**
     * Load saved theme
     */
    loadTheme: function() {
        const savedTheme = localStorage.getItem(this.STORAGE_KEY);
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        let theme = this.LIGHT;
        if (savedTheme) theme = savedTheme;
        else if (prefersDark) theme = this.DARK;
        
        this.applyTheme(theme, false);
        this.updateUI(theme);
    },
    
    /**
     * Apply theme without delay
     * @param {string} theme - 'light' or 'dark'
     * @param {boolean} isToggle - إذا كان تغيير ثيم من المستخدم
     */
    applyTheme: function(theme, isToggle = true) {
        // إضافة صنف لمنع الانتقالات
        if (isToggle) {
            document.body.classList.add('theme-changing');
        }
        
        // حفظ الانتقالات الحالية وتعطيلها مؤقتًا
        const originalTransitions = this.disableTransitions();
        
        // تغيير الثيم
        if (theme === this.DARK) {
            document.body.classList.remove(this.LIGHT_CLASS);
            document.body.classList.add(this.DARK_CLASS);
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.body.classList.remove(this.DARK_CLASS);
            document.body.classList.add(this.LIGHT_CLASS);
            document.documentElement.setAttribute('data-theme', 'light');
        }
        
        // حفظ في التخزين المحلي
        localStorage.setItem(this.STORAGE_KEY, theme);
        
        // إعادة تفعيل الانتقالات بعد التأكد من تطبيق الثيم
        setTimeout(() => {
            this.restoreTransitions(originalTransitions);
            if (isToggle) {
                setTimeout(() => {
                    document.body.classList.remove('theme-changing');
                }, 50);
            }
        }, 10);
        
        console.log('🎭 Theme applied:', theme);
    },
    
    /**
     * تعطيل الانتقالات مؤقتًا
     */
    disableTransitions: function() {
        const elements = [
            this.elements.header,
            this.elements.burgerBtn,
            this.elements.desktopToggle,
            this.elements.mobileToggle
        ];
        
        const originalTransitions = [];
        
        elements.forEach((element, index) => {
            if (element) {
                originalTransitions[index] = element.style.transition;
                element.style.transition = 'none';
            }
        });
        
        return { elements, originalTransitions };
    },
    
    /**
     * إعادة تفعيل الانتقالات
     */
    restoreTransitions: function(transitionData) {
        setTimeout(() => {
            transitionData.elements.forEach((element, index) => {
                if (element && transitionData.originalTransitions[index] !== undefined) {
                    element.style.transition = transitionData.originalTransitions[index];
                }
            });
        }, 0);
    },
    
    /**
     * Update UI elements
     */
    updateUI: function(theme) {
        const isDark = theme === this.DARK;
        const iconClass = isDark ? 'fas fa-sun' : 'fas fa-moon';
        const text = isDark ? 'Light Mode' : 'Dark Mode';
        
        // Update desktop toggle
        if (this.elements.desktopToggle) {
            const icon = this.elements.desktopToggle.querySelector('i');
            if (icon) icon.className = iconClass;
        }
        
        // Update mobile toggle
        if (this.elements.mobileToggle) {
            const icon = this.elements.mobileToggle.querySelector('i');
            if (icon) icon.className = iconClass;
            
            const textSpan = this.elements.mobileToggle.querySelector('span');
            if (textSpan) textSpan.textContent = text;
        }
    },
    
    /**
     * Setup event listeners
     */
    setupEventListeners: function() {
        // Desktop toggle
        if (this.elements.desktopToggle) {
            this.elements.desktopToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleTheme();
            });
        }
        
        // Mobile toggle
        if (this.elements.mobileToggle) {
            this.elements.mobileToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleTheme();
                
                // Close mobile menu
                if (this.elements.mobileMenu && this.elements.mobileMenu.classList.contains('active')) {
                    this.elements.mobileMenu.classList.remove('active');
                    if (this.elements.burgerBtn) {
                        const icon = this.elements.burgerBtn.querySelector('i');
                        if (icon) icon.className = 'fas fa-bars';
                    }
                    document.body.style.overflow = '';
                }
            });
        }
        
        // System theme change
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem(this.STORAGE_KEY)) {
                const theme = e.matches ? this.DARK : this.LIGHT;
                this.applyTheme(theme, false);
                this.updateUI(theme);
            }
        });
    },
    
    /**
     * Toggle theme
     */
    toggleTheme: function() {
        const isDark = document.body.classList.contains(this.DARK_CLASS);
        const newTheme = isDark ? this.LIGHT : this.DARK;
        
        this.applyTheme(newTheme, true);
        this.updateUI(newTheme);
        
        // Show toast
        if (typeof showToast === 'function') {
            showToast(`تم التبديل إلى وضع ${newTheme === 'dark' ? 'الداكن' : 'الفاتح'}`, 'success');
        }
    },
    
    /**
     * Get current theme
     */
    getCurrentTheme: function() {
        return document.body.classList.contains(this.DARK_CLASS) ? this.DARK : this.LIGHT;
    },
    
    /**
     * Force theme (for debugging)
     */
    forceTheme: function(theme) {
        if (theme === this.LIGHT || theme === this.DARK) {
            this.applyTheme(theme, false);
            this.updateUI(theme);
        }
    }
};

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ThemeManager.init());
} else {
    ThemeManager.init();
}

// Global access
window.ThemeManager = ThemeManager;