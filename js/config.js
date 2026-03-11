/**
 * Portfolio Configuration
 *
 * This file contains all configuration settings for the portfolio website including
 * app information, contact details, external service configurations, feature flags,
 * and performance settings. It provides methods for configuration management and persistence.
 */

// Main portfolio configuration object
const PortfolioConfig = {
    // Application basic information
    app: {
        name: 'Portfolio',
        version: '1.0.0',
        author: 'Youness Eddanghiri',
        year: new Date().getFullYear()
    },

    // Contact information and social links
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

    // CV download links for different profiles
    cv: {
        webDeveloper: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        iotEngineer: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    },

    // External services configuration
    services: {
        // EmailJS service configuration
        emailjs: {
            serviceID: 'service_l953yi6',
            templateID: 'template_5aimrbz',
            publicKey: 'IbbG69TuO-Uyx_4I8'
        }
    },

    // Feature flags and toggles
    features: {
        heroSwiper: true,
        skillsModal: true,
        projectsSwiper: true,
        contactForm: true,
        mobileMenu: true,
        toastNotifications: true,

        // Animation settings
        animations: {
            enabled: true,
            duration: 300
        }
    },

    // Performance optimization settings
    performance: {
        // Lazy loading configuration
        lazyLoadImages: true,
        lazyLoadThreshold: 100,

        // Debounce settings for performance
        scrollDebounce: 100,
        resizeDebounce: 200,

        // Storage settings
        localStorageEnabled: true,
        sessionStorageEnabled: true
    },

    // Initialize configuration system
    init: function() {
        // Load saved settings from localStorage
        this.loadFromLocalStorage();
        // Set up event listener for configuration changes
        this.setupConfigUpdateListener();
        console.log('Portfolio configuration loaded');
    },

    // Load configuration from localStorage
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

    // Save current configuration to localStorage
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

    // Deep merge new configuration with existing configuration
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

    // Update configuration with new values
    update: function(updates, save = true) {
        // Merge the updates into current configuration
        this.mergeConfig(updates);

        if (save) {
            // Save to localStorage if requested
            this.saveToLocalStorage();
        }

        // Dispatch change event to notify other parts of the application
        this.dispatchChangeEvent();
    },

    // Dispatch custom event when configuration changes
    dispatchChangeEvent: function() {
        const event = new CustomEvent('portfolioConfigChanged', {
            detail: { config: this }
        });
        document.dispatchEvent(event);
    },

    // Set up event listener for configuration changes
    setupConfigUpdateListener: function() {
        document.addEventListener('portfolioConfigChanged', (event) => {
            console.log('Configuration changed:', event.detail);
        });
    },

    // Get contact information
    getContactInfo: function() {
        return { ...this.contact };
    },

    // Update contact information
    updateContactInfo: function(newContact) {
        this.contact = { ...this.contact, ...newContact };
        this.saveToLocalStorage();
    }
};

// Initialize configuration when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    PortfolioConfig.init();
});

// Make configuration available globally in browser environment
if (typeof window !== 'undefined') {
    window.PortfolioConfig = PortfolioConfig;
}