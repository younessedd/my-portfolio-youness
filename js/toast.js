/**
 * toast.js - Toast Notification System
 * Handles display of toast notifications for user feedback
 */

const ToastManager = {
    // Configuration
    config: {
        duration: 4000, // milliseconds
        position: 'bottom-right', // 'top-left', 'top-right', 'bottom-left', 'bottom-right'
        maxToasts: 3, // Maximum number of toasts to show at once
        animationDuration: 300, // milliseconds
        types: {
            success: {
                icon: 'check-circle',
                color: '#10b981',
                backgroundColor: '#ecfdf5',
                borderColor: '#a7f3d0'
            },
            error: {
                icon: 'exclamation-circle',
                color: '#ef4444',
                backgroundColor: '#fef2f2',
                borderColor: '#fecaca'
            },
            warning: {
                icon: 'exclamation-triangle',
                color: '#f59e0b',
                backgroundColor: '#fffbeb',
                borderColor: '#fde68a'
            },
            info: {
                icon: 'info-circle',
                color: '#3b82f6',
                backgroundColor: '#eff6ff',
                borderColor: '#bfdbfe'
            }
        }
    },
    
    // State
    activeToasts: [],
    container: null,
    
    /**
     * Initialize toast system
     */
    init: function() {
        this.createContainer();
        console.log('Toast manager initialized');
    },
    
    /**
     * Create toast container if it doesn't exist
     */
    createContainer: function() {
        // Check if container already exists
        this.container = document.getElementById('toastContainer');
        
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'toastContainer';
            this.container.className = 'toast-container';
            
            // Apply position styles
            this.applyPositionStyles();
            
            document.body.appendChild(this.container);
        }
    },
    
    /**
     * Apply CSS styles based on position configuration
     */
    applyPositionStyles: function() {
        if (!this.container) return;
        
        const positions = {
            'top-left': { top: '20px', left: '20px', bottom: 'auto', right: 'auto' },
            'top-right': { top: '20px', right: '20px', bottom: 'auto', left: 'auto' },
            'bottom-left': { bottom: '20px', left: '20px', top: 'auto', right: 'auto' },
            'bottom-right': { bottom: '20px', right: '20px', top: 'auto', left: 'auto' }
        };
        
        const position = positions[this.config.position] || positions['bottom-right'];
        
        Object.assign(this.container.style, {
            position: 'fixed',
            zIndex: '9999',
            ...position
        });
    },
    
    /**
     * Show a toast notification
     * @param {string} message - Message to display
     * @param {string} type - Toast type ('success', 'error', 'warning', 'info')
     * @param {Object} options - Additional options
     */
    show: function(message, type = 'info', options = {}) {
        // Validate type
        if (!this.config.types[type]) {
            type = 'info';
            console.warn(`Invalid toast type: ${type}. Defaulting to 'info'.`);
        }
        
        // Create toast element
        const toast = this.createToastElement(message, type, options);
        
        // Add to container
        this.container.appendChild(toast);
        
        // Add to active toasts array
        this.activeToasts.push({
            element: toast,
            timer: null
        });
        
        // Show toast with animation
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });
        
        // Set auto-remove timer
        const duration = options.duration || this.config.duration;
        const timer = setTimeout(() => {
            this.removeToast(toast);
        }, duration);
        
        // Store timer reference
        const toastIndex = this.activeToasts.findIndex(t => t.element === toast);
        if (toastIndex !== -1) {
            this.activeToasts[toastIndex].timer = timer;
        }
        
        // Enforce maximum toasts
        this.enforceMaxToasts();
        
        return toast;
    },
    
    /**
     * Create toast HTML element
     * @param {string} message - Toast message
     * @param {string} type - Toast type
     * @param {Object} options - Additional options
     * @returns {HTMLElement} Toast element
     */
    createToastElement: function(message, type, options) {
        const typeConfig = this.config.types[type];
        
        const toast = document.createElement('div');
        toast.className = 'toast';
        
        // Set toast ID if provided
        if (options.id) {
            toast.id = options.id;
        }
        
        // Create icon
        const icon = document.createElement('i');
        icon.className = `fas fa-${typeConfig.icon} toast-icon`;
        icon.style.color = typeConfig.color;
        
        // Create message span
        const messageSpan = document.createElement('span');
        messageSpan.textContent = message;
        
        // Create close button if dismissible
        let closeButton = null;
        if (options.dismissible !== false) {
            closeButton = document.createElement('button');
            closeButton.className = 'toast-close';
            closeButton.innerHTML = '&times;';
            closeButton.setAttribute('aria-label', 'Close notification');
            closeButton.addEventListener('click', () => this.removeToast(toast));
        }
        
        // Assemble toast
        toast.appendChild(icon);
        toast.appendChild(messageSpan);
        if (closeButton) {
            toast.appendChild(closeButton);
        }
        
        // Apply styles
        Object.assign(toast.style, {
            background: typeConfig.backgroundColor,
            color: '#333',
            borderLeft: `4px solid ${typeConfig.color}`,
            padding: '16px 20px',
            borderRadius: '8px',
            marginTop: '10px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            maxWidth: '350px',
            transform: 'translateX(100%)',
            opacity: '0',
            transition: `transform ${this.config.animationDuration}ms, opacity ${this.config.animationDuration}ms`,
            wordBreak: 'break-word',
            lineHeight: '1.5'
        });
        
        // Add click handler if provided
        if (options.onClick) {
            toast.style.cursor = 'pointer';
            toast.addEventListener('click', options.onClick);
        }
        
        return toast;
    },
    
    /**
     * Remove a toast
     * @param {HTMLElement} toastElement - Toast element to remove
     */
    removeToast: function(toastElement) {
        if (!toastElement || !toastElement.parentNode) return;
        
        // Find toast in active toasts
        const toastIndex = this.activeToasts.findIndex(t => t.element === toastElement);
        
        if (toastIndex !== -1) {
            // Clear timer
            if (this.activeToasts[toastIndex].timer) {
                clearTimeout(this.activeToasts[toastIndex].timer);
            }
            
            // Remove from array
            this.activeToasts.splice(toastIndex, 1);
        }
        
        // Hide with animation
        toastElement.classList.remove('show');
        
        // Remove from DOM after animation
        setTimeout(() => {
            if (toastElement.parentNode) {
                toastElement.parentNode.removeChild(toastElement);
            }
        }, this.config.animationDuration);
    },
    
    /**
     * Enforce maximum number of toasts
     */
    enforceMaxToasts: function() {
        if (this.activeToasts.length > this.config.maxToasts) {
            // Remove oldest toast
            const oldestToast = this.activeToasts[0];
            if (oldestToast) {
                this.removeToast(oldestToast.element);
            }
        }
    },
    
    /**
     * Show success toast
     * @param {string} message - Success message
     * @param {Object} options - Additional options
     */
    success: function(message, options = {}) {
        return this.show(message, 'success', options);
    },
    
    /**
     * Show error toast
     * @param {string} message - Error message
     * @param {Object} options - Additional options
     */
    error: function(message, options = {}) {
        return this.show(message, 'error', options);
    },
    
    /**
     * Show warning toast
     * @param {string} message - Warning message
     * @param {Object} options - Additional options
     */
    warning: function(message, options = {}) {
        return this.show(message, 'warning', options);
    },
    
    /**
     * Show info toast
     * @param {string} message - Info message
     * @param {Object} options - Additional options
     */
    info: function(message, options = {}) {
        return this.show(message, 'info', options);
    },
    
    /**
     * Remove all toasts
     */
    clearAll: function() {
        // Create a copy of the array to avoid modification during iteration
        const toastsToRemove = [...this.activeToasts];
        
        toastsToRemove.forEach(toast => {
            this.removeToast(toast.element);
        });
        
        console.log('All toasts cleared');
    },
    
    /**
     * Get current configuration
     * @returns {Object} Current configuration
     */
    getConfig: function() {
        return { ...this.config };
    },
    
    /**
     * Get active toasts count
     * @returns {number} Number of active toasts
     */
    getActiveCount: function() {
        return this.activeToasts.length;
    }
};

// Initialize toast manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    ToastManager.init();
});

// Global function for easy access
function showToast(message, type = 'info', options = {}) {
    return ToastManager.show(message, type, options);
}

// Make available globally
window.ToastManager = ToastManager;
window.showToast = showToast;