/**
 * contact-form.js - Contact Form Management
 * Handles form validation, submission, and error messages
 */

const ContactFormManager = {
    // DOM Elements
    elements: {
        form: null,
        nameInput: null,
        emailInput: null,
        phoneInput: null,
        messageInput: null,
        submitBtn: null,
        errorElements: {}
    },
    
    // Form validation rules
    validationRules: {
        name: {
            minLength: 3,
            maxLength: 100,
            required: true
        },
        email: {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            required: true
        },
        phone: {
            pattern: /^[\+]?[0-9\s\-\(\)]{8,20}$/,
            required: true
        },
        message: {
            minLength: 10,
            maxLength: 2000,
            required: true
        }
    },
    
    // Form state
    isSubmitting: false,
    
    /**
     * Initialize contact form
     */
    init: function() {
        this.cacheElements();
        this.setupEventListeners();
        console.log('Contact form manager initialized');
    },
    
    /**
     * Cache DOM elements
     */
    cacheElements: function() {
        this.elements.form = document.getElementById('contactForm');
        this.elements.nameInput = document.getElementById('name');
        this.elements.emailInput = document.getElementById('email');
        this.elements.phoneInput = document.getElementById('phone');
        this.elements.messageInput = document.getElementById('message');
        this.elements.submitBtn = this.elements.form?.querySelector('button[type="submit"]');
        
        // Cache error elements
        this.elements.errorElements = {
            name: document.getElementById('nameError'),
            email: document.getElementById('emailError'),
            phone: document.getElementById('phoneError'),
            message: document.getElementById('messageError')
        };
    },
    
    /**
     * Setup event listeners
     */
    setupEventListeners: function() {
        if (!this.elements.form) return;
        
        // Form submission
        this.elements.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        this.elements.nameInput?.addEventListener('input', () => this.validateName());
        this.elements.emailInput?.addEventListener('input', () => this.validateEmail());
        this.elements.phoneInput?.addEventListener('input', () => this.validatePhone());
        this.elements.messageInput?.addEventListener('input', () => this.validateMessage());
        
        // Form reset
        this.elements.form.addEventListener('reset', () => this.resetForm());
    },
    
    /**
     * Handle form submission
     * @param {Event} e - Form submission event
     */
    handleSubmit: function(e) {
        e.preventDefault();
        
        if (this.isSubmitting) {
            console.log('Form is already submitting');
            return;
        }
        
        // Validate all fields
        const isValid = this.validateAll();
        
        if (isValid) {
            this.submitForm();
        } else {
            this.showError('Please fix the errors in the form before submitting.', 'error');
        }
    },
    
    /**
     * Validate all form fields
     * @returns {boolean} True if all fields are valid
     */
    validateAll: function() {
        const nameValid = this.validateName();
        const emailValid = this.validateEmail();
        const phoneValid = this.validatePhone();
        const messageValid = this.validateMessage();
        
        return nameValid && emailValid && phoneValid && messageValid;
    },
    
    /**
     * Validate name field
     * @returns {boolean} True if name is valid
     */
    validateName: function() {
        const name = this.elements.nameInput?.value.trim() || '';
        const rules = this.validationRules.name;
        
        if (!name && rules.required) {
            this.showFieldError('name', 'Name is required');
            return false;
        }
        
        if (name.length < rules.minLength) {
            this.showFieldError('name', `Name must be at least ${rules.minLength} characters`);
            return false;
        }
        
        if (name.length > rules.maxLength) {
            this.showFieldError('name', `Name must not exceed ${rules.maxLength} characters`);
            return false;
        }
        
        this.hideFieldError('name');
        return true;
    },
    
    /**
     * Validate email field
     * @returns {boolean} True if email is valid
     */
    validateEmail: function() {
        const email = this.elements.emailInput?.value.trim() || '';
        const rules = this.validationRules.email;
        
        if (!email && rules.required) {
            this.showFieldError('email', 'Email is required');
            return false;
        }
        
        if (email && !rules.pattern.test(email)) {
            this.showFieldError('email', 'Please enter a valid email address');
            return false;
        }
        
        this.hideFieldError('email');
        return true;
    },
    
    /**
     * Validate phone field
     * @returns {boolean} True if phone is valid
     */
    validatePhone: function() {
        const phone = this.elements.phoneInput?.value.trim() || '';
        const rules = this.validationRules.phone;
        
        if (!phone && rules.required) {
            this.showFieldError('phone', 'Phone number is required');
            return false;
        }
        
        if (phone && !rules.pattern.test(phone)) {
            this.showFieldError('phone', 'Please enter a valid phone number');
            return false;
        }
        
        this.hideFieldError('phone');
        return true;
    },
    
    /**
     * Validate message field
     * @returns {boolean} True if message is valid
     */
    validateMessage: function() {
        const message = this.elements.messageInput?.value.trim() || '';
        const rules = this.validationRules.message;
        
        if (!message && rules.required) {
            this.showFieldError('message', 'Message is required');
            return false;
        }
        
        if (message.length < rules.minLength) {
            this.showFieldError('message', `Message must be at least ${rules.minLength} characters`);
            return false;
        }
        
        if (message.length > rules.maxLength) {
            this.showFieldError('message', `Message must not exceed ${rules.maxLength} characters`);
            return false;
        }
        
        this.hideFieldError('message');
        return true;
    },
    
    /**
     * Show error for a specific field
     * @param {string} field - Field name
     * @param {string} message - Error message
     */
    showFieldError: function(field, message) {
        const errorElement = this.elements.errorElements[field];
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            errorElement.classList.add('show');
        }
        
        // Add error class to input
        const inputElement = this.elements[`${field}Input`];
        if (inputElement) {
            inputElement.classList.add('error');
        }
    },
    
    /**
     * Hide error for a specific field
     * @param {string} field - Field name
     */
    hideFieldError: function(field) {
        const errorElement = this.elements.errorElements[field];
        if (errorElement) {
            errorElement.style.display = 'none';
            errorElement.classList.remove('show');
        }
        
        // Remove error class from input
        const inputElement = this.elements[`${field}Input`];
        if (inputElement) {
            inputElement.classList.remove('error');
        }
    },
    
    /**
     * Submit form data
     */
    submitForm: async function() {
        this.isSubmitting = true;
        
        // Save original button text
        const originalText = this.elements.submitBtn?.innerHTML || '';
        
        // Update button to show loading state
        if (this.elements.submitBtn) {
            this.elements.submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            this.elements.submitBtn.disabled = true;
        }
        
        try {
            // Prepare form data
            const formData = {
                name: this.elements.nameInput?.value.trim() || '',
                email: this.elements.emailInput?.value.trim() || '',
                phone: this.elements.phoneInput?.value.trim() || '',
                message: this.elements.messageInput?.value.trim() || '',
                time: new Date().toLocaleString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })
            };
            
            // Send email using EmailJS
            await this.sendEmail(formData);
            
            // Show success message
            this.showSuccess('Your message has been sent successfully! I will reply soon.');
            
            // Reset form
            this.resetForm();
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.handleSubmissionError(error);
            
        } finally {
            // Restore button state
            this.isSubmitting = false;
            
            if (this.elements.submitBtn) {
                this.elements.submitBtn.innerHTML = originalText;
                this.elements.submitBtn.disabled = false;
            }
        }
    },
    
    /**
     * Send email using EmailJS
     * @param {Object} formData - Form data to send
     */
    sendEmail: async function(formData) {
        // Check if EmailJS is available
        if (typeof emailjs === 'undefined') {
            throw new Error('EmailJS is not loaded');
        }
        
        // Get email configuration
        const emailConfig = this.getEmailConfig();
        
        if (!emailConfig || !emailConfig.publicKey) {
            throw new Error('Email configuration not found');
        }
        
        // Initialize EmailJS
        emailjs.init(emailConfig.publicKey);
        
        // Prepare template parameters
        const templateParams = {
            name: formData.name,
            email: formData.email,
            time: formData.time,
            message: `${formData.message}\n\nPhone: ${formData.phone}`
        };
        
        // Send email
        const response = await emailjs.send(
            emailConfig.serviceID,
            emailConfig.templateID,
            templateParams
        );
        
        console.log('Email sent successfully:', response);
        return response;
    },
    
    /**
     * Get email configuration
     * @returns {Object} Email configuration object
     */
    getEmailConfig: function() {
        // Try to get from window object (loaded from email-config.js)
        if (typeof window !== 'undefined' && window.emailConfig) {
            return window.emailConfig;
        }
        
        // Try to get from module
        if (typeof emailConfig !== 'undefined') {
            return emailConfig;
        }
        
        // Fallback to hardcoded values (should be in email-config.js)
        return {
            serviceID: 'service_l953yi6',
            templateID: 'template_5aimrbz',
            publicKey: 'IbbG69TuO-Uyx_4I8'
        };
    },
    
    /**
     * Handle submission error
     * @param {Error} error - Error object
     */
    handleSubmissionError: function(error) {
        let errorMessage = 'There was an error sending your message. Please try again later.';
        
        if (error.text && error.text.includes('Invalid login credentials')) {
            errorMessage = 'Email service configuration error. Please check your EmailJS settings.';
        } else if (error.status === 0) {
            errorMessage = 'Network error. Please check your internet connection.';
        } else if (error.text && error.text.includes('Template not found')) {
            errorMessage = 'Email template not found. Please check your template ID.';
        }
        
        this.showError(errorMessage, 'error');
    },
    
    /**
     * Show success message
     * @param {string} message - Success message
     */
    showSuccess: function(message) {
        if (typeof showToast === 'function') {
            showToast(message, 'success');
        } else {
            alert(message);
        }
    },
    
    /**
     * Show error message
     * @param {string} message - Error message
     * @param {string} type - Message type ('error', 'warning', 'info')
     */
    showError: function(message, type = 'error') {
        if (typeof showToast === 'function') {
            showToast(message, type);
        } else {
            alert(`Error: ${message}`);
        }
    },
    
    /**
     * Reset form to initial state
     */
    resetForm: function() {
        if (this.elements.form) {
            this.elements.form.reset();
        }
        
        // Hide all error messages
        Object.keys(this.elements.errorElements).forEach(field => {
            this.hideFieldError(field);
        });
        
        // Remove error classes from inputs
        Object.keys(this.elements).forEach(key => {
            if (key.endsWith('Input') && this.elements[key]) {
                this.elements[key].classList.remove('error');
            }
        });
        
        console.log('Form reset');
    },
    
    /**
     * Get form data as object
     * @returns {Object} Form data
     */
    getFormData: function() {
        return {
            name: this.elements.nameInput?.value.trim() || '',
            email: this.elements.emailInput?.value.trim() || '',
            phone: this.elements.phoneInput?.value.trim() || '',
            message: this.elements.messageInput?.value.trim() || ''
        };
    },
    
    /**
     * Set form data from object
     * @param {Object} data - Form data object
     */
    setFormData: function(data) {
        if (data.name && this.elements.nameInput) {
            this.elements.nameInput.value = data.name;
        }
        if (data.email && this.elements.emailInput) {
            this.elements.emailInput.value = data.email;
        }
        if (data.phone && this.elements.phoneInput) {
            this.elements.phoneInput.value = data.phone;
        }
        if (data.message && this.elements.messageInput) {
            this.elements.messageInput.value = data.message;
        }
    }
};

// Initialize contact form when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    ContactFormManager.init();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContactFormManager;
}