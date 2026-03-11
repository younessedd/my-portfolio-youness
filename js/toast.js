/**
 * Toast Notification System
 *
 * This class implements a toast notification system for displaying temporary messages to users.
 * It includes support for different notification types (success, error, info, warning) with
 * animations, progress bars, and accessibility features.
 */

// Main ToastManager class for handling toast notifications
class ToastManager {
    // Constructor initializes the toast system
    constructor() {
        // Container element for holding toast notifications
        this.container = null;
        // Array to track active toasts
        this.toasts = [];
        // Maximum number of toasts to display simultaneously
        this.maxToasts = 5;
        // Default duration for toast display in milliseconds
        this.defaultDuration = 4000;
        // Initialize the toast system
        this.init();
    }

    // Initialize the toast container and styles
    init() {
        // Create main container for toasts
        this.container = document.createElement('div');
        this.container.className = 'toast-container';
        // Add accessibility attributes
        this.container.setAttribute('aria-live', 'polite');
        this.container.setAttribute('aria-label', 'Notifications');
        // Append container to document body
        document.body.appendChild(this.container);

        // Add CSS styles for toast notifications
        this.addStyles();
    }

    // Add comprehensive CSS styles for toast notifications
    addStyles() {
        // Prevent duplicate style injection
        if (document.getElementById('toast-styles')) return;

        // Create style element
        const style = document.createElement('style');
        style.id = 'toast-styles';
        // Define comprehensive CSS for toast notifications
        style.textContent = `
            // Main toast container positioned in top-right corner
            .toast-container {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                display: flex;
                flex-direction: column;
                gap: 10px;
                pointer-events: none;
            }

            // Individual toast notification styling
            .toast {
                background: white;
                border-radius: 8px;
                padding: 16px 20px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                display: flex;
                align-items: center;
                gap: 12px;
                min-width: 300px;
                max-width: 400px;
                pointer-events: auto;
                transform: translateX(400px);
                opacity: 0;
                transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                border-left: 4px solid;
                position: relative;
                overflow: hidden;
            }

            // Animation class for showing toast
            .toast.show {
                transform: translateX(0);
                opacity: 1;
            }

            // Animation class for hiding toast
            .toast.hide {
                transform: translateX(400px);
                opacity: 0;
            }

            // Success toast styling with green accent
            .toast.success {
                border-left-color: #10b981;
                background: linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%);
            }

            // Error toast styling with red accent
            .toast.error {
                border-left-color: #ef4444;
                background: linear-gradient(135deg, #fef2f2 0%, #ffffff 100%);
            }

            // Info toast styling with blue accent
            .toast.info {
                border-left-color: #3b82f6;
                background: linear-gradient(135deg, #eff6ff 0%, #ffffff 100%);
            }

            // Warning toast styling with yellow accent
            .toast.warning {
                border-left-color: #f59e0b;
                background: linear-gradient(135deg, #fffbeb 0%, #ffffff 100%);
            }

            // Icon container styling
            .toast-icon {
                font-size: 20px;
                flex-shrink: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            // Success icon color
            .toast.success .toast-icon {
                color: #10b981;
            }

            // Error icon color
            .toast.error .toast-icon {
                color: #ef4444;
            }

            // Info icon color
            .toast.info .toast-icon {
                color: #3b82f6;
            }

            // Warning icon color
            .toast.warning .toast-icon {
                color: #f59e0b;
            }

            // Message text styling
            .toast-message {
                flex: 1;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                font-size: 14px;
                line-height: 1.4;
                color: #1f2937;
                font-weight: 500;
            }

            // Close button styling
            .toast-close {
                background: none;
                border: none;
                color: #6b7280;
                cursor: pointer;
                font-size: 18px;
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 4px;
                transition: all 0.2s ease;
                flex-shrink: 0;
            }

            // Close button hover effect
            .toast-close:hover {
                background: rgba(0, 0, 0, 0.1);
                color: #374151;
            }

            // Progress bar styling for auto-dismiss
            .toast-progress {
                position: absolute;
                bottom: 0;
                left: 0;
                height: 3px;
                background: currentColor;
                opacity: 0.3;
                animation: toast-progress linear;
            }

            // Progress bar color for success toasts
            .toast.success .toast-progress {
                color: #10b981;
            }

            // Progress bar color for error toasts
            .toast.error .toast-progress {
                color: #ef4444;
            }

            // Progress bar color for info toasts
            .toast.info .toast-progress {
                color: #3b82f6;
            }

            // Progress bar color for warning toasts
            .toast.warning .toast-progress {
                color: #f59e0b;
            }

            // Keyframe animation for progress bar
            @keyframes toast-progress {
                from {
                    width: 100%;
                }
                to {
                    width: 0%;
                }
            }

            // Dark theme support for toasts
            body.theme-dark .toast {
                background: #1f2937;
                color: #f9fafb;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            }

            body.theme-dark .toast-message {
                color: #f9fafb;
            }

            body.theme-dark .toast-close {
                color: #9ca3af;
            }

            body.theme-dark .toast-close:hover {
                background: rgba(255, 255, 255, 0.1);
                color: #f9fafb;
            }

            body.theme-dark .toast.success {
                background: linear-gradient(135deg, #064e3b 0%, #1f2937 100%);
            }

            body.theme-dark .toast.error {
                background: linear-gradient(135deg, #7f1d1d 0%, #1f2937 100%);
            }

            body.theme-dark .toast.info {
                background: linear-gradient(135deg, #1e3a8a 0%, #1f2937 100%);
            }

            body.theme-dark .toast.warning {
                background: linear-gradient(135deg, #78350f 0%, #1f2937 100%);
            }

            // Mobile responsive adjustments
            @media (max-width: 640px) {
                .toast-container {
                    top: 10px;
                    right: 10px;
                    left: 10px;
                }

                .toast {
                    min-width: auto;
                    max-width: none;
                }
            }
        `;
        // Append styles to document head
        document.head.appendChild(style);
    }

