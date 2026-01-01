/**
 * Skills Manager - FAST SINGLE IMAGE VERSION
 * Features:
 * 1. Fast card swiper (no images for skills)
 * 2. Colored skills grid
 * 3. Card navigation between categories
 * 4. Keyboard navigation support
 */

const SkillsManager = {
    elements: {},
    currentCategory: 'web',
    currentCardIndex: 0,
    swiperInstance: null,
    navigationLock: false,
    isModalOpen: false,

    categories: ['webDevelopment', 'mobileDevelopment', 'iotAndDomotic', 'electronicsAndElectric', 'roboticsAndAutomatism', 'softSkills', 'aiPrompt'],
    categoryNames: {
        'webDevelopment': 'Web Development',
        'mobileDevelopment': 'Mobile Development',
        'iotAndDomotic': 'IoT and Domotic',
        'electronicsAndElectric': 'Electronics and Electric',
        'roboticsAndAutomatism': 'Robotics and Automatism',
        'softSkills': 'Soft Skills',
        'aiPrompt': 'AI Prompt Engineering'
    },
    
    categoryColors: {
        'webDevelopment': {
            primary: '#f97316',
            secondary: '#fb923c',
            gradient: 'linear-gradient(135deg, #f97316, #fb923c)'
        },
        'mobileDevelopment': {
            primary: '#3b82f6',
            secondary: '#60a5fa',
            gradient: 'linear-gradient(135deg, #3b82f6, #60a5fa)'
        },
        'iotAndDomotic': {
            primary: '#10b981',
            secondary: '#34d399',
            gradient: 'linear-gradient(135deg, #10b981, #34d399)'
        },
        'electronicsAndElectric': {
            primary: '#dc2626',
            secondary: '#ef4444',
            gradient: 'linear-gradient(135deg, #dc2626, #ef4444)'
        },
        'roboticsAndAutomatism': {
            primary: '#8b5cf6',
            secondary: '#a78bfa',
            gradient: 'linear-gradient(135deg, #8b5cf6, #a78bfa)'
        },
        'softSkills': {
            primary: '#ec4899',
            secondary: '#f472b6',
            gradient: 'linear-gradient(135deg, #ec4899, #f472b6)'
        },
        'aiPrompt': {
            primary: '#f59e0b',
            secondary: '#fbbf24',
            gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)'
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
        this.elements.counterNumber = this.elements.cardCounter?.querySelector('.counter-number');
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
        this.elements.iconNavBtns = document.querySelectorAll('#skills-icon-nav-top .icon-nav-btn');
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
        console.log(`🌐 Opening category: ${category}`);
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
        return skills.map(skill => `
            <div class="skill-item" style="
                background: ${skill.color};
                border-color: ${this.darkenColor(skill.color, 20)};
            ">
                <i class="${skill.icon}" style="color: white;"></i>
                <span style="color: white;">${skill.name}</span>
            </div>
        `).join('');
    },

    darkenColor: function(color, percent) {
        let R = parseInt(color.substring(1, 3), 16);
        let G = parseInt(color.substring(3, 5), 16);
        let B = parseInt(color.substring(5, 7), 16);
        R = parseInt(R * (100 - percent) / 100);
        G = parseInt(G * (100 - percent) / 100);
        B = parseInt(B * (100 - percent) / 100);
        R = (R < 0) ? 0 : R;
        G = (G < 0) ? 0 : G;
        B = (B < 0) ? 0 : B;
        R = Math.round(R);
        G = Math.round(G);
        B = Math.round(B);
        const RR = ((R.toString(16).length === 1) ? "0" + R.toString(16) : R.toString(16));
        const GG = ((G.toString(16).length === 1) ? "0" + G.toString(16) : G.toString(16));
        const BB = ((B.toString(16).length === 1) ? "0" + B.toString(16) : B.toString(16));
        return "#" + RR + GG + BB;
    },

    generateFeaturesHTML: function(features) {
        return features.map((feature, index) => `
            <li>${feature}</li>
        `).join('');
    },


    initMainSwiper: function() {
        if (!this.elements.swiper) return;
        const icons = {
            'webDevelopment': 'fa-code',
            'mobileDevelopment': 'fa-mobile-alt',
            'iotAndDomotic': 'fa-home',
            'electronicsAndElectric': 'fa-bolt',
            'roboticsAndAutomatism': 'fa-robot',
            'softSkills': 'fa-star',
            'aiPrompt': 'fa-brain'
        };
        this.swiperInstance = new Swiper(this.elements.swiper, {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            speed: 100,
            resistanceRatio: 0.3,
            touchRatio: 1,
            followFinger: true,
            threshold: 2,
            shortSwipes: true,
            longSwipesRatio: 0.5,
            transitionStart: true,
            transitionEnd: true,
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
        this.isModalOpen = false;
        document.body.style.overflow = '';
        if (this.swiperInstance) {
            this.swiperInstance.destroy(true, true);
            this.swiperInstance = null;
        }
        this.elements.popupContainer.style.display = 'none';
        if (this.elements.nav) {
            this.elements.nav.querySelectorAll('.skill-nav-btn').forEach(btn => {
                btn.classList.remove('active');
            });
        }
 this.currentCategory = 'webDevelopment';
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
    },

    updateIconNavigationColors: function(category) {
        if (!this.elements.iconNavBtns) return;
        
        // Get the actual color from the selected skill-nav-btn icon
        const selectedButton = document.querySelector(`#skills-nav .skill-nav-btn[data-category="${category}"]`);
        let selectedColor = this.categoryColors[category]?.primary || '#f97316'; // fallback
        
        if (selectedButton) {
            const iconElement = selectedButton.querySelector('i.fas');
            if (iconElement) {
                const computedStyle = window.getComputedStyle(iconElement);
                const iconColor = computedStyle.color;
                if (iconColor && iconColor !== 'rgb(255, 255, 255)' && iconColor !== 'rgba(255, 255, 255, 0)') {
                    // Convert rgb to hex
                    selectedColor = this.rgbToHex(iconColor);
                }
            }
        }
        
        this.elements.iconNavBtns.forEach(iconBtn => {
            const btnCategory = iconBtn.dataset.category;
            const btnColors = this.categoryColors[btnCategory] || this.categoryColors['webDevelopment'];
            
            // Get color for this button's category
            let buttonColor = btnColors.primary;
            if (btnCategory === category) {
                buttonColor = selectedColor; // Use actual selected color
            }
            
            // Update border colors
            iconBtn.style.borderColor = btnCategory === category ? 
                buttonColor : `${buttonColor}32`;
            
            // Update active state
            if (btnCategory === category) {
                iconBtn.classList.add('active');
                // Create gradient using the actual selected color
                const rgb = this.hexToRgb(selectedColor);
                iconBtn.style.background = `linear-gradient(135deg, rgba(${rgb.join(', ')}, 0.8), rgba(${rgb.join(', ')}, 0.6))`;
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
            iconNav.style.borderBottomColor = `${selectedColor}22`;
        }
    },
    
    rgbToHex: function(rgb) {
        if (rgb.startsWith('#')) return rgb;
        
        const result = rgb.match(/\d+/g);
        if (!result || result.length < 3) return '#f97316';
        
        const r = parseInt(result[0]);
        const g = parseInt(result[1]);
        const b = parseInt(result[2]);
        
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    },
    
    hexToRgb: function(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16)
        ] : [0, 0, 0];
    },

    updateCategoryTitle: function(category, categoryName) {
        if (!this.elements.categoryTitle) return;
        const icons = {
            'webDevelopment': 'fa-code',
            'mobileDevelopment': 'fa-mobile-alt',
            'iotAndDomotic': 'fa-home',
            'electronicsAndElectric': 'fa-bolt',
            'roboticsAndAutomatism': 'fa-robot',
            'softSkills': 'fa-star',
            'aiPrompt': 'fa-brain'
        };
        const colors = this.categoryColors[category] || this.categoryColors['webDevelopment'];
        const icon = icons[category] || 'fa-code';
        
        // Update header background
        const header = this.elements.popupContainer.querySelector('.popup-header');
        if (header) {
            header.style.background = colors.gradient;
        }
        
        // Update icon navigation border colors
        this.updateIconNavigationColors(category);
        
        this.elements.categoryTitle.innerHTML = `
            <i class="fas ${icon}"></i>
            <span>${categoryName}</span>
        `;
    },
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('skills')) {
        SkillsManager.init();
    }
});

// Make available globally
window.SkillsManager = SkillsManager;

console.log('🎯 skills-manager.js loaded with individual skill colors');