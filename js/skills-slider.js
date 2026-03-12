/**
 * Skills Swiper Slider
 *
 * This script initializes and manages a single Swiper slider for the skills section.
 * It combines all skills from different categories (web development, mobile development, IoT, etc.)
 * into one continuous slider with compact skill cards and autoplay functionality.
 */

// Wait for DOM to be fully loaded before initializing the skills slider
document.addEventListener('DOMContentLoaded', function() {
    console.log('🍔 Skills swiper: DOM loaded, checking skillsData...');

    // Check if skills data is available, exit if not loaded
    if (typeof skillsData === 'undefined') {
        console.error('❌ Skills swiper: skillsData is undefined!');
        return;
    }

    console.log('✅ Skills swiper: skillsData found, combining categories...');

    // Combine skills from all categories into a single array for unified display
    const allSkills = [
        // Spread operator to include all web development skills
        ...skillsData.webDevelopment,
        // Spread operator to include all mobile development skills
        ...skillsData.mobileDevelopment,
        // Spread operator to include all IoT and domotics skills
        ...skillsData.iotAndDomotic,
        // Spread operator to include all electronics and electrical skills
        ...skillsData.electronicsAndElectric,
        // Spread operator to include all robotics and automation skills
        ...skillsData.roboticsAndAutomatism,
        // Spread operator to include all soft skills
        ...skillsData.softSkills,
        // Spread operator to include all AI prompt engineering skills
        ...skillsData.aiPrompt
    ];

    console.log('🍔 Skills swiper: Combined skills:', allSkills.length, 'categories');
    console.log('🍔 Skills swiper: First category skills:', allSkills[0]?.skills?.length || 'no skills');

    // Initialize the skills swiper with combined data
    initSkillsSwiper('skillsSwiper', 'skills-wrapper', allSkills);
});

// Main function to initialize the skills swiper slider
function initSkillsSwiper(swiperId, wrapperId, skillsCategories) {
    console.log('🍔 initSkillsSwiper called with:', swiperId, wrapperId, skillsCategories?.length);

    // Get the swiper wrapper element where slides will be added
    const wrapper = document.getElementById(wrapperId);
    console.log('🍔 Wrapper element found:', !!wrapper);

    // Exit if wrapper not found or no skills categories to display
    if (!wrapper || !skillsCategories?.length) {
        console.error('❌ Skills swiper: Wrapper not found or no categories!');
        return;
    }

    console.log('🍔 Creating slides for', skillsCategories.length, 'categories...');

    let totalSlides = 0;

    // Loop through each skill category
    skillsCategories.forEach((cat, catIndex) => {
        console.log('🍔 Processing category', catIndex, 'title:', cat.title, 'skills:', cat.skills?.length);

        // Skip categories that don't have a skills array
        if (!cat.skills) {
            console.warn('⚠️ Category has no skills array:', cat.title);
            return;
        }

        // Loop through each individual skill within the category
        cat.skills.forEach((skill, skillIndex) => {
            console.log('🍔 Creating slide for skill:', skill.name, 'in category:', cat.title);

            // Create slide element for each skill
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';

            // Generate HTML content for the skill card
            slide.innerHTML = `
                <div class="card-item">
                    <div class="card-wrapper">
                        <div class="card-list">
                            <div class="card-body">
                                <span class="card-badge">${cat.title}</span>
                                <div class="skill-icon" style="--skill-color: ${skill.color}">
                                    <i class="${skill.icon}"></i>
                                </div>
                                <h4>${skill.name}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Add the completed slide to the wrapper
            wrapper.appendChild(slide);
            totalSlides++;
        });
    });

    console.log('🍔 Total slides created:', totalSlides);
    console.log('🍔 Wrapper children count:', wrapper.children.length);

    // Initialize Swiper with configuration for skills display
    console.log('🍔 Initializing Swiper...');
    new Swiper(`#${swiperId}`, {
        // Enable infinite loop scrolling
        loop: true,
        // Set transition speed in milliseconds
        speed: 700,
        // Set space between slides in pixels
        spaceBetween: 30,
        // Configure autoplay functionality
        autoplay: {
            // Delay between automatic slides in milliseconds (1 second)
            delay: 1000,
            // Continue autoplay after user interaction
            disableOnInteraction: false
        },
        // Configure pagination dots
        pagination: {
            el: `#${swiperId} .swiper-pagination`,
            clickable: true,
            dynamicBullets: true
        },
        // Responsive breakpoints for different screen sizes
        breakpoints: {
            // Extra small screens: 1 slide per view
            0: { slidesPerView: 1 },
            // Small screens: 2 slides per view
            576: { slidesPerView: 2 },
            // Medium screens: 3 slides per view
            768: { slidesPerView: 3 },
            // Large screens: 4 slides per view
            1024: { slidesPerView: 4 }
        }
    });

    console.log('✅ Skills swiper initialized successfully!');
}
