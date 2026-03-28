// Project Popup Carousel
document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('project-popup');
    const popupWrapper = document.getElementById('popup-wrapper');
    const closeBtn = document.querySelector('.popup-close');
    let popupSwiper = null;
    let allProjects = [];

    // Function to collect projects by category
    function collectProjectsByCategory(category) {
        allProjects = [];
        let index = 0;
        
        // Get projects from specific category
        if (category === 'web' && window.webProjectsData) {
            Object.values(window.webProjectsData).forEach(category => {
                category.forEach(project => {
                    allProjects.push({...project, popupIndex: index++});
                });
            });
        } else if (category === 'mobile' && window.mobileProjectsData) {
            Object.values(window.mobileProjectsData).forEach(category => {
                category.forEach(project => {
                    allProjects.push({...project, popupIndex: index++});
                });
            });
        } else if (category === 'iot' && window.iotProjectsData) {
            Object.values(window.iotProjectsData).forEach(category => {
                category.forEach(project => {
                    allProjects.push({...project, popupIndex: index++});
                });
            });
        }
        
        return allProjects;
    }

    // Function to generate popup slides HTML with thumbnail grid for each project
    function generatePopupSlides(projects) {
        return projects.map(project => {
            const images = project.images || [];
            const description = project.description || 'No description available';
            const technologies = project.technologies || [];
            
            // Generate thumbnail grid HTML if there are multiple images
            let imagesHTML = '';
            if (images.length > 0) {
                const thumbnails = images.map((img, idx) => 
                    `<img src="${img}" alt="${project.title} - Image ${idx + 1}" 
                          class="popup-thumbnail ${idx === 0 ? 'active' : ''}" 
                          data-index="${idx}"
                          onclick="event.stopPropagation(); switchPopupImage(this, '${project.popupIndex}', ${idx})"
                          onerror="this.src='images/ImageNotAvailable.webp'">`
                ).join('');
                
                const mainImage = images[0] || 'images/ImageNotAvailable.webp';
                
                imagesHTML = `
                    <div class="popup-images-grid">${thumbnails}</div>
                    <img src="${mainImage}" alt="${project.title}" 
                         class="popup-main-image" 
                         id="popup-main-image-${project.popupIndex}"
                         onclick="event.stopPropagation(); openFullscreenImage('${mainImage}')"
                         onerror="this.src='images/ImageNotAvailable.webp'">
                `;
            } else {
                imagesHTML = `<img src="images/ImageNotAvailable.webp" alt="No Image" class="popup-main-image">`;
            }
            
            let linksHTML = '';
            if (project.links && project.links.length > 0) {
                project.links.forEach(link => {
                    const isGitHub = link.url && link.url.includes('github');
                    const btnText = link.name || (isGitHub ? 'GitHub' : 'Live Demo');
                    linksHTML += `<a href="${link.url}" target="_blank" class="card-link"><i class="${link.icon || (isGitHub ? 'fab fa-github' : 'fas fa-external-link-alt')}"></i> ${btnText}</a>`;
                });
            }
            
            return `
                <div class="swiper-slide">
                    <div class="popup-card">
                        <div class="popup-image-container">
                            ${imagesCarouselHTML}
                        </div>
                        <div class="popup-content">
                            <h3>${project.title}</h3>
                            <p>${description}</p>
                            <div class="popup-technologies">
                                ${technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                            </div>
                            <div class="popup-links">
                                ${linksHTML}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Function to open popup with specific project index
    function openPopup(startIndex = 0, category = 'web') {
        // Only open popup on laptop and large tablet screens (min 1024px)
        if (window.innerWidth < 1024) {
            return;
        }
        
        // Store current category for filter
        window.currentPopupCategory = category;
        
        const projects = collectProjectsByCategory(category);
        if (projects.length === 0) return;
        
        popupWrapper.innerHTML = generatePopupSlides(projects);
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Initialize main popup Swiper
        if (popupSwiper) {
            popupSwiper.destroy(true, true);
        }
        
        popupSwiper = new Swiper('#popup-swiper', {
            initialSlide: startIndex,
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            grabCursor: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '#popup-swiper .swiper-button-next',
                prevEl: '#popup-swiper .swiper-button-prev',
            },
            keyboard: {
                enabled: true,
            },
            on: {
                init: function() {
                    // Initialize image swipers for each project after main swiper init
                    setTimeout(() => {
                        projects.forEach((project, idx) => {
                            const imageSwiperEl = document.getElementById(`popup-image-swiper-${idx}`);
                            if (imageSwiperEl && project.images && project.images.length > 1) {
                                new Swiper(`#popup-image-swiper-${idx}`, {
                                    slidesPerView: 1,
                                    spaceBetween: 0,
                                    loop: project.images.length > 1,
                                    pagination: {
                                        el: imageSwiperEl.querySelector('.swiper-pagination'),
                                        clickable: true,
                                    },
                                });
                            }
                        });
                    }, 100);
                },
            },
        });
    }

    // Function to close popup
    function closePopup() {
        popup.classList.remove('active');
        document.body.style.overflow = '';
        if (popupSwiper) {
            popupSwiper.destroy(true, true);
            popupSwiper = null;
        }
    }

    // Close button click
    if (closeBtn) {
        closeBtn.addEventListener('click', closePopup);
    }

    // Close on overlay click
    if (popup) {
        popup.addEventListener('click', function(e) {
            if (e.target === popup) {
                closePopup();
            }
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popup.classList.contains('active')) {
            closePopup();
        }
    });

    // Make openPopup available globally
    window.openProjectPopup = openPopup;
    
    // Function to switch popup main image when thumbnail is clicked
    window.switchPopupImage = function(thumbnail, popupIndex, imageIndex) {
        const mainImage = document.getElementById(`popup-main-image-${popupIndex}`);
        if (mainImage && thumbnail.src) {
            mainImage.src = thumbnail.src;
            
            // Update active thumbnail
            const grid = thumbnail.closest('.popup-images-grid');
            if (grid) {
                grid.querySelectorAll('.popup-thumbnail').forEach(thumb => thumb.classList.remove('active'));
                thumbnail.classList.add('active');
            }
        }
    };
    
    // Generate filter buttons based on category
    function generateFilterButtons(category) {
        const filterContainer = document.getElementById('popup-filter');
        if (!filterContainer) return;
        
        let categories = [];
        let labels = {};
        
        if (category === 'web') {
            categories = ['frontend_apps', 'backend_apps', 'fullstack_apps', 'others_apps'];
            labels = {
                'frontend_apps': 'Frontend Apps',
                'backend_apps': 'Backend Apps',
                'fullstack_apps': 'Fullstack Apps',
                'others_apps': 'Others Apps'
            };
        } else if (category === 'mobile') {
            categories = ['quiz_apps', 'others_apps'];
            labels = {
                'quiz_apps': 'Quiz Apps',
                'others_apps': 'Others Apps'
            };
        } else if (category === 'iot') {
            categories = ['InternetofThings', 'others apps'];
            labels = {
                'InternetofThings': 'Internet of Things',
                'others apps': 'Others apps'
            };
        }
        
        filterContainer.innerHTML = `
            <div class="filter-buttons">
                ${categories.map(cat => `
                    <button class="filter-btn" data-category="${cat}">
                        ${labels[cat]}
                    </button>
                `).join('')}
            </div>
        `;
        
        // Add click handlers - scroll to category like main sections
        filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const targetCategory = this.dataset.category;
                
                // Update active button
                filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Find first project with this category and slide to it
                if (popupSwiper && window.currentPopupCategory === 'web' && window.webProjectsData) {
                    let categoryIndex = 0;
                    let foundIndex = -1;
                    
                    Object.values(window.webProjectsData).forEach(projectList => {
                        projectList.forEach(project => {
                            if (project.category === targetCategory && foundIndex === -1) {
                                foundIndex = categoryIndex;
                            }
                            categoryIndex++;
                        });
                    });
                    
                    if (foundIndex >= 0) {
                        popupSwiper.slideTo(foundIndex);
                    }
                } else if (popupSwiper && window.currentPopupCategory === 'mobile' && window.mobileProjectsData) {
                    let categoryIndex = 0;
                    let foundIndex = -1;
                    
                    Object.values(window.mobileProjectsData).forEach(projectList => {
                        projectList.forEach(project => {
                            if (project.category === targetCategory && foundIndex === -1) {
                                foundIndex = categoryIndex;
                            }
                            categoryIndex++;
                        });
                    });
                    
                    if (foundIndex >= 0) {
                        popupSwiper.slideTo(foundIndex);
                    }
                } else if (popupSwiper && window.currentPopupCategory === 'iot' && window.iotProjectsData) {
                    let categoryIndex = 0;
                    let foundIndex = -1;
                    
                    Object.values(window.iotProjectsData).forEach(projectList => {
                        projectList.forEach(project => {
                            if (project.category === targetCategory && foundIndex === -1) {
                                foundIndex = categoryIndex;
                            }
                            categoryIndex++;
                        });
                    });
                    
                    if (foundIndex >= 0) {
                        popupSwiper.slideTo(foundIndex);
                    }
                }
            });
        });
    }
    
    // Override openPopup to generate filter buttons
    window.openProjectPopup = function(startIndex = 0, category = 'web') {
        // Only open popup on laptop and large tablet screens (min 1024px)
        if (window.innerWidth < 1024) {
            return;
        }
        
        window.currentPopupCategory = category;
        
        // Generate filter buttons based on category
        generateFilterButtons(category);
        
        const projects = collectProjectsByCategory(category);
        if (projects.length === 0) return;
        
        popupWrapper.innerHTML = generatePopupSlides(projects);
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        if (popupSwiper) {
            popupSwiper.destroy(true, true);
        }
        
        popupSwiper = new Swiper('#popup-swiper', {
            initialSlide: startIndex,
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            grabCursor: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '#popup-swiper .swiper-button-next',
                prevEl: '#popup-swiper .swiper-button-prev',
            },
            on: {
                init: function() {
                    // Thumbnails are now clickable - no need for inner swiper
                },
                // Update active filter button based on current slide
                slideChange: function() {
                    const currentIndex = this.realIndex;
                    const currentProject = projects[currentIndex];
                    if (currentProject && currentProject.category) {
                        const filterContainer = document.getElementById('popup-filter');
                        if (filterContainer) {
                            filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
                                btn.classList.toggle('active', btn.dataset.category === currentProject.category);
                            });
                        }
                    }
                },
            },
        });
    };
});
