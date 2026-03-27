/**
 * Email Service Configuration
 *
 * This file contains EmailJS utilities for sending emails from the contact form.
 * Sensitive configuration is loaded from email-config.js (which should be in .gitignore).
 */

// Import email configuration from separate file
// The actual email-config.js file should contain your real credentials
let emailConfig;

// Try to load configuration from email-config.js
try {
    if (typeof require !== 'undefined') {
        // Node.js environment
        emailConfig = require('./email-config.js');
    } else if (typeof window !== 'undefined' && window.emailConfig) {
        // Browser environment - config loaded from email-config.js script
        emailConfig = window.emailConfig;
    } else {
        throw new Error('Email configuration not found');
    }
} catch (error) {
    console.error('❌ Email configuration not found. Please create email-config.js from the template.');
    
    // Fallback configuration (will not work for actual email sending)
    emailConfig = {
        serviceID: 'MISSING',
        templateID: 'MISSING',
        publicKey: 'MISSING',
        toEmail: 'missing@example.com',
        fromName: 'Portfolio Contact Form',
        subject: 'New Message from Portfolio Website',
        replyTo: 'no-reply@portfolio.com',
        validate: function() {
            return {
                isValid: false,
                errors: ['Email configuration file not found or incomplete']
            };
        },
        test: function() {
            return {
                success: false,
                message: 'Email configuration not found',
                details: ['Please create email-config.js from email-config.template.js']
            };
        },
        getSafeConfig: function() {
            return {
                serviceID: 'Missing',
                templateID: 'Missing',
                publicKey: 'Missing',
                toEmail: 'Missing',
                fromName: 'Missing',
                subject: 'Missing'
            };
        }
    };
}

// Test configuration when the page loads (browser environment only)
if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
        // Wait a moment for all scripts to load
        setTimeout(() => {
            const testResult = emailConfig.test();

            // If configuration test failed, log error and show toast if available
            if (!testResult.success) {
                console.error('❌ Email configuration error:', testResult.details);

                // Show error toast if toast function is available
                if (typeof showToast === 'function') {
                    showToast('Email configuration error. Contact form may not work.', 'error');
                }
            }
        }, 1000);
    });
}

// Export configuration for different JavaScript environments

// Export for Node.js/CommonJS environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = emailConfig;
}

// Export for ES6 module environments
if (typeof exports !== 'undefined') {
    exports.default = emailConfig;
}

// Make configuration available globally in browser environment
if (typeof window !== 'undefined') {
    window.emailConfig = emailConfig;
}

// Security warning displayed in console to remind developers
console.log('%c⚠️ SECURITY WARNING ⚠️', 'color: red; font-weight: bold; font-size: 14px;');
console.log('%cThis file contains sensitive API keys.', 'color: orange;');
console.log('%cMake sure email-config.js is in .gitignore!', 'color: orange; font-weight: bold;');