/**
 * Skills Card Slider
 * Uses Swiper.js to display skill category cards
 */

document.addEventListener('DOMContentLoaded', function() {
    if (typeof skillsData === 'undefined') {
        console.error('Skills data not found!');
        return;
    }

    const wrapper = document.getElementById('skills-wrapper');
    if (!wrapper) return;

    const categories = [
        { key: 'webDevelopment', label: 'Web Dev', icon: 'fas fa-globe' },
        { key: 'mobileDevelopment', label: 'Mobile', icon: 'fas fa-mobile-alt' },
        { key: 'iotAndDomotic', label: 'IoT', icon: 'fas fa-wifi' },
        { key: 'electronicsAndElectric', label: 'Electronics', icon: 'fas fa-bolt' },
        { key: 'roboticsAndAutomatism', label: 'Robotics', icon: 'fas fa-robot' },
        { key: 'softSkills', label: 'Soft Skills', icon: 'fas fa-users' },
        { key: 'aiPrompt', label: 'AI Tools', icon: 'fas fa-robot' }
    ];

    categories.forEach(cat => {
        const data = skillsData[cat.key];
        if (!data || !data[0]) return;

        const skill = data[0];
        
        const card = document.createElement('div');
        card.className = 'swiper-slide';
        card.innerHTML = `
            <div class="skill-card">
                <div class="skill-card-header">
                    <div class="skill-icon">
                        <i class="${cat.icon}"></i>
                    </div>
                    <h3 class="skill-title">${skill.title}</h3>
                </div>
                <p class="skill-description">${skill.description}</p>
                <div class="skill-tags">
                    ${skill.skills.slice(0, 6).map(s => 
                        `<span class="skill-tag" style="--tag-color: ${s.color}">
                            <i class="${s.icon}"></i> ${s.name}
                        </span>`
                    ).join('')}
                    ${skill.skills.length > 6 ? `<span class="skill-tag more">+${skill.skills.length - 6}</span>` : ''}
                </div>
                <div class="skill-features">
                    ${skill.features.slice(0, 3).map(f => `<li>${f}</li>`).join('')}
                </div>
            </div>
        `;
        wrapper.appendChild(card);
    });

    const swiper = new Swiper('#skillsSwiper', {
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
