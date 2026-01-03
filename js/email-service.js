/**
 * email-config.js - Email Configuration
 * ⚠️ CONTAINS SENSITIVE DATA - DO NOT UPLOAD TO GITHUB ⚠️
 * 
 * This file contains EmailJS configuration with sensitive API keys.
 * Make sure to add this file to .gitignore before committing.
 */

const emailConfig = {
    // ================================
    // 🔐 EmailJS Configuration - SENSITIVE DATA
    // ================================
    // Get these values from EmailJS dashboard: https://dashboard.emailjs.com/admin
    
    // Service ID (Your EmailJS service)
    serviceID: 'service_9a47m0s',
   
    
    // Template ID (Your email template)
    templateID: 'template_vlo4ub3',
    
    // Public Key (Your EmailJS public key)
    publicKey: 'IbbG69TuO-Uyx_4I8',
    
    // ================================
    // 📧 Email Settings
    // ================================
    // Your email address that will receive contact form messages
    toEmail: 'eddanguiryouness@gmail.com',
    
    // Sender name that appears in emails
    fromName: 'Portfolio Contact Form',
    
    // Default email subject
    subject: 'New Message from Portfolio Website',
    
    // Email reply-to address
    replyTo: 'no-reply@portfolio.com',
    
    // ================================
    // ⚠️ IMPORTANT WARNINGS
    // ================================
    // 1. This file contains sensitive API keys
    // 2. Add this file to .gitignore immediately
    // 3. Never share these keys with anyone
    // 4. If keys are compromised, regenerate them in EmailJS dashboard
    // 5. Use environment variables in production if possible
    
    // ================================
    // ✅ Configuration Validation
    // ================================
    
    /**
     * Validate the configuration
     * @returns {Object} Validation result
     */
    validate: function() {
        const errors = [];
        const warnings = [];
        
        // Check required fields
        if (!this.serviceID) errors.push('serviceID is missing');
        if (!this.templateID) errors.push('templateID is missing');
        if (!this.publicKey) errors.push('publicKey is missing');
        if (!this.toEmail) errors.push('toEmail is missing');
        
        // Check email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.toEmail && !emailRegex.test(this.toEmail)) {
            warnings.push('toEmail may not be a valid email address');
        }
        
        // Check if using example values
        if (this.publicKey.includes('example') || 
            this.serviceID.includes('example') || 
            this.templateID.includes('example')) {
            errors.push('You are using example values. Replace with your actual EmailJS credentials.');
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors,
            warnings: warnings,
            hasWarnings: warnings.length > 0
        };
    },
    
    /**
     * Test the configuration (for development)
     * @returns {Object} Test result
     */
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
    
    /**
     * Mask sensitive data for logging
     * @returns {Object} Safe configuration object for logging
     */
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

// ================================
// 🚀 Initialization
// ================================

// Test configuration when loaded
if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
        // Wait a moment for everything to load
        setTimeout(() => {
            const testResult = emailConfig.test();
            
            if (!testResult.success) {
                console.error('❌ Email configuration error:', testResult.details);
                
                // Show error toast if available
                if (typeof showToast === 'function') {
                    showToast('Email configuration error. Contact form may not work.', 'error');
                }
            }
        }, 1000);
    });
}

// ================================
// 📦 Export for Different Environments
// ================================

// For Node.js/CommonJS
if (typeof module !== 'undefined' && module.exports) {
    module.exports = emailConfig;
}

// For ES6 Modules
if (typeof exports !== 'undefined') {
    exports.default = emailConfig;
}

// For browser global scope
if (typeof window !== 'undefined') {
    window.emailConfig = emailConfig;
}

// ================================
// 🛡️ Security Reminder
// ================================
console.log('%c⚠️ SECURITY WARNING ⚠️', 'color: red; font-weight: bold; font-size: 14px;');
console.log('%cThis file contains sensitive API keys.', 'color: orange;');
console.log('%cMake sure email-config.js is in .gitignore!', 'color: orange; font-weight: bold;');