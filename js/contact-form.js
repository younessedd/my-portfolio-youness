/**
 * Contact Form Handler
 *
 * This script manages the contact form submission using EmailJS service.
 * It includes form validation, loading states, error handling, and success feedback.
 * The script also provides auto-resize functionality for the message textarea.
 */

// Initialize EmailJS and set up form handling when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    // Initialize EmailJS with public key from configuration
    emailjs.init(emailConfig.publicKey);

    // Log initialization details for debugging
    console.log("✅ EmailJS initialized with key:", emailConfig.publicKey);
    console.log("✅ Service ID:", emailConfig.serviceID);
    console.log("✅ Template ID:", emailConfig.templateID);

    // Get the contact form element
    const form = document.getElementById("contactForm");
    if (!form) {
        // Log error if form element is not found
        console.error("❌ Contact form not found! Make sure id='contactForm' exists");
        // Show error message using toast if available, fallback to alert
        if (typeof showToast === "function") {
            showToast("Contact form not found! Please refresh the page ❌", "error");
        }
        return;
    }

    // Get the submit button element for loading state management
    const submitBtn = form.querySelector("button[type='submit']");

    // Attach submit event listener to handle form submission
    form.addEventListener("submit", async (e) => {
        // Prevent default form submission behavior
        e.preventDefault();

        // Get and trim form field values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const message = document.getElementById("message").value.trim();

        // Validate that name field is not empty
        if (!name) {
            if (typeof showToast === "function") {
                showToast("Name field cannot be empty ❌", "error");
            } else {
                alert("Name field cannot be empty");
            }
            return;
        }

        // Validate that email field is not empty
        if (!email) {
            if (typeof showToast === "function") {
                showToast("Email field cannot be empty ❌", "error");
            } else {
                alert("Email field cannot be empty");
            }
            return;
        }

        // Validate that phone field is not empty
        if (!phone) {
            if (typeof showToast === "function") {
                showToast("Phone field cannot be empty ❌", "error");
            } else {
                alert("Phone field cannot be empty");
            }
            return;
        }

        // Validate that message field is not empty
        if (!message) {
            if (typeof showToast === "function") {
                showToast("Message field cannot be empty ❌", "error");
            } else {
                alert("Message field cannot be empty");
            }
            return;
        }

        // Validate minimum name length
        if (name.length < 3) {
            if (typeof showToast === "function") {
                showToast("Name required (minimum 3 characters) ❌", "error");
            } else {
                alert("Name required (minimum 3 characters)");
            }
            return;
        }

        // Validate email format using regex pattern
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            if (typeof showToast === "function") {
                showToast("Valid email required ❌", "error");
            } else {
                alert("Valid email required");
            }
            return;
        }

        // Validate phone number format and length
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(phone) || phone.length < 10) {
            if (typeof showToast === "function") {
                showToast("Valid phone number required (minimum 10 digits) ❌", "error");
            } else {
                alert("Valid phone number required (minimum 10 digits)");
            }
            return;
        }

        // Validate minimum message length
        if (message.length < 5) {
            if (typeof showToast === "function") {
                showToast("Message required (minimum 5 characters) ❌", "error");
            } else {
                alert("Message required (minimum 5 characters)");
            }
            return;
        }

        // Set loading state for submit button
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        // Prepare template parameters for EmailJS
        const templateParams = {
            user_name: name,
            user_email: email,
            user_phone: phone,
            message: `Portfolio Message: ${message}`,
            time: new Date().toLocaleString()
        };

        // Log the data being sent for debugging
        console.log("📤 Sending data:", templateParams);

        try {
            // Send email using EmailJS service
            const result = await emailjs.send(
                emailConfig.serviceID,
                emailConfig.templateID,
                templateParams
            );

            // Log successful sending
            console.log("✅ Email sent successfully:", result);

            // Show success message
            if (typeof showToast === "function") {
                showToast("Message sent successfully ✅", "success");
            } else {
                alert("Message sent successfully ✅");
            }

            // Reset form after successful submission
            form.reset();

        } catch (error) {
            // Log error details for debugging
            console.error("❌ Email sending failed:", error);
            console.error("Error details:", error.text || error.message || error);

            // Prepare error message
            let errorMessage = "Failed to send message ❌";
            if (error.text) {
                errorMessage += "\n" + error.text;
            }

            // Show error message
            if (typeof showToast === "function") {
                showToast(errorMessage, "error");
            } else {
                alert(errorMessage);
            }

        } finally {
            // Reset submit button to original state
            submitBtn.disabled = false;
            submitBtn.innerHTML = `
                <i class="fas fa-paper-plane"></i>
                Send Message
            `;
        }
    });
});

// Function to auto-resize textarea based on content
function autoResize(textarea) {
    // Reset height to auto to get accurate scrollHeight
    textarea.style.height = 'auto';
    // Set height to match content
    textarea.style.height = textarea.scrollHeight + 'px';
}

// Initialize auto-resize functionality for message textarea
document.addEventListener("DOMContentLoaded", () => {
    // Get the message textarea element
    const messageTextarea = document.getElementById("message");
    if (messageTextarea) {
        // Set initial height
        autoResize(messageTextarea);

        // Add input event listener to resize textarea as user types
        messageTextarea.addEventListener("input", function() {
            autoResize(this);
        });
    }
});