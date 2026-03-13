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

    // Function to generate popup slides HTML with image carousel for each project
    function generatePopupSlides(projects) {
        return projects.map(project => {
            const images = project.images || [];
            const description = project.description || 'No description available';
            const technologies = project.technologies || [];
            
            // Generate image carousel HTML if there are multiple images
            let imagesCarouselHTML = '';
            if (images.length > 0) {
                const imagesSlides = images.map((img, idx) => 
                    `<div class="swiper-slide"><img src="${img}" alt="${project.title} - Image ${idx + 1}" class="popup-project-image" onerror="this.src='https://via.placeholder.com/800x500?text=No+Image'"></div>`
                ).join('');
                
                imagesCarouselHTML = `
                    <div class="popup-image-swiper swiper" id="popup-image-swiper-${project.popupIndex}">
                        <div class="swiper-wrapper">${imagesSlides}</div>
                        <div class="swiper-pagination"></div>
                        <div class="swiper-button-next"></div>
                        <div class="swiper-button-prev"></div>
                    </div>
                `;
            } else {
                imagesCarouselHTML = `<img src="https://via.placeholder.com/800x500?text=No+Image" alt="No Image" class="popup-project-image">`;
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
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
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
                                    navigation: {
                                        nextEl: imageSwiperEl.querySelector('.swiper-button-next'),
                                        prevEl: imageSwiperEl.querySelector('.swiper-button-prev'),
                                    },
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
    
    // Add click handlers for popup filter buttons
    const popupFilterBtns = document.querySelectorAll('#project-popup .web-filter .filter-btn');
    popupFilterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            popupFilterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.category;
            const currentCategory = window.currentPopupCategory || 'web';
            
            // Get all projects from current category (web/mobile/iot)
            let projects = collectProjectsByCategory(currentCategory);
            
            // Filter by sub-category
            if (filter) {
                projects = projects.filter(p => p.category === filter);
            }
            
            // Re-render popup with filtered projects
            if (projects.length > 0) {
                popupWrapper.innerHTML = generatePopupSlides(projects);
                
                if (popupSwiper) {
                    popupSwiper.destroy(true, true);
                }
                
                popupSwiper = new Swiper('#popup-swiper', {
                    initialSlide: 0,
                    slidesPerView: 1,
                    spaceBetween: 30,
                    loop: true, // Infinite loop
                    grabCursor: true,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                    keyboard: {
                        enabled: true,
                    },
                    on: {
                        init: function() {
                            setTimeout(() => {
                                projects.forEach((project, idx) => {
                                    const imageSwiperEl = document.getElementById(`popup-image-swiper-${idx}`);
                                    if (imageSwiperEl && project.images && project.images.length > 1) {
                                        new Swiper(`#popup-image-swiper-${idx}`, {
                                            slidesPerView: 1,
                                            spaceBetween: 0,
                                            loop: project.images.length > 1,
                                            navigation: {
                                                nextEl: imageSwiperEl.querySelector('.swiper-button-next'),
                                                prevEl: imageSwiperEl.querySelector('.swiper-button-prev'),
                                            },
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
        });
    });
    
    // Make filter buttons cycle through categories when swiping
    const originalOpenPopup = openPopup;
    window.openProjectPopup = function(startIndex = 0, category = 'web') {
        // Store current category for filter
        window.currentPopupCategory = category;
        
        // Get all projects from current category (web/mobile/iot)
        const projects = collectProjectsByCategory(category);
        if (projects.length === 0) return;
        
        popupWrapper.innerHTML = generatePopupSlides(projects);
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Initialize main popup Swiper with infinite loop
        if (popupSwiper) {
            popupSwiper.destroy(true, true);
        }
        
        popupSwiper = new Swiper('#popup-swiper', {
            initialSlide: startIndex,
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true, // Infinite loop across all projects
            grabCursor: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
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
                                    navigation: {
                                        nextEl: imageSwiperEl.querySelector('.swiper-button-next'),
                                        prevEl: imageSwiperEl.querySelector('.swiper-button-prev'),
                                    },
                                    pagination: {
                                        el: imageSwiperEl.querySelector('.swiper-pagination'),
                                        clickable: true,
                                    },
                                });
                            }
                        });
                    }, 100);
                },
                // Update active filter button based on current slide
                slideChange: function() {
                    const currentIndex = this.realIndex;
                    const currentProject = projects[currentIndex];
                    if (currentProject && currentProject.category) {
                        popupFilterBtns.forEach(btn => {
                            btn.classList.toggle('active', btn.dataset.category === currentProject.category);
                        });
                    }
                },
            },
        });
    };
});
