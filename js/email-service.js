/**
 * Email Service Configuration
 *
 * This file contains EmailJS configuration and utilities for sending emails from the contact form.
 * It includes sensitive API keys, validation functions, and security warnings.
 * WARNING: This file contains sensitive data and should never be committed to version control.
 */

// EmailJS configuration object containing all necessary settings
const emailConfig = {

    // EmailJS service identifier from dashboard
    serviceID: 'service_9a47m0s',

    // EmailJS email template identifier
    templateID: 'template_vlo4ub3',

    // EmailJS public key for client-side authentication
    publicKey: 'IbbG69TuO-Uyx_4I8',

    // Recipient email address for contact form messages
    toEmail: 'eddanguiryouness@gmail.com',

    // Sender name that appears in email notifications
    fromName: 'Portfolio Contact Form',

    // Default subject line for contact form emails
    subject: 'New Message from Portfolio Website',

    // Reply-to email address for email responses
    replyTo: 'no-reply@portfolio.com',

    // Validate configuration settings and check for missing or invalid values
    validate: function() {
        // Arrays to collect validation errors and warnings
        const errors = [];
        const warnings = [];

        // Check that all required configuration fields are present
        if (!this.serviceID) errors.push('serviceID is missing');
        if (!this.templateID) errors.push('templateID is missing');
        if (!this.publicKey) errors.push('publicKey is missing');
        if (!this.toEmail) errors.push('toEmail is missing');

        // Validate email format using regular expression
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.toEmail && !emailRegex.test(this.toEmail)) {
            warnings.push('toEmail may not be a valid email address');
        }

        // Check if configuration is using example/placeholder values
        if (this.publicKey.includes('example') ||
            this.serviceID.includes('example') ||
            this.templateID.includes('example')) {
            errors.push('You are using example values. Replace with your actual EmailJS credentials.');
        }

        // Return validation results
        return {
            isValid: errors.length === 0,
            errors: errors,
            warnings: warnings,
            hasWarnings: warnings.length > 0
        };
    },

    // Test configuration and log results to console
    test: function() {
        // First validate the configuration
        const validation = this.validate();

        // If validation failed, return error result
        if (!validation.isValid) {
            return {
                success: false,
                message: 'Configuration is invalid',
                details: validation.errors
            };
        }

        // Log successful configuration load
        console.log('✅ Email configuration loaded successfully');
        console.log('Service ID:', this.serviceID ? '✓ Loaded' : '✗ Missing');
        console.log('Template ID:', this.templateID ? '✓ Loaded' : '✗ Missing');
        console.log('Public Key:', this.publicKey ? '✓ Loaded' : '✗ Missing');
        console.log('To Email:', this.toEmail ? '✓ Loaded' : '✗ Missing');

        // Log any warnings if present
        if (validation.hasWarnings) {
            console.warn('⚠️ Configuration warnings:', validation.warnings);
        }

        // Return success result with any warnings
        return {
            success: true,
            message: 'Configuration is valid',
            warnings: validation.warnings
        };
    },

    // Return a safe version of configuration with sensitive data masked for logging
    getSafeConfig: function() {
        return {
            // Mask service ID, showing only last 4 characters
            serviceID: this.serviceID ? '***' + this.serviceID.slice(-4) : 'Missing',
            // Mask template ID, showing only last 4 characters
            templateID: this.templateID ? '***' + this.templateID.slice(-4) : 'Missing',
            // Mask public key, showing only last 4 characters
            publicKey: this.publicKey ? '***' + this.publicKey.slice(-4) : 'Missing',
            toEmail: this.toEmail || 'Missing',
            fromName: this.fromName || 'Missing',
            subject: this.subject || 'Missing'
        };
    }
};

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