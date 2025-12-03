// config-example.js
// 📋 هذا ملف مثال - أنشئ نسخة باسم email-config.js وضع مفاتيحك الحقيقية
// ✅ هذا الملف آمن للرفع على GitHub لأنه لا يحتوي على بيانات حقيقية

const emailConfig = {
    // ============================================
    // 🔐 إعدادات EmailJS - احصل عليها من Dashboard
    // ============================================
    // الخطوات:
    // 1. سجل الدخول إلى https://dashboard.emailjs.com
    // 2. انتقل إلى قسم "Email Services"
    // 3. انسخ "Service ID" وضعها هنا
    serviceID: 'YOUR_SERVICE_ID_HERE',
    // مثال: 'service_abc123xyz'
    
    // الخطوات:
    // 1. انتقل إلى قسم "Email Templates"
    // 2. اختر القالب الذي تريد استخدامه
    // 3. انسخ "Template ID" وضعها هنا
    templateID: 'YOUR_TEMPLATE_ID_HERE',
    // مثال: 'template_xyz789abc'
    
    // الخطوات:
    // 1. انتقل إلى قسم "Account" → "API Keys"
    // 2. انسخ "Public Key" وضعها هنا
    publicKey: 'YOUR_PUBLIC_KEY_HERE',
    // مثال: 'user_abcdefghijklmnop'
    
    // ============================================
    // 📧 إعدادات البريد الإلكتروني
    // ============================================
    toEmail: 'your-email@gmail.com',        // بريدك المستلم
    fromName: 'Portfolio Contact Form',     // اسم المرسل في البريد
    subject: 'New Message from Portfolio'   // موضوع البريد الافتراضي
};

// ============================================
// 📝 تعليمات الاستخدام
// ============================================
// 1. انسخ هذا الملف: cp config-example.js email-config.js
// 2. افتح email-config.js بالمحرر
// 3. استبدل القيم النصية بمفاتيحك الحقيقية
// 4. احفظ الملف
// 5. تأكد من إضافة email-config.js إلى .gitignore

// ============================================
// ⚠️ نصائح أمان هامة
// ============================================
// 1. لا تشارك ملف email-config.js مع أي شخص
// 2. لا ترفع email-config.js على GitHub
// 3. إذا تسربت المفاتيح، قم بتغييرها فوراً
// 4. استخدم مفاتيح مختلفة للتطوير والإنتاج

// ============================================
// 🚀 كيفية الحصول على مفاتيح EmailJS
// ============================================
// 1. سجل في https://www.emailjs.com
// 2. أضف خدمة بريد (Gmail, Outlook, etc.)
// 3. أنشئ قالب بريد
// 4. انتقل إلى Account → API Keys
// 5. انسخ المفاتيح وضعها في email-config.js

// للاستخدام في Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = emailConfig;
}

// للاستخدام في المتصفح
if (typeof window !== 'undefined') {
    window.emailConfig = emailConfig;
}

console.log('✅ config-example.js loaded successfully');
console.log('📝 Please create email-config.js with your actual keys');