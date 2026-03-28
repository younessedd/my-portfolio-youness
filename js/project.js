/**
 * Project Detail Page JavaScript
 */

(function() {
    'use strict';

    const projectDataStore = {
        get web() { return window.webProjectsData; },
        get mobile() { return window.mobileProjectsData; },
        get iot() { return window.iotProjectsData; }
    };

    const categoryLabels = {
        web: {
            business_apps: 'Business Apps',
            food_apps: 'Food Apps',
            entertainment_apps: 'Entertainment Apps',
            tools_apps: 'Tools Apps',
            blog_apps: 'Blog Apps',
            api_services: 'Api Services',
            productivity_apps: 'Productivity Apps',
            ecommerce_apps: 'Ecommerce Apps'
        },
        mobile: {
            quiz_apps: 'Quiz Apps',
            utility_apps: 'Utility Apps',
            iot_apps: 'IoT Apps'
        },
        iot: {
            smarthome_apps: 'Smart Home',
            industrial_iot: 'Industrial',
            sensor_projects: 'Sensors',
            robotics_iot: 'Robotics',
            iot_mobile_apps: 'Mobile Apps',
            ai_iot_systems: 'AI Systems'
        }
    };

    let currentType = '';
    let currentCategory = '';
    let currentProjectId = '';
    let currentProject = null;
    let allProjects = [];
    let currentIndex = 0;

    const elements = {
        projectImage: document.getElementById('project-image'),
        projectTitle: document.getElementById('project-title'),
        projectDescription: document.getElementById('project-description'),
        projectTechnologies: document.getElementById('project-technologies'),
        projectFeatures: document.getElementById('project-features'),
        projectLinks: document.getElementById('project-links'),
        categoryFilters: document.getElementById('category-filters'),
        projectPrev: document.getElementById('project-prev'),
        projectNext: document.getElementById('project-next'),
        currentSlide: document.getElementById('current-slide'),
        totalSlides: document.getElementById('total-slides'),
        backBtn: document.getElementById('back-btn')
    };

    function init() {
        const checkData = setInterval(() => {
            if (window.webProjectsData && window.mobileProjectsData && window.iotProjectsData) {
                clearInterval(checkData);
                loadProjectFromURL();
                updateBackButton();
            }
        }, 100);

        setTimeout(() => clearInterval(checkData), 5000);

        // Project navigation arrows
        elements.projectPrev?.addEventListener('click', prevProject);
        elements.projectNext?.addEventListener('click', nextProject);

        // Back button click handler
        document.getElementById('back-btn')?.addEventListener('click', () => {
            const params = new URLSearchParams(window.location.search);
            const category = params.get('category') || '';
            let section = 'index.html#web-apps';
            if (category === 'quiz_apps' || category === 'utility_apps' || category === 'iot_apps') {
                section = 'index.html#mobile-apps';
            } else if (category === 'smarthome_apps' || category === 'industrial_iot' || 
                     category === 'sensor_projects' || category === 'robotics_iot' || 
                     category === 'iot_mobile_apps' || category === 'ai_iot_systems') {
                section = 'index.html#iot-projects';
            }
            window.location.href = section;
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevProject();
            if (e.key === 'ArrowRight') nextProject();
        });

        // Touch swipe navigation for mobile
        const projectDisplay = document.querySelector('.project-display');
        if (projectDisplay) {
            let touchStartX = 0;
            let touchEndX = 0;
            const minSwipeDistance = 50;

            projectDisplay.addEventListener('touchstart', (e) => {
                // Don't capture touch on links or interactive elements
                if (e.target.closest('a') || e.target.closest('button') || e.target.closest('.project-hero-image')) {
                    return;
                }
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            projectDisplay.addEventListener('touchend', (e) => {
                // Don't trigger swipe on links or interactive elements
                if (e.target.closest('a') || e.target.closest('button')) {
                    return;
                }
                touchEndX = e.changedTouches[0].screenX;
                const swipeDistance = touchEndX - touchStartX;
                
                if (swipeDistance > minSwipeDistance) {
                    prevProject();
                } else if (swipeDistance < -minSwipeDistance) {
                    nextProject();
                }
            }, { passive: true });
        }

        window.addEventListener('scroll', handleScrollReveal);
    }

    function updateBackButton() {
        const backBtn = document.getElementById('back-btn');
        if (!backBtn) return;
        
        const params = new URLSearchParams(window.location.search);
        const category = params.get('category') || '';
        
        // Determine section based on category name
        let section = 'index.html#web-apps';
        
        // Mobile categories
        if (category === 'quiz_apps' || category === 'utility_apps' || category === 'iot_apps') {
            section = 'index.html#mobile-apps';
        }
        // IoT categories
        else if (category === 'smarthome_apps' || category === 'industrial_iot' || 
                 category === 'sensor_projects' || category === 'robotics_iot' || 
                 category === 'iot_mobile_apps' || category === 'ai_iot_systems') {
            section = 'index.html#iot-projects';
        }
        
        backBtn.href = section;
    }

    // Global function for onclick handler
    window.updateBackButtonLink = function(btn) {
        const params = new URLSearchParams(window.location.search);
        const category = params.get('category') || '';
        
        let section = 'index.html#web-apps';
        
        if (category === 'quiz_apps' || category === 'utility_apps' || category === 'iot_apps') {
            section = 'index.html#mobile-apps';
        }
        else if (category === 'smarthome_apps' || category === 'industrial_iot' || 
                 category === 'sensor_projects' || category === 'robotics_iot' || 
                 category === 'iot_mobile_apps' || category === 'ai_iot_systems') {
            section = 'index.html#iot-projects';
        }
        
        btn.href = section;
        return true;
    };

    function loadProjectFromURL() {
        const params = new URLSearchParams(window.location.search);
        currentCategory = params.get('category') || '';
        currentProjectId = params.get('id') || '';

        if (!currentCategory || !currentProjectId) {
            redirectToIndex();
            return;
        }

        currentType = getProjectType(currentCategory);
        if (!currentType) {
            redirectToIndex();
            return;
        }

        currentProject = findProject(currentType, currentCategory, currentProjectId);
        if (!currentProject) {
            redirectToIndex();
            return;
        }

        allProjects = getProjectsByCategory(currentType, currentCategory);
        currentIndex = allProjects.findIndex(p => p.id === currentProjectId);
        if (currentIndex === -1) currentIndex = 0;

        displayCategoryFilters();
        displayProject();
    }

    function getProjectType(category) {
        if (window.webProjectsData && Object.keys(window.webProjectsData).includes(category)) return 'web';
        if (window.mobileProjectsData && Object.keys(window.mobileProjectsData).includes(category)) return 'mobile';
        if (window.iotProjectsData && Object.keys(window.iotProjectsData).includes(category)) return 'iot';
        return null;
    }

    function findProject(type, category, id) {
        const data = projectDataStore[type];
        if (!data || !data[category]) return null;
        return data[category].find(p => p.id === id);
    }

    function getProjectsByCategory(type, category) {
        const data = projectDataStore[type];
        return data && data[category] ? data[category] : [];
    }

    function getAllCategoriesForType(type) {
        const data = projectDataStore[type];
        if (!data) return [];
        return Object.keys(data);
    }

    function displayCategoryFilters() {
        const categories = getAllCategoriesForType(currentType);
        
        elements.categoryFilters.innerHTML = categories.map(cat => {
            const label = categoryLabels[currentType]?.[cat] || cat.replace(/_/g, ' ');
            const isActive = cat === currentCategory;
            return `
                <button class="filter-btn ${isActive ? 'active' : ''}" 
                        data-category="${cat}">
                    ${label}
                </button>
            `;
        }).join('');

        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const newCategory = this.dataset.category;
                if (newCategory !== currentCategory) {
                    currentCategory = newCategory;
                    allProjects = getProjectsByCategory(currentType, currentCategory);
                    if (allProjects.length > 0) {
                        currentIndex = 0;
                        currentProject = allProjects[0];
                        currentProjectId = currentProject.id;
                        
                        const newUrl = `project.html?category=${currentCategory}&id=${currentProjectId}`;
                        window.history.pushState({}, '', newUrl);
                        
                        displayCategoryFilters();
                        displayProject();
                        displayCarousel();
                    }
                }
            });
        });
    }

    function displayProject() {
        if (!currentProject) return;

        document.title = `${currentProject.title} - Youness Eddanguir`;

        // Update pagination
        elements.currentSlide.textContent = currentIndex + 1;
        elements.totalSlides.textContent = allProjects.length;

        const imageUrl = currentProject.images && currentProject.images[0] 
            ? currentProject.images[0] 
            : 'images/ImageNotAvailable.webp';
        elements.projectImage.src = imageUrl;
        elements.projectImage.alt = currentProject.title;
        elements.projectImage.onerror = () => {
            elements.projectImage.src = 'images/ImageNotAvailable.webp';
        };

        elements.projectTitle.textContent = currentProject.title;
        elements.projectDescription.textContent = currentProject.description;

        if (currentProject.technologies && currentProject.technologies.length > 0) {
            elements.projectTechnologies.innerHTML = currentProject.technologies
                .map(tech => `<span class="tech-tag">${tech}</span>`)
                .join('');
        } else {
            elements.projectTechnologies.innerHTML = '';
        }

        if (currentProject.features && currentProject.features.length > 0) {
            elements.projectFeatures.innerHTML = currentProject.features
                .map(feature => `
                    <div class="feature-item">
                        <i class="fas fa-check-circle"></i>
                        <span>${feature}</span>
                    </div>
                `).join('');
        } else {
            elements.projectFeatures.innerHTML = '';
        }

        if (currentProject.links && currentProject.links.length > 0) {
            elements.projectLinks.innerHTML = currentProject.links.map(link => {
                const isGitHub = link.url && link.url.includes('github');
                const btnClass = isGitHub ? 'github' : 'live';
                const icon = isGitHub ? 'fab fa-github' : 'fas fa-external-link-alt';
                const text = link.name || (isGitHub ? 'View Code' : 'Live Demo');
                return `
                    <a href="${link.url}" target="_blank" class="project-link ${btnClass}">
                        <i class="${icon}"></i>
                        <span>${text}</span>
                    </a>
                `;
            }).join('');
        } else {
            elements.projectLinks.innerHTML = '';
        }

        updateMetaTags();
    }

    function updateMetaTags() {
        const ogTitle = document.querySelector('meta[property="og:title"]');
        const ogDesc = document.querySelector('meta[property="og:description"]');
        
        if (ogTitle) ogTitle.content = `${currentProject.title} - Youness Eddanguir`;
        if (ogDesc) ogDesc.content = currentProject.description;
    }

    function displayCarousel() {
        if (allProjects.length === 0) return;

        elements.totalSlides.textContent = allProjects.length;
        elements.currentSlide.textContent = currentIndex + 1;

        renderCarouselCards();
    }

    function renderCarouselCards() {
        elements.carouselTrack.innerHTML = allProjects.map((project, idx) => {
            const isActive = idx === currentIndex;
            
            const imageUrl = project.images && project.images[0] 
                ? project.images[0] 
                : 'images/ImageNotAvailable.webp';

            return `
                <div class="carousel-card ${isActive ? 'active' : ''}" 
                     data-index="${idx}">
                    <div class="card-image-wrapper">
                        <img src="${imageUrl}" alt="${project.title}" 
                             class="card-image" 
                             loading="lazy"
                             onerror="this.src='images/ImageNotAvailable.webp'">
                    </div>
                    <div class="card-content">
                        <h3 class="card-title">${project.title}</h3>
                    </div>
                </div>
            `;
        }).join('');

        document.querySelectorAll('.carousel-card').forEach(card => {
            card.addEventListener('click', function() {
                const idx = parseInt(this.dataset.index);
                if (idx !== currentIndex) {
                    currentIndex = idx;
                    updateCarousel();
                }
            });
        });

        updateCarouselPosition();
    }

    function updateCarouselPosition() {
        const cardWidth = 300;
        const gap = 20;
        const containerWidth = elements.carouselTrack.parentElement.offsetWidth;
        const centerOffset = (containerWidth / 2) - (cardWidth / 2);
        const scrollOffset = currentIndex * (cardWidth + gap);
        
        const translateX = centerOffset - scrollOffset;
        elements.carouselTrack.style.transform = `translateX(${translateX}px)`;
    }

    function prevSlide() {
        if (allProjects.length <= 1) return;
        currentIndex = (currentIndex - 1 + allProjects.length) % allProjects.length;
        updateCarousel();
    }

    function nextSlide() {
        if (allProjects.length <= 1) return;
        currentIndex = (currentIndex + 1) % allProjects.length;
        updateCarousel();
    }

    function updateCarousel() {
        const project = allProjects[currentIndex];
        const newUrl = `project.html?category=${currentCategory}&id=${project.id}`;
        window.history.pushState({}, '', newUrl);

        currentProject = project;
        currentProjectId = project.id;

        displayProject();
        
        document.querySelectorAll('.carousel-card').forEach((card, idx) => {
            card.classList.toggle('active', idx === currentIndex);
        });
        
        elements.currentSlide.textContent = currentIndex + 1;
        updateCarouselPosition();
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function redirectToIndex() {
        window.location.href = 'index.html';
    }

    function prevProject() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            goToPrevCategory();
            return;
        }
        updateProject();
    }

    function nextProject() {
        if (currentIndex < allProjects.length - 1) {
            currentIndex++;
        } else {
            goToNextCategory();
            return;
        }
        updateProject();
    }

    function goToPrevCategory() {
        const categories = getAllCategoriesForType(currentType);
        const currentCatIndex = categories.indexOf(currentCategory);
        
        if (currentCatIndex > 0) {
            currentCategory = categories[currentCatIndex - 1];
        } else {
            currentCategory = categories[categories.length - 1];
        }
        
        allProjects = getProjectsByCategory(currentType, currentCategory);
        currentIndex = allProjects.length - 1;
        
        const newUrl = `project.html?category=${currentCategory}&id=${allProjects[currentIndex].id}`;
        window.history.pushState({}, '', newUrl);
        
        currentProject = allProjects[currentIndex];
        currentProjectId = currentProject.id;
        
        displayCategoryFilters();
        displayProject();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function goToNextCategory() {
        const categories = getAllCategoriesForType(currentType);
        const currentCatIndex = categories.indexOf(currentCategory);
        
        if (currentCatIndex < categories.length - 1) {
            currentCategory = categories[currentCatIndex + 1];
        } else {
            currentCategory = categories[0];
        }
        
        allProjects = getProjectsByCategory(currentType, currentCategory);
        currentIndex = 0;
        
        const newUrl = `project.html?category=${currentCategory}&id=${allProjects[currentIndex].id}`;
        window.history.pushState({}, '', newUrl);
        
        currentProject = allProjects[currentIndex];
        currentProjectId = currentProject.id;
        
        displayCategoryFilters();
        displayProject();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function updateProject() {
        const project = allProjects[currentIndex];
        const newUrl = `project.html?category=${currentCategory}&id=${project.id}`;
        window.history.pushState({}, '', newUrl);

        currentProject = project;
        currentProjectId = project.id;

        displayProject();
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function handleScrollReveal() {
        const reveals = document.querySelectorAll('.reveal');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const revealPoint = 100;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }

    init();
})();
