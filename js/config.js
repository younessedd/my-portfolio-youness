/**
 * config.js - الإعدادات العامة
 * تم التعديل مع إزالة ميزة التبديل بين الوضع المظلم والفاتح
 */

const PortfolioConfig = {
    // معلومات التطبيق
    app: {
        name: 'البورتفوليو',
        version: '1.0.0',
        author: 'يونس الدانكير',
        year: new Date().getFullYear()
    },
    
    // معلومات الاتصال
    contact: {
        email: 'eddanguiryouness@gmail.com',
        phone: '+212 6 6483 7281',
        location: 'المغرب',
        whatsapp: 'https://wa.me/212664837281',
        github: 'https://github.com/younessedd',
        linkedin: 'https://www.linkedin.com/in/your-profile',
        twitter: 'https://twitter.com/yourusername',
        codepen: 'https://codepen.io/yourusername'
    },
    
    // روابط تنزيل السيرة الذاتية
    cv: {
        webDeveloper: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        iotEngineer: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    },
    
    // الخدمات الخارجية
    services: {
        // تكوين EmailJS
        emailjs: {
            serviceID: 'service_l953yi6',
            templateID: 'template_5aimrbz',
            publicKey: 'IbbG69TuO-Uyx_4I8'
        }
    },
    
    // ميزات التطبيق
    features: {
        heroSwiper: true,
        skillsModal: true,
        projectsSwiper: true,
        contactForm: true,
        mobileMenu: true,
        toastNotifications: true,
        
        // إعدادات التحريك
        animations: {
            enabled: true,
            duration: 300
        }
    },
    
    // إعدادات الأداء
    performance: {
        // التحميل المتأخر
        lazyLoadImages: true,
        lazyLoadThreshold: 100,
        
        // إعدادات Debounce
        scrollDebounce: 100,
        resizeDebounce: 200,
        
        // إعدادات التخزين
        localStorageEnabled: true,
        sessionStorageEnabled: true
    },
    
    /**
     * تهيئة الإعدادات
     */
    init: function() {
        this.loadFromLocalStorage();
        this.setupConfigUpdateListener();
        console.log('تم تحميل إعدادات البورتفوليو');
    },
    
    /**
     * تحميل الإعدادات من localStorage
     */
    loadFromLocalStorage: function() {
        if (!this.performance.localStorageEnabled) return;
        
        try {
            const savedConfig = localStorage.getItem('portfolio-config');
            if (savedConfig) {
                const parsed = JSON.parse(savedConfig);
                this.mergeConfig(parsed);
            }
        } catch (error) {
            console.warn('فشل تحميل الإعدادات من localStorage:', error);
        }
    },
    
    /**
     * حفظ الإعدادات في localStorage
     */
    saveToLocalStorage: function() {
        if (!this.performance.localStorageEnabled) return;
        
        try {
            const saveableConfig = {
                features: this.features,
                contact: this.contact
            };
            
            localStorage.setItem('portfolio-config', JSON.stringify(saveableConfig));
        } catch (error) {
            console.warn('فشل حفظ الإعدادات في localStorage:', error);
        }
    },
    
    /**
     * دمج الإعدادات الجديدة مع الموجودة
     * @param {Object} newConfig - الإعدادات الجديدة للدمج
     */
    mergeConfig: function(newConfig) {
        const deepMerge = (target, source) => {
            for (const key in source) {
                if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                    if (!target[key]) target[key] = {};
                    deepMerge(target[key], source[key]);
                } else {
                    target[key] = source[key];
                }
            }
            return target;
        };
        
        deepMerge(this, newConfig);
    },
    
    /**
     * تحديث الإعدادات
     * @param {Object} updates - تحديثات الإعدادات
     * @param {boolean} save - حفظ في localStorage أم لا
     */
    update: function(updates, save = true) {
        this.mergeConfig(updates);
        
        if (save) {
            this.saveToLocalStorage();
        }
        
        // إرسال حدث تغيير الإعدادات
        this.dispatchChangeEvent();
    },
    
    /**
     * إرسال حدث تغيير الإعدادات
     */
    dispatchChangeEvent: function() {
        const event = new CustomEvent('portfolioConfigChanged', {
            detail: { config: this }
        });
        document.dispatchEvent(event);
    },
    
    /**
     * إعداد مستمع تحديث الإعدادات
     */
    setupConfigUpdateListener: function() {
        document.addEventListener('portfolioConfigChanged', (event) => {
            console.log('تم تغيير الإعدادات:', event.detail);
        });
    },
    
    /**
     * الحصول على معلومات الاتصال
     * @returns {Object} معلومات الاتصال
     */
    getContactInfo: function() {
        return { ...this.contact };
    },
    
    /**
     * تحديث معلومات الاتصال
     * @param {Object} newContact - معلومات الاتصال الجديدة
     */
    updateContactInfo: function(newContact) {
        this.contact = { ...this.contact, ...newContact };
        this.saveToLocalStorage();
    }
};

// تهيئة الإعدادات عند تحميل DOM
document.addEventListener('DOMContentLoaded', function() {
    PortfolioConfig.init();
});

// جعل الإعدادات متاحة عالمياً
if (typeof window !== 'undefined') {
    window.PortfolioConfig = PortfolioConfig;
}