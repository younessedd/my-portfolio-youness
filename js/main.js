/**
 * main.js - الملف الرئيسي لجافاسكريبت
 * منسق ومصحح بدون ميزة التبديل بين الوضع المظلم والفاتح
 */

// متغيرات عامة
let heroSwiper = null;
let imageSwipers = [];

/**
 * تهيئة التطبيق بالكامل
 */
function initPortfolio() {
    console.log('🚀 جاري تهيئة البورتفوليو...');
    
    // تهيئة جميع المكونات
    setupEventListeners();
    
    // تعيين السنة الحالية في الفوتر
    updateCurrentYear();
    
    // إضافة مستمعي الأحداث لتنزيل السيرة الذاتية
    setupCvDownloadTracking();
    
    // إعداد النقر خارجي لإغلاق سوابير
    setupSwiperCloseListeners();
    
    // إعداد مستمعي لوحة المفاتيح
    setupKeyboardListeners();
    
    // Initialize startup image preloader for fast popups
    initializeStartupImagePreloader();
    
    console.log('✅ تم تهيئة البورتفوليو بنجاح');
}

/**
 * إعداد جميع مستمعي الأحداث
 */
function setupEventListeners() {
    // قائمة الموبايل
    const burgerBtn = document.getElementById('burger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (burgerBtn && mobileMenu) {
        burgerBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            const icon = this.querySelector('i');
            if (icon) {
                icon.className = mobileMenu.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
            }
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // إغلاق القائمة عند النقر على الروابط
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                burgerBtn.querySelector('i').className = 'fas fa-bars';
                document.body.style.overflow = '';
            });
        });
    }
    
    // التمرير السلس للروابط
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                // إغلاق قائمة الموبايل إذا كانت مفتوحة
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    burgerBtn.querySelector('i').className = 'fas fa-bars';
                    document.body.style.overflow = '';
                }
                
                const headerHeight = document.querySelector('header').offsetHeight || 80;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * تحديث السنة الحالية في الفوتر
 */
function updateCurrentYear() {
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        if (element) {
            element.textContent = currentYear;
        }
    });
    
    // تحديث سنة الفوتر السفلية
    const footerBottomYear = document.getElementById('current-year');
    if (footerBottomYear) {
        footerBottomYear.textContent = currentYear;
    }
}

/**
 * إعداد تتبع تنزيل السيرة الذاتية
 */
function setupCvDownloadTracking() {
    const cvLinks = document.querySelectorAll('a[href*="cv"]');
    
    cvLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('تم تنزيل السيرة الذاتية: ', this.href);
        });
    });
}

/**
 * إعداد النقر خارجي لإغلاق سوابير
 */
function setupSwiperCloseListeners() {
    document.addEventListener('click', function(e) {
        const webSwiperContainer = document.getElementById('web-swiper-container');
        const mobileSwiperContainer = document.getElementById('mobile-swiper-container');
        const iotSwiperContainer = document.getElementById('iot-swiper-container');
        const skillsSwiperContainer = document.getElementById('skills-swiper-container');
        
        // فحص سوابير تطبيقات الويب
        if (webSwiperContainer && webSwiperContainer.style.display === 'block') {
            const webNav = document.getElementById('web-apps-nav');
            const isClickInsideWebSwiper = webSwiperContainer.contains(e.target);
            const isClickOnWebNav = webNav && (webNav.contains(e.target) || e.target.closest('#web-apps-nav'));
            
            if (!isClickInsideWebSwiper && !isClickOnWebNav) {
                if (typeof WebProjectsManager !== 'undefined' && typeof WebProjectsManager.closePopup === 'function') {
                    WebProjectsManager.closePopup();
                }
                return;
            }
        }
        
        // فحص سوابير تطبيقات الموبايل
        if (mobileSwiperContainer && mobileSwiperContainer.style.display === 'block') {
            const mobileNav = document.getElementById('mobile-apps-nav');
            const isClickInsideMobileSwiper = mobileSwiperContainer.contains(e.target);
            const isClickOnMobileNav = mobileNav && (mobileNav.contains(e.target) || e.target.closest('#mobile-apps-nav'));
            
            if (!isClickInsideMobileSwiper && !isClickOnMobileNav) {
                if (typeof MobileProjectsManager !== 'undefined' && typeof MobileProjectsManager.closePopup === 'function') {
                    MobileProjectsManager.closePopup();
                }
                return;
            }
        }
        
        // فحص سوابير مشاريع IoT
        if (iotSwiperContainer && iotSwiperContainer.style.display === 'block') {
            const iotNav = document.getElementById('iot-projects-nav');
            const isClickInsideIotSwiper = iotSwiperContainer.contains(e.target);
            const isClickOnIotNav = iotNav && (iotNav.contains(e.target) || e.target.closest('#iot-projects-nav'));
            
            if (!isClickInsideIotSwiper && !isClickOnIotNav) {
                if (typeof IoTProjectsManager !== 'undefined' && typeof IoTProjectsManager.closePopup === 'function') {
                    IoTProjectsManager.closePopup();
                }
                return;
            }
        }
        
        // فحص سوابير المهارات
        if (skillsSwiperContainer && skillsSwiperContainer.style.display === 'block') {
            const skillsNav = document.getElementById('skills-nav');
            const isClickInsideSkillsSwiper = skillsSwiperContainer.contains(e.target);
            const isClickOnSkillsNav = skillsNav && (skillsNav.contains(e.target) || e.target.closest('#skills-nav'));
            
            if (!isClickInsideSkillsSwiper && !isClickOnSkillsNav) {
                if (typeof SkillsManager !== 'undefined' && typeof SkillsManager.closePopup === 'function') {
                    SkillsManager.closePopup();
                }
                return;
            }
        }
    });
}

