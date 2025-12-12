/**
 * config.js - Global Configuration
 * Contains global configuration settings for the portfolio
 */

const PortfolioConfig = {
    // Application Information
    app: {
        name: 'Portfolio',
        version: '1.0.0',
        author: 'Youness Eddanguir',
        year: new Date().getFullYear()
    },
    
    // Contact Information
    contact: {
        email: 'eddanguiryouness@gmail.com',
        phone: '+212 6 6483 7281',
        location: 'Morocco',
        whatsapp: 'https://wa.me/212664837281',
        github: 'https://github.com/younessedd',
        linkedin: 'https://www.linkedin.com/in/your-profile',
        twitter: 'https://twitter.com/yourusername',
        codepen: 'https://codepen.io/yourusername'
    },
    
    // CV Download Links
    cv: {
        webDeveloper: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        iotEngineer: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    },
    
    // External Services
    services: {
        // EmailJS Configuration (loaded from email-config.js)
        emailjs: {
            serviceID: 'service_l953yi6',
            templateID: 'template_5aimrbz',
            publicKey: 'IbbG69TuO-Uyx_4I8'
        },
        
        // CDN Links
        cdn: {
            fontAwesome: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
            swiperCSS: 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css',
            swiperJS: 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js',
            emailJS: 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js'
        }
    },
    
    // Feature Flags
    features: {
        // Enable/disable features
        heroSwiper: true,
        skillsModal: true,
        projectsSwiper: true,
        contactForm: true,
        themeToggle: true,
        mobileMenu: true,
        toastNotifications: true,
        
        // Animation settings
        animations: {
            enabled: true,
            duration: 300
        }
    },
    
    // Performance Settings
    performance: {
        // Lazy loading
        lazyLoadImages: true,
        lazyLoadThreshold: 100, // pixels from viewport
        
        // Debounce settings
        scrollDebounce: 100, // milliseconds
        resizeDebounce: 200, // milliseconds
        
        // Cache settings
        localStorageEnabled: true,
        sessionStorageEnabled: true
    },
    
    // Analytics (if implemented)
    analytics: {
        enabled: false,
        // Add your analytics configuration here
    },
    
    /**
     * Initialize configuration
     */
    init: function() {
        this.loadFromLocalStorage();
        this.setupConfigUpdateListener();
        console.log('Portfolio configuration loaded');
    },
    
    /**
     * Load configuration from localStorage
     */
    loadFromLocalStorage: function() {
        if (!this.performance.localStorageEnabled) return;
        
        try {
            const savedConfig = localStorage.getItem('portfolio-config');
            if (savedConfig) {
                const parsed = JSON.parse(savedConfig);
                this.mergeConfig(parsed);
                console.log('Configuration loaded from localStorage');
            }
        } catch (error) {
            console.warn('Failed to load configuration from localStorage:', error);
        }
    },
    
    /**
     * Save configuration to localStorage
     */
    saveToLocalStorage: function() {
        if (!this.performance.localStorageEnabled) return;
        
        try {
            // Only save user-modifiable settings
            const saveableConfig = {
                features: this.features,
                contact: this.contact
            };
            
            localStorage.setItem('portfolio-config', JSON.stringify(saveableConfig));
            console.log('Configuration saved to localStorage');
        } catch (error) {
            console.warn('Failed to save configuration to localStorage:', error);
        }
    },
    
    /**
     * Merge new configuration with existing
     * @param {Object} newConfig - New configuration to merge
     */
    mergeConfig: function(newConfig) {
        // Deep merge function
        const deepMerge = (target, source) => {
            for (const key in source) {
                if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                    if (!target[key]) target[key] = {};
                    deepMerge(target[key], source[key]);
                } else {
                    target[key] = source[key];
                }
            }
            return target;
        };
        
        deepMerge(this, newConfig);
    },
    
    /**
     * Update configuration
     * @param {Object} updates - Configuration updates
     * @param {boolean} save - Whether to save to localStorage
     */
    update: function(updates, save = true) {
        this.mergeConfig(updates);
        
        if (save) {
            this.saveToLocalStorage();
        }
        
        console.log('Configuration updated:', updates);
        
        // Dispatch configuration change event
        this.dispatchChangeEvent();
    },
    
    /**
     * Dispatch configuration change event
     */
    dispatchChangeEvent: function() {
        const event = new CustomEvent('portfolioConfigChanged', {
            detail: { config: this }
        });
        document.dispatchEvent(event);
    },
    
    /**
     * Setup configuration update listener
     */
    setupConfigUpdateListener: function() {
        // Listen for configuration change events
        document.addEventListener('portfolioConfigChanged', (event) => {
            console.log('Configuration changed:', event.detail);
        });
    },
    
    /**
     * Reset configuration to defaults
     */
    reset: function() {
        // Create a new instance with defaults
        const defaultConfig = new PortfolioConfig.constructor();
        
        // Merge defaults
        this.mergeConfig(defaultConfig);
        
        // Clear localStorage
        if (this.performance.localStorageEnabled) {
            localStorage.removeItem('portfolio-config');
        }
        
        console.log('Configuration reset to defaults');
        this.dispatchChangeEvent();
    },
    
    /**
     * Get configuration as JSON string
     * @returns {string} JSON string
     */
    toJSON: function() {
        return JSON.stringify(this, null, 2);
    },
    
    /**
     * Check if a feature is enabled
     * @param {string} featurePath - Dot notation path to feature
     * @returns {boolean} True if feature is enabled
     */
    isFeatureEnabled: function(featurePath) {
        const parts = featurePath.split('.');
        let value = this.features;
        
        for (const part of parts) {
            if (value[part] === undefined) {
                return false;
            }
            value = value[part];
        }
        
        return value === true;
    },
    
    /**
     * Enable/disable a feature
     * @param {string} featurePath - Dot notation path to feature
     * @param {boolean} enabled - Whether to enable the feature
     */
    setFeature: function(featurePath, enabled) {
        const parts = featurePath.split('.');
        let obj = this.features;
        
        // Navigate to the parent object
        for (let i = 0; i < parts.length - 1; i++) {
            if (!obj[parts[i]]) {
                obj[parts[i]] = {};
            }
            obj = obj[parts[i]];
        }
        
        // Set the value
        obj[parts[parts.length - 1]] = enabled;
        
        // Save and notify
        this.saveToLocalStorage();
        this.dispatchChangeEvent();
        
        console.log(`Feature ${featurePath} ${enabled ? 'enabled' : 'disabled'}`);
    },
    
    /**
     * Get contact information
     * @returns {Object} Contact information
     */
    getContactInfo: function() {
        return { ...this.contact };
    },
    
    /**
     * Update contact information
     * @param {Object} newContact - New contact information
     */
    updateContactInfo: function(newContact) {
        this.contact = { ...this.contact, ...newContact };
        this.saveToLocalStorage();
        console.log('Contact information updated');
    }
};

// Initialize configuration when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    PortfolioConfig.init();
});

// Make configuration available globally
if (typeof window !== 'undefined') {
    window.PortfolioConfig = PortfolioConfig;
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioConfig;
}