/**
 * Web Projects Manager - FINAL VERSION WITH SEPARATE SCROLL LOGIC
 * Features:
 * 1. Click on images: Scroll images only
 * 2. Click outside images: Scroll cards/categories
 * 3. Images take 100% of container (object-fit: cover)
 * 4. 5-image swiper with finger navigation
 * 5. Auto-scroll every 5 seconds
 * 6. Infinite scroll
 * 7. Better tech tags with colors
 * 8. Colored features list
 * 9. Removed pagination
 */

const WebProjectsManager = {
    elements: {},
    currentCategory: 'frontend',
    currentCardIndex: 0,
    swiperInstance: null,
    imageSwiperInstances: {},
    isAnimating: false,
    isModalOpen: false,
    isImageScrollActive: false, // Track if image scrolling is active
    
    categories: ['frontend', 'fullstack', 'responsive'],
    categoryNames: {
        'frontend': 'Frontend Projects',
        'fullstack': 'Fullstack Projects',
        'responsive': 'Responsive Websites'
    },
    
    // Tech tag colors - FULL COLOR BACKGROUNDS
    techTagColors: {
        // Frontend
        'HTML5': { bgColor: '#E34F26', textColor: 'white', icon: 'fab fa-html5', className: 'html5' },
        'CSS3': { bgColor: '#1572B6', textColor: 'white', icon: 'fab fa-css3-alt', className: 'css3' },
        'JavaScript': { bgColor: '#F7DF1E', textColor: 'black', icon: 'fab fa-js', className: 'javascript' },
        'React.js': { bgColor: '#61DAFB', textColor: 'black', icon: 'fab fa-react', className: 'react' },
        'Vue.js': { bgColor: '#4FC08D', textColor: 'white', icon: 'fab fa-vuejs', className: 'vue' },
        'TypeScript': { bgColor: '#3178C6', textColor: 'white', icon: 'fab fa-js', className: 'typescript' },
        'SASS/SCSS': { bgColor: '#CC6699', textColor: 'white', icon: 'fab fa-sass', className: 'sass' },
        'Bootstrap': { bgColor: '#7952B3', textColor: 'white', icon: 'fab fa-bootstrap', className: 'bootstrap' },
        'Tailwind': { bgColor: '#38B2AC', textColor: 'white', icon: 'fas fa-wind', className: 'tailwind' },
        
        // Backend
        'Node.js': { bgColor: '#339933', textColor: 'white', icon: 'fab fa-node-js', className: 'nodejs' },
        'Express.js': { bgColor: '#000000', textColor: 'white', icon: 'fas fa-server', className: 'express' },
        'Python': { bgColor: '#3776AB', textColor: 'white', icon: 'fab fa-python', className: 'python' },
        'PHP': { bgColor: '#777BB4', textColor: 'white', icon: 'fab fa-php', className: 'php' },
        'Laravel': { bgColor: '#FF2D20', textColor: 'white', icon: 'fab fa-laravel', className: 'laravel' },
        'Django': { bgColor: '#092E20', textColor: 'white', icon: 'fab fa-python', className: 'django' },
        'MySQL': { bgColor: '#4479A1', textColor: 'white', icon: 'fas fa-database', className: 'mysql' },
        'MongoDB': { bgColor: '#47A248', textColor: 'white', icon: 'fas fa-database', className: 'mongodb' },
        'PostgreSQL': { bgColor: '#336791', textColor: 'white', icon: 'fas fa-database', className: 'postgresql' },
        'Firebase': { bgColor: '#FFCA28', textColor: 'black', icon: 'fab fa-google', className: 'firebase' },
        
        // Fullstack
        'MERN Stack': { bgColor: '#61DAFB', textColor: 'black', icon: 'fas fa-layer-group', className: 'mern' },
        'MEAN Stack': { bgColor: '#DD0031', textColor: 'white', icon: 'fas fa-layer-group', className: 'mean' },
        'REST API': { bgColor: '#6BD5F1', textColor: 'black', icon: 'fas fa-code', className: 'api' },
        'GraphQL': { bgColor: '#E10098', textColor: 'white', icon: 'fas fa-code', className: 'graphql' },
        'Docker': { bgColor: '#2496ED', textColor: 'white', icon: 'fab fa-docker', className: 'docker' },
        'AWS': { bgColor: '#FF9900', textColor: 'black', icon: 'fab fa-aws', className: 'aws' },
        
        // Responsive & Others
        'Responsive Design': { bgColor: '#4A90E2', textColor: 'white', icon: 'fas fa-mobile-alt', className: 'responsive' },
        'UI/UX Design': { bgColor: '#FF6B6B', textColor: 'white', icon: 'fas fa-palette', className: 'uiux' },
        'Git': { bgColor: '#F05032', textColor: 'white', icon: 'fab fa-git-alt', className: 'git' },
        
        // Default
        'Default': { bgColor: '#4f46e5', textColor: 'white', icon: 'fas fa-code', className: 'default' }
    },
    
    cardPositions: {},
    
    init: function() {
        console.log('🚀 Web Projects Manager Initializing...');
        
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
                if (this.isAnimating || this.isImageScrollActive) return;
                this.navigateToPrevCard();
            });
        }
        
        if (this.elements.nextCardBtn) {
            this.elements.nextCardBtn.addEventListener('click', () => {
                if (this.isAnimating || this.isImageScrollActive) return;
                this.navigateToNextCard();
            });
        }
        
        // Keyboard navigation - only when image scroll is NOT active
        document.addEventListener('keydown', (e) => {
            if (this.isModalOpen && !this.isImageScrollActive) {
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
        this.isImageScrollActive = false;
        
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
        if (!category || this.isAnimating || this.isImageScrollActive) return;
        
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
        if (!this.swiperInstance || !this.elements.swiperWrapper || this.isImageScrollActive) return;
        
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
        if (this.isAnimating || !this.swiperInstance || this.isImageScrollActive) return;
        
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
        if (this.isAnimating || !this.swiperInstance || this.isImageScrollActive) return;
        
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
            'frontend': 'fa-code',
            'fullstack': 'fa-server',
            'responsive': 'fa-mobile-alt'
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
        // Clean up existing swipers
        if (this.swiperInstance) {
            this.swiperInstance.destroy(true, true);
            this.swiperInstance = null;
        }
        
        // Clear image swiper instances
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
                        <i class="fas fa-image"></i>
                        <span>No images available</span>
                    </div>
                </div>
            `;
        }
        
        // Use only 5 images maximum
        const displayImages = images.slice(0, 5);
        const slides = displayImages.map((img, idx) => `
            <div class="swiper-slide image-slide">
                <img src="${img}" alt="Project Image ${idx + 1}" class="project-image">
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
        return technologies.map(tech => {
            const techConfig = this.techTagColors[tech] || this.techTagColors['Default'];
            return `
                <span class="tech-tag ${techConfig.className}" 
                      data-tech="${tech}"
                      style="background-color: ${techConfig.bgColor}; color: ${techConfig.textColor};">
                    <i class="${techConfig.icon}"></i>
                    ${tech}
                </span>
            `;
        }).join('');
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
            noSwipingSelector: '.project-images-container, .image-swiper, .project-image, .image-dot',
            preventInteractionOnTransition: true,
            
            on: {
                init: () => {
                    console.log('✅ Main swiper initialized');
                    // Initialize image swipers for all slides
                    this.initializeImageSwipers();
                    this.setupImageScrollHandlers();
                },
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
                        
                        // Reinitialize image handlers for new slide
                        this.setupImageScrollHandlers();
                    }
                },
                slideChangeTransitionEnd: () => {
                    // Initialize image swiper for newly active slide
                    this.initializeImageSwipers();
                    this.setupImageScrollHandlers();
                }
            }
        });
    },
    
    initializeImageSwipers: function() {
        if (!this.swiperInstance) return;
        
        const activeSlide = this.swiperInstance.slides[this.swiperInstance.activeIndex];
        if (!activeSlide) return;
        
        const imageContainer = activeSlide.querySelector('.project-images-container');
        if (!imageContainer) return;
        
        const projectId = activeSlide.dataset.projectId;
        
        // If image swiper already exists for this project, don't reinitialize
        if (this.imageSwiperInstances[projectId]) {
            return;
        }
        
        const imageSwiperEl = imageContainer.querySelector('.image-swiper');
        if (!imageSwiperEl) return;
        
        // Initialize new image swiper
        const imageSwiper = new Swiper(imageSwiperEl, {
            loop: true,
            spaceBetween: 0,
            speed: 500,
            autoplay: {
                delay: 5000, // 5 seconds
                disableOnInteraction: true,
            },
            pagination: false, // Disable pagination
            grabCursor: true,
            effect: 'slide',
            slidesPerView: 1,
            centeredSlides: true,
            allowTouchMove: true,
            preventInteractionOnTransition: false,
            shortSwipes: true,
            longSwipes: true,
            followFinger: true,
            
            on: {
                init: () => {
                    console.log(`✅ Image swiper initialized for project ${projectId}`);
                    // Store reference
                    this.imageSwiperInstances[projectId] = imageSwiper;
                    
                    // Ensure images take 100%
                    const images = imageContainer.querySelectorAll('.project-image');
                    images.forEach(img => {
                        img.style.width = '100%';
                        img.style.height = '100%';
                        img.style.objectFit = 'cover';
                    });
                },
                slideChange: (swiper) => {
                    // Update navigation dots
                    this.updateImageDots(imageContainer, swiper.realIndex);
                }
            }
        });
        
        // Start autoplay
        imageSwiper.autoplay.start();
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
        
        // Clear any existing handlers
        imageContainer.removeEventListener('mousedown', this.handleImageMouseDown);
        imageContainer.removeEventListener('mouseup', this.handleImageMouseUp);
        imageContainer.removeEventListener('touchstart', this.handleImageTouchStart);
        imageContainer.removeEventListener('touchend', this.handleImageTouchEnd);
        
        // Add new handlers
        this.handleImageMouseDown = (e) => {
            if (e.target.closest('.project-images-container')) {
                this.isImageScrollActive = true;
                imageContainer.classList.add('image-scroll-active');
                imageSwiper.autoplay.stop();
            }
        };
        
        this.handleImageMouseUp = () => {
            this.isImageScrollActive = false;
            imageContainer.classList.remove('image-scroll-active');
            setTimeout(() => {
                imageSwiper.autoplay.start();
            }, 5000);
        };
        
        this.handleImageTouchStart = (e) => {
            if (e.target.closest('.project-images-container')) {
                this.isImageScrollActive = true;
                imageContainer.classList.add('image-scroll-active');
                imageSwiper.autoplay.stop();
            }
        };
        
        this.handleImageTouchEnd = () => {
            this.isImageScrollActive = false;
            imageContainer.classList.remove('image-scroll-active');
            setTimeout(() => {
                imageSwiper.autoplay.start();
            }, 5000);
        };
        
        imageContainer.addEventListener('mousedown', this.handleImageMouseDown);
        imageContainer.addEventListener('mouseup', this.handleImageMouseUp);
        imageContainer.addEventListener('touchstart', this.handleImageTouchStart);
        imageContainer.addEventListener('touchend', this.handleImageTouchEnd);
        
        // Add click handlers for dots
        const dots = imageContainer.querySelectorAll('.image-dot');
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                const index = parseInt(e.currentTarget.dataset.index);
                imageSwiper.slideToLoop(index);
                this.updateImageDots(imageContainer, index);
                
                // Pause autoplay when user interacts with dots
                imageSwiper.autoplay.stop();
                setTimeout(() => {
                    imageSwiper.autoplay.start();
                }, 5000);
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
        console.log('🔴 Closing web popup');
        
        // Destroy all image swipers
        Object.values(this.imageSwiperInstances).forEach(swiper => {
            if (swiper && !swiper.destroyed) {
                swiper.destroy(true, true);
            }
        });
        this.imageSwiperInstances = {};
        
        // Destroy main swiper
        if (this.swiperInstance) {
            this.swiperInstance.destroy(true, true);
            this.swiperInstance = null;
        }
        
        this.elements.popupContainer.style.display = 'none';
        this.isModalOpen = false;
        this.isImageScrollActive = false;
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('web-apps')) {
        WebProjectsManager.init();
    }
});

// Make available globally
window.WebProjectsManager = WebProjectsManager;

console.log('🌐 web-projects.js loaded with SEPARATE SCROLL LOGIC');