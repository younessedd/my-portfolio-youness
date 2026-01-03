/**
 * toast.js
 * Toast notification system for the portfolio
 */

class ToastManager {
    constructor() {
        this.container = null;
        this.toasts = [];
        this.maxToasts = 5;
        this.defaultDuration = 4000;
        this.init();
    }

    init() {
        // Create toast container
        this.container = document.createElement('div');
        this.container.className = 'toast-container';
        this.container.setAttribute('aria-live', 'polite');
        this.container.setAttribute('aria-label', 'Notifications');
        document.body.appendChild(this.container);
        
        // Add styles if not already added
        this.addStyles();
    }

    addStyles() {
        if (document.getElementById('toast-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
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

            .toast.show {
                transform: translateX(0);
                opacity: 1;
            }

            .toast.hide {
                transform: translateX(400px);
                opacity: 0;
            }

            .toast.success {
                border-left-color: #10b981;
                background: linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%);
            }

            .toast.error {
                border-left-color: #ef4444;
                background: linear-gradient(135deg, #fef2f2 0%, #ffffff 100%);
            }

            .toast.info {
                border-left-color: #3b82f6;
                background: linear-gradient(135deg, #eff6ff 0%, #ffffff 100%);
            }

            .toast.warning {
                border-left-color: #f59e0b;
                background: linear-gradient(135deg, #fffbeb 0%, #ffffff 100%);
            }

            .toast-icon {
                font-size: 20px;
                flex-shrink: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .toast.success .toast-icon {
                color: #10b981;
            }

            .toast.error .toast-icon {
                color: #ef4444;
            }

            .toast.info .toast-icon {
                color: #3b82f6;
            }

            .toast.warning .toast-icon {
                color: #f59e0b;
            }

            .toast-message {
                flex: 1;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                font-size: 14px;
                line-height: 1.4;
                color: #1f2937;
                font-weight: 500;
            }

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

            .toast-close:hover {
                background: rgba(0, 0, 0, 0.1);
                color: #374151;
            }

            .toast-progress {
                position: absolute;
                bottom: 0;
                left: 0;
                height: 3px;
                background: currentColor;
                opacity: 0.3;
                animation: toast-progress linear;
            }

            .toast.success .toast-progress {
                color: #10b981;
            }

            .toast.error .toast-progress {
                color: #ef4444;
            }

            .toast.info .toast-progress {
                color: #3b82f6;
            }

            .toast.warning .toast-progress {
                color: #f59e0b;
            }

            @keyframes toast-progress {
                from {
                    width: 100%;
                }
                to {
                    width: 0%;
                }
            }

            /* Dark theme support */
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

            /* Mobile responsive */
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
        document.head.appendChild(style);
    }

    showToast(message, type = 'info', duration = null) {
        // Remove oldest toast if we have too many
        if (this.toasts.length >= this.maxToasts) {
            const oldestToast = this.toasts.shift();
            this.removeToast(oldestToast);
        }

        const toast = this.createToast(message, type, duration || this.defaultDuration);
        this.toasts.push(toast);
        this.container.appendChild(toast.element);

        // Trigger animation
        requestAnimationFrame(() => {
            toast.element.classList.add('show');
        });

        // Auto remove
        toast.timer = setTimeout(() => {
            this.removeToast(toast);
        }, toast.duration);

        return toast;
    }

    createToast(message, type, duration) {
        const element = document.createElement('div');
        element.className = `toast ${type}`;
        
        const icon = this.getIcon(type);
        
        element.innerHTML = `
            <div class="toast-icon">${icon}</div>
            <div class="toast-message">${message}</div>
            <button class="toast-close" aria-label="Close notification">
                <i class="fas fa-times"></i>
            </button>
            <div class="toast-progress" style="animation-duration: ${duration}ms"></div>
        `;

        // Add close functionality
        const closeBtn = element.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            this.removeToast({ element, timer: null });
        });

        return { element, timer: null, duration };
    }

    getIcon(type) {
        const icons = {
            success: '<i class="fas fa-check-circle"></i>',
            error: '<i class="fas fa-exclamation-circle"></i>',
            info: '<i class="fas fa-info-circle"></i>',
            warning: '<i class="fas fa-exclamation-triangle"></i>'
        };
        return icons[type] || icons.info;
    }

    removeToast(toast) {
        if (!toast.element || !toast.element.parentNode) return;

        // Clear timer if exists
        if (toast.timer) {
            clearTimeout(toast.timer);
        }

        // Remove from array
        const index = this.toasts.indexOf(toast);
        if (index > -1) {
            this.toasts.splice(index, 1);
        }

        // Add hide animation
        toast.element.classList.add('hide');

        // Remove from DOM after animation
        setTimeout(() => {
            if (toast.element && toast.element.parentNode) {
                toast.element.parentNode.removeChild(toast.element);
            }
        }, 300);
    }

    // Clear all toasts
    clearAll() {
        this.toasts.forEach(toast => {
            this.removeToast(toast);
        });
    }
}

// Create global instance
const toastManager = new ToastManager();

// Global function for backward compatibility
function showToast(message, type = 'info', duration = null) {
    return toastManager.showToast(message, type, duration);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { showToast, toastManager };
}
