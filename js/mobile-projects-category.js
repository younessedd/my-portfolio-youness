/**
 * Mobile Projects Category Swiper
 * Single Swiper with category buttons and autoplay
 * Uses SAME card styling as Web Projects for consistency
 */

(function() {
    'use strict';
    
    const categories = ['quiz', 'others'];
    let currentCategoryIndex = 0;
    let swiper = null;
    let allProjects = [];
    let categoryStartIndices = {};
    
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', setup);
        } else {
            setup();
        }
    }
    
    function setup() {
        if (typeof window.mobileProjectsData === 'undefined') {
            setTimeout(setup, 100);
            return;
        }
        
        collectAllProjects();
        setupButtons();
        initSwiper();
    }
    
    function collectAllProjects() {
        let index = 0;
        categories.forEach(cat => {
            categoryStartIndices[cat] = index;
            const projects = window.mobileProjectsData[cat] || [];
            projects.forEach(p => {
                allProjects.push({...p, _category: cat});
                index++;
            });
        });
    }
    
    function setupButtons() {
        document.querySelectorAll('.mobile-category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const cat = e.target.dataset.category;
                const idx = categories.indexOf(cat);
                if (idx >= 0 && swiper) {
                    currentCategoryIndex = idx;
                    swiper.slideTo(categoryStartIndices[cat], 500);
                    updateButtons();
                }
            });
        });
    }
    
    function updateButtons() {
        document.querySelectorAll('.mobile-category-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.category === categories[currentCategoryIndex]) {
                btn.classList.add('active');
            }
        });
    }
    
    function createSlide(project) {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        
        // Use first image
        const img = project.images && project.images[0] ? project.images[0] : 'images/mobile/placeholder.webp';
        
        // Use EXACT SAME card structure as Web Projects for identical styling (no features)
        slide.innerHTML = `
            <div class="web-card">
                <div class="web-card-img">
                    <img src="${img}" alt="${project.title}" loading="lazy">
                </div>
                <div class="web-card-body">
                    <h3 class="web-card-title">${project.title}</h3>
                    <p class="web-card-description">${project.description}</p>
                    <div class="web-card-tags">
                        ${(project.technologies || []).map(t => `<span class="web-tag">${t}</span>`).join('')}
                    </div>
                    <div class="web-card-btns">
                        ${(project.links || []).map(l => `<a href="${l.url}" target="_blank" class="web-card-btn"><i class="${l.icon}"></i> ${l.name}</a>`).join('')}
                    </div>
                </div>
            </div>
        `;
        
        return slide;
    }
    
    function initSwiper() {
        const wrapper = document.getElementById('mobile-projects-cards');
        
        allProjects.forEach(project => {
            wrapper.appendChild(createSlide(project));
        });
        
        swiper = new Swiper('#mobile-projects-swiper', {
            loop: false,
            speed: 700,
            spaceBetween: 30,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false
            },
            pagination: {
                el: '#mobile-projects-swiper .swiper-pagination',
                clickable: true,
                dynamicBullets: true
            },
            navigation: {
                nextEl: '#mobile-projects-swiper .swiper-button-next',
                prevEl: '#mobile-projects-swiper .swiper-button-prev'
            },
            breakpoints: {
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            },
            on: {
                slideChange: function() {
                    updateCurrentCategory();
                }
            }
        });
    }
    
    function updateCurrentCategory() {
        const idx = swiper.realIndex;
        let found = false;
        
        for (let i = categories.length - 1; i >= 0; i--) {
            if (idx >= categoryStartIndices[categories[i]]) {
                if (currentCategoryIndex !== i) {
                    currentCategoryIndex = i;
                    updateButtons();
                }
                found = true;
                break;
            }
        }
        
        if (!found || idx >= allProjects.length) {
            currentCategoryIndex = 0;
            updateButtons();
            swiper.slideTo(0, 500);
        }
    }
    
    init();
})();
