/**
 * skills-modal.js - Skills Modal Management
 * Handles skills modal, navigation between skill categories, and skills data
 */

const SkillsModalManager = {
    // DOM Elements
    elements: {
        skillsNav: null,
        modalOverlay: null,
        modal: null,
        closeBtn: null,
        modalCards: {}
    },
    
    // Skills data
    skillsData: {
        web: {
            title: "Web Development",
            subtitle: "Frontend & Backend Development",
            icon: "fa-code",
            skills: [
                { icon: "fab fa-html5", name: "HTML5" },
                { icon: "fab fa-css3-alt", name: "CSS3" },
                { icon: "fab fa-js", name: "JavaScript (ES6+)" },
                { icon: "fas fa-mobile-alt", name: "Responsive Design" },
                { icon: "fab fa-react", name: "React.js" },
                { icon: "fas fa-server", name: "REST APIs" },
                { icon: "fab fa-git-alt", name: "Git / GitHub" },
                { icon: "fas fa-paint-brush", name: "UI/UX Basics" },
                { icon: "fab fa-bootstrap", name: "Bootstrap / Tailwind CSS" },
                { icon: "fab fa-laravel", name: "Laravel" }
            ]
        },
        iot: {
            title: "IoT & Electronics",
            subtitle: "Internet of Things & Electrical Engineering",
            icon: "fa-microchip",
            skills: [
                { icon: "fas fa-microchip", name: "ESP32 Programming" },
                { icon: "fas fa-wifi", name: "ESP8266 Programming" },
                { icon: "fas fa-robot", name: "Arduino Programming" },
                { icon: "fas fa-broadcast-tower", name: "MQTT Protocol" },
                { icon: "fas fa-temperature-high", name: "Sensors & Actuators" },
                { icon: "fas fa-bluetooth", name: "Bluetooth BLE" },
                { icon: "fas fa-home", name: "Smart Home Automation" },
                { icon: "fas fa-wifi", name: "WiFi IoT Systems" },
                { icon: "fas fa-microchip", name: "NodeMCU Projects" },
                { icon: "fab fa-google", name: "Firebase (IoT)" },
                { icon: "fas fa-bolt", name: "Electrical/Electronics" },
                { icon: "fas fa-project-diagram", name: "Circuit Design" },
                { icon: "fas fa-industry", name: "Industrial Electrical Maintenance" },
                { icon: "fas fa-tools", name: "Troubleshooting & Diagnostics" },
                { icon: "fas fa-file-alt", name: "Electrical Schematics Reading" },
                { icon: "fas fa-plug", name: "Contactors / Relays / Protection" },
                { icon: "fas fa-sliders-h", name: "Control Panels" },
                { icon: "fas fa-industry", name: "Basic PLC Knowledge" },
                { icon: "fas fa-sensor", name: "Industrial Sensors & Automation Components" }
            ]
        },
        mobile: {
            title: "Mobile Development",
            subtitle: "Android App Development",
            icon: "fa-mobile-alt",
            skills: [
                { icon: "fas fa-mobile-alt", name: "Kodular App Development" },
                { icon: "fas fa-paint-brush", name: "Android UI Design" },
                { icon: "fas fa-bluetooth", name: "Bluetooth/BLE Integration" },
                { icon: "fab fa-google", name: "Firebase Integration" },
                { icon: "fas fa-sync-alt", name: "IoT App Communication" }
            ]
        },
        soft: {
            title: "Soft Skills",
            subtitle: "Professional & Interpersonal Skills",
            icon: "fa-star",
            skills: [
                { icon: "fas fa-lightbulb", name: "Problem Solving" },
                { icon: "fas fa-palette", name: "Creativity" },
                { icon: "fas fa-clock", name: "Time Management" },
                { icon: "fas fa-brain", name: "Critical Thinking" },
                { icon: "fas fa-comments", name: "Communication" },
                { icon: "fas fa-users", name: "Teamwork" },
                { icon: "fas fa-chalkboard-teacher", name: "Presentation Skills" },
                { icon: "fas fa-paint-brush", name: "UI/UX Design" }
            ]
        }
    },
    
    // State
    currentCategory: 'web',
    
    /**
     * Initialize skills modal
     */
    init: function() {
        this.cacheElements();
        this.setupEventListeners();
        this.loadSkillsData();
        console.log('Skills modal manager initialized');
    },
    
    /**
     * Cache DOM elements
     */
    cacheElements: function() {
        this.elements.skillsNav = document.getElementById('skills-nav');
        this.elements.modalOverlay = document.getElementById('skills-modal-overlay');
        this.elements.modal = document.getElementById('skills-modal');
        this.elements.closeBtn = document.getElementById('skills-close-modal-btn');
        
        // Cache modal cards
        this.elements.modalCards = {
            web: document.getElementById('web-modal-card'),
            iot: document.getElementById('iot-modal-card'),
            mobile: document.getElementById('mobile-modal-card'),
            soft: document.getElementById('soft-modal-card')
        };
    },
    
    /**
     * Setup event listeners
     */
    setupEventListeners: function() {
        // Skills navigation buttons
        if (this.elements.skillsNav) {
            const navButtons = this.elements.skillsNav.querySelectorAll('.skill-nav-btn');
            navButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    const category = e.currentTarget.dataset.category;
                    this.openModal(category);
                });
            });
        }
        
        // Close modal button
        if (this.elements.closeBtn) {
            this.elements.closeBtn.addEventListener('click', () => this.closeModal());
        }
        
        // Close modal when clicking outside
        if (this.elements.modalOverlay) {
            this.elements.modalOverlay.addEventListener('click', (e) => {
                if (e.target === this.elements.modalOverlay) {
                    this.closeModal();
                }
            });
        }
        
        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isModalOpen()) {
                this.closeModal();
            }
        });
    },
    
    /**
     * Load skills data into modal cards
     */
    loadSkillsData: function() {
        Object.keys(this.skillsData).forEach(category => {
            const data = this.skillsData[category];
            const card = this.elements.modalCards[category];
            
            if (card) {
                this.populateCard(card, data);
            }
        });
        
        console.log('Skills data loaded');
    },
    
    /**
     * Populate a modal card with skills data
     */
    populateCard: function(card, data) {
        // Create skills grid HTML
        const skillsHTML = data.skills.map(skill => `
            <div class="skill-item">
                <i class="${skill.icon}"></i>
                <span>${skill.name}</span>
            </div>
        `).join('');
        
        // Update card content
        card.innerHTML = `
            <div class="skill-card-header">
                <div class="skill-icon">
                    <i class="fas ${data.icon}"></i>
                </div>
                <h3>${data.title}</h3>
                <p class="skill-subtitle">${data.subtitle}</p>
            </div>
            <div class="skills-grid-container">
                ${skillsHTML}
            </div>
        `;
    },
    
    /**
     * Open modal with specific category
     * @param {string} category - Skill category ('web', 'iot', 'mobile', 'soft')
     */
    openModal: function(category) {
        if (!this.skillsData[category]) {
            console.error('Invalid category:', category);
            return;
        }
        
        this.currentCategory = category;
        
        // Remove active class from all cards
        Object.values(this.elements.modalCards).forEach(card => {
            if (card) card.classList.remove('active');
        });
        
        // Add active class to selected card
        const targetCard = this.elements.modalCards[category];
        if (targetCard) {
            targetCard.classList.add('active');
        }
        
        // Show modal
        if (this.elements.modalOverlay) {
            this.elements.modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
            
            // Add active class to clicked button
            this.updateActiveNavButton(category);
            
            console.log(`Modal opened for category: ${category}`);
            
            // Show toast notification
            if (typeof showToast === 'function') {
                showToast(`Viewing ${this.skillsData[category].title} skills`, 'info');
            }
        }
    },
    
    /**
     * Close modal
     */
    closeModal: function() {
        if (this.elements.modalOverlay) {
            this.elements.modalOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
            
            // Remove active class from all nav buttons
            if (this.elements.skillsNav) {
                const navButtons = this.elements.skillsNav.querySelectorAll('.skill-nav-btn');
                navButtons.forEach(button => button.classList.remove('active'));
            }
            
            console.log('Modal closed');
        }
    },
    
    /**
     * Check if modal is open
     * @returns {boolean} True if modal is open
     */
    isModalOpen: function() {
        return this.elements.modalOverlay && 
               this.elements.modalOverlay.classList.contains('active');
    },
    
    /**
     * Update active navigation button
     * @param {string} category - Active category
     */
    updateActiveNavButton: function(category) {
        if (!this.elements.skillsNav) return;
        
        // Remove active class from all buttons
        const navButtons = this.elements.skillsNav.querySelectorAll('.skill-nav-btn');
        navButtons.forEach(button => button.classList.remove('active'));
        
        // Add active class to clicked button
        const activeButton = this.elements.skillsNav.querySelector(`[data-category="${category}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }
    },
    
    /**
     * Get current category
     * @returns {string} Current category
     */
    getCurrentCategory: function() {
        return this.currentCategory;
    },
    
    /**
     * Add a new skill to a category
     * @param {string} category - Skill category
     * @param {Object} skill - Skill object with icon and name
     */
    addSkill: function(category, skill) {
        if (this.skillsData[category]) {
            this.skillsData[category].skills.push(skill);
            
            // Update the card if it exists
            const card = this.elements.modalCards[category];
            if (card) {
                this.populateCard(card, this.skillsData[category]);
            }
            
            console.log(`Skill added to ${category}:`, skill.name);
        } else {
            console.error('Category not found:', category);
        }
    },
    
    /**
     * Remove a skill from a category
     * @param {string} category - Skill category
     * @param {string} skillName - Name of skill to remove
     */
    removeSkill: function(category, skillName) {
        if (this.skillsData[category]) {
            this.skillsData[category].skills = this.skillsData[category].skills.filter(
                skill => skill.name !== skillName
            );
            
            // Update the card if it exists
            const card = this.elements.modalCards[category];
            if (card) {
                this.populateCard(card, this.skillsData[category]);
            }
            
            console.log(`Skill removed from ${category}:`, skillName);
        } else {
            console.error('Category not found:', category);
        }
    },
    
    /**
     * Add a new category
     * @param {string} category - New category key
     * @param {Object} data - Category data (title, subtitle, icon, skills)
     */
    addCategory: function(category, data) {
        if (this.skillsData[category]) {
            console.warn(`Category ${category} already exists`);
            return;
        }
        
        this.skillsData[category] = data;
        
        // Create new modal card
        this.createModalCard(category, data);
        
        // Add navigation button
        this.addNavButton(category, data);
        
        console.log(`Category added: ${category}`);
    },
    
    /**
     * Create a new modal card for a category
     */
    createModalCard: function(category, data) {
        // This would require updating the HTML structure
        // For now, just log that this feature needs HTML updates
        console.log(`To add category ${category}, update HTML to include modal card`);
    },
    
    /**
     * Add navigation button for a category
     */
    addNavButton: function(category, data) {
        // This would require updating the HTML structure
        // For now, just log that this feature needs HTML updates
        console.log(`To add category ${category}, update HTML to include nav button`);
    }
};

// Initialize skills modal when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    SkillsModalManager.init();
});

// Setup skills navigation (called from main.js)
function setupSkillsNavigation() {
    // This function is called from main.js to initialize the skills navigation
    console.log('Skills navigation setup complete');
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SkillsModalManager,
        setupSkillsNavigation
    };
}