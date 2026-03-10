/**
 * IoT Projects Card Slider
 * Uses Swiper.js to display project cards
 */

document.addEventListener('DOMContentLoaded', function() {
    if (typeof iotProjectsData === 'undefined') {
        console.error('IoT projects data not found!');
        return;
    }

    const wrapper = document.getElementById('iot-projects-wrapper');
    if (!wrapper) return;

    const allProjects = [
        ...iotProjectsData.home,
        ...iotProjectsData.industrial,
        ...iotProjectsData.sensors,
        ...iotProjectsData.othersiot
    ];

    allProjects.forEach((project) => {
        const categoryLabel = getIoTCategoryLabel(project.category);
        const firstImage = project.images && project.images[0] ? project.images[0] : 'images/ImageNotAvailable.webp';

        const card = document.createElement('div');
        card.className = 'swiper-slide';
        card.innerHTML = `
            <div class="iot-project-card">
                <div class="card-image">
                    <img src="${firstImage}" alt="${project.title}" loading="lazy" 
                        onerror="this.src='images/ImageNotAvailable.webp'">
                    <span class="card-badge">${categoryLabel}</span>
                </div>
                <div class="card-content">
                    <h3 class="card-title">${project.title}</h3>
                    <p class="card-description">${project.description}</p>
                    <div class="card-technologies">
                        ${project.technologies.slice(0, 4).map(tech => 
                            `<span class="tech-tag">${tech}</span>`
                        ).join('')}
                    </div>
                    <div class="card-features">
                        <h4>Features:</h4>
                        <ul>
                            ${project.features.slice(0, 3).map(f => `<li>${f}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;
        wrapper.appendChild(card);
    });

    const swiper = new Swiper('#iotProjectsSwiper', {
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

function getIoTCategoryLabel(category) {
    const labels = {
        'home': 'Smart Home',
        'industrial': 'Industrial',
        'sensors': 'Sensors',
        'othersiot': 'Robotics'
    };
    return labels[category] || category;
}
