/**
 * Email Service Configuration
 *
 * This file contains EmailJS utilities for sending emails from the contact form.
 * For production deployment, configuration is embedded here.
 * For local development, use email-config.js (which should be in .gitignore).
 */

// Import email configuration from separate file or use embedded config
let emailConfig;

// Try to load configuration from email-config.js (for local development)
try {
    if (typeof require !== 'undefined') {
        // Node.js environment
        emailConfig = require('./email-config.js');
    } else if (typeof window !== 'undefined' && window.emailConfig) {
        // Browser environment - config loaded from email-config.js script
        emailConfig = window.emailConfig;
    } else {
        throw new Error('Using embedded configuration');
    }
} catch (error) {
    // Embedded configuration for production deployment
    console.log('📧 Using embedded email configuration for production');
    
    emailConfig = {
        // ================================
        // 🔐 EmailJS Configuration
        // ================================
        serviceID: 'service_9a47m0s',
        templateID: 'template_vlo4ub3',
        publicKey: 'IbbG69TuO-Uyx_4I8',
        
        // ================================
        // 📧 Email Settings
        // ================================
        toEmail: 'eddanguiryouness@gmail.com',
        fromName: 'Portfolio Contact Form',
        subject: 'New Message from Portfolio Website',
        replyTo: 'no-reply@portfolio.com',
        
        // ================================
        // ✅ Validation
        // ================================
        validate: function() {
            const errors = [];
            const warnings = [];
            
            if (!this.serviceID) errors.push('serviceID is missing');
            if (!this.templateID) errors.push('templateID is missing');
            if (!this.publicKey) errors.push('publicKey is missing');
            if (!this.toEmail) errors.push('toEmail is missing');
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.toEmail && !emailRegex.test(this.toEmail)) {
                warnings.push('toEmail may not be a valid email address');
            }
            
            return {
                isValid: errors.length === 0,
                errors: errors,
                warnings: warnings,
                hasWarnings: warnings.length > 0
            };
        },
        
        test: function() {
            const validation = this.validate();
            
            if (!validation.isValid) {
                return {
                    success: false,
                    message: 'Configuration is invalid',
                    details: validation.errors
                };
            }
            
            console.log('✅ Email configuration loaded successfully');
            console.log('Service ID:', this.serviceID ? '✓ Loaded' : '✗ Missing');
            console.log('Template ID:', this.templateID ? '✓ Loaded' : '✗ Missing');
            console.log('Public Key:', this.publicKey ? '✓ Loaded' : '✗ Missing');
            console.log('To Email:', this.toEmail ? '✓ Loaded' : '✗ Missing');
            
            if (validation.hasWarnings) {
                console.warn('⚠️ Configuration warnings:', validation.warnings);
            }
            
            return {
                success: true,
                message: 'Configuration is valid',
                warnings: validation.warnings
            };
        },
        
        getSafeConfig: function() {
            return {
                serviceID: this.serviceID ? '***' + this.serviceID.slice(-4) : 'Missing',
                templateID: this.templateID ? '***' + this.templateID.slice(-4) : 'Missing',
                publicKey: this.publicKey ? '***' + this.publicKey.slice(-4) : 'Missing',
                toEmail: this.toEmail || 'Missing',
                fromName: this.fromName || 'Missing',
                subject: this.subject || 'Missing'
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