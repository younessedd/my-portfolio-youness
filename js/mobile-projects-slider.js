/**
 * Mobile Projects Swiper Sliders
 *
 * This script initializes and manages two independent Swiper sliders for the mobile projects section.
 * One slider displays quiz applications and the other displays utility/smart home applications.
 * Each slider uses the same card structure with mobile-specific features like download stats and ratings.
 */

// Wait for DOM to be fully loaded before initializing sliders
document.addEventListener('DOMContentLoaded', function() {
    // Check if mobile projects data is available, exit if not loaded
    if (typeof mobileProjectsData === 'undefined') return;

    // Initialize swiper for quiz applications
    initMobileSwiper('mobile-quiz', 'mobile-quiz-cards', mobileProjectsData.quiz);

    // Initialize swiper for other mobile applications (utilities and smart home)
    initMobileSwiper('mobile-others', 'mobile-others-cards', mobileProjectsData.others);
});

// Main function to initialize a mobile swiper slider
function initMobileSwiper(swiperId, wrapperId, projects) {
    // Get the swiper wrapper element where slides will be added
    const wrapper = document.getElementById(wrapperId);
    // Exit if wrapper not found or no projects to display
    if (!wrapper || !projects?.length) return;

    // Loop through each mobile project and create a slide
    projects.forEach(p => {
        // Get project image, fallback to default if not available
        const img = p.images?.[0] || 'images/ImageNotAvailable.webp';
        // Get Google Play Store URL, default to '#' if not available
        const playStore = p.links?.find(l => l.name === 'Google Play')?.url || '#';

        // Create slide element
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';

        // Generate HTML content for the mobile app card
        slide.innerHTML = `
            <div class="card-item">
                <div class="card-wrapper">
                    <div class="card-list">
                        <div class="card-img">
                            <img src="${img}" alt="${p.title}" loading="lazy" onerror="this.src='images/ImageNotAvailable.webp'">
                        </div>
                        <div class="card-body">
                            <span class="card-badge">${p.category}</span>
                            <h4>${p.title}</h4>
                            <p>${p.description}</p>
                            <div class="card-stats">
                                ${p.downloads ? `<span><i class="fas fa-download"></i> ${p.downloads}</span>` : ''}
                                ${p.rating ? `<span><i class="fas fa-star"></i> ${p.rating}</span>` : ''}
                            </div>
                            <div class="card-tags">
                                ${p.technologies.slice(0, 3).map(t => `<span>${t}</span>`).join('')}
                            </div>
                            <div class="card-btns">
                                ${playStore !== '#' ? `<a href="${playStore}" target="_blank" class="btn-playstore"><i class="fab fa-google-play"></i> Play Store</a>` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add the completed slide to the wrapper
        wrapper.appendChild(slide);
    });

    // Initialize Swiper with configuration for mobile projects
    new Swiper(`#${swiperId}`, {
        // Enable infinite loop scrolling
        loop: true,
        // Set transition speed in milliseconds
        speed: 700,
        // Set space between slides in pixels
        spaceBetween: 30,
        // Configure pagination dots
        pagination: {
            el: `#${swiperId} .swiper-pagination`,
            clickable: true,
            dynamicBullets: true
        },
        // Configure navigation arrows
        navigation: {
            nextEl: `#${swiperId} .swiper-button-next`,
            prevEl: `#${swiperId} .swiper-button-prev`
        },
        // Responsive breakpoints for different screen sizes
        breakpoints: {
            // Mobile: 1 slide per view
            0: { slidesPerView: 1 },
            // Tablet: 2 slides per view
            768: { slidesPerView: 2 },
            // Desktop: 3 slides per view
            1024: { slidesPerView: 3 }
        }
    });
}
