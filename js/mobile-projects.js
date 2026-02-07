/**
 * Mobile Projects Manager - FAST SINGLE IMAGE VERSION
 */

const MobileProjectsManager = {
    elements: {},
    currentCategory: 'quiz',
    currentCardIndex: 0,
    swiperInstance: null,
    
    navigationLock: false,
    isModalOpen: false,
    
    categories: ['quiz', 'utility', 'smartHome'],
    categoryNames: {
        'quiz': 'Quiz Apps',
        'utility': 'Utility & Tools',
        'smartHome': 'Smart Home'
    },
    
    categoryColors: {
        'quiz': {
            primary: '#2563eb',
            secondary: '#3b82f6',
            gradient: 'linear-gradient(135deg, #2563eb, #3b82f6)'
        },
        'utility': {
            primary: '#dc2626',
            secondary: '#ef4444',
            gradient: 'linear-gradient(135deg, #dc2626, #ef4444)'
        },
        'smartHome': {
            primary: '#059669',
            secondary: '#10b981',
            gradient: 'linear-gradient(135deg, #059669, #10b981)'
        }
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
                }, 300);
            });
        });
    },
    
    setupCardNavigation: function() {
        if (this.elements.prevCardBtn) {
            this.elements.prevCardBtn.addEventListener('click', () => {
                if (this.navigationLock) return;
                this.navigationLock = true;
                this.navigateToPrevCard();
                setTimeout(() => { this.navigationLock = false; }, 300);
            });
        }
        
        if (this.elements.nextCardBtn) {
            this.elements.nextCardBtn.addEventListener('click', () => {
                if (this.navigationLock) return;
                this.navigationLock = true;
                this.navigateToNextCard();
                setTimeout(() => { this.navigationLock = false; }, 300);
            });
        }
        
        document.addEventListener('keydown', (e) => {
            if (this.isModalOpen && !this.navigationLock) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    this.navigationLock = true;
                    this.navigateToPrevCard();
                    setTimeout(() => { this.navigationLock = false; }, 300);
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    this.navigationLock = true;
                    this.navigateToNextCard();
                    setTimeout(() => { this.navigationLock = false; }, 300);
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
        this.navigationLock = false;
        
        this.elements.popupContainer.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        this.updateCategoryTitle(category, buttonText);
        this.updateIconNavigation(category);
        this.updateActiveButton(category);
        
        this.initializeSwiperWithAllCategories();
        
        const targetSlideIndex = this.cardPositions[`${category}-0`];
        
        if (targetSlideIndex !== undefined && this.swiperInstance) {
            this.currentCardIndex = 0;
            this.swiperInstance.slideTo(targetSlideIndex, 0);
            this.updateCardCounter(category);
        }
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
        
        this.swiperInstance.slideTo(targetSlideIndex, 300);
    },
    
    goToCategoryCard: function(category, cardIndex) {
        if (!this.swiperInstance || this.navigationLock) return;
        
        const key = `${category}-${cardIndex}`;
        const targetSlideIndex = this.cardPositions[key];
        
        if (targetSlideIndex !== undefined) {
            this.currentCardIndex = cardIndex;
            this.swiperInstance.slideTo(targetSlideIndex, 300);
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
    
    updateIconNavigationColors: function(category) {
        if (!this.elements.iconNavBtns) return;
        
        const colors = this.categoryColors[category] || this.categoryColors['quiz'];
        
        this.elements.iconNavBtns.forEach(iconBtn => {
            const btnCategory = iconBtn.dataset.category;
            const btnColors = this.categoryColors[btnCategory] || this.categoryColors['quiz'];
            
            // Update border colors
            iconBtn.style.borderColor = btnCategory === category ? 
                btnColors.primary : `${btnColors.primary}32`;
            
            // Update active state
            if (btnCategory === category) {
                iconBtn.classList.add('active');
                iconBtn.style.background = btnColors.gradient.replace('135deg', '135deg, rgba(' + 
                    this.hexToRgb(btnColors.primary).join(', ') + ', 0.8), rgba(' + 
                    this.hexToRgb(btnColors.secondary).join(', ') + ', 0.8)');
                iconBtn.style.color = 'white';
            } else {
                iconBtn.classList.remove('active');
                iconBtn.style.background = 'rgba(2, 6, 23, 0.42)';
                iconBtn.style.color = 'var(--text-secondary)';
            }
        });
        
        // Update icon navigation border
        const iconNav = this.elements.popupContainer.querySelector('.popup-icon-nav');
        if (iconNav) {
            iconNav.style.borderBottomColor = `${colors.primary}22`;
        }
    },
    
    hexToRgb: function(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16)
        ] : [0, 0, 0];
    },

    updateCategoryTitle: function(category, buttonText) {
        if (!this.elements.categoryTitle) return;
        
        const icons = {
            'quiz': 'fa-question-circle',
            'smartHome': 'fa-home',
            'utility': 'fa-tools'
        };
        
        const colors = this.categoryColors[category] || this.categoryColors['quiz'];
        const icon = icons[category] || 'fa-mobile-alt';
        
        // Update header background
        const header = this.elements.popupContainer.querySelector('.popup-header');
        if (header) {
            header.style.background = colors.gradient;
        }
        
        // Update icon navigation border colors
        this.updateIconNavigationColors(category);
        
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
                        <h3 class="skill-main-title">${skillSet.title}</h3>
                        <p class="skill-main-description">${skillSet.description}</p>
                    </div>
                    
                    ${imagesHTML}
                    
                    <div class="skills-category-container">
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
                <div class="project-images-container single-image-container">
                    <div class="no-image-placeholder">
                        <i class="fas fa-mobile-alt"></i>
                        <span>No preview available</span>
                    </div>
                </div>
            `;
        }

        if (images.length === 1) {
            return `
                <div class="project-images-container single-image-container">
                    <div class="image-loading-placeholder">
                        <div class="loading-spinner"></div>
                    </div>
                    <img src="${images[0]}" alt="Project Image" class="project-image-single"
                         loading="eager" fetchpriority="high"
                         onload="this.previousElementSibling.style.display='none'; this.style.opacity='1'"
                         onerror="this.src='images/ImageNotAvailable.webp'; this.previousElementSibling.style.display='none'"
                         style="opacity: 0; transition: opacity 0.3s ease;">
                </div>
            `;
        }

        const galleryId = `image-gallery-${projectId}`;
        const slides = images.map((image, index) => `
            <div class="swiper-slide">
                <div class="image-loading-placeholder">
                    <div class="loading-spinner"></div>
                </div>
                <img src="${image}" alt="Project Image" 
                     ${index === 0 ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"'}
                     onload="this.previousElementSibling.style.display='none'; this.style.opacity='1'"
                     onerror="this.src='images/ImageNotAvailable.webp'; this.previousElementSibling.style.display='none'"
                     style="opacity: 0; transition: opacity 0.3s ease;">
            </div>
        `).join('');

        return `
            <div class="project-images-container image-gallery-container">
                <div class="swiper-container ${galleryId}">
                    <div class="swiper-wrapper">
                        ${slides}
                    </div>
                    <div class="swiper-pagination"></div>
                    <div class="swiper-button-next"></div>
                    <div class="swiper-button-prev"></div>
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
            'Android': { bgColor: '#3DDC84', textColor: 'white' },
            'Kotlin': { bgColor: '#7F52FF', textColor: 'white' },
            'Java': { bgColor: '#007396', textColor: 'white' },
            'React Native': { bgColor: '#61DAFB', textColor: 'black' },
            'Flutter': { bgColor: '#02569B', textColor: 'white' },
            'iOS': { bgColor: '#000000', textColor: 'white' },
            'Swift': { bgColor: '#FA7343', textColor: 'white' },
            'Firebase': { bgColor: '#FFCA28', textColor: 'black' },
            'Kodular': { bgColor: '#7e57c2', textColor: 'white' },
            'Xamarin': { bgColor: '#3498DB', textColor: 'white' },
            'Ionic': { bgColor: '#3880FF', textColor: 'white' },
            'Unity': { bgColor: '#000000', textColor: 'white' },
            'Google': { bgColor: '#4285F4', textColor: 'white' },
            'Apple': { bgColor: '#A2AAAD', textColor: 'white' },
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
    
    initMainSwiper: function() {
        if (!this.elements.swiper) return;
        
        this.swiperInstance = new Swiper(this.elements.swiper, {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            speed: 100, // ⚡ Super Fast
            
            // إعدادات السلاسة
            resistanceRatio: 0.3,
            touchRatio: 1, // Optimal touch response
            followFinger: true,
            threshold: 2, // Lower threshold for swipe
            shortSwipes: true,
            longSwipesRatio: 0.5,
            
            // الانتقال السلس
            transitionStart: true,
            transitionEnd: true,
            
            // Pagination
            pagination: {
                el: '.popup-counter',
                type: 'fraction',
                clickable: true,
            },
            
            // Navigation
            navigation: {
                nextEl: this.elements.nextCardBtn,
                prevEl: this.elements.prevCardBtn,
            },
            
            on: {
                init: () => {
                    this.elements.swiper.querySelectorAll('.image-gallery-container .swiper-container').forEach(container => {
                        new Swiper(container, {
                            loop: true,
                            pagination: {
                                el: container.querySelector('.swiper-pagination'),
                                clickable: true,
                            },
                            navigation: {
                                nextEl: container.querySelector('.swiper-button-next'),
                                prevEl: container.querySelector('.swiper-button-prev'),
                            },
                        });
                    });
                },
                slideChange: () => {
                    if (!this.swiperInstance) return;
                    const activeSlide = this.swiperInstance.slides[this.swiperInstance.activeIndex];
                    const category = activeSlide.dataset.category;
                    const cardIndex = parseInt(activeSlide.dataset.cardIndex, 10);

                    if (category) {
                        this.currentCategory = category;
                        this.currentCardIndex = cardIndex;
                        const categoryName = this.categoryNames[category];
                        this.updateIconNavigation(category);
                        this.updateCardCounter(category);
                        this.updateActiveButton(category);
                        this.updateCategoryTitle(category, categoryName);
                    }
                }
            }
        });
    },
    
    closePopup: function() {
        console.log('🔴 Closing Mobile popup');
        
        this.navigationLock = false;
        this.isModalOpen = false;
        
        // Destroy main swiper
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

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('mobile-apps')) {
        MobileProjectsManager.init();
    }
});

// Make manager globally available
window.MobileProjectsManager = MobileProjectsManager;