/**
 * إعداد مستمعي لوحة المفاتيح
 */
function setupKeyboardListeners() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // إغلاق سوابير تطبيقات الويب
            const webSwiperContainer = document.getElementById('web-swiper-container');
            if (webSwiperContainer && webSwiperContainer.style.display === 'block') {
                if (typeof WebProjectsManager !== 'undefined' && typeof WebProjectsManager.closePopup === 'function') {
                    WebProjectsManager.closePopup();
                }
                return;
            }
            
            // إغلاق سوابير تطبيقات الموبايل
            const mobileSwiperContainer = document.getElementById('mobile-swiper-container');
            if (mobileSwiperContainer && mobileSwiperContainer.style.display === 'block') {
                if (typeof MobileProjectsManager !== 'undefined' && typeof MobileProjectsManager.closePopup === 'function') {
                    MobileProjectsManager.closePopup();
                }
                return;
            }
            
            // إغلاق سوابير مشاريع IoT
            const iotSwiperContainer = document.getElementById('iot-swiper-container');
            if (iotSwiperContainer && iotSwiperContainer.style.display === 'block') {
                if (typeof IoTProjectsManager !== 'undefined' && typeof IoTProjectsManager.closePopup === 'function') {
                    IoTProjectsManager.closePopup();
                }
                return;
            }
            
            // إغلاق سوابير المهارات
            const skillsSwiperContainer = document.getElementById('skills-swiper-container');
            if (skillsSwiperContainer && skillsSwiperContainer.style.display === 'block') {
                if (typeof SkillsManager !== 'undefined' && typeof SkillsManager.closePopup === 'function') {
                    SkillsManager.closePopup();
                }
                return;
            }
            
            // إغلاق قائمة الموبايل
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                const burgerBtn = document.getElementById('burger-btn');
                if (burgerBtn) {
                    burgerBtn.querySelector('i').className = 'fas fa-bars';
                }
                document.body.style.overflow = '';
            }
        }
    });
}

/**
 * معالجة تغيير حجم النافذة
 */
function handleResize() {
    // إغلاق قائمة الموبايل على الشاشات الكبيرة
    const mobileMenu = document.getElementById('mobile-menu');
    if (window.innerWidth > 768 && mobileMenu && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        const burgerBtn = document.getElementById('burger-btn');
        if (burgerBtn) {
            burgerBtn.querySelector('i').className = 'fas fa-bars';
        }
        document.body.style.overflow = '';
    }
}

// تهيئة كل شيء عند تحميل DOM
document.addEventListener('DOMContentLoaded', function() {
    initPortfolio();
    
    // إضافة مستمع لتغيير الحجم
    window.addEventListener('resize', handleResize);
    
    // إضافة مستمع للتمرير للروابط النشطة
    window.addEventListener('scroll', updateActiveNavLink);
    
    // SET HOME LINK TO HOVER STATE WHEN APP OPENS FIRST TIME
    // because hero section is on screen
    setTimeout(() => {
        const homeLinks = document.querySelectorAll('a[href="#home"]');
        homeLinks.forEach(link => {
            link.classList.add('active');
            console.log('🍔 HOME LINK SET TO HOVER STATE - APP OPENED FIRST TIME - HERO SECTION VISIBLE');
        });
        
        console.log('🍔 HOME LINK ACTIVE - Hero section visible on app first open');
    }, 100);
});

/**
 * تحديث رابط التنقل النشط بناءً على موضع التمرير
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-nav a');
    
    let currentSection = '';
    const headerHeight = document.querySelector('header').offsetHeight || 80;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - headerHeight - 100)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

/**
 * Initialize startup image preloader for fast popup loading
 */
function initializeStartupImagePreloader() {
    // Check if startup preloader is available and project data is loaded
    if (window.startupImagePreloader && 
        window.webProjectsData && 
        window.mobileProjectsData && 
        window.iotProjectsData && 
        window.skillsData) {
        
        console.log('🖼️ Starting background image preloading...');
        
        // Start preloading in background (doesn't control splash screen)
        window.startupImagePreloader.init(
            // Progress callback (background only - no splash updates)
            (progress) => {
                console.log(`📊 Background loading: ${progress.percentage}% (${progress.loaded}/${progress.total})`);
            },
            // Completion callback (background only)
            (result) => {
                console.log(`✅ Background loading complete! ${result.loaded} images loaded for instant popup display.`);
            }
        );
    } else {
        // Retry initialization after data loads
        setTimeout(initializeStartupImagePreloader, 200);
    }
}

// Hide splash screen function
function hideSplashScreen() {
    const splashScreen = document.getElementById('splash-screen');
    if (splashScreen && splashScreen.style.display !== 'none') {
        splashScreen.style.opacity = '0';
        setTimeout(() => {
            splashScreen.style.display = 'none';
        }, 300);
    }
}