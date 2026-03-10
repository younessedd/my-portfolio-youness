/**
 * Web Projects Card Slider
 * Uses Swiper.js to display project cards
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check if data is loaded
    if (typeof webProjectsData === 'undefined') {
        console.error('Web projects data not found!');
        return;
    }

    const wrapper = document.getElementById('web-projects-wrapper');
    if (!wrapper) return;

    // Flatten all projects from all categories
    const allProjects = [
        ...webProjectsData.frontend,
        ...webProjectsData.backend,
        ...webProjectsData.fullstack,
        ...webProjectsData.others
    ];

    // Generate card HTML
    allProjects.forEach((project, index) => {
        const categoryLabel = getCategoryLabel(project.category);
        const firstImage = project.images && project.images[0] ? project.images[0] : 'images/ImageNotAvailable.webp';
        
        // Get first link (prefer live demo, fallback to github)
        let projectLink = '#';
        let githubLink = '#';
        
        if (project.links && project.links.length > 0) {
            const liveLink = project.links.find(l => l.name === 'Live Demo');
            const gitLink = project.links.find(l => l.name === 'GitHub');
            if (liveLink && liveLink.url !== '#') projectLink = liveLink.url;
            if (gitLink) githubLink = gitLink.url;
        }

        const card = document.createElement('div');
        card.className = 'swiper-slide';
        card.innerHTML = `
            <div class="web-project-card">
                <div class="card-image">
                    <img src="${firstImage}" alt="${project.title}" loading="lazy" 
                        onerror="this.src='images/ImageNotAvailable.webp'">
                    <span class="card-badge">${categoryLabel}</span>
                </div>
                <div class="card-content">
                    <h3 class="card-title">${project.title}</h3>
                    <p class="card-description">${project.description}</p>
                    <div class="card-technologies">
                        ${project.technologies.slice(0, 3).map(tech => 
                            `<span class="tech-tag">${tech}</span>`
                        ).join('')}
                        ${project.technologies.length > 3 ? 
                            `<span class="tech-tag">+${project.technologies.length - 3}</span>` : ''}
                    </div>
                    <div class="card-buttons">
                        ${projectLink !== '#' ? 
                            `<a href="${projectLink}" class="card-btn live-btn" target="_blank" rel="noopener noreferrer">
                                <i class="fas fa-external-link-alt"></i> Live
                            </a>` : ''}
                        ${githubLink !== '#' ? 
                            `<a href="${githubLink}" class="card-btn github-btn" target="_blank" rel="noopener noreferrer">
                                <i class="fab fa-github"></i> Code
                            </a>` : ''}
                    </div>
                </div>
            </div>
        `;
        wrapper.appendChild(card);
    });

    // Initialize Swiper
    const swiper = new Swiper('#webProjectsSwiper', {
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

function getCategoryLabel(category) {
    const labels = {
        'frontend': 'Frontend',
        'backend': 'Backend',
        'fullstack': 'Full Stack',
        'others': 'Other'
    };
    return labels[category] || category;
}
