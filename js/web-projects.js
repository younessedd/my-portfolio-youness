/**
 * web-projects.js - Web Projects Management
 * مع هيدر صغير يظهر اسم الفئة
 * زر الإغلاق في الهيدر (متمركز عمودياً)
 * أزرار التنقل تظهر فقط على الشاشات الكبيرة
 * روابط المشروع تحت الوصف مباشرة
 */

const WebProjectsManager = {
    elements: {
        nav: null,
        swiperContainer: null,
        swiper: null,
        categoryTitle: null,
        headerCloseBtn: null
    },
    
    currentCategory: 'frontend',
    swiperInstance: null,
    imageSwipers: [],
    
    init: function() {
        this.cacheElements();
        this.setupNavigation();
        this.setupHeaderCloseButton();
        console.log('✅ Web projects manager initialized - مع هيدر وزر إغلاق متمركز');
    },
    
    cacheElements: function() {
        this.elements.nav = document.getElementById('web-apps-nav');
        this.elements.swiperContainer = document.getElementById('web-swiper-container');
        this.elements.swiper = document.getElementById('webSwiper');
        this.elements.categoryTitle = document.getElementById('web-category-title');
        this.elements.headerCloseBtn = document.querySelector('#web-swiper-container .header-close-btn');
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
        if (!this.elements.headerCloseBtn) return;
        
        // إزالة أي event listeners سابقة
        const newBtn = this.elements.headerCloseBtn.cloneNode(true);
        this.elements.headerCloseBtn.parentNode.replaceChild(newBtn, this.elements.headerCloseBtn);
        this.elements.headerCloseBtn = newBtn;
        
        this.elements.headerCloseBtn.addEventListener('click', (e) => {
            console.log('🟢 زر الإغلاق في الهيدر تم النقر عليه (Web)');
            e.stopPropagation();
            e.preventDefault();
            this.closeSwiper();
        });
        
        // التأكد من أن الزر مرئي ويعمل ومتمركز عمودياً
        this.elements.headerCloseBtn.style.display = 'flex';
        this.elements.headerCloseBtn.style.visibility = 'visible';
        this.elements.headerCloseBtn.style.opacity = '1';
        this.elements.headerCloseBtn.style.pointerEvents = 'auto';
        this.elements.headerCloseBtn.style.cursor = 'pointer';
        this.elements.headerCloseBtn.style.top = '50%';
        this.elements.headerCloseBtn.style.transform = 'translateY(-50%)';
        
        // التأكد من أن زر الإغلاق في الموضع الصحيح
        console.log('📍 زر الإغلاق تم وضعه في الهيدر (Web) (متمركز عمودياً)');
    },
    
    showCategory: function(category, buttonText) {
        this.currentCategory = category;
        
        // تحديث العنوان في الهيدر
        this.updateCategoryTitle(category, buttonText);
        
        const projects = this.getProjectsByCategory(category);
        
        if (projects.length === 0) {
            console.warn(`⚠️ No projects found for category: ${category}`);
            return;
        }
        
        // إخفاء الحاويات الأخرى
        if (typeof hideAllSwiperContainers === 'function') {
            hideAllSwiperContainers();
        }
        
        if (this.elements.swiperContainer) {
            this.elements.swiperContainer.style.display = 'flex';
            console.log('📱 عرض حاوية السلايدر (Web)');
        }
        
        this.initializeSwiper(projects);
        this.updateActiveButton(category);
        
        setTimeout(() => {
            if (this.elements.swiperContainer) {
                this.elements.swiperContainer.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest' 
                });
            }
        }, 100);
        
        console.log(`📊 عرض ${projects.length} مشروع لفئة: ${category}`);
    },
    
    updateCategoryTitle: function(category, buttonText) {
        if (!this.elements.categoryTitle) return;
        
        // أيقونة حسب الفئة
        const icons = {
            'frontend': 'fa-code',
            'fullstack': 'fa-server',
            'responsive': 'fa-mobile-alt'
        };
        
        const icon = icons[category] || 'fa-laptop-code';
        
        // تحديث النص والأيقونة
        this.elements.categoryTitle.innerHTML = `
            <i class="fas ${icon}"></i>
            <span>${buttonText}</span>
        `;
    },
    
    getProjectsByCategory: function(category) {
        if (typeof webProjectsData !== 'undefined' && webProjectsData[category]) {
            return webProjectsData[category];
        }
        return [];
    },
    
    getCategoryName: function(category) {
        const names = {
            'frontend': 'Frontend',
            'fullstack': 'Fullstack',
            'responsive': 'Responsive'
        };
        return names[category] || category;
    },
    
    initializeSwiper: function(projects) {
        // تدمير السلايدر الحالي إذا كان موجوداً
        if (this.swiperInstance) {
            this.swiperInstance.destroy(true, true);
            this.swiperInstance = null;
        }
        
        // تدمير سلايدرات الصور
        this.imageSwipers.forEach(swiper => swiper.destroy(true, true));
        this.imageSwipers = [];
        
        // تنظيف الـ wrapper
        const wrapper = this.elements.swiper?.querySelector('.swiper-wrapper');
        if (wrapper) {
            wrapper.innerHTML = '';
        }
        
        if (projects.length === 0) {
            this.showNoProjectsMessage();
            return;
        }
        
        // إضافة المشاريع للسلايدر
        projects.forEach((project, index) => {
            this.addProjectToSwiper(project, index);
        });
        
        // تهيئة السلايدر الرئيسي
        this.initMainSwiper();
        
        // تهيئة سلايدرات الصور بعد تأخير
        setTimeout(() => {
            this.initImageSwipers(projects);
            this.setupHeaderCloseButton();
            this.enableVerticalScrolling();
            console.log('✅ تهيئة كاملة - مع هيدر وزر إغلاق متمركز');
        }, 200);
    },
    
    showNoProjectsMessage: function() {
        const wrapper = this.elements.swiper?.querySelector('.swiper-wrapper');
        if (!wrapper) return;
        
        wrapper.innerHTML = `
            <div class="swiper-slide">
                <div class="project-card">
                    <div class="project-info">
                        <div class="image-swiper-container">
                            <div style="display: flex; align-items: center; justify-content: center; height: 100%;">
                                <h3 style="color: var(--text-secondary);">No images available</h3>
                            </div>
                        </div>
                        <h3 class="project-title" style="color: var(--text-secondary);">No projects found</h3>
                    </div>
                </div>
            </div>
        `;
        
        this.swiperInstance = new Swiper(this.elements.swiper, {
            loop: false,
            allowTouchMove: false,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    },
    
    addProjectToSwiper: function(project, index) {
        const wrapper = this.elements.swiper?.querySelector('.swiper-wrapper');
        if (!wrapper) return;
        
        const imageSwiperId = `web-image-swiper-${project.id}`;
        const techTagsHTML = this.generateTechTagsHTML(project.technologies);
        
        // إنشاء روابط المشروع (سيكون تحت الوصف)
        const projectLinksHTML = project.links.map(link => `
            <a href="${link.url}" class="project-link" target="_blank" rel="noopener">
                <i class="fas ${link.icon}"></i> ${link.name}
            </a>
        `).join('');
        
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        
        slide.innerHTML = `
            <div class="project-card">
                <div class="project-info">
                    <div class="image-swiper-container">
                        <div class="swiper image-swiper ${imageSwiperId}">
                            <div class="swiper-wrapper">
                                ${project.images.map(img => `
                                    <div class="swiper-slide image-slide">
                                        <img src="${img}" alt="${project.title}" class="project-image">
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    
                    <!-- روابط المشروع تحت الوصف مباشرة -->
                    <div class="project-links-top">
                        ${projectLinksHTML}
                    </div>
                    
                    <div class="project-features">
                        <h4 class="features-title">Key Features:</h4>
                        <ul class="features-list">
                            ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="project-technologies">
                        <h4 class="tech-title">Technologies:</h4>
                        <div class="tech-tags-container">
                            ${techTagsHTML}
                        </div>
                    </div>
                    
                    <!-- الروابط القديمة في الأسفل مخفية -->
                    <div class="project-links" style="display: none;"></div>
                </div>
            </div>
        `;
        
        wrapper.appendChild(slide);
    },
    
    generateTechTagsHTML: function(technologies) {
        const techClassMap = {
            "HTML5": "html5", "CSS3": "css3", "JavaScript": "javascript",
            "React.js": "react", "Laravel": "laravel", "PHP": "php",
            "MySQL": "mysql", "Bootstrap": "bootstrap", "Tailwind CSS": "tailwind",
            "Node.js": "nodejs", "Express": "express", "MongoDB": "mongodb",
            "Firebase": "firebase", "REST API": "rest", "API": "api",
            "Git": "git", "Responsive Design": "responsive", "UI/UX": "uiux"
        };
        
        return technologies.map(tech => {
            const cleanTech = tech.replace(/\([^)]*\)/g, '').trim();
            const techClass = techClassMap[cleanTech] || 'api';
            return `<span class="tech-tag ${techClass}">${tech}</span>`;
        }).join('');
    },
    
    initMainSwiper: function() {
        if (!this.elements.swiper) return;
        
        this.swiperInstance = new Swiper(this.elements.swiper, {
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            spaceBetween: 0,
            speed: 600,
            keyboard: { enabled: true },
            mousewheel: { forceToAxis: true },
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 1,
            effect: 'slide',
        });
        
        console.log('✅ Main swiper initialized with infinite loop');
    },
    
    initImageSwipers: function(projects) {
        projects.forEach((project, index) => {
            const imageSwiperId = `web-image-swiper-${project.id}`;
            const imageSwiperEl = document.querySelector(`.${imageSwiperId}`);
            
            if (imageSwiperEl) {
                const imageSwiper = new Swiper(imageSwiperEl, {
                    loop: true,
                    autoplay: { delay: 4000 },
                    effect: 'fade',
                    speed: 800,
                    allowTouchMove: true,
                    grabCursor: true,
                    fadeEffect: {
                        crossFade: true
                    },
                });
                
                this.imageSwipers.push(imageSwiper);
            }
        });
    },
    
    closeSwiper: function() {
        console.log('🔴 محاولة إغلاق Web Swiper');
        
        if (this.elements.swiperContainer) {
            this.elements.swiperContainer.style.display = 'none';
            console.log('✅ تم إخفاء حاوية Web Swiper');
            
            // إزالة النشاط من أزرار التنقل
            if (this.elements.nav) {
                this.elements.nav.querySelectorAll('.skill-nav-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
            }
            
            // إعادة تعيين العنوان
            if (this.elements.categoryTitle) {
                this.elements.categoryTitle.innerHTML = 'Web Applications';
            }
            
            // إيقاف التشغيل التلقائي لسلايدرات الصور
            this.imageSwipers.forEach(swiper => {
                if (swiper.autoplay && swiper.autoplay.running) {
                    swiper.autoplay.stop();
                }
            });
            
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
    },
    
    enableVerticalScrolling: function() {
        const projectInfos = document.querySelectorAll('.project-info');
        
        projectInfos.forEach(info => {
            info.addEventListener('wheel', (e) => {
                const isAtTop = info.scrollTop === 0;
                const isAtBottom = info.scrollTop + info.clientHeight >= info.scrollHeight - 1;
                
                if (info.scrollHeight > info.clientHeight) {
                    if ((!isAtTop && e.deltaY < 0) || (!isAtBottom && e.deltaY > 0)) {
                        e.stopPropagation();
                    }
                }
            });
            
            // لمنع تمرير السلايدر عند التمرير في المحتوى على اللمس
            info.addEventListener('touchstart', (e) => {
                e.stopPropagation();
            });
            
            info.addEventListener('touchmove', (e) => {
                e.stopPropagation();
            });
        });
    }
};

// التهيئة عند تحميل الـ DOM
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('web-apps')) {
        WebProjectsManager.init();
    }
});

// تحديث أزرار التنقل عند تغيير حجم النافذة
window.addEventListener('resize', function() {
    // CSS Media Queries ستتعامل مع إظهار/إخفاء الأزرار تلقائياً
    console.log('🔄 تغيير حجم النافذة - CSS Media Queries ستتعامل مع الأزرار');
});