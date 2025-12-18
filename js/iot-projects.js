/**
 * IoT Projects Manager - FIXED WITH INFINITE SCROLL (ENHANCED VERSION)
 */

const IoTProjectsManager = {
    elements: {},
    currentCategory: 'home',
    currentCardIndex: 0,
    swiperInstance: null,
    imageSwiperInstances: {},
    
    // نظام قفل محسن
    navigationLock: false,
    animationTimeout: null,
    
    isModalOpen: false,
    isImageInteracting: false,
    
    categories: ['home', 'industrial', 'sensors', 'othersiot'],
    categoryNames: {
        'home': 'Smart Home',
        'industrial': 'Industrial IoT',
        'sensors': 'Sensor Projects',
        'othersiot': 'Other IoT Projects'
    },
    
    cardPositions: {},
    
    init: function() {
        console.log('🔌 IoT Projects Manager Initializing...');
        
        if (!window.iotProjectsData) {
            console.error('❌ iotProjectsData not found!');
            return;
        }
        
        this.skillsData = window.iotProjectsData;
        this.analyzeCardPositions();
        this.cacheElements();
        this.setupNavigation();
        this.setupCloseButton();
        this.setupIconNavigation();
        this.setupCardNavigation();
        this.setupOverlayClick();
        console.log('✅ IoT Projects Manager initialized');
    },
    
    analyzeCardPositions: function() {
        this.cardPositions = {};
        let slideIndex = 0;
        
        this.categories.forEach(category => {
            const projects = this.getSkillSetsByCategory(category);
            projects.forEach((project, index) => {
                const key = `${category}-${index}`;
                this.cardPositions[key] = slideIndex;
                slideIndex++;
            });
        });
    },
    
    cacheElements: function() {
        this.elements.nav = document.getElementById('iot-projects-nav');
        this.elements.popupContainer = document.getElementById('iot-swiper-container');
        this.elements.popupOverlay = document.getElementById('iot-popup-overlay');
        this.elements.swiper = document.getElementById('iotSwiper');
        this.elements.swiperWrapper = this.elements.swiper?.querySelector('.swiper-wrapper');
        this.elements.categoryTitle = document.getElementById('iot-category-title');
        this.elements.closeBtn = document.getElementById('iot-close-btn');
        
        this.elements.iconNavBtns = document.querySelectorAll('#iot-icon-nav-top .icon-nav-btn');
        this.elements.prevCardBtn = document.getElementById('iot-prev-card');
        this.elements.nextCardBtn = document.getElementById('iot-next-card');
        this.elements.cardCounter = document.getElementById('iot-card-counter');
        this.elements.counterNumber = document.querySelector('#iot-card-counter .counter-number');
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
    
    setupCloseButton: function() {
        if (!this.elements.closeBtn) return;
        
        this.elements.closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.closePopup();
        });
    },
    
    setupOverlayClick: function() {
        if (!this.elements.popupOverlay) return;
        
        this.elements.popupOverlay.addEventListener('click', (e) => {
            if (e.target === this.elements.popupOverlay) {
                this.closePopup();
            }
        });
    },
    
    setupIconNavigation: function() {
        if (!this.elements.iconNavBtns) return;
        
        this.elements.iconNavBtns.forEach(btn => {
            btn.replaceWith(btn.cloneNode(true));
        });
        
        this.elements.iconNavBtns = document.querySelectorAll('#iot-icon-nav-top .icon-nav-btn');
        
        this.elements.iconNavBtns.forEach(iconBtn => {
            iconBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                
                if (this.navigationLock) {
                    console.log('⏳ Navigation is locked, please wait...');
                    return;
                }
                
                const category = iconBtn.dataset.category;
                
                if (category === this.currentCategory) {
                    return;
                }
                
                const categoryName = this.categoryNames[category];
                
                this.navigationLock = true;
                this.goToCategory(category, categoryName);
                
                setTimeout(() => {
                    this.navigationLock = false;
                }, 600);
            });
        });
    },
    
    setupCardNavigation: function() {
        if (this.elements.prevCardBtn) {
            this.elements.prevCardBtn.addEventListener('click', () => {
                if (this.navigationLock || this.isImageInteracting) return;
                this.navigationLock = true;
                this.navigateToPrevCard();
                setTimeout(() => { this.navigationLock = false; }, 600);
            });
        }
        
        if (this.elements.nextCardBtn) {
            this.elements.nextCardBtn.addEventListener('click', () => {
                if (this.navigationLock || this.isImageInteracting) return;
                this.navigationLock = true;
                this.navigateToNextCard();
                setTimeout(() => { this.navigationLock = false; }, 600);
            });
        }
        
        document.addEventListener('keydown', (e) => {
            if (this.isModalOpen && !this.isImageInteracting && !this.navigationLock) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    this.navigationLock = true;
                    this.navigateToPrevCard();
                    setTimeout(() => { this.navigationLock = false; }, 600);
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    this.navigationLock = true;
                    this.navigateToNextCard();
                    setTimeout(() => { this.navigationLock = false; }, 600);
                } else if (e.key === 'Escape') {
                    this.closePopup();
                }
            }
        });
    },
    
    showCategory: function(category, buttonText) {
        console.log(`🔌 Opening category: ${category}`);
        
        this.currentCategory = category;
        this.currentCardIndex = 0;
        this.isModalOpen = true;
        this.isImageInteracting = false;
        this.navigationLock = false;
        
        this.elements.popupContainer.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        this.updateCategoryTitle(category, buttonText);
        this.updateIconNavigation(category);
        this.updateActiveButton(category);
        
        this.initializeSwiperWithAllCategories();
        
        setTimeout(() => {
            const targetSlideIndex = this.cardPositions[`${category}-0`];
            
            if (targetSlideIndex !== undefined && this.swiperInstance) {
                this.currentCardIndex = 0;
                this.swiperInstance.slideTo(targetSlideIndex, 0);
                this.updateCardCounter(category);
                
                // ✅ CRITICAL FIX: Initialize image swipers immediately
                setTimeout(() => {
                    this.initializeImageSwipers();
                    this.setupImageScrollHandlers();
                }, 100);
            }
        }, 100);
    },
    
    goToCategory: function(category, categoryName) {
        if (!category || !this.swiperInstance) {
            console.error('❌ Cannot go to category:', category);
            this.navigationLock = false;
            return;
        }
        
        console.log(`🔄 Switching to category: ${category}`);
        
        const targetSlideIndex = this.cardPositions[`${category}-0`];
        
        if (targetSlideIndex === undefined) {
            console.error(`❌ No slides found for category: ${category}`);
            this.navigationLock = false;
            return;
        }
        
        this.currentCategory = category;
        this.currentCardIndex = 0;
        
        this.updateCategoryTitle(category, categoryName);
        this.updateIconNavigation(category);
        this.updateCardCounter(category);
        this.updateActiveButton(category);
        
        this.swiperInstance.slideTo(targetSlideIndex, 600);
    },
    
    goToCategoryCard: function(category, cardIndex) {
        if (!this.swiperInstance || this.navigationLock) return;
        
        const key = `${category}-${cardIndex}`;
        const targetSlideIndex = this.cardPositions[key];
        
        if (targetSlideIndex !== undefined) {
            this.currentCardIndex = cardIndex;
            this.swiperInstance.slideTo(targetSlideIndex, 600);
            this.updateCardCounter(category);
        }
    },
    
    navigateToPrevCard: function() {
        if (!this.swiperInstance || this.navigationLock) return;
        
        const currentCardCount = this.getCardCountForCategory(this.currentCategory);
        let prevCardIndex = this.currentCardIndex - 1;
        
        if (prevCardIndex < 0) {
            const currentCategoryIndex = this.categories.indexOf(this.currentCategory);
            let prevCategoryIndex = currentCategoryIndex - 1;
            
            if (prevCategoryIndex < 0) {
                prevCategoryIndex = this.categories.length - 1;
            }
            
            const prevCategory = this.categories[prevCategoryIndex];
            const prevCategoryCardCount = this.getCardCountForCategory(prevCategory);
            
            this.currentCategory = prevCategory;
            this.currentCardIndex = prevCategoryCardCount - 1;
            
            this.goToCategoryCard(prevCategory, this.currentCardIndex);
            this.updateCardCounter(prevCategory);
            this.updateCategoryTitle(prevCategory, this.categoryNames[prevCategory]);
            this.updateIconNavigation(prevCategory);
            this.updateActiveButton(prevCategory);
        } else {
            this.currentCardIndex = prevCardIndex;
            this.goToCategoryCard(this.currentCategory, this.currentCardIndex);
        }
    },
    
    navigateToNextCard: function() {
        if (!this.swiperInstance || this.navigationLock) return;
        
        const currentCardCount = this.getCardCountForCategory(this.currentCategory);
        let nextCardIndex = this.currentCardIndex + 1;
        
        if (nextCardIndex >= currentCardCount) {
            const currentCategoryIndex = this.categories.indexOf(this.currentCategory);
            let nextCategoryIndex = currentCategoryIndex + 1;
            
            if (nextCategoryIndex >= this.categories.length) {
                nextCategoryIndex = 0;
            }
            
            const nextCategory = this.categories[nextCategoryIndex];
            
            this.currentCategory = nextCategory;
            this.currentCardIndex = 0;
            
            this.goToCategoryCard(nextCategory, this.currentCardIndex);
            this.updateCardCounter(nextCategory);
            this.updateCategoryTitle(nextCategory, this.categoryNames[nextCategory]);
            this.updateIconNavigation(nextCategory);
            this.updateActiveButton(nextCategory);
        } else {
            this.currentCardIndex = nextCardIndex;
            this.goToCategoryCard(this.currentCategory, this.currentCardIndex);
        }
    },
    
    updateIconNavigation: function(category) {
        if (!this.elements.iconNavBtns) return;
        
        this.elements.iconNavBtns.forEach(iconBtn => {
            iconBtn.classList.remove('active');
            if (iconBtn.dataset.category === category) {
                iconBtn.classList.add('active');
            }
        });
    },
    
    updateCardCounter: function(category) {
        if (!this.elements.cardCounter || !this.elements.counterNumber) return;
        
        const cardCount = this.getCardCountForCategory(category);
        const currentCard = this.currentCardIndex + 1;
        
        this.elements.counterNumber.textContent = `${currentCard}/${cardCount}`;
    },
    
    updateCategoryTitle: function(category, buttonText) {
        if (!this.elements.categoryTitle) return;
        
        const icons = {
            'home': 'fa-home',
            'industrial': 'fa-industry',
            'sensors': 'fa-thermometer-half',
            'othersiot': 'fa-microchip'
        };
        
        const icon = icons[category] || 'fa-microchip';
        
        this.elements.categoryTitle.innerHTML = `
            <i class="fas ${icon}"></i>
            <span>${buttonText}</span>
        `;
    },
    
    getCardCountForCategory: function(category) {
        if (this.skillsData && this.skillsData[category]) {
            return this.skillsData[category].length;
        }
        return 0;
    },
    
    getSkillSetsByCategory: function(category) {
        if (this.skillsData && this.skillsData[category]) {
            return this.skillsData[category];
        }
        return [];
    },
    
    initializeSwiperWithAllCategories: function() {
        if (this.swiperInstance) {
            this.swiperInstance.destroy(true, true);
            this.swiperInstance = null;
        }
        
        this.imageSwiperInstances = {};
        
        if (this.elements.swiperWrapper) {
            this.elements.swiperWrapper.innerHTML = '';
        }
        
        let slideIndex = 0;
        const newCardPositions = {};
        
        this.categories.forEach(category => {
            const skillSets = this.getSkillSetsByCategory(category);
            if (skillSets.length > 0) {
                skillSets.forEach((skillSet, index) => {
                    this.addSkillSetToSwiper(skillSet, index);
                    
                    const key = `${category}-${index}`;
                    newCardPositions[key] = slideIndex;
                    slideIndex++;
                });
            }
        });
        
        this.cardPositions = newCardPositions;
        
        this.initMainSwiper();
    },
    
    addSkillSetToSwiper: function(skillSet, index) {
        if (!this.elements.swiperWrapper) return;
        
        const featuresHTML = this.generateFeaturesHTML(skillSet.features);
        const techTagsHTML = this.generateTechTagsHTML(skillSet.technologies);
        const linksHTML = skillSet.links ? this.generateProjectLinksHTML(skillSet.links) : '';
        const imagesHTML = this.generateImagesHTML(skillSet.images, skillSet.id);
        
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.dataset.category = skillSet.category;
        slide.dataset.cardIndex = index;
        slide.dataset.projectId = skillSet.id;
        
        slide.innerHTML = `
            <div class="project-card">
                <div class="project-info">
                    <div class="skills-category-container">
                        ${imagesHTML}
                        
                        <h3 class="skill-main-title">${skillSet.title}</h3>
                        <p class="skill-main-description">${skillSet.description}</p>
                        
                        ${linksHTML}
                        
                        <div class="skill-set-features">
                            <h4 class="features-title">Key Features:</h4>
                            <ul class="features-list">
                                ${featuresHTML}
                            </ul>
                        </div>
                        
                        <div class="skill-set-features">
                            <h4 class="features-title">Technologies:</h4>
                            <div class="tech-tags-container">
                                ${techTagsHTML}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.elements.swiperWrapper.appendChild(slide);
    },
    
    generateImagesHTML: function(images, projectId) {
        if (!images || images.length === 0) {
            return `
                <div class="project-images-container">
                    <div class="no-image-placeholder">
                        <i class="fas fa-microchip"></i>
                        <span>No images available</span>
                    </div>
                </div>
            `;
        }
        
        const displayImages = images.slice(0, 5);
        const slides = displayImages.map((img, idx) => `
            <div class="swiper-slide image-slide">
                <img src="${img}" alt="IoT Project Image ${idx + 1}" class="project-image">
            </div>
        `).join('');
        
        const dots = displayImages.map((_, idx) => `
            <div class="image-dot ${idx === 0 ? 'active' : ''}" data-index="${idx}"></div>
        `).join('');
        
        return `
            <div class="project-images-container" data-project-id="${projectId}">
                <div class="swiper image-swiper">
                    <div class="swiper-wrapper">
                        ${slides}
                    </div>
                    <div class="image-swiper-button-next">
                        <i class="fas fa-chevron-right"></i>
                    </div>
                    <div class="image-swiper-button-prev">
                        <i class="fas fa-chevron-left"></i>
                    </div>
                </div>
                <div class="image-nav-dots">
                    ${dots}
                </div>
            </div>
        `;
    },
    
    generateProjectLinksHTML: function(links) {
        return `
            <div class="project-links-top">
                ${links.map(link => `
                    <a href="${link.url}" class="project-link" target="_blank" rel="noopener noreferrer">
                        <i class="fas ${link.icon}"></i> ${link.name}
                    </a>
                `).join('')}
            </div>
        `;
    },
    
    generateFeaturesHTML: function(features) {
        return features.map((feature, index) => `
            <li>${feature}</li>
        `).join('');
    },
    
    generateTechTagsHTML: function(technologies) {
        const techTagColors = {
            'Arduino': { bgColor: '#00979D', textColor: 'white' },
            'ESP32': { bgColor: '#5C2D91', textColor: 'white' },
            'ESP8266': { bgColor: '#005F73', textColor: 'white' },
            'Raspberry Pi': { bgColor: '#C51A4A', textColor: 'white' },
            'MQTT': { bgColor: '#660066', textColor: 'white' },
            'Bluetooth': { bgColor: '#0082FC', textColor: 'white' },
            'WiFi': { bgColor: '#FF6B00', textColor: 'white' },
            'LoRa': { bgColor: '#00A8E8', textColor: 'white' },
            'Sensors': { bgColor: '#8E24AA', textColor: 'white' },
            'PLC': { bgColor: '#00695C', textColor: 'white' },
            'SCADA': { bgColor: '#2E7D32', textColor: 'white' },
            'IoT': { bgColor: '#00BCD4', textColor: 'white' },
            'Automation': { bgColor: '#FF9800', textColor: 'black' },
            'Default': { bgColor: '#4f46e5', textColor: 'white' }
        };
        
        return technologies.map(tech => {
            const techConfig = techTagColors[tech] || techTagColors['Default'];
            return `
                <span class="tech-tag" style="background-color: ${techConfig.bgColor}; color: ${techConfig.textColor};">
                    <i class="fas fa-microchip"></i>
                    ${tech}
                </span>
            `;
        }).join('');
    },
    
    initMainSwiper: function() {
        if (!this.elements.swiper) return;
        
        this.swiperInstance = new Swiper(this.elements.swiper, {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            
            pagination: {
                el: '.popup-counter',
                type: 'fraction',
                clickable: true,
            },
            
            navigation: {
                nextEl: this.elements.nextCardBtn,
                prevEl: this.elements.prevCardBtn,
            },
            
            on: {
                init: () => {
                    this.initializeImageSwipers();
                },
                
                slideChange: () => {
                    if (!this.swiperInstance) return;
                    
                    const activeSlide = this.swiperInstance.slides[this.swiperInstance.activeIndex];
                    const category = activeSlide.dataset.category;
                    const cardIndex = parseInt(activeSlide.dataset.cardIndex);
                    
                    if (category) {
                        this.currentCategory = category;
                        this.currentCardIndex = cardIndex;
                        
                        const categoryName = this.categoryNames[category];
                        this.updateIconNavigation(category);
                        this.updateCardCounter(category);
                        this.updateActiveButton(category);
                        this.updateCategoryTitle(category, categoryName);
                        
                        setTimeout(() => {
                            this.initializeImageSwipers();
                        }, 50);
                    }
                }
            }
        });
    },
    
    // ✅ إصلاح جذري لخطأ newImageSwiper
    initializeImageSwipers: function() {
        if (!this.swiperInstance) return;
        
        try {
            const activeSlide = this.swiperInstance.slides[this.swiperInstance.activeIndex];
            if (!activeSlide) return;
            
            const imageContainer = activeSlide.querySelector('.project-images-container');
            if (!imageContainer) return;
            
            const projectId = activeSlide.dataset.projectId;
            
            // ✅ If swiper already exists, just reinitialize it
            if (this.imageSwiperInstances[projectId]) {
                try {
                    this.imageSwiperInstances[projectId].destroy(true, true);
                } catch (e) {
                    console.log('Clearing old image swiper instance');
                }
            }
            
            const imageSwiperEl = imageContainer.querySelector('.image-swiper');
            if (!imageSwiperEl) return;
            
            // ✅ Add CSS for better scroll handling
            imageSwiperEl.style.cssText = `
                width: 100%;
                height: 100%;
                overflow: hidden;
            `;
            
            const images = imageSwiperEl.querySelectorAll('.project-image');
            images.forEach(img => {
                img.style.cssText = `
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    pointer-events: auto;
                `;
            });
            
            let imageSwiperInstance;
            
            imageSwiperInstance = new Swiper(imageSwiperEl, {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
                
                pagination: {
                    el: imageSwiperEl.querySelector('.swiper-pagination'),
                    clickable: true,
                },
                
                navigation: {
                    nextEl: imageSwiperEl.querySelector('.image-swiper-button-next'),
                    prevEl: imageSwiperEl.querySelector('.image-swiper-button-prev'),
                },
            });
            
            // Initialize dots
            const totalSlides = imageSwiperInstance.slides.length;
            const realTotal = imageSwiperInstance.loopedSlides ? 
                totalSlides - (imageSwiperInstance.loopedSlides * 2) : totalSlides;
            
            this.updateImageDots(imageContainer, 0);
            
            // ✅ Setup dot click handlers
            this.setupImageDotsHandlers(imageContainer, imageSwiperInstance);
            
            // ✅ Ensure autoplay starts
            setTimeout(() => {
                if (imageSwiperInstance.autoplay && !imageSwiperInstance.autoplay.running) {
                    imageSwiperInstance.autoplay.start();
                }
            }, 300);
            
        } catch (error) {
            console.error('Error initializing image swiper:', error);
        }
    },
    
    // ✅ New helper method for dot handlers
    setupImageDotsHandlers: function(imageContainer, imageSwiper) {
        const dots = imageContainer.querySelectorAll('.image-dot');
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                const index = parseInt(e.currentTarget.dataset.index);
                if (!isNaN(index)) {
                    imageSwiper.slideToLoop(index);
                    this.updateImageDots(imageContainer, index);
                }
            });
        });
    },
    
    setupImageScrollHandlers: function() {
        if (!this.swiperInstance) return;
        
        const activeSlide = this.swiperInstance.slides[this.swiperInstance.activeIndex];
        if (!activeSlide) return;
        
        const imageContainer = activeSlide.querySelector('.project-images-container');
        if (!imageContainer) return;
        
        const projectId = activeSlide.dataset.projectId;
        const imageSwiper = this.imageSwiperInstances[projectId];
        
        if (!imageSwiper) return;
        
        // تنظيف المستمعات القديمة
        const newImageContainer = imageContainer.cloneNode(true);
        imageContainer.parentNode.replaceChild(newImageContainer, imageContainer);
        
        // الحصول على imageContainer الجديد
        const currentImageContainer = activeSlide.querySelector('.project-images-container');
        
        // إعادة الحصول على imageSwiper
        const currentImageSwiper = this.imageSwiperInstances[projectId];
        
        if (!currentImageSwiper) return;
        
        // إضافة مستمعات الأحداث للنقاط
        const dots = currentImageContainer.querySelectorAll('.image-dot');
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                const index = parseInt(e.currentTarget.dataset.index);
                currentImageSwiper.slideTo(index);
                this.updateImageDots(currentImageContainer, index);
            });
        });
    },
    
    updateImageDots: function(imageContainer, activeIndex) {
        const dots = imageContainer.querySelectorAll('.image-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });
    },
    
    closePopup: function() {
        console.log('🔴 Closing IoT popup');
        
        this.navigationLock = false;
        this.isImageInteracting = false;
        this.isModalOpen = false;
        
        Object.values(this.imageSwiperInstances).forEach(swiper => {
            if (swiper && !swiper.destroyed) {
                swiper.destroy(true, true);
            }
        });
        this.imageSwiperInstances = {};
        
        if (this.swiperInstance) {
            this.swiperInstance.destroy(true, true);
            this.swiperInstance = null;
        }
        
        this.elements.popupContainer.style.display = 'none';
        document.body.style.overflow = '';
        
        if (this.elements.nav) {
            this.elements.nav.querySelectorAll('.skill-nav-btn').forEach(btn => {
                btn.classList.remove('active');
            });
        }
        
        this.currentCategory = 'home';
        this.currentCardIndex = 0;
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

// التهيئة عند تحميل DOM
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('iot-projects')) {
        IoTProjectsManager.init();
    }
});

// جعل المدير متاحًا عالميًا
window.IoTProjectsManager = IoTProjectsManager;