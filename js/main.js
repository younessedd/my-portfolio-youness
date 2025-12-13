/**
 * main.js - Main JavaScript File
 * متوافق مع نظام السلايدرات الجديد
 */

// Global variables
let heroSwiper = null;
let imageSwipers = [];

// دالة لإخفاء جميع حاويات السلايدر
function hideAllSwiperContainers() {
    const containers = [
        'web-swiper-container',
        'mobile-swiper-container', 
        'iot-swiper-container',
        'skills-swiper-container'
    ];
    
    containers.forEach(id => {
        const container = document.getElementById(id);
        if (container) {
            container.style.display = 'none';
            console.log(`🗑️ إخفاء حاوية: ${id}`);
        }
    });
    
    // إزالة النشاط من جميع أزرار التنقل
    const navSections = ['web-apps-nav', 'mobile-apps-nav', 'iot-projects-nav', 'skills-nav'];
    navSections.forEach(navId => {
        const nav = document.getElementById(navId);
        if (nav) {
            nav.querySelectorAll('.skill-nav-btn').forEach(btn => {
                btn.classList.remove('active');
            });
        }
    });
}

// Skills Section Management
const SkillsManagerNew = {
    elements: {
        nav: null,
        swiperContainer: null,
        swiper: null,
        categoryTitle: null,
        headerCloseBtn: null
    },
    
    currentCategory: 'web',
    swiperInstance: null,
    
    init: function() {
        this.cacheElements();
        this.setupNavigation();
        this.setupHeaderCloseButton();
        this.initSwiper();
        console.log('✅ Skills manager initialized');
    },
    
    cacheElements: function() {
        this.elements.nav = document.getElementById('skills-nav');
        this.elements.swiperContainer = document.getElementById('skills-swiper-container');
        this.elements.swiper = document.getElementById('skillsSwiper');
        this.elements.categoryTitle = document.getElementById('skills-category-title');
        this.elements.headerCloseBtn = document.getElementById('skills-close-btn');
        
        console.log('🔍 عناصر Skills:');
        console.log('- nav:', this.elements.nav ? '✅ موجود' : '❌ غير موجود');
        console.log('- swiperContainer:', this.elements.swiperContainer ? '✅ موجود' : '❌ غير موجود');
        console.log('- headerCloseBtn:', this.elements.headerCloseBtn ? '✅ موجود' : '❌ غير موجود');
    },
    
    setupNavigation: function() {
        if (!this.elements.nav) return;
        
        const navButtons = this.elements.nav.querySelectorAll('.skill-nav-btn');
        
        navButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                const buttonText = e.currentTarget.querySelector('span').textContent;
                this.showCategory(category, buttonText);
            });
        });
    },
    
    setupHeaderCloseButton: function() {
        if (!this.elements.headerCloseBtn) {
            console.log('⚠️ زر الإغلاق غير موجود، البحث عنه...');
            this.elements.headerCloseBtn = document.querySelector('#skills-swiper-container .header-close-btn');
            if (!this.elements.headerCloseBtn) {
                console.error('❌ زر الإغلاق غير موجود في DOM');
                return;
            }
        }
        
        console.log('🔄 إعداد زر الإغلاق لـ Skills...');
        
        // إزالة أي event listeners سابقة
        const newBtn = this.elements.headerCloseBtn.cloneNode(true);
        this.elements.headerCloseBtn.parentNode.replaceChild(newBtn, this.elements.headerCloseBtn);
        this.elements.headerCloseBtn = newBtn;
        
        this.elements.headerCloseBtn.addEventListener('click', (e) => {
            console.log('🟢 زر الإغلاق في الهيدر تم النقر عليه (Skills)');
            e.stopPropagation();
            e.preventDefault();
            this.closeSwiper();
        });
        
        // التأكد من أن الزر مرئي ويعمل
        this.elements.headerCloseBtn.style.display = 'flex';
        this.elements.headerCloseBtn.style.visibility = 'visible';
        this.elements.headerCloseBtn.style.opacity = '1';
        this.elements.headerCloseBtn.style.pointerEvents = 'auto';
        this.elements.headerCloseBtn.style.cursor = 'pointer';
        
        console.log('✅ زر الإغلاق جاهز للعمل (Skills)');
    },
    
    initSwiper: function() {
        if (!this.elements.swiper) return;
        
        this.swiperInstance = new Swiper(this.elements.swiper, {
            loop: true,
            spaceBetween: 0,
            speed: 600,
            keyboard: { enabled: true },
            mousewheel: { forceToAxis: true },
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 1,
            effect: 'slide',
        });
        
        console.log('✅ Skills swiper initialized (no navigation buttons)');
    },
    
    showCategory: function(category, buttonText) {
        console.log(`📋 عرض فئة: ${category} - ${buttonText}`);
        
        this.currentCategory = category;
        
        // تحديث العنوان في الهيدر
        this.updateCategoryTitle(category, buttonText);
        
        // إخفاء الحاويات الأخرى
        hideAllSwiperContainers();
        
        if (this.elements.swiperContainer) {
            this.elements.swiperContainer.style.display = 'flex';
            console.log('📱 عرض حاوية السلايدر (Skills)');
        } else {
            console.error('❌ عنصر swiperContainer غير موجود');
        }
        
        // تحديد السلايد المناسب
        this.goToCategorySlide(category);
        
        // تحديث زر التنقل النشط
        this.updateActiveButton(category);
        
        // إعادة إعداد زر الإغلاق بعد عرض السلايدر
        setTimeout(() => {
            this.setupHeaderCloseButton();
        }, 100);
        
        setTimeout(() => {
            if (this.elements.swiperContainer) {
                this.elements.swiperContainer.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest' 
                });
            }
        }, 100);
    },
    
    updateCategoryTitle: function(category, buttonText) {
        if (!this.elements.categoryTitle) return;
        
        const icons = {
            'web': 'fa-code',
            'iot': 'fa-microchip',
            'mobile': 'fa-mobile-alt',
            'soft': 'fa-star'
        };
        
        const icon = icons[category] || 'fa-star';
        
        this.elements.categoryTitle.innerHTML = `
            <i class="fas ${icon}"></i>
            <span>${buttonText}</span>
        `;
    },
    
    goToCategorySlide: function(category) {
        if (!this.swiperInstance) return;
        
        const slides = this.elements.swiper.querySelectorAll('.swiper-slide');
        let targetSlideIndex = 0;
        
        slides.forEach((slide, index) => {
            if (slide.dataset.category === category) {
                targetSlideIndex = index;
            }
        });
        
        this.swiperInstance.slideTo(targetSlideIndex, 600);
        
        console.log(`🎯 الانتقال إلى سلايد: ${category} (Index: ${targetSlideIndex})`);
    },
    
    closeSwiper: function() {
        console.log('🔴 محاولة إغلاق Skills Swiper');
        
        if (this.elements.swiperContainer) {
            this.elements.swiperContainer.style.display = 'none';
            console.log('✅ تم إخفاء حاوية Skills Swiper');
            
            // إزالة النشاط من أزرار التنقل
            if (this.elements.nav) {
                this.elements.nav.querySelectorAll('.skill-nav-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
            }
            
            // إعادة تعيين العنوان
            if (this.elements.categoryTitle) {
                this.elements.categoryTitle.innerHTML = 'Skills & Expertise';
            }
            
            // إشعار التوافق مع hideAllSwiperContainers
            hideAllSwiperContainers();
        } else {
            console.log('⚠️ عنصر swiperContainer غير موجود');
        }
    },
    
    updateActiveButton: function(category) {
        if (!this.elements.nav) return;
        
        this.elements.nav.querySelectorAll('.skill-nav-btn').forEach(button => {
            button.classList.remove('active');
        });
        
        const activeButton = this.elements.nav.querySelector(`[data-category="${category}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }
    }
};

document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio initialized');
    
    // Initialize all components
    initTheme();
    setupEventListeners();
    
    // Set current year in footer
    updateCurrentYear();
    
    // Add event listeners for CV downloads
    setupCvDownloadTracking();
    
    // Setup click outside to close swipers
    setupSwiperCloseListeners();
    
    // Setup keyboard listeners
    setupKeyboardListeners();
    
    // Initialize Skills Manager if skills section exists
    if (document.getElementById('skills')) {
        // تحميل بيانات المهارات أولاً إذا لم تكن محملة
        if (typeof skillsData !== 'undefined') {
            SkillsManagerNew.init();
        } else {
            console.log('⏳ Waiting for skills data to load...');
            // إعادة المحاولة بعد تأخير
            setTimeout(() => {
                if (typeof skillsData !== 'undefined') {
                    SkillsManagerNew.init();
                } else {
                    console.error('❌ Skills data not loaded. Please check the skills-data.js file.');
                }
            }, 500);
        }
    }
});

/**
 * إضافة Event Listener لإغلاق السلايدر عند النقر خارج المحتوى
 */
function setupSwiperCloseListeners() {
    document.addEventListener('click', function(e) {
        console.log('🖱️ تم النقر خارج المحتوى');
        
        const webSwiperContainer = document.getElementById('web-swiper-container');
        const mobileSwiperContainer = document.getElementById('mobile-swiper-container');
        const iotSwiperContainer = document.getElementById('iot-swiper-container');
        const skillsSwiperContainer = document.getElementById('skills-swiper-container');
        
        // Check if any swiper is open
        const isAnySwiperOpen = (
            (webSwiperContainer && webSwiperContainer.style.display === 'flex') ||
            (mobileSwiperContainer && mobileSwiperContainer.style.display === 'flex') ||
            (iotSwiperContainer && iotSwiperContainer.style.display === 'flex') ||
            (skillsSwiperContainer && skillsSwiperContainer.style.display === 'flex')
        );
        
        if (!isAnySwiperOpen) return;
        
        console.log('🔍 التحقق من النقر خارج المحتوى...');
        
        // Check Web Apps swiper
        if (webSwiperContainer && webSwiperContainer.style.display === 'flex') {
            const webNav = document.getElementById('web-apps-nav');
            const isClickInsideWebSwiper = webSwiperContainer.contains(e.target);
            const isClickOnWebNav = webNav && (webNav.contains(e.target) || e.target.closest('#web-apps-nav'));
            
            if (!isClickInsideWebSwiper && !isClickOnWebNav) {
                console.log('❌ النقر خارج Web Apps swiper - إغلاقه');
                if (typeof WebProjectsManager !== 'undefined' && typeof WebProjectsManager.closeSwiper === 'function') {
                    WebProjectsManager.closeSwiper();
                }
                return;
            }
        }
        
        // Check Mobile Apps swiper
        if (mobileSwiperContainer && mobileSwiperContainer.style.display === 'flex') {
            const mobileNav = document.getElementById('mobile-apps-nav');
            const isClickInsideMobileSwiper = mobileSwiperContainer.contains(e.target);
            const isClickOnMobileNav = mobileNav && (mobileNav.contains(e.target) || e.target.closest('#mobile-apps-nav'));
            
            if (!isClickInsideMobileSwiper && !isClickOnMobileNav) {
                console.log('❌ النقر خارج Mobile Apps swiper - إغلاقه');
                if (typeof MobileProjectsManagerNew !== 'undefined' && typeof MobileProjectsManagerNew.closeSwiper === 'function') {
                    MobileProjectsManagerNew.closeSwiper();
                }
                return;
            }
        }
        
        // Check IoT Projects swiper
        if (iotSwiperContainer && iotSwiperContainer.style.display === 'flex') {
            const iotNav = document.getElementById('iot-projects-nav');
            const isClickInsideIotSwiper = iotSwiperContainer.contains(e.target);
            const isClickOnIotNav = iotNav && (iotNav.contains(e.target) || e.target.closest('#iot-projects-nav'));
            
            if (!isClickInsideIotSwiper && !isClickOnIotNav) {
                console.log('❌ النقر خارج IoT Projects swiper - إغلاقه');
                if (typeof IoTProjectsManagerNew !== 'undefined' && typeof IoTProjectsManagerNew.closeSwiper === 'function') {
                    IoTProjectsManagerNew.closeSwiper();
                }
                return;
            }
        }
        
        // Check Skills swiper
        if (skillsSwiperContainer && skillsSwiperContainer.style.display === 'flex') {
            const skillsNav = document.getElementById('skills-nav');
            const isClickInsideSkillsSwiper = skillsSwiperContainer.contains(e.target);
            const isClickOnSkillsNav = skillsNav && (skillsNav.contains(e.target) || e.target.closest('#skills-nav'));
            
            if (!isClickInsideSkillsSwiper && !isClickOnSkillsNav) {
                console.log('❌ النقر خارج Skills swiper - إغلاقه');
                if (typeof SkillsManagerNew !== 'undefined' && typeof SkillsManagerNew.closeSwiper === 'function') {
                    SkillsManagerNew.closeSwiper();
                }
                return;
            }
        }
    });
}

/**
 * إضافة Event Listener للزر Escape
 */
function setupKeyboardListeners() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            console.log('⎋ ضغط على زر Escape');
            
            const webSwiperContainer = document.getElementById('web-swiper-container');
            const mobileSwiperContainer = document.getElementById('mobile-swiper-container');
            const iotSwiperContainer = document.getElementById('iot-swiper-container');
            const skillsSwiperContainer = document.getElementById('skills-swiper-container');
            
            // Close Web Apps swiper
            if (webSwiperContainer && webSwiperContainer.style.display === 'flex') {
                console.log('❌ إغلاق Web Apps swiper باستخدام Escape');
                if (typeof WebProjectsManager !== 'undefined' && typeof WebProjectsManager.closeSwiper === 'function') {
                    WebProjectsManager.closeSwiper();
                }
                return;
            }
            
            // Close Mobile Apps swiper
            if (mobileSwiperContainer && mobileSwiperContainer.style.display === 'flex') {
                console.log('❌ إغلاق Mobile Apps swiper باستخدام Escape');
                if (typeof MobileProjectsManagerNew !== 'undefined' && typeof MobileProjectsManagerNew.closeSwiper === 'function') {
                    MobileProjectsManagerNew.closeSwiper();
                }
                return;
            }
            
            // Close IoT Projects swiper
            if (iotSwiperContainer && iotSwiperContainer.style.display === 'flex') {
                console.log('❌ إغلاق IoT Projects swiper باستخدام Escape');
                if (typeof IoTProjectsManagerNew !== 'undefined' && typeof IoTProjectsManagerNew.closeSwiper === 'function') {
                    IoTProjectsManagerNew.closeSwiper();
                }
                return;
            }
            
            // Close Skills swiper
            if (skillsSwiperContainer && skillsSwiperContainer.style.display === 'flex') {
                console.log('❌ إغلاق Skills swiper باستخدام Escape');
                if (typeof SkillsManagerNew !== 'undefined' && typeof SkillsManagerNew.closeSwiper === 'function') {
                    SkillsManagerNew.closeSwiper();
                }
                return;
            }
        }
    });
}

/**
 * Initialize theme (dark/light mode)
 */
function initTheme() {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Update theme toggle button if exists
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.checked = savedTheme === 'dark';
        themeToggle.addEventListener('change', function() {
            const newTheme = this.checked ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('show');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (menuToggle && navLinks && navLinks.classList.contains('show')) {
            if (!menuToggle.contains(event.target) && !navLinks.contains(event.target)) {
                navLinks.classList.remove('show');
                menuToggle.classList.remove('active');
            }
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            
            if (menuToggle && navLinks && navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
                menuToggle.classList.remove('active');
            }
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Update current year in footer
 */
function updateCurrentYear() {
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
}

/**
 * Setup CV download tracking
 */
function setupCvDownloadTracking() {
    const cvLinks = document.querySelectorAll('a[href*="cv"]');
    
    cvLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('CV downloaded: ', this.href);
        });
    });
}

// Export for other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        hideAllSwiperContainers,
        SkillsManagerNew
    };
}