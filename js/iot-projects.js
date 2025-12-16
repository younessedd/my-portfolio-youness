/**
 * IoT Projects Manager - FINAL VERSION WITH SEPARATE SCROLL LOGIC
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

const IoTProjectsManager = {
    elements: {},
    currentCategory: 'home',
    currentCardIndex: 0,
    swiperInstance: null,
    imageSwiperInstances: {},
    isAnimating: false,
    isModalOpen: false,
    isImageScrollActive: false, // Track if image scrolling is active
    
    categories: ['home', 'industrial', 'sensors', 'othersiot'],
    categoryNames: {
        'home': 'Smart Home',
        'industrial': 'Industrial IoT',
        'sensors': 'Sensor Projects',
        'othersiot': 'Other IoT Projects'
    },
    
    // Tech tag colors - FULL COLOR BACKGROUNDS (IoT specific)
    techTagColors: {
        // IoT Hardware
        'Arduino': { bgColor: '#00979D', textColor: 'white', icon: 'fas fa-microchip', className: 'arduino' },
        'ESP32': { bgColor: '#5C2D91', textColor: 'white', icon: 'fas fa-wifi', className: 'esp32' },
        'ESP8266': { bgColor: '#005F73', textColor: 'white', icon: 'fas fa-wifi', className: 'esp8266' },
        'Raspberry Pi': { bgColor: '#C51A4A', textColor: 'white', icon: 'fab fa-raspberry-pi', className: 'raspberry-pi' },
        'STM32': { bgColor: '#0047AB', textColor: 'white', icon: 'fas fa-microchip', className: 'stm32' },
        'NodeMCU': { bgColor: '#4ECDC4', textColor: 'black', icon: 'fas fa-microchip', className: 'nodemcu' },
        
        // Communication Protocols
        'MQTT': { bgColor: '#660066', textColor: 'white', icon: 'fas fa-satellite', className: 'mqtt' },
        'Bluetooth': { bgColor: '#0082FC', textColor: 'white', icon: 'fab fa-bluetooth-b', className: 'bluetooth' },
        'WiFi': { bgColor: '#FF6B00', textColor: 'white', icon: 'fas fa-wifi', className: 'wifi' },
        'LoRa': { bgColor: '#00A8E8', textColor: 'white', icon: 'fas fa-satellite-dish', className: 'lora' },
        'Zigbee': { bgColor: '#FFC107', textColor: 'black', icon: 'fas fa-network-wired', className: 'zigbee' },
        'Z-Wave': { bgColor: '#1E88E5', textColor: 'white', icon: 'fas fa-wave-square', className: 'z-wave' },
        'RFID': { bgColor: '#FF6D00', textColor: 'white', icon: 'fas fa-id-card', className: 'rfid' },
        
        // Sensors & Actuators
        'Sensors': { bgColor: '#8E24AA', textColor: 'white', icon: 'fas fa-thermometer-half', className: 'sensors' },
        'Actuators': { bgColor: '#607D8B', textColor: 'white', icon: 'fas fa-cogs', className: 'actuators' },
        'GPS': { bgColor: '#4285F4', textColor: 'white', icon: 'fas fa-map-marker-alt', className: 'gps' },
        'DHT11/DHT22': { bgColor: '#4CAF50', textColor: 'white', icon: 'fas fa-thermometer', className: 'dht' },
        'Ultrasonic': { bgColor: '#2196F3', textColor: 'white', icon: 'fas fa-wave-square', className: 'ultrasonic' },
        'PIR': { bgColor: '#FF9800', textColor: 'white', icon: 'fas fa-eye', className: 'pir' },
        'Relay': { bgColor: '#795548', textColor: 'white', icon: 'fas fa-toggle-on', className: 'relay' },
        
        // IoT Platforms
        'Node-RED': { bgColor: '#8F0000', textColor: 'white', icon: 'fas fa-code', className: 'node-red' },
        'Home Assistant': { bgColor: '#41BDF5', textColor: 'white', icon: 'fas fa-home', className: 'home-assistant' },
        'AWS IoT': { bgColor: '#FF9900', textColor: 'black', icon: 'fab fa-aws', className: 'aws-iot' },
        'Azure IoT': { bgColor: '#0078D4', textColor: 'white', icon: 'fab fa-microsoft', className: 'azure-iot' },
        'Google Cloud IoT': { bgColor: '#4285F4', textColor: 'white', icon: 'fab fa-google', className: 'google-cloud-iot' },
        
        // Industrial IoT
        'PLC': { bgColor: '#00695C', textColor: 'white', icon: 'fas fa-industry', className: 'plc' },
        'SCADA': { bgColor: '#2E7D32', textColor: 'white', icon: 'fas fa-desktop', className: 'scada' },
        'Modbus': { bgColor: '#D84315', textColor: 'white', icon: 'fas fa-exchange-alt', className: 'modbus' },
        'OPC UA': { bgColor: '#5D4037', textColor: 'white', icon: 'fas fa-server', className: 'opc-ua' },
        
        // Programming & Frameworks
        'C++': { bgColor: '#00599C', textColor: 'white', icon: 'fas fa-code', className: 'cpp' },
        'Python': { bgColor: '#3776AB', textColor: 'white', icon: 'fab fa-python', className: 'python' },
        'Micropython': { bgColor: '#2B5B84', textColor: 'white', icon: 'fab fa-python', className: 'micropython' },
        'JavaScript': { bgColor: '#F7DF1E', textColor: 'black', icon: 'fab fa-js', className: 'javascript' },
        'CircuitPython': { bgColor: '#8B4513', textColor: 'white', icon: 'fab fa-python', className: 'circuitpython' },
        
        // General IoT
        'Automation': { bgColor: '#FF9800', textColor: 'white', icon: 'fas fa-robot', className: 'automation' },
        'IoT': { bgColor: '#00BCD4', textColor: 'white', icon: 'fas fa-network-wired', className: 'iot' },
        'Embedded': { bgColor: '#5D4037', textColor: 'white', icon: 'fas fa-microchip', className: 'embedded' },
        'Security': { bgColor: '#FF5722', textColor: 'white', icon: 'fas fa-shield-alt', className: 'security' },
        'Monitoring': { bgColor: '#9C27B0', textColor: 'white', icon: 'fas fa-chart-line', className: 'monitoring' },
        
        // Web technologies that might be used in IoT
        'HTML5': { bgColor: '#E34F26', textColor: 'white', icon: 'fab fa-html5', className: 'html5' },
        'CSS3': { bgColor: '#1572B6', textColor: 'white', icon: 'fab fa-css3-alt', className: 'css3' },
        'API': { bgColor: '#6BD5F1', textColor: 'black', icon: 'fas fa-code', className: 'api' },
        'SQLite': { bgColor: '#003B57', textColor: 'white', icon: 'fas fa-database', className: 'sqlite' },
        'REST API': { bgColor: '#6BD5F1', textColor: 'black', icon: 'fas fa-code', className: 'rest-api' },
        'Material Design': { bgColor: '#6200EE', textColor: 'white', icon: 'fas fa-palette', className: 'material-design' },
        
        // Default
        'Default': { bgColor: '#4f46e5', textColor: 'white', icon: 'fas fa-microchip', className: 'default' }
    },
    
    cardPositions: {},
    
    init: function() {
        console.log('🏠 IoT Projects Manager Initializing...');
        
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
        console.log(`🏠 OPENING CATEGORY: ${category} - "${buttonText}"`);
        
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
                        <i class="fas fa-microchip"></i>
                        <span>No images available</span>
                    </div>
                </div>
            `;
        }
        
        // Use only 5 images maximum
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
                    console.log('✅ IoT main swiper initialized');
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
        console.log('🔴 Closing IoT popup');
        
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('iot-projects')) {
        IoTProjectsManager.init();
    }
});

// Make available globally
window.IoTProjectsManager = IoTProjectsManager;

console.log('📡 iot-projects.js loaded with SEPARATE SCROLL LOGIC (like web)');