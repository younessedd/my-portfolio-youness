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
            pattern: /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/,
            required: true
        },
        message: {
            minLength: 5,
            maxLength: 10000,
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
        this.initializeTextarea();
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
        this.elements.messageInput?.addEventListener('input', () => {
            this.validateMessage();
            this.autoResizeTextarea();
        });
        
        // Auto-resize textarea on paste
        this.elements.messageInput?.addEventListener('paste', () => {
            setTimeout(() => this.autoResizeTextarea(), 10);
        });
        
        // Auto-resize on cut
        this.elements.messageInput?.addEventListener('cut', () => {
            setTimeout(() => this.autoResizeTextarea(), 10);
        });
        
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
            this.showFieldError('name', 'Please enter your name');
            this.removeSuccessState('name');
            return false;
        }
        
        if (name.length < rules.minLength) {
            this.showFieldError('name', 'Name is too short');
            this.removeSuccessState('name');
            return false;
        }
        
        if (name.length > rules.maxLength) {
            this.showFieldError('name', 'Name is too long');
            this.removeSuccessState('name');
            return false;
        }
        
        this.hideFieldError('name');
        this.addSuccessState('name');
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
            this.showFieldError('email', 'Please enter your email');
            this.removeSuccessState('email');
            return false;
        }
        
        if (email && !rules.pattern.test(email)) {
            this.showFieldError('email', 'Invalid email address');
            this.removeSuccessState('email');
            return false;
        }
        
        this.hideFieldError('email');
        this.addSuccessState('email');
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
            this.showFieldError('phone', 'Please enter your phone number');
            this.removeSuccessState('phone');
            return false;
        }
        
        if (phone && !rules.pattern.test(phone)) {
            this.showFieldError('phone', 'Invalid phone number');
            this.removeSuccessState('phone');
            return false;
        }
        
        this.hideFieldError('phone');
        this.addSuccessState('phone');
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
            this.showFieldError('message', 'Please enter your message');
            this.removeSuccessState('message');
            return false;
        }
        
        if (message.length < rules.minLength) {
            this.showFieldError('message', 'Message is too short');
            this.removeSuccessState('message');
            return false;
        }
        
        if (message.length > rules.maxLength) {
            this.showFieldError('message', 'Message is too long');
            this.removeSuccessState('message');
            return false;
        }
        
        this.hideFieldError('message');
        this.addSuccessState('message');
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
        
        // Don't add error class to input - keep input looking normal
        // const inputElement = this.elements[`${field}Input`];
        // if (inputElement) {
        //     inputElement.classList.add('error');
        //     inputElement.setAttribute('aria-invalid', 'true');
        // }
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
        
        // Don't remove error class from input - keep input looking normal
        // const inputElement = this.elements[`${field}Input`];
        // if (inputElement) {
        //     inputElement.classList.remove('error');
        //     inputElement.setAttribute('aria-invalid', 'false');
        // }
    },
    
    /**
     * Add success state to a field
     * @param {string} field - Field name
     */
    addSuccessState: function(field) {
        // Don't add success class to input - keep input looking normal
        // const inputElement = this.elements[`${field}Input`];
        // if (inputElement) {
        //     inputElement.classList.add('success');
        // }
    },
    
    /**
     * Remove success state from a field
     * @param {string} field - Field name
     */
    removeSuccessState: function(field) {
        // Don't remove success class from input - keep input looking normal
        // const inputElement = this.elements[`${field}Input`];
        // if (inputElement) {
        //     inputElement.classList.remove('success');
        // }
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
        
        // Check if EmailServiceManager is available
        if (typeof EmailServiceManager === 'undefined' || !EmailServiceManager.isInitialized) {
            throw new Error('Email service is not initialized');
        }
        
        // Send email
        return await EmailServiceManager.sendEmail(formData);
    },
    
    /**
     * Handle submission error
     * @param {Error} error - Error object
     */
    handleSubmissionError: function(error) {
        let errorMessage = 'There was an error sending your message. Please try again later.';
        
        if (error.message.includes('Network error')) {
            errorMessage = 'Network error. Please check your internet connection.';
        } else if (error.message.includes('Email service configuration')) {
            errorMessage = 'Email service configuration error. Please try again later.';
        } else if (error.message.includes('Template not found')) {
            errorMessage = 'Email template not found. Please try again later.';
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
        
        // Hide all error messages and clear states
        Object.keys(this.elements.errorElements).forEach(field => {
            this.hideFieldError(field);
            this.removeSuccessState(field);
        });
        
        // Reset textarea height
        this.resetTextareaHeight();
        
        // Clear submission state
        this.isSubmitting = false;
        
        console.log('Form reset');
    },
    
    /**
     * Auto-resize textarea based on content
     */
    autoResizeTextarea: function() {
        const textarea = this.elements.messageInput;
        if (!textarea) return;
        
        // Reset height to auto to get the correct scrollHeight
        textarea.style.height = 'auto';
        
        // Set new height based on scrollHeight
        const newHeight = Math.max(textarea.scrollHeight, 120); // Minimum height of 120px
        textarea.style.height = newHeight + 'px';
        
        // Maximum height to prevent too tall textarea
        if (newHeight > 400) {
            textarea.style.height = '400px';
            textarea.style.overflowY = 'auto';
        } else {
            textarea.style.overflowY = 'hidden';
        }
    },
    
    /**
     * Reset textarea to initial height
     */
    resetTextareaHeight: function() {
        const textarea = this.elements.messageInput;
        if (textarea) {
            textarea.style.height = '120px';
            textarea.style.overflowY = 'hidden';
        }
    },
    
    /**
     * Initialize textarea with proper styling
     */
    initializeTextarea: function() {
        const textarea = this.elements.messageInput;
        if (textarea) {
            // Set initial styles
            textarea.style.minHeight = '120px';
            textarea.style.resize = 'none'; // Disable manual resize
            textarea.style.overflowY = 'hidden';
            textarea.style.transition = 'height 0.2s ease';
            
            // Set initial height
            this.resetTextareaHeight();
        }
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
    }
};

// Initialize contact form when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    ContactFormManager.init();
});

// Make available globally
window.ContactFormManager = ContactFormManager;