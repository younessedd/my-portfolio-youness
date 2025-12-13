/**
 * skills-modal.js - Skills Modal Management
 * مع هيدر صغير يظهر اسم الفئة
 * زر الإغلاق في الهيدر في المنتصف عمودياً
 * نفس تصميم Web Apps
 */

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
    skillsData: null,
    
    init: function(skillsData) {
        this.skillsData = skillsData || window.skillsData;
        this.cacheElements();
        this.setupNavigation();
        this.setupHeaderCloseButton();
        console.log('✅ Skills manager initialized with data structure');
    },
    
    cacheElements: function() {
        this.elements.nav = document.getElementById('skills-nav');
        this.elements.swiperContainer = document.getElementById('skills-swiper-container');
        this.elements.swiper = document.getElementById('skillsSwiper');
        this.elements.categoryTitle = document.getElementById('skills-category-title');
        this.elements.headerCloseBtn = document.querySelector('#skills-swiper-container .header-close-btn');
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
        
        // إزالة أي event listeners سابقة
        const newBtn = this.elements.headerCloseBtn.cloneNode(true);
        this.elements.headerCloseBtn.parentNode.replaceChild(newBtn, this.elements.headerCloseBtn);
        this.elements.headerCloseBtn = newBtn;
        
        this.elements.headerCloseBtn.addEventListener('click', (e) => {
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
    },
    
    showCategory: function(category, buttonText) {
        console.log(`📋 عرض فئة: ${category} - ${buttonText}`);
        
        this.currentCategory = category;
        
        // تحديث العنوان في الهيدر
        this.updateCategoryTitle(category, buttonText);
        
        const skillSets = this.getSkillSetsByCategory(category);
        
        if (skillSets.length === 0) {
            console.warn(`⚠️ No skill sets found for category: ${category}`);
            return;
        }
        
        // إخفاء الحاويات الأخرى
        if (typeof hideAllSwiperContainers === 'function') {
            hideAllSwiperContainers();
        }
        
        if (this.elements.swiperContainer) {
            this.elements.swiperContainer.style.display = 'flex';
            console.log('📱 عرض حاوية السلايدر (Skills)');
        }
        
        this.initializeSwiper(skillSets);
        this.updateActiveButton(category);
        
        setTimeout(() => {
            if (this.elements.swiperContainer) {
                this.elements.swiperContainer.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest' 
                });
            }
        }, 100);
        
        console.log(`📊 عرض ${skillSets.length} مجموعة مهارات لفئة: ${category}`);
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
    
    getSkillSetsByCategory: function(category) {
        if (this.skillsData && this.skillsData[category]) {
            return this.skillsData[category];
        }
        return [];
    },
    
    initializeSwiper: function(skillSets) {
        // تدمير السلايدر الحالي إذا كان موجوداً
        if (this.swiperInstance) {
            this.swiperInstance.destroy(true, true);
            this.swiperInstance = null;
        }
        
        // تنظيف الـ wrapper
        const wrapper = this.elements.swiper?.querySelector('.swiper-wrapper');
        if (wrapper) {
            wrapper.innerHTML = '';
        }
        
        if (skillSets.length === 0) {
            this.showNoSkillSetsMessage();
            return;
        }
        
        // إضافة مجموعات المهارات للسلايدر
        skillSets.forEach((skillSet, index) => {
            this.addSkillSetToSwiper(skillSet, index);
        });
        
        // تهيئة السلايدر الرئيسي بدون أزرار التنقل
        this.initMainSwiper();
        
        // إعادة إعداد زر الإغلاق
        setTimeout(() => {
            this.setupHeaderCloseButton();
            console.log('✅ تهيئة كاملة - مع هيدر وزر إغلاق متمركز');
        }, 200);
    },
    
    showNoSkillSetsMessage: function() {
        const wrapper = this.elements.swiper?.querySelector('.swiper-wrapper');
        if (!wrapper) return;
        
        wrapper.innerHTML = `
            <div class="swiper-slide">
                <div class="project-card">
                    <div class="project-info">
                        <div class="skills-category-container">
                            <h3 class="skill-main-title">No Skill Sets Found</h3>
                            <p class="skill-main-description" style="color: var(--text-secondary);">
                                No skill sets available for this category.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.swiperInstance = new Swiper(this.elements.swiper, {
            loop: false,
            allowTouchMove: true,
        });
    },
    
    addSkillSetToSwiper: function(skillSet, index) {
        const wrapper = this.elements.swiper?.querySelector('.swiper-wrapper');
        if (!wrapper) return;
        
        const skillsHTML = this.generateSkillsHTML(skillSet.skills);
        const featuresHTML = this.generateFeaturesHTML(skillSet.features);
        
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.dataset.category = skillSet.category;
        
        slide.innerHTML = `
            <div class="project-card">
                <div class="project-info">
                    <div class="skills-category-container">
                    
                        <p class="skill-main-description">${skillSet.description}</p>
                        
                        <div class="skills-grid-container">
                            ${skillsHTML}
                        </div>
                        
                        <div class="skill-set-features">
                            <h4 class="features-title">Key Competencies:</h4>
                            <ul class="features-list">
                                ${featuresHTML}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        wrapper.appendChild(slide);
    },
    
    generateSkillsHTML: function(skills) {
        return skills.map(skill => `
            <div class="skill-item" style="background: linear-gradient(135deg, ${skill.color}40, ${skill.color}80); border-left: 4px solid ${skill.color};">
                <i class="${skill.icon}" style="color: ${skill.color};"></i>
                <span>${skill.name}</span>
            </div>
        `).join('');
    },
    
    generateFeaturesHTML: function(features) {
        return features.map(feature => `
            <li>
                <i class="fas fa-check-circle"></i>
                ${feature}
            </li>
        `).join('');
    },
    
    initMainSwiper: function() {
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
        
        console.log('✅ Main swiper initialized with infinite loop (no navigation buttons)');
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
            if (typeof hideAllSwiperContainers === 'function') {
                hideAllSwiperContainers();
            }
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

// التهيئة عند تحميل الـ DOM
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('skills')) {
        if (typeof skillsData !== 'undefined') {
            SkillsManagerNew.init(skillsData);
        } else {
            console.warn('⚠️ Skills data not loaded.');
        }
    }
});