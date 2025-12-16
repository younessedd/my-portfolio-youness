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
        // EmailJS Configuration
        emailjs: {
            serviceID: 'service_l953yi6',
            templateID: 'template_5aimrbz',
            publicKey: 'IbbG69TuO-Uyx_4I8'
        }
    },
    
    // Feature Flags
    features: {
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
        lazyLoadThreshold: 100,
        
        // Debounce settings
        scrollDebounce: 100,
        resizeDebounce: 200,
        
        // Cache settings
        localStorageEnabled: true,
        sessionStorageEnabled: true
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
            const saveableConfig = {
                features: this.features,
                contact: this.contact
            };
            
            localStorage.setItem('portfolio-config', JSON.stringify(saveableConfig));
        } catch (error) {
            console.warn('Failed to save configuration to localStorage:', error);
        }
    },
    
    /**
     * Merge new configuration with existing
     * @param {Object} newConfig - New configuration to merge
     */
    mergeConfig: function(newConfig) {
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
        document.addEventListener('portfolioConfigChanged', (event) => {
            console.log('Configuration changed:', event.detail);
        });
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