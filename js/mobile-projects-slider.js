/**
 * Mobile Projects Card Slider
 * Uses Swiper.js to display project cards
 */

document.addEventListener('DOMContentLoaded', function() {
    if (typeof mobileProjectsData === 'undefined') {
        console.error('Mobile projects data not found!');
        return;
    }

    const wrapper = document.getElementById('mobile-projects-wrapper');
    if (!wrapper) return;

    const allProjects = [
        ...mobileProjectsData.quiz,
        ...mobileProjectsData.utility,
        ...mobileProjectsData.smartHome
    ];

    allProjects.forEach((project) => {
        const categoryLabel = getMobileCategoryLabel(project.category);
        const firstImage = project.images && project.images[0] ? project.images[0] : 'images/ImageNotAvailable.webp';
        
        let playLink = '#';
        if (project.links && project.links.length > 0 && project.links[0].url !== '#') {
            playLink = project.links[0].url;
        }

        const card = document.createElement('div');
        card.className = 'swiper-slide';
        card.innerHTML = `
            <div class="mobile-project-card">
                <div class="card-image">
                    <img src="${firstImage}" alt="${project.title}" loading="lazy" 
                        onerror="this.src='images/ImageNotAvailable.webp'">
                    <span class="card-badge">${categoryLabel}</span>
                </div>
                <div class="card-content">
                    <h3 class="card-title">${project.title}</h3>
                    <p class="card-description">${project.description}</p>
                    <div class="card-stats">
                        ${project.downloads ? `<span class="stat"><i class="fas fa-download"></i> ${project.downloads}</span>` : ''}
                        ${project.rating ? `<span class="stat"><i class="fas fa-star"></i> ${project.rating}</span>` : ''}
                    </div>
                    <div class="card-technologies">
                        ${project.technologies.slice(0, 3).map(tech => 
                            `<span class="tech-tag">${tech}</span>`
                        ).join('')}
                    </div>
                    <div class="card-buttons">
                        ${playLink !== '#' ? 
                            `<a href="${playLink}" class="card-btn play-btn" target="_blank" rel="noopener noreferrer">
                                <i class="fab fa-google-play"></i> Get App
                            </a>` : ''}
                    </div>
                </div>
            </div>
        `;
        wrapper.appendChild(card);
    });

    const swiper = new Swiper('#mobileProjectsSwiper', {
        loop: true,
        speed: 700,
        spaceBetween: 30,
        slidesPerView: 1,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            }
        }
    });
});

function getMobileCategoryLabel(category) {
    const labels = {
        'quiz': 'Quiz App',
        'utility': 'Utility',
        'smartHome': 'Smart Home'
    };
    return labels[category] || category;
}
