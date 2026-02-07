/**
 * contact-form.js
 * إرسال نموذج التواصل عبر EmailJS
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. 🔧 تهيئة EmailJS أولاً - هذا هو الحل
    emailjs.init(emailConfig.publicKey);
    
    console.log("✅ EmailJS تم التهيئة بالمفتاح:", emailConfig.publicKey);
    console.log("✅ Service ID:", emailConfig.serviceID);
    console.log("✅ Template ID:", emailConfig.templateID);
    
    const form = document.getElementById("contactForm");
    if (!form) {
        console.error("❌ Form not found! تأكد من أن id='contactForm' موجود");
        if (typeof showToast === "function") {
            showToast("Contact form not found! Please refresh the page ❌", "error");
        }
        return;
    }

    const submitBtn = form.querySelector("button[type='submit']");

    form.addEventListener("submit", async (e) => {
        e.preventDefault(); // منع إرسال الفورم التقليدي

        // Form validation
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const message = document.getElementById("message").value.trim();

        // Check for empty fields
        if (!name) {
            if (typeof showToast === "function") {
                showToast("Name field cannot be empty ❌", "error");
            } else {
                alert("Name field cannot be empty");
            }
            return;
        }

        if (!email) {
            if (typeof showToast === "function") {
                showToast("Email field cannot be empty ❌", "error");
            } else {
                alert("Email field cannot be empty");
            }
            return;
        }

        if (!phone) {
            if (typeof showToast === "function") {
                showToast("Phone field cannot be empty ❌", "error");
            } else {
                alert("Phone field cannot be empty");
            }
            return;
        }

        if (!message) {
            if (typeof showToast === "function") {
                showToast("Message field cannot be empty ❌", "error");
            } else {
                alert("Message field cannot be empty");
            }
            return;
        }

        // Validate name length
        if (name.length < 3) {
            if (typeof showToast === "function") {
                showToast("Name required (minimum 3 characters) ❌", "error");
            } else {
                alert("Name required (minimum 3 characters)");
            }
            return;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            if (typeof showToast === "function") {
                showToast("Valid email required ❌", "error");
            } else {
                alert("Valid email required");
            }
            return;
        }

        // Validate phone
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(phone) || phone.length < 10) {
            if (typeof showToast === "function") {
                showToast("Valid phone number required (minimum 10 digits) ❌", "error");
            } else {
                alert("Valid phone number required (minimum 10 digits)");
            }
            return;
        }

        // Validate message
        if (message.length < 5) {
            if (typeof showToast === "function") {
                showToast("Message required (minimum 5 characters) ❌", "error");
            } else {
                alert("Message required (minimum 5 characters)");
            }
            return;
        }

        // حالة التحميل
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        // البيانات المرسلة - تطابق التيمبلت بالضبط
        const templateParams = {
            user_name: name,
            user_email: email,
            user_phone: phone,
            message: `Portfolio Message: ${message}`,
            time: new Date().toLocaleString()
        };

        console.log("📤 إرسال البيانات:", templateParams);

        try {
            // الطريقة المضمونة: استخدام send مع المعلمات
            const result = await emailjs.send(
                emailConfig.serviceID,
                emailConfig.templateID,
                templateParams
            );
            
            console.log("✅ نجاح الإرسال:", result);

            // إظهار رسالة النجاح
            if (typeof showToast === "function") {
                showToast("Message sent successfully ✅", "success");
            } else {
                alert("Message sent successfully ✅");
            }

            // إعادة تعيين الفورم
            form.reset();

        } catch (error) {
            console.error("❌ خطأ في الإرسال:", error);
            console.error("تفاصيل الخطأ:", error.text || error.message || error);
            
            // رسالة الخطأ
            let errorMessage = "Failed to send message ❌";
            if (error.text) {
                errorMessage += "\n" + error.text;
            }

            if (typeof showToast === "function") {
                showToast(errorMessage, "error");
            } else {
                alert(errorMessage);
            }

        } finally {
            // إعادة زر الإرسال لحالته الأصلية
            submitBtn.disabled = false;
            submitBtn.innerHTML = `
                <i class="fas fa-paper-plane"></i>
                Send Message
            `;
        }
    });
});

// Auto-resize textarea function
function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

// Initialize auto-resize for message textarea
document.addEventListener("DOMContentLoaded", () => {
    const messageTextarea = document.getElementById("message");
    if (messageTextarea) {
        // Set initial height
        autoResize(messageTextarea);
        
        // Add input listener for auto-resize
        messageTextarea.addEventListener("input", function() {
            autoResize(this);
        });
    }
});