    // Public method to show a toast notification
    showToast(message, type = 'info', duration = null) {
        // Remove oldest toast if maximum limit reached
        if (this.toasts.length >= this.maxToasts) {
            const oldestToast = this.toasts.shift();
            this.removeToast(oldestToast);
        }

        // Create new toast with specified parameters
        const toast = this.createToast(message, type, duration || this.defaultDuration);
        this.toasts.push(toast);
        this.container.appendChild(toast.element);

        // Trigger show animation on next frame
        requestAnimationFrame(() => {
            toast.element.classList.add('show');
        });

        // Set timer for auto-dismiss
        toast.timer = setTimeout(() => {
            this.removeToast(toast);
        }, toast.duration);

        return toast;
    }

    // Create toast element with content and functionality
    createToast(message, type, duration) {
        // Create main toast element
        const element = document.createElement('div');
        element.className = `toast ${type}`;

        // Get appropriate icon for toast type
        const icon = this.getIcon(type);

        // Set toast HTML content
        element.innerHTML = `
            <div class="toast-icon">${icon}</div>
            <div class="toast-message">${message}</div>
            <button class="toast-close" aria-label="Close notification">
                <i class="fas fa-times"></i>
            </button>
            <div class="toast-progress" style="animation-duration: ${duration}ms"></div>
        `;

        // Add close button functionality
        const closeBtn = element.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            this.removeToast({ element, timer: null });
        });

        // Return toast object with element and metadata
        return { element, timer: null, duration };
    }

    // Get appropriate icon HTML for toast type
    getIcon(type) {
        // Icon mapping for different toast types
        const icons = {
            success: '<i class="fas fa-check-circle"></i>',
            error: '<i class="fas fa-exclamation-circle"></i>',
            info: '<i class="fas fa-info-circle"></i>',
            warning: '<i class="fas fa-exclamation-triangle"></i>'
        };
        // Return icon or default to info icon
        return icons[type] || icons.info;
    }

    // Remove toast with animation
    removeToast(toast) {
        // Exit if toast element doesn't exist or isn't in DOM
        if (!toast.element || !toast.element.parentNode) return;

        // Clear auto-dismiss timer if exists
        if (toast.timer) {
            clearTimeout(toast.timer);
        }

        // Remove toast from active toasts array
        const index = this.toasts.indexOf(toast);
        if (index > -1) {
            this.toasts.splice(index, 1);
        }

        // Add hide animation class
        toast.element.classList.add('hide');

        // Remove element from DOM after animation completes
        setTimeout(() => {
            if (toast.element && toast.element.parentNode) {
                toast.element.parentNode.removeChild(toast.element);
            }
        }, 300);
    }

    // Clear all active toasts
    clearAll() {
        // Remove each toast individually
        this.toasts.forEach(toast => {
            this.removeToast(toast);
        });
    }
}

// Create global toast manager instance
const toastManager = new ToastManager();

// Global function for backward compatibility and easy access
function showToast(message, type = 'info', duration = null) {
    return toastManager.showToast(message, type, duration);
}

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { showToast, toastManager };
}
