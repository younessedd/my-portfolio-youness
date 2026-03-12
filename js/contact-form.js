/**
 * Contact Form Handler
 * 
 * This script manages the contact form submission with custom validation.
 * Sends data to both Google Sheets and EmailJS simultaneously.
 */

// Google Apps Script URL for contact form
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby9zZofomH4nhxKYOrqKbLtr49S_vNxpffvkjQUqLKsLaNBwmEYp1XL85wLh9doI2vK/exec';

// EmailJS configuration
const emailConfig = {
    serviceID: 'service_9a47m0s',
    templateID: 'template_vlo4ub3',
    publicKey: 'IbbG69TuO-Uyx_4I8'
};

// Send email using EmailJS
async function sendEmailViaEmailJS(name, email, phone, message) {
    console.log('📧 Checking EmailJS...');
    
    if (typeof emailjs === 'undefined') {
        console.error('❌ EmailJS library not loaded!');
        return false;
    }

    // Initialize EmailJS if not already done
    if (!emailjs.initCalled) {
        emailjs.init(emailConfig.publicKey);
        emailjs.initCalled = true;
    }

    console.log('✅ EmailJS library loaded');

    const now = new Date();
    const timeString = now.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    const templateParams = {
        user_name: name,
        user_email: email,
        user_phone: phone,
        message: message,
        time: timeString
    };

    console.log('📤 Sending params:', templateParams);

    try {
        const result = await emailjs.send(emailConfig.serviceID, emailConfig.templateID, templateParams);
        console.log('✅ Email sent successfully:', result.status);
        return true;
    } catch (error) {
        console.error('❌ EmailJS error:', error);
        return false;
    }
}

// Send data to Google Sheets
async function sendToGoogleSheets(name, email, phone, message) {
    await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ name, email, phone: `'${phone}`, message })
    });
    console.log('✅ Message sent to Google Sheets');
}

// Validation functions
function showFieldError(fieldId, message) {
    const errorEl = document.getElementById(fieldId + 'Error');
    const inputEl = document.getElementById(fieldId);
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.add('show');
    }
    if (inputEl) {
        inputEl.classList.add('invalid');
    }
}

function clearFieldError(fieldId) {
    const errorEl = document.getElementById(fieldId + 'Error');
    const inputEl = document.getElementById(fieldId);
    if (errorEl) {
        errorEl.textContent = '';
        errorEl.classList.remove('show');
    }
    if (inputEl) {
        inputEl.classList.remove('invalid');
    }
}

function validateName(name) {
    if (!name) return 'Name is required';
    if (name.length < 2) return 'Name must be at least 2 characters';
    return '';
}

function validateEmail(email) {
    if (!email) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
}

function validatePhone(phone) {
    if (!phone) return 'Phone number is required';
    const cleanPhone = phone.replace(/[\s\-\(\)\.\+]/g, '');
    if (!/^\d+$/.test(cleanPhone)) return 'Phone must contain only numbers';
    if (cleanPhone.length < 10) return 'Phone must be at least 10 digits';
    if (cleanPhone.length > 15) return 'Phone must be at most 15 digits';
    return '';
}

function validateMessage(message) {
    if (!message) return 'Message is required';
    if (message.length < 10) return 'Message must be at least 10 characters';
    return '';
}

// Initialize contact form handling when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Contact form initialized");

    const form = document.getElementById("contactForm");
    if (!form) {
        console.error("❌ Contact form not found!");
        return;
    }

    const submitBtn = form.querySelector("button[type='submit']");

    // Real-time validation - clear error when user starts typing
    const fields = ['name', 'email', 'phone', 'message'];
    fields.forEach(fieldId => {
        const input = document.getElementById(fieldId);
        if (input) {
            input.addEventListener('input', () => clearFieldError(fieldId));
        }
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Clear all previous errors
        fields.forEach(fieldId => clearFieldError(fieldId));

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const message = document.getElementById("message").value.trim();

        let hasError = false;

        // Validate all fields and show errors
        const nameError = validateName(name);
        if (nameError) {
            showFieldError('name', nameError);
            hasError = true;
        }

        const emailError = validateEmail(email);
        if (emailError) {
            showFieldError('email', emailError);
            hasError = true;
        }

        const phoneError = validatePhone(phone);
        if (phoneError) {
            showFieldError('phone', phoneError);
            hasError = true;
        }

        const messageError = validateMessage(message);
        if (messageError) {
            showFieldError('message', messageError);
            hasError = true;
        }

        if (hasError) {
            return;
        }

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        try {
            // Send to both Google Sheets and EmailJS simultaneously
            await Promise.all([
                sendToGoogleSheets(name, email, phone, message),
                sendEmailViaEmailJS(name, email, phone, message)
            ]);

            console.log("✅ All services completed");

            const formStatus = document.getElementById('formStatus');
            formStatus.className = 'form-status success';
            formStatus.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully!';
            formStatus.style.display = 'flex';

            // Auto-hide success message after 3 seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 3000);

            // Reset form completely
            form.reset();
            
            // Clear all error states
            const fields = ['name', 'email', 'phone', 'message'];
            fields.forEach(fieldId => clearFieldError(fieldId));
            
            // Reset textarea height
            const messageTextarea = document.getElementById('message');
            if (messageTextarea) {
                messageTextarea.style.height = 'auto';
            }

        } catch (error) {
            console.error("❌ Error:", error);
            const formStatus = document.getElementById('formStatus');
            formStatus.className = 'form-status error';
            formStatus.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed to send message. Please try again.';
            formStatus.style.display = 'flex';
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<i class="fas fa-paper-plane"></i> Send Message`;
        }
    });
});

// Function to auto-resize textarea based on content
function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

// Initialize auto-resize functionality for message textarea
document.addEventListener("DOMContentLoaded", () => {
    const messageTextarea = document.getElementById("message");
    if (messageTextarea) {
        autoResize(messageTextarea);
        messageTextarea.addEventListener("input", function() {
            autoResize(this);
        });
    }
});