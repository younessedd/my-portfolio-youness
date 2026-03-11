/**
 * Web Projects Swiper Sliders
 *
 * This script initializes and manages four independent Swiper sliders for the web projects section.
 * Each slider represents a different category: frontend, backend, fullstack, and others.
 * The script also includes layout correction functions to ensure proper vertical stacking.
 */

// Wait for DOM to be fully loaded before initializing sliders
document.addEventListener('DOMContentLoaded', function() {
    // Check if web projects data is available, exit if not loaded
    if (typeof webProjectsData === 'undefined') return;

    // Initialize four separate swiper sliders for each project category
    initSwiper('web-frontend', 'web-frontend-cards', webProjectsData.frontend);
    initSwiper('web-backend', 'web-backend-cards', webProjectsData.backend);
    initSwiper('web-fullstack', 'web-fullstack-cards', webProjectsData.fullstack);
    initSwiper('web-others', 'web-others-cards', webProjectsData.others);

    // Apply initial layout corrections to ensure vertical stacking
    forceVerticalStacking();

    // Set up a MutationObserver to continuously monitor and fix layout changes
    const container = document.querySelector('#web-apps .container');
    if (container) {
        // Create observer to watch for DOM changes that might affect layout
        const observer = new MutationObserver(() => {
            // Reapply layout fixes whenever DOM changes occur
            forceVerticalStacking();
        });
        // Observe container for attribute changes, child additions/removals, and subtree modifications
        observer.observe(container, {
            attributes: true,
            childList: true,
            subtree: true,
            attributeFilter: ['style', 'class']
        });
    }
});

// Function to force vertical stacking of swiper containers and rows
function forceVerticalStacking() {
    // Get the main container element
    const container = document.querySelector('#web-apps .container');
    // Get all row elements within the web apps section
    const rows = document.querySelectorAll('#web-apps .web-row');
    // Get all swiper elements
    const swipers = document.querySelectorAll('#web-apps .swiper');

    // Apply flexbox layout to container for vertical stacking
    if (container) {
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        // Remove any grid layout that might interfere
        container.style.gridTemplateColumns = 'none';
    }

    // Force each row to be a block element with full width
    rows.forEach((row) => {
        row.style.display = 'block';
        row.style.width = '100%';
        row.style.marginBottom = '50px';
        // Reset positioning to prevent layout conflicts
        row.style.position = 'static';
        row.style.left = 'auto';
        row.style.top = 'auto';
        row.style.transform = 'none';
    });

    // Ensure each swiper takes full width
    swipers.forEach((swiper) => {
        swiper.style.display = 'block';
        swiper.style.width = '100%';
    });
}

// Additional layout correction triggers on window load and with delays
window.addEventListener('load', forceVerticalStacking);
setTimeout(forceVerticalStacking, 100);
setTimeout(forceVerticalStacking, 500);
setTimeout(forceVerticalStacking, 1000);
setTimeout(forceVerticalStacking, 2000);

// Main function to initialize a single Swiper slider
function initSwiper(swiperId, wrapperId, projects) {
    // Get the swiper wrapper element where slides will be added
    const wrapper = document.getElementById(wrapperId);
    // Exit if wrapper not found or no projects to display
    if (!wrapper || !projects?.length) return;

    // Loop through each project and create a slide
    projects.forEach(p => {
        // Get project image, fallback to default if not available
        const img = p.images?.[0] || 'images/ImageNotAvailable.webp';
        // Get live demo URL, default to '#' if not available
        const live = p.links?.find(l => l.name === 'Live Demo')?.url || '#';
        // Get GitHub URL, default to '#' if not available
        const git = p.links?.find(l => l.name === 'GitHub')?.url || '#';

        // Create slide element
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';

        // Generate HTML content for the project card
        slide.innerHTML = `
            <div class="web-card">
                <div class="web-card-img">
                    <img src="${img}" alt="${p.title}" loading="lazy" onerror="this.src='images/ImageNotAvailable.webp'">
                </div>
                <div class="web-card-body">
                    <h4>${p.title}</h4>
                    <p>${p.description}</p>
                    <div class="web-card-tags">
                        ${p.technologies.slice(0, 3).map(t => `<span>${t}</span>`).join('')}
                    </div>
                    <div class="web-card-btns">
                        ${live !== '#' ? `<a href="${live}" target="_blank" class="btn-live">Live</a>` : ''}
                        ${git !== '#' ? `<a href="${git}" target="_blank" class="btn-code">Code</a>` : ''}
                    </div>
                </div>
            </div>
        `;

        // Add the completed slide to the wrapper
        wrapper.appendChild(slide);
    });

    // Initialize Swiper with configuration
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
