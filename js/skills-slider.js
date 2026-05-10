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

    // Dynamically get all categories from skillsData
    const allSkills = [];
    Object.keys(skillsData).forEach(categoryKey => {
        allSkills.push(...skillsData[categoryKey]);
    });

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

    // Get all slides
    const allSlides = wrapper.querySelectorAll('.swiper-slide');
    const slideCount = allSlides.length;
    
    // Clone slides to reach 260 total (need 195 more clones)
    const targetSlides = 260;
    const clonesNeeded = targetSlides - slideCount;
    
    // Add clones to end
    for (let i = 0; i < clonesNeeded; i++) {
        const slideToClone = allSlides[i % slideCount];
        const clone = slideToClone.cloneNode(true);
        wrapper.appendChild(clone);
    }
    
    // Add clones to beginning for seamless loop
    for (let i = 0; i < clonesNeeded; i++) {
        const slideToClone = allSlides[(slideCount - 1) - (i % slideCount)];
        const clone = slideToClone.cloneNode(true);
        wrapper.insertBefore(clone, wrapper.firstChild);
    }

    // Initialize Swiper with configuration for skills display
    console.log('🍔 Initializing Swiper...');
    const swiper = new Swiper(`#${swiperId}`, {
        // Enable infinite loop
        loop: true,
        // Set slides per view
        slidesPerView: 4,
        // Set transition speed - slower
        speed: 800,
        // Set space between slides
        spaceBetween: 30,
        // Autoplay - slower
        autoplay: {
            delay: 800,
            disableOnInteraction: false
        },
        // Important: tell Swiper how many slides to loop
        loopAdditionalSlides: slideCount,
    });

    console.log('✅ Skills swiper initialized successfully!');
}
