/**
 * Mobile Projects Manager - FIXED WITH INFINITE SCROLL
 */

const MobileProjectsManager = {
    elements: {},
    currentCategory: 'quiz',
    currentCardIndex: 0,
    swiperInstance: null,
    imageSwiperInstances: {},
    
    // نظام قفل محسن
    navigationLock: false,
    animationTimeout: null,
    
    isModalOpen: false,
    isImageInteracting: false,
    
    categories: ['quiz', 'smart', 'utility', 'others'],
    categoryNames: {
        'quiz': 'Quiz Apps',
        'smart': 'Smart Home Apps',
        'utility': 'Utility Apps',
        'others': 'Other Apps'
    },
    
    cardPositions: {},
    
    init: function() {
        console.log('📱 Mobile Projects Manager Initializing...');
        
        if (!window.mobileProjectsData) {
            console.error('❌ mobileProjectsData not found!');
            return;
        }
        
        this.skillsData = window.mobileProjectsData;
        this.analyzeCardPositions();
        this.cacheElements();
        this.setupNavigation();
        this.setupCloseButton();
        this.setupIconNavigation();
        this.setupCardNavigation();
        this.setupOverlayClick();
        console.log('✅ Mobile Projects Manager initialized');
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
        this.elements.nav = document.getElementById('mobile-apps-nav');
        this.elements.popupContainer = document.getElementById('mobile-swiper-container');
        this.elements.popupOverlay = document.getElementById('mobile-popup-overlay');
        this.elements.swiper = document.getElementById('mobileSwiper');
        this.elements.swiperWrapper = this.elements.swiper?.querySelector('.swiper-wrapper');
        this.elements.categoryTitle = document.getElementById('mobile-category-title');
        this.elements.closeBtn = document.getElementById('mobile-close-btn');
        
        this.elements.iconNavBtns = document.querySelectorAll('#mobile-icon-nav-top .icon-nav-btn');
        this.elements.prevCardBtn = document.getElementById('mobile-prev-card');
        this.elements.nextCardBtn = document.getElementById('mobile-next-card');
        this.elements.cardCounter = document.getElementById('mobile-card-counter');
        this.elements.counterNumber = document.querySelector('#mobile-card-counter .counter-number');
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
        
        this.elements.iconNavBtns = document.querySelectorAll('#mobile-icon-nav-top .icon-nav-btn');
        
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
    console.log(`📱 Opening category: ${category}`);
    
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
            'quiz': 'fa-question-circle',
            'smart': 'fa-home',
            'utility': 'fa-tools',
            'others': 'fa-mobile-alt'
        };
        
        const icon = icons[category] || 'fa-mobile-alt';
        
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
        const statsHTML = skillSet.downloads || skillSet.rating ? this.generateStatsHTML(skillSet) : '';
        
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
                        
                        ${statsHTML}
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
                        <i class="fas fa-mobile-alt"></i>
                        <span>No preview available</span>
                    </div>
                </div>
            `;
        }
        
        const displayImages = images.slice(0, 5);
        const slides = displayImages.map((img, idx) => `
            <div class="swiper-slide image-slide">
                <img src="${img}" alt="App Preview ${idx + 1}" class="project-image">
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
    
    generateStatsHTML: function(skillSet) {
        let stats = '';
        
        if (skillSet.downloads) {
            stats += `
                <div class="project-stats">
                    <div class="stat-item">
                        <i class="fas fa-download"></i>
                        <span>${skillSet.downloads} downloads</span>
                    </div>
            `;
        }
        
        if (skillSet.rating) {
            stats += `
                    <div class="stat-item">
                        <i class="fas fa-star"></i>
                        <span>${skillSet.rating} ★</span>
                    </div>
            `;
        }
        
        if (stats) {
            stats += '</div>';
        }
        
        return stats;
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
            'Android': { bgColor: '#3DDC84', textColor: 'white' },
            'Kotlin': { bgColor: '#7F52FF', textColor: 'white' },
            'Java': { bgColor: '#007396', textColor: 'white' },
            'React Native': { bgColor: '#61DAFB', textColor: 'black' },
            'Flutter': { bgColor: '#02569B', textColor: 'white' },
            'iOS': { bgColor: '#000000', textColor: 'white' },
            'Swift': { bgColor: '#FA7343', textColor: 'white' },
            'Firebase': { bgColor: '#FFCA28', textColor: 'black' },
            'Default': { bgColor: '#4f46e5', textColor: 'white' }
        };
        
        return technologies.map(tech => {
            const techConfig = techTagColors[tech] || techTagColors['Default'];
            return `
                <span class="tech-tag" style="background-color: ${techConfig.bgColor}; color: ${techConfig.textColor};">
                    <i class="fas fa-mobile-alt"></i>
                    ${tech}
                </span>
            `;
        }).join('');
    },
    
    // ✅ إضافة Infinite Scroll مع إصلاح الخطأ
    initMainSwiper: function() {
        if (!this.elements.swiper) return;
        
        // ✅ حساب عدد الشرائح الإجمالية
        const totalSlides = Object.keys(this.cardPositions).length;
        
        this.swiperInstance = new Swiper(this.elements.swiper, {
            // ✅ Infinite Scroll مع ضبط مناسب
            loop: true,
            loopAdditionalSlides: 2,
            loopedSlides: Math.min(3, totalSlides), // ✅ ضبط ديناميكي
            
            spaceBetween: 0,
            speed: 600,
            
            slidesPerView: 1,
            slidesPerGroup: 1,
            
            navigation: {
                nextEl: this.elements.nextCardBtn,
                prevEl: this.elements.prevCardBtn,
            },
            
            touchRatio: 0.6,
            grabCursor: true,
            allowTouchMove: true,
            shortSwipes: false,
            longSwipes: true,
            longSwipesRatio: 0.1,
            followFinger: true,
            threshold: 15,
            
            keyboard: {
                enabled: true,
                onlyInViewport: true,
            },
            
            mousewheel: {
                forceToAxis: true,
                invert: false,
                sensitivity: 0.8,
                eventsTarget: '.popup-content',
                releaseOnEdges: true,
            },
            
            noSwipingSelector: '.project-images-container, .image-swiper, .project-image, .image-dot, .image-swiper-button-next, .image-swiper-button-prev, .features-list, .tech-tag, .project-link',
            preventInteractionOnTransition: true,
            
            breakpoints: {
                320: {
                    spaceBetween: 0,
                    touchRatio: 0.7
                },
                768: {
                    spaceBetween: 0,
                    touchRatio: 0.6
                }
            },
            
            on: {
                init: () => {
                    console.log('✅ Mobile main swiper initialized with infinite scroll');
                    this.initializeImageSwipers();
                    this.setupImageScrollHandlers();
                },
                
                slideChangeTransitionEnd: () => {
                    console.log('✅ Slide change completed');
                    
                    if (!this.swiperInstance) return;
                    
                    // ✅ الحصول على الشريحة النشطة
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
                        
                        // إعادة تهيئة image swipers
                        setTimeout(() => {
                            this.initializeImageSwipers();
                            this.setupImageScrollHandlers();
                        }, 50);
                    }
                },
                
                touchStart: (swiper, event) => {
                    if (this.isImageInteracting) {
                        swiper.allowTouchMove = false;
                    }
                },
                
                touchEnd: (swiper, event) => {
                    swiper.allowTouchMove = true;
                }
            }
        });
    },
    
