/**
 * Web Projects Manager - FAST SINGLE IMAGE VERSION
 */

const WebProjectsManager = {
    elements: {},
    currentCategory: 'frontend',
    currentCardIndex: 0,
    swiperInstance: null,
    
    navigationLock: false,
    isModalOpen: false,
    
    categories: ['frontend', 'backend', 'fullstack'],
    categoryNames: {
        'frontend': 'Frontend',
        'backend': 'Backend',
        'fullstack': 'Full Stack'
    },
    
    categoryColors: {
        'frontend': {
            primary: '#dc2626',
            secondary: '#ef4444',
            gradient: 'linear-gradient(135deg, #dc2626, #ef4444)'
        },
        'backend': {
            primary: '#339933',
            secondary: '#22c55e',
            gradient: 'linear-gradient(135deg, #339933, #22c55e)'
        },
        'fullstack': {
            primary: '#61DAFB',
            secondary: '#38bdf8',
            gradient: 'linear-gradient(135deg, #61DAFB, #38bdf8)'
        }
    },
    
    cardPositions: {},
    
    init: function() {
        console.log('🌐 Web Projects Manager Initializing...');
        
        if (!window.webProjectsData) {
            console.error('❌ webProjectsData not found!');
            return;
        }
        
        this.skillsData = window.webProjectsData;
        this.analyzeCardPositions();
        this.cacheElements();
        this.setupNavigation();
        this.setupCloseButton();
        this.setupIconNavigation();
        this.setupCardNavigation();
        this.setupOverlayClick();
        console.log('✅ Web Projects Manager initialized');
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
        this.elements.nav = document.getElementById('web-apps-nav');
        this.elements.popupContainer = document.getElementById('web-swiper-container');
        this.elements.popupOverlay = document.getElementById('web-popup-overlay');
        this.elements.swiper = document.getElementById('webSwiper');
        this.elements.swiperWrapper = this.elements.swiper?.querySelector('.swiper-wrapper');
        this.elements.categoryTitle = document.getElementById('web-category-title');
        this.elements.closeBtn = document.getElementById('web-close-btn');
        
        this.elements.iconNavBtns = document.querySelectorAll('#web-icon-nav-top .icon-nav-btn');
        this.elements.prevCardBtn = document.getElementById('web-prev-card');
        this.elements.nextCardBtn = document.getElementById('web-next-card');
        this.elements.cardCounter = document.getElementById('web-card-counter');
        this.elements.counterNumber = document.querySelector('#web-card-counter .counter-number');
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
        
        this.elements.iconNavBtns = document.querySelectorAll('#web-icon-nav-top .icon-nav-btn');
        
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
    
    updateIconNavigationColors: function(category) {
        if (!this.elements.iconNavBtns) return;
        
        // Get the actual color from the selected skill-nav-btn icon
        const selectedButton = document.querySelector(`#web-apps-nav .skill-nav-btn[data-category="${category}"]`);
        let selectedColor = this.categoryColors[category]?.primary || '#dc2626'; // fallback
        
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
            const btnColors = this.categoryColors[btnCategory] || this.categoryColors['frontend'];
            
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
        if (!result || result.length < 3) return '#dc2626';
        
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

    updateCategoryTitle: function(category, buttonText) {
        if (!this.elements.categoryTitle) return;
        
        const icons = {
            'frontend': 'fa-code',
            'backend': 'fa-server',
            'fullstack': 'fa-globe'
        };
        
        const colors = this.categoryColors[category] || this.categoryColors['frontend'];
        const icon = icons[category] || 'fa-globe';
        
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
    
    generateImagesHTML: function(images) {
        if (!images || images.length === 0) {
            return `
                <div class="project-images-container single-image-container">
                    <div class="no-image-placeholder">
                        <i class="fas fa-image"></i>
                        <span>No preview available</span>
                    </div>
                </div>
            `;
        }
        
        // عرض الصورة الأولى فقط مع تحسين الأداء
        const firstImage = images[0];
        return `
            <div class="project-images-container single-image-container">
                <div class="image-loading-placeholder">
                    <div class="loading-spinner"></div>
                </div>
                <img src="${firstImage}" alt="Web Project" class="project-image-single" 
                     loading="eager" fetchpriority="high"
                     onload="this.previousElementSibling.style.display='none'; this.style.opacity='1'"
                     onerror="this.src='images/ImageNotAvailable.webp'; this.previousElementSibling.style.display='none'"
                     style="opacity: 0; transition: opacity 0.3s ease;">
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
            'HTML5': { bgColor: '#E34F26', textColor: 'white' },
            'CSS3': { bgColor: '#1572B6', textColor: 'white' },
            'JavaScript': { bgColor: '#F7DF1E', textColor: 'black' },
            'React.js': { bgColor: '#61DAFB', textColor: 'black' },
            'Node.js': { bgColor: '#339933', textColor: 'white' },
            'Vue.js': { bgColor: '#4FC08D', textColor: 'white' },
            'Angular': { bgColor: '#DD0031', textColor: 'white' },
            'TypeScript': { bgColor: '#3178C6', textColor: 'white' },
            'Sass': { bgColor: '#CC6699', textColor: 'white' },
            'Bootstrap': { bgColor: '#7952B3', textColor: 'white' },
            'Tailwind CSS': { bgColor: '#38B2AC', textColor: 'white' },
            'Express.js': { bgColor: '#000000', textColor: 'white' },
            'MongoDB': { bgColor: '#47A248', textColor: 'white' },
            'MySQL': { bgColor: '#4479A1', textColor: 'white' },
            'PostgreSQL': { bgColor: '#336791', textColor: 'white' },
            'Firebase': { bgColor: '#FFCA28', textColor: 'black' },
            'AWS': { bgColor: '#FF9900', textColor: 'black' },
            'Docker': { bgColor: '#2496ED', textColor: 'white' },
            'Git': { bgColor: '#F05032', textColor: 'white' },
            'Python': { bgColor: '#3776AB', textColor: 'white' },
            'Django': { bgColor: '#092E20', textColor: 'white' },
            'PHP': { bgColor: '#777BB4', textColor: 'white' },
            'Laravel': { bgColor: '#FF2D20', textColor: 'white' },
            'Next.js': { bgColor: '#000000', textColor: 'white' },
            'Nuxt.js': { bgColor: '#00C58E', textColor: 'white' },
            'GraphQL': { bgColor: '#E10098', textColor: 'white' },
            'Redux': { bgColor: '#764ABC', textColor: 'white' },
            'Webpack': { bgColor: '#8DD6F9', textColor: 'black' },
            'Default': { bgColor: '#4f46e5', textColor: 'white' }
        };
        
        return technologies.map(tech => {
            const techConfig = techTagColors[tech] || techTagColors['Default'];
            return `
                <span class="tech-tag" style="background-color: ${techConfig.bgColor}; color: ${techConfig.textColor};">
                    <i class="fas fa-code"></i>
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
            speed: 100,
            resistanceRatio: 0.3,
            touchRatio: 1,
            followFinger: true,
            threshold: 2,
            shortSwipes: true,
            longSwipesRatio: 0.5,
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
        console.log('🔴 Closing Web popup');
        
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
        
        this.currentCategory = 'frontend';
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
    if (document.getElementById('web-apps')) {
        WebProjectsManager.init();
    }
});

// Make manager globally available
window.WebProjectsManager = WebProjectsManager;