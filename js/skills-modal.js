/**
 * Skills Manager - FINAL VERSION WITH SEPARATE SCROLL LOGIC
 * Features:
 * 1. Same navigation logic as Web Apps
 * 2. Colored skills grid
 * 3. Colored features list
 * 4. Card navigation between categories
 * 5. Keyboard navigation support
 */

const SkillsManager = {
    elements: {},
    currentCategory: 'web',
    currentCardIndex: 0,
    swiperInstance: null,
    isAnimating: false,
    isModalOpen: false,
    
    categories: ['web', 'iot', 'mobile', 'soft'],
    categoryNames: {
        'web': 'Web Development',
        'iot': 'IoT & Electronics',
        'mobile': 'Mobile Development',
        'soft': 'Soft Skills'
    },
    
    // Category colors for skill items
    categoryColors: {
        'web': { 
            primary: '#4f46e5', 
            secondary: '#06b6d4',
            gradient: 'linear-gradient(135deg, #4f46e5, #06b6d4)'
        },
        'iot': { 
            primary: '#00979D', 
            secondary: '#5C2D91',
            gradient: 'linear-gradient(135deg, #00979D, #5C2D91)'
        },
        'mobile': { 
            primary: '#3ddc84', 
            secondary: '#7F52FF',
            gradient: 'linear-gradient(135deg, #3ddc84, #7F52FF)'
        },
        'soft': { 
            primary: '#FF6B6B', 
            secondary: '#4ECDC4',
            gradient: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)'
        }
    },
    
    cardPositions: {},
    
    init: function() {
        console.log('🎯 Skills Manager Initializing...');
        
        if (!window.skillsData) {
            console.error('❌ skillsData not found!');
            return;
        }
        
        this.skillsData = window.skillsData;
        this.analyzeCardPositions();
        this.cacheElements();
        this.setupNavigation();
        this.setupCloseButton();
        this.setupIconNavigation();
        this.setupCardNavigation();
        this.setupOverlayClick();
        console.log('✅ Skills Manager initialized');
    },
    
    analyzeCardPositions: function() {
        this.cardPositions = {};
        let slideIndex = 0;
        
        this.categories.forEach(category => {
            const skillSets = this.getSkillSetsByCategory(category);
            skillSets.forEach((skillSet, index) => {
                const key = `${category}-${index}`;
                this.cardPositions[key] = slideIndex;
                slideIndex++;
            });
        });
    },
    
    cacheElements: function() {
        this.elements.nav = document.getElementById('skills-nav');
        this.elements.popupContainer = document.getElementById('skills-swiper-container');
        this.elements.popupOverlay = document.getElementById('skills-popup-overlay');
        this.elements.swiper = document.getElementById('skillsSwiper');
        this.elements.swiperWrapper = this.elements.swiper?.querySelector('.swiper-wrapper');
        this.elements.categoryTitle = document.getElementById('skills-category-title');
        this.elements.closeBtn = document.getElementById('skills-close-btn');
        
        this.elements.iconNavBtns = document.querySelectorAll('#skills-icon-nav-top .icon-nav-btn');
        this.elements.prevCardBtn = document.getElementById('skills-prev-card');
        this.elements.nextCardBtn = document.getElementById('skills-next-card');
        this.elements.cardCounter = document.getElementById('skills-card-counter');
        this.elements.counterNumber = document.querySelector('#skills-card-counter .counter-number');
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
        if (this.elements.iconNavBtns) {
            this.elements.iconNavBtns.forEach(iconBtn => {
                iconBtn.addEventListener('click', (e) => {
                    if (this.isAnimating) return;
                    const category = e.currentTarget.dataset.category;
                    const categoryName = this.categoryNames[category];
                    this.goToCategory(category, categoryName);
                });
            });
        }
    },
    
    setupCardNavigation: function() {
        if (this.elements.prevCardBtn) {
            this.elements.prevCardBtn.addEventListener('click', () => {
                if (this.isAnimating) return;
                this.navigateToPrevCard();
            });
        }
        
        if (this.elements.nextCardBtn) {
            this.elements.nextCardBtn.addEventListener('click', () => {
                if (this.isAnimating) return;
                this.navigateToNextCard();
            });
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.isModalOpen) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    this.navigateToPrevCard();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    this.navigateToNextCard();
                } else if (e.key === 'Escape') {
                    this.closePopup();
                }
            }
        });
    },
    
    showCategory: function(category, buttonText) {
        console.log(`📋 Opening category: ${category} - "${buttonText}"`);
        
        this.currentCategory = category;
        this.currentCardIndex = 0;
        this.isModalOpen = true;
        
        this.elements.popupContainer.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        this.updateCategoryTitle(category, buttonText);
        this.updateIconNavigation(category);
        this.updateCardCounter(category);
        this.updateActiveButton(category);
        
        this.initializeSwiperWithAllCategories();
        
        setTimeout(() => {
            const targetSlideIndex = this.cardPositions[`${category}-0`];
            console.log(`🎯 Going to ${category}-0 at slide index: ${targetSlideIndex}`);
            
            if (targetSlideIndex !== undefined && this.swiperInstance) {
                this.currentCardIndex = 0;
                this.swiperInstance.slideTo(targetSlideIndex, 0);
            }
        }, 100);
    },
    
    goToCategory: function(category, categoryName) {
        if (!category || this.isAnimating) return;
        
        this.currentCategory = category;
        this.currentCardIndex = 0;
        this.isAnimating = true;
        
        const targetSlideIndex = this.cardPositions[`${category}-0`];
        console.log(`🔄 Switching to ${category} at slide: ${targetSlideIndex}`);
        
        if (targetSlideIndex !== undefined && this.swiperInstance) {
            this.swiperInstance.slideTo(targetSlideIndex, 600);
        }
        
        this.updateCategoryTitle(category, categoryName);
        this.updateIconNavigation(category);
        this.updateCardCounter(category);
        this.updateActiveButton(category);
        
        setTimeout(() => {
            this.isAnimating = false;
        }, 600);
    },
    
    goToCategoryCard: function(category, cardIndex) {
        if (!this.swiperInstance || !this.elements.swiperWrapper) return;
        
        const key = `${category}-${cardIndex}`;
        const targetSlideIndex = this.cardPositions[key];
        
        console.log(`🎯 goToCategoryCard: ${key} → slide ${targetSlideIndex}`);
        
        if (targetSlideIndex !== undefined) {
            this.currentCardIndex = cardIndex;
            this.swiperInstance.slideTo(targetSlideIndex, 600);
        } else {
            console.error(`❌ Card not found: ${key}`);
        }
    },
    
    navigateToPrevCard: function() {
        if (this.isAnimating || !this.swiperInstance) return;
        
        this.isAnimating = true;
        
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
        
        setTimeout(() => {
            this.isAnimating = false;
        }, 600);
    },
    
    navigateToNextCard: function() {
        if (this.isAnimating || !this.swiperInstance) return;
        
        this.isAnimating = true;
        
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
        
        setTimeout(() => {
            this.isAnimating = false;
        }, 600);
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
        
        const skillsHTML = this.generateSkillsHTML(skillSet.skills, skillSet.category);
        const featuresHTML = this.generateFeaturesHTML(skillSet.features);
        
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.dataset.category = skillSet.category;
        slide.dataset.cardIndex = index;
        slide.dataset.projectId = skillSet.id;
        
        slide.innerHTML = `
            <div class="project-card">
                <div class="project-info">
                    <div class="skills-category-container" data-category="${skillSet.category}">
                        <h3 class="skill-main-title">${skillSet.title}</h3>
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
        
        this.elements.swiperWrapper.appendChild(slide);
    },
    
    generateSkillsHTML: function(skills, category) {
        const categoryColor = this.categoryColors[category] || this.categoryColors['web'];
        
        return skills.map(skill => `
            <div class="skill-item" style="
                background: ${categoryColor.gradient};
                border-color: ${categoryColor.primary};
            ">
                <i class="${skill.icon}" style="color: white;"></i>
                <span style="color: white;">${skill.name}</span>
            </div>
        `).join('');
    },
    
    generateFeaturesHTML: function(features) {
        return features.map((feature, index) => `
            <li>${feature}</li>
        `).join('');
    },
    
    initMainSwiper: function() {
        if (!this.elements.swiper) return;
        
        this.swiperInstance = new Swiper(this.elements.swiper, {
            loop: false,
            spaceBetween: 0,
            speed: 600,
            keyboard: { 
                enabled: true,
                onlyInViewport: true 
            },
            mousewheel: false,
            grabCursor: true,
            slidesPerView: 1,
            effect: 'slide',
            
            on: {
                slideChange: () => {
                    if (!this.swiperInstance || !this.swiperInstance.slides) return;
                    
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
                    }
                }
            }
        });
    },
    
    closePopup: function() {
        console.log('🔴 Closing skills popup');
        
        this.elements.popupContainer.style.display = 'none';
        this.isModalOpen = false;
        document.body.style.overflow = '';
        
        if (this.elements.nav) {
            this.elements.nav.querySelectorAll('.skill-nav-btn').forEach(btn => {
                btn.classList.remove('active');
            });
        }
        
        this.currentCategory = 'web';
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('skills')) {
        SkillsManager.init();
    }
});

// Make available globally
window.SkillsManager = SkillsManager;

console.log('🎯 skills-manager.js loaded (same logic as web)');