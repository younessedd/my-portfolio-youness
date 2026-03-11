/**
 * IoT Projects Swiper Sliders
 *
 * This script initializes and manages two independent Swiper sliders for the IoT projects section.
 * One slider displays Internet of Things (IoT) automation projects and the other displays additional IoT applications.
 * Each slider uses the same card structure without buttons, focusing on project details and technologies.
 */

// Wait for DOM to be fully loaded before initializing sliders
document.addEventListener('DOMContentLoaded', function() {
    // Check if IoT projects data is available, exit if not loaded
    if (typeof iotProjectsData === 'undefined') return;

    // Initialize swiper for Internet of Things automation projects
    initIoTSwiper('iot-iot', 'iot-iot-cards', iotProjectsData.InternetofThings);

    // Initialize swiper for other IoT applications (sensors, robotics, etc.)
    initIoTSwiper('iot-others', 'iot-others-cards', iotProjectsData.others);
});

// Main function to initialize an IoT swiper slider
function initIoTSwiper(swiperId, wrapperId, projects) {
    // Get the swiper wrapper element where slides will be added
    const wrapper = document.getElementById(wrapperId);
    // Exit if wrapper not found or no projects to display
    if (!wrapper || !projects?.length) return;

    // Loop through each IoT project and create a slide
    projects.forEach(p => {
        // Get project image, fallback to default if not available
        const img = p.images?.[0] || 'images/ImageNotAvailable.webp';

        // Create slide element
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';

        // Generate HTML content for the IoT project card
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
                            <div class="card-tags">
                                ${p.technologies?.slice(0, 3).map(t => `<span>${t}</span>`).join('') || ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add the completed slide to the wrapper
        wrapper.appendChild(slide);
    });

    // Initialize Swiper with configuration for IoT projects
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