// ✅ استبدال دالة initializeImageSwipers بالنسخة المحسنة
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
            loop: true,
            loopAdditionalSlides: 1,
            loopedSlides: 2,
            spaceBetween: 0,
            speed: 500,
            
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            
            navigation: {
                nextEl: imageContainer.querySelector('.image-swiper-button-next'),
                prevEl: imageContainer.querySelector('.image-swiper-button-prev'),
            },
            
            // ✅ Enhanced touch settings
            touchRatio: 1,
            grabCursor: true,
            allowTouchMove: true,
            shortSwipes: true,
            longSwipes: true,
            followFinger: true,
            threshold: 5,
            resistance: false,
            
            // ✅ Mousewheel with better handling
            mousewheel: {
                forceToAxis: true,
                invert: false,
                sensitivity: 0.8,
                eventsTarget: imageContainer,
                releaseOnEdges: true,
            },
            
            // ✅ Disable swiping on certain elements
            noSwipingClass: 'no-swipe',
            noSwipingSelector: '.project-links-top, .tech-tags-container, .features-list',
            
            breakpoints: {
                320: {
                    touchRatio: 0.9
                }
            },
            
            on: {
                init: () => {
                    console.log(`✅ Image swiper initialized for project ${projectId}`);
                    this.imageSwiperInstances[projectId] = imageSwiperInstance;
                    
                    // Force update
                    imageSwiperInstance.update();
                    imageSwiperInstance.slideTo(0, 0);
                    
                    // Ensure autoplay starts
                    if (imageSwiperInstance.autoplay && imageSwiperInstance.autoplay.running === false) {
                        imageSwiperInstance.autoplay.start();
                    }
                },
                
                slideChange: (swiper) => {
                    this.updateImageDots(imageContainer, swiper.realIndex);
                },
                
                slideChangeTransitionStart: () => {
                    this.isImageInteracting = true;
                },
                
                slideChangeTransitionEnd: () => {
                    this.isImageInteracting = false;
                },
                
                touchStart: () => {
                    this.isImageInteracting = true;
                },
                
                touchEnd: () => {
                    this.isImageInteracting = false;
                },
                
                destroy: () => {
                    console.log(`🗑️ Image swiper destroyed for project ${projectId}`);
                }
            }
        });
        
        // ✅ Initialize dots
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

// ✅ إضافة دالة جديدة لمعالجة نقاط الصور
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
        console.log('🔴 Closing mobile popup');
        
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
        
        this.currentCategory = 'quiz';
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
    if (document.getElementById('mobile-apps')) {
        MobileProjectsManager.init();
    }
});

// جعل المدير متاحًا عالميًا
window.MobileProjectsManager = MobileProjectsManager;