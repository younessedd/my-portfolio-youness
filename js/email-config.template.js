/**
 * Email Configuration Template
 * 
 * Copy this file to email-config.js and fill in your actual EmailJS credentials.
 * NEVER commit the actual email-config.js file with your real API keys!
 */

const emailConfig = {
    // ================================
    // 🔐 EmailJS Configuration
    // ================================
    serviceID: 'YOUR_SERVICE_ID',
    templateID: 'YOUR_TEMPLATE_ID',
    publicKey: 'YOUR_PUBLIC_KEY',
    
    // ================================
    // 📧 Email Settings
    // ================================
    toEmail: 'your-email@example.com',
    fromName: 'Portfolio Contact Form',
    subject: 'New Message from Portfolio Website',
    replyTo: 'no-reply@portfolio.com',
    
    // ================================
    // ✅ Validation
    // ================================
    validate: function() {
        const errors = [];
        
        if (!this.serviceID || this.serviceID === 'YOUR_SERVICE_ID') errors.push('serviceID is missing or still set to placeholder');
        if (!this.templateID || this.templateID === 'YOUR_TEMPLATE_ID') errors.push('templateID is missing or still set to placeholder');
        if (!this.publicKey || this.publicKey === 'YOUR_PUBLIC_KEY') errors.push('publicKey is missing or still set to placeholder');
        if (!this.toEmail || this.toEmail === 'your-email@example.com') errors.push('toEmail is missing or still set to placeholder');
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }
};

// Export for browser
if (typeof window !== 'undefined') {
    window.emailConfig = emailConfig;
}

console.log('%c⚠️ CONFIGURATION NEEDED ⚠️', 'color: orange; font-weight: bold;');
console.log('%cCopy email-config.template.js to email-config.js and add your actual credentials', 'color: orange;');
