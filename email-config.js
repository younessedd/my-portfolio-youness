/**
 * email-config.js - Email Configuration
 * ⚠️ CONTAINS SENSITIVE DATA - DO NOT UPLOAD TO GITHUB ⚠️
 */

const emailConfig = {
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
        
        if (!this.serviceID) errors.push('serviceID is missing');
        if (!this.templateID) errors.push('templateID is missing');
        if (!this.publicKey) errors.push('publicKey is missing');
        if (!this.toEmail) errors.push('toEmail is missing');
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    },
    
    test: function() {
        const validation = this.validate();
        
        if (!validation.isValid) {
            console.error('❌ Email configuration error:', validation.errors);
            return {
                success: false,
                message: 'Configuration is invalid',
                details: validation.errors
            };
        }
        
        console.log('✅ Email configuration loaded successfully');
        console.log('Service ID:', this.serviceID);
        console.log('Template ID:', this.templateID);
        console.log('Public Key:', this.publicKey ? '✓ Loaded' : '✗ Missing');
        console.log('To Email:', this.toEmail);
        
        return {
            success: true,
            message: 'Configuration is valid'
        };
    }
};

// Test configuration when loaded
if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const testResult = emailConfig.test();
            
            if (!testResult.success) {
                console.error('❌ Email configuration error:', testResult.details);
                
                if (typeof showToast === 'function') {
                    showToast('Email configuration error. Contact form may not work.', 'error');
                }
            }
        }, 500);
    });
}

// Export for browser
if (typeof window !== 'undefined') {
    window.emailConfig = emailConfig;
}

console.log('%c⚠️ SECURITY WARNING ⚠️', 'color: red; font-weight: bold;');
console.log('%cThis file contains sensitive API keys.', 'color: orange;');