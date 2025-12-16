/**
 * navigation.js - Navigation Management
 * إصدار منقح مع إزالة ميزة التبديل بين الوضع المظلم والفاتح
 */

const NavigationManager = {
    // تهيئة
    init: function() {
        console.log('🚀 تهيئة التنقل...');
        this.setupHamburger();
        this.setupMobileLinks();
        this.setupSmoothScroll();
        console.log('✅ التنقل جاهز');
    },

    // 1. قائمة الهامبرغر - بسيطة وتعمل
    setupHamburger: function() {
        const burgerBtn = document.getElementById('burger-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (!burgerBtn || !mobileMenu) {
            console.error('❌ عناصر الهامبرغر غير موجودة!');
            return;
        }
        
        console.log('🍔 تم العثور على عناصر الهامبرغر');
        
        // معالج النقر البسيط - يعمل من أول نقرة
        burgerBtn.addEventListener('click', function(e) {
            console.log('🎯 تم النقر على الهامبرغر!');
            e.stopPropagation();
            e.preventDefault();
            
            // تبديل القائمة
            mobileMenu.classList.toggle('active');
            
            // تبديل الأيقونة
            const icon = this.querySelector('i');
            if (icon) {
                icon.className = mobileMenu.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
            }
            
            // تبديل التمرير
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
            
            console.log('📱 حالة القائمة:', mobileMenu.classList.contains('active') ? 'مفتوحة' : 'مغلقة');
        });
        
        // إغلاق عند النقر خارج القائمة
        document.addEventListener('click', function(e) {
            if (mobileMenu.classList.contains('active') &&
                !mobileMenu.contains(e.target) &&
                !burgerBtn.contains(e.target)) {
                
                mobileMenu.classList.remove('active');
                burgerBtn.querySelector('i').className = 'fas fa-bars';
                document.body.style.overflow = '';
            }
        });
        
        // إغلاق بمفتاح Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                burgerBtn.querySelector('i').className = 'fas fa-bars';
                document.body.style.overflow = '';
            }
        });
    },

    // 2. روابط الموبايل - إغلاق القائمة عند النقر
    setupMobileLinks: function() {
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');
        
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                console.log('📱 تم النقر على رابط الموبايل:', this.textContent);
                
                // إغلاق قائمة الموبايل
                const mobileMenu = document.getElementById('mobile-menu');
                const burgerBtn = document.getElementById('burger-btn');
                
                if (mobileMenu) mobileMenu.classList.remove('active');
                if (burgerBtn) burgerBtn.querySelector('i').className = 'fas fa-bars';
                document.body.style.overflow = '';
            });
        });
    },

    // 3. التمرير السلس
    setupSmoothScroll: function() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href === '#' || href === '') return;
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    
                    const headerHeight = document.querySelector('header').offsetHeight || 80;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    history.pushState(null, null, href);
                    
                    // إغلاق قائمة الموبايل إذا كانت مفتوحة
                    const mobileMenu = document.getElementById('mobile-menu');
                    const burgerBtn = document.getElementById('burger-btn');
                    if (mobileMenu && mobileMenu.classList.contains('active')) {
                        mobileMenu.classList.remove('active');
                        if (burgerBtn) burgerBtn.querySelector('i').className = 'fas fa-bars';
                        document.body.style.overflow = '';
                    }
                }
            });
        });
    }
};

// تهيئة عند تحميل DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => NavigationManager.init());
} else {
    NavigationManager.init();
}