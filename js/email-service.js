/**
 * email-service.js - Email Service Management
 * Handles EmailJS configuration, email sending, and email service utilities
 */

const EmailServiceManager = {
    // EmailJS configuration
    config: null,
    
    // Service state
    isInitialized: false,
    
    /**
     * Initialize email service
     */
    init: function() {
        this.loadConfig();
        
        if (this.config && this.config.publicKey) {
            this.initializeEmailJS();
            console.log('Email service manager initialized');
        } else {
            console.warn('EmailJS configuration not found. Email functionality will be disabled.');
        }
    },
    
    /**
     * Load email configuration
     */
    loadConfig: function() {
        // Try multiple sources for configuration
        
        // 1. From external config file (email-config.js)
        if (typeof window !== 'undefined' && window.emailConfig) {
            this.config = window.emailConfig;
            console.log('Email config loaded from window.emailConfig');
            return;
        }
        
        // 2. From module (if imported)
        if (typeof emailConfig !== 'undefined') {
            this.config = emailConfig;
            console.log('Email config loaded from emailConfig module');
            return;
        }
        
        // 3. From hardcoded values (fallback - should be in email-config.js)
        this.config = {
            serviceID: 'service_l953yi6',
            templateID: 'template_5aimrbz',
            publicKey: 'IbbG69TuO-Uyx_4I8',
            toEmail: 'eddanguiryouness@gmail.com',
            fromName: 'Portfolio Contact Form',
            subject: 'New Message from Portfolio'
        };
        
        console.warn('Using fallback email configuration. Consider creating email-config.js file.');
    },
    
    /**
     * Initialize EmailJS with public key
     */
    initializeEmailJS: function() {
        if (typeof emailjs === 'undefined') {
            console.error('EmailJS library not loaded');
            return;
        }
        
        if (!this.config.publicKey) {
            console.error('EmailJS public key not found in configuration');
            return;
        }
        
        try {
            emailjs.init(this.config.publicKey);
            this.isInitialized = true;
            console.log('EmailJS initialized successfully');
        } catch (error) {
            console.error('Failed to initialize EmailJS:', error);
            this.isInitialized = false;
        }
    },
    
    /**
     * Send email using EmailJS
     * @param {Object} data - Email data including name, email, message, etc.
     * @returns {Promise} Promise that resolves when email is sent
     */
    sendEmail: async function(data) {
        if (!this.isInitialized) {
            throw new Error('Email service is not initialized');
        }
        
        if (!this.config.serviceID || !this.config.templateID) {
            throw new Error('Email service configuration incomplete');
        }
        
        // Prepare template parameters
        const templateParams = this.prepareTemplateParams(data);
        
        try {
            const response = await emailjs.send(
                this.config.serviceID,
                this.config.templateID,
                templateParams
            );
            
            console.log('Email sent successfully:', response);
            return response;
            
        } catch (error) {
            console.error('Email sending failed:', error);
            throw this.parseEmailError(error);
        }
    },
    
    /**
     * Prepare template parameters for EmailJS
     * @param {Object} data - Form data
     * @returns {Object} Template parameters
     */
    prepareTemplateParams: function(data) {
        const now = new Date();
        const formattedTime = now.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
        });
        
        // Build the message with all contact information
        let fullMessage = data.message || '';
        
        if (data.phone) {
            fullMessage += `\n\nPhone: ${data.phone}`;
        }
        
        if (data.subject) {
            fullMessage += `\n\nSubject: ${data.subject}`;
        }
        
        return {
            to_email: this.config.toEmail || 'eddanguiryouness@gmail.com',
            from_name: data.name || 'Portfolio Visitor',
            from_email: data.email || 'no-reply@portfolio.com',
            reply_to: data.email || '',
            subject: data.subject || this.config.subject || 'New Message from Portfolio',
            message: fullMessage,
            timestamp: formattedTime,
            date: now.toLocaleDateString(),
            time: now.toLocaleTimeString(),
            ip_address: this.getClientIP(),
            user_agent: navigator.userAgent,
            page_url: window.location.href
        };
    },
    
    /**
     * Parse EmailJS error for user-friendly message
     * @param {Object} error - EmailJS error object
     * @returns {Error} Parsed error with user-friendly message
     */
    parseEmailError: function(error) {
        let userMessage = 'There was an error sending your message. Please try again later.';
        let technicalMessage = error.text || error.message || 'Unknown error';
        
        // Common EmailJS errors
        if (error.status === 0) {
            userMessage = 'Network error. Please check your internet connection and try again.';
        } else if (error.text && error.text.includes('Invalid login credentials')) {
            userMessage = 'Email service configuration error. Please contact the website administrator.';
        } else if (error.text && error.text.includes('Template not found')) {
            userMessage = 'Email template configuration error. Please contact the website administrator.';
        } else if (error.status === 400) {
            userMessage = 'Invalid request. Please check your information and try again.';
        } else if (error.status === 429) {
            userMessage = 'Too many requests. Please wait a few minutes and try again.';
        } else if (error.status >= 500) {
            userMessage = 'Server error. Please try again later or contact the website administrator.';
        }
        
        // Create new error with user-friendly message
        const parsedError = new Error(userMessage);
        parsedError.originalError = error;
        parsedError.technicalMessage = technicalMessage;
        parsedError.status = error.status;
        
        return parsedError;
    },
    
    /**
     * Get client IP address (approximate)
     * @returns {string} Client IP or 'unknown'
     */
    getClientIP: function() {
        // Note: This is a client-side approximation
        // Real IP should be obtained server-side
        return 'client-ip-not-available';
    },
    
    /**
     * Test email configuration
     * @returns {Promise} Test result
     */
    testConfiguration: async function() {
        if (!this.isInitialized) {
            return {
                success: false,
                message: 'Email service not initialized',
                details: 'Check if EmailJS is loaded and configured'
            };
        }
        
        const testData = {
            name: 'Test User',
            email: 'test@example.com',
            phone: '+212 600 000 000',
            message: 'This is a test message from the portfolio contact form.',
            subject: 'Test Message - Portfolio Contact Form'
        };
        
        try {
            const result = await this.sendEmail(testData);
            return {
                success: true,
                message: 'Email configuration test successful',
                details: result
            };
        } catch (error) {
            return {
                success: false,
                message: 'Email configuration test failed',
                details: error.message,
                technical: error.technicalMessage
            };
        }
    },
    
    /**
     * Validate email address format
     * @param {string} email - Email address to validate
     * @returns {boolean} True if email is valid
     */
    validateEmail: function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
    /**
     * Validate phone number format
     * @param {string} phone - Phone number to validate
     * @returns {boolean} True if phone is valid
     */
    validatePhone: function(phone) {
        if (!phone) return false;
        
        const cleanedPhone = phone.replace(/[\s\-()]/g, '');
        
        // Check if starts with + or 0
        if (!/^(\+|0)/.test(cleanedPhone)) {
            return false;
        }
        
        // Remove + or 0 prefix and check if remaining are digits
        const digits = cleanedPhone.replace(/^\+/, '').replace(/^0/, '');
        return /^\d+$/.test(digits) && digits.length >= 8 && digits.length <= 15;
    },
    
    /**
     * Get email configuration status
     * @returns {Object} Configuration status
     */
    getConfigStatus: function() {
        return {
            isInitialized: this.isInitialized,
            hasServiceID: !!this.config?.serviceID,
            hasTemplateID: !!this.config?.templateID,
            hasPublicKey: !!this.config?.publicKey,
            configSource: this.config ? 'loaded' : 'not loaded'
        };
    },
    
    /**
     * Update email configuration
     * @param {Object} newConfig - New configuration object
     */
    updateConfig: function(newConfig) {
        if (!newConfig || typeof newConfig !== 'object') {
            console.error('Invalid configuration object');
            return;
        }
        
        // Merge new configuration
        this.config = { ...this.config, ...newConfig };
        
        // Reinitialize if public key changed
        if (newConfig.publicKey && newConfig.publicKey !== this.config.publicKey) {
            this.initializeEmailJS();
        }
        
        console.log('Email configuration updated');
    },
    
    /**
     * Send automated response to user
     * @param {Object} userData - User data from contact form
     * @returns {Promise} Promise that resolves when response is sent
     */
    sendAutoResponse: async function(userData) {
        // This would require a separate template for auto-responses
        // For now, this is a placeholder for future implementation
        
        console.log('Auto-response would be sent to:', userData.email);
        return Promise.resolve({ status: 'not_implemented' });
    },
    
    /**
     * Log email sending attempt (for analytics)
     * @param {Object} data - Email data
     * @param {boolean} success - Whether email was sent successfully
     * @param {string} error - Error message if any
     */
    logEmailAttempt: function(data, success, error = null) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            success: success,
            to: this.config.toEmail,
            from: data.email,
            name: data.name,
            error: error,
            userAgent: navigator.userAgent,
            page: window.location.href
        };
        
        // In a real application, this would send to a logging service
        console.log('Email attempt logged:', logEntry);
        
        // Store in localStorage for debugging (limited to last 10 attempts)
        try {
            const logs = JSON.parse(localStorage.getItem('emailLogs') || '[]');
            logs.unshift(logEntry);
            
            // Keep only last 10 entries
            if (logs.length > 10) {
                logs.pop();
            }
            
            localStorage.setItem('emailLogs', JSON.stringify(logs));
        } catch (e) {
            console.warn('Could not save email log:', e);
        }
    }
};

// Initialize email service when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    EmailServiceManager.init();
    
    // Test configuration on load (optional - remove in production)
    // EmailServiceManager.testConfiguration().then(result => {
    //     console.log('Email config test:', result);
    // });
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EmailServiceManager;
}