/**
 * theme.js - Theme Management
 * Handles light/dark theme switching, localStorage, and system preferences
 */

// Theme configuration
const ThemeManager = {
    // Theme names
    LIGHT: 'light',
    DARK: 'dark',
    
    // CSS class names
    LIGHT_CLASS: 'theme-light',
    DARK_CLASS: 'theme-dark',
    
    // LocalStorage key
    STORAGE_KEY: 'portfolio-theme',
    
    /**
     * Initialize theme on page load
     */
    init: function() {
        this.loadTheme();
        this.setupEventListeners();
        console.log('Theme manager initialized');
    },
    
    /**
     * Load theme from localStorage or system preference
     */
    loadTheme: function() {
        const savedTheme = localStorage.getItem(this.STORAGE_KEY);
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        let theme = this.LIGHT;
        
        if (savedTheme) {
            theme = savedTheme;
        } else if (prefersDark) {
            theme = this.DARK;
        }
        
        this.applyTheme(theme);
        this.updateUI(theme);
    },
    
    /**
     * Apply theme to the document
     * @param {string} theme - 'light' or 'dark'
     */
    applyTheme: function(theme) {
        if (theme === this.DARK) {
            document.body.classList.remove(this.LIGHT_CLASS);
            document.body.classList.add(this.DARK_CLASS);
        } else {
            document.body.classList.remove(this.DARK_CLASS);
            document.body.classList.add(this.LIGHT_CLASS);
        }
        
        localStorage.setItem(this.STORAGE_KEY, theme);
    },
    
    /**
     * Update UI elements based on theme
     * @param {string} theme - 'light' or 'dark'
     */
    updateUI: function(theme) {
        const isDark = theme === this.DARK;
        const iconClass = isDark ? 'fas fa-sun' : 'fas fa-moon';
        const text = isDark ? 'Light Mode' : 'Dark Mode';
        
        // Update desktop toggle
        const desktopIcon = document.querySelector('#theme-toggle-desktop i');
        if (desktopIcon) desktopIcon.className = iconClass;
        
        // Update mobile toggle
        const mobileIcon = document.querySelector('#mobile-theme-toggle i');
        if (mobileIcon) mobileIcon.className = iconClass;
        
        const mobileText = document.querySelector('#mobile-theme-toggle span');
        if (mobileText) mobileText.textContent = text;
    },
    
    /**
     * Toggle between light and dark theme
     */
    toggle: function() {
        const isDark = document.body.classList.contains(this.DARK_CLASS);
        const newTheme = isDark ? this.LIGHT : this.DARK;
        
        this.applyTheme(newTheme);
        this.updateUI(newTheme);
        
        // Show toast notification
        if (typeof showToast === 'function') {
            showToast(`Switched to ${newTheme === this.DARK ? 'Dark' : 'Light'} Mode`, 'success');
        }
        
        // Close mobile menu if open
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    },
    
    /**
     * Get current theme
     * @returns {string} Current theme ('light' or 'dark')
     */
    getCurrentTheme: function() {
        return document.body.classList.contains(this.DARK_CLASS) ? this.DARK : this.LIGHT;
    },
    
    /**
     * Check if dark theme is active
     * @returns {boolean} True if dark theme is active
     */
    isDark: function() {
        return this.getCurrentTheme() === this.DARK;
    },
    
    /**
     * Setup event listeners for theme toggles
     */
    setupEventListeners: function() {
        // Desktop toggle
        const desktopToggle = document.getElementById('theme-toggle-desktop');
        if (desktopToggle) {
            desktopToggle.addEventListener('click', () => this.toggle());
        }
        
        // Mobile toggle
        const mobileToggle = document.getElementById('mobile-theme-toggle');
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => this.toggle());
        }
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem(this.STORAGE_KEY)) {
                const theme = e.matches ? this.DARK : this.LIGHT;
                this.applyTheme(theme);
                this.updateUI(theme);
            }
        });
    },
    
    /**
     * Force a specific theme (for testing)
     * @param {string} theme - 'light' or 'dark'
     */
    setTheme: function(theme) {
        if (theme === this.LIGHT || theme === this.DARK) {
            this.applyTheme(theme);
            this.updateUI(theme);
        } else {
            console.error('Invalid theme:', theme);
        }
    }
};

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    ThemeManager.init();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeManager;
}