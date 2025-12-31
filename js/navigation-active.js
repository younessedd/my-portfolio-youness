/* ============================================
   ACTIVE NAVIGATION LINK DETECTION
   Highlights navigation links when sections are visible
============================================ */

class ActiveNavigation {
    constructor() {
        this.sections = [];
        this.navLinks = [];
        this.activeSection = null;
        this.init();
    }
    
    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }
    
    setup() {
        // Get all sections and navigation links
        this.sections = document.querySelectorAll('section[id]');
        this.navLinks = document.querySelectorAll('.mobile-nav-link, .desktop-nav a[href^="#"]');
        
        if (this.sections.length === 0 || this.navLinks.length === 0) {
            console.log('ActiveNavigation: No sections or navigation links found');
            return;
        }
        
        console.log(`ActiveNavigation: Found ${this.sections.length} sections and ${this.navLinks.length} navigation links`);
        
        // Debug: List all found navigation links
        console.log('ActiveNavigation: All navigation links found:');
        this.navLinks.forEach((link, index) => {
            console.log(`Link ${index}:`, link.href, link.className, link.textContent);
        });
        
        // Handle URL hash fragments on page load
        const hash = window.location.hash.substring(1);
        const initialSection = hash || 'home';
        
        // Force Home link to show hover effects when app opens
        console.log('ActiveNavigation: Forcing Home link to show hover');
        
        // Simple, direct Home link activation with multiple attempts
        const activateHomeOnLoad = () => {
            console.log('ActiveNavigation: Activating Home link');
            
            // Find all Home links
            const homeLinks = document.querySelectorAll('a[href="#home"]');
            console.log('Found Home links:', homeLinks.length);
            
            homeLinks.forEach((link, index) => {
                console.log(`Activating Home link ${index}:`, link);
                
                // Add active class
                link.classList.add('active');
                
                // Force apply hover styles directly with !important
                if (link.classList.contains('mobile-nav-link')) {
                    link.setAttribute('style', `
                        background: rgba(16, 185, 129, 0.3) !important;
                        color: #10b981 !important;
                        border-color: rgba(16, 185, 129, 0.6) !important;
                        transform: translateY(-2px) scale(1.02) !important;
                        box-shadow: 0 12px 35px rgba(16, 185, 129, 0.4), 0 0 60px rgba(16, 185, 129, 0.3) !important;
                        text-shadow: 0 2px 12px rgba(16, 185, 129, 0.5) !important;
                    `);
                } else if (link.closest('.desktop-nav')) {
                    link.setAttribute('style', `
                        color: var(--text) !important;
                        transform: translateY(-2px) !important;
                        text-shadow: 0 0 20px rgba(16, 185, 129, 0.4) !important;
                        background: rgba(16, 185, 129, 0.1) !important;
                        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2) !important;
                    `);
                }
            });
        };
        
        // Try to activate immediately
        if (document.readyState !== 'loading') {
            activateHomeOnLoad();
        }
        
        // Activate on DOM ready
        document.addEventListener('DOMContentLoaded', activateHomeOnLoad);
        
        // Activate on window load
        window.addEventListener('load', activateHomeOnLoad);
        
        // Multiple activation attempts for reliability
        setTimeout(activateHomeOnLoad, 50);
        setTimeout(activateHomeOnLoad, 150);
        setTimeout(activateHomeOnLoad, 300);
        setTimeout(activateHomeOnLoad, 600);
        
        // Scroll to section if hash is provided
        if (hash && hash !== 'home') {
            const targetSection = document.getElementById(hash);
            if (targetSection) {
                const headerHeight = document.querySelector('header')?.offsetHeight || 80;
                const targetPosition = targetSection.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        } else {
            // Ensure page starts at the top for Home section
            window.scrollTo(0, 0);
        }
        
        // Create Intersection Observer for section detection
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.setActiveSection(entry.target.id);
                }
            });
        }, {
            threshold: 0.5, // Section must be 50% visible
            rootMargin: '-20% 0px -20% 0px' // Trigger when section is in middle of viewport
        });
        
        // Observe all sections
        this.sections.forEach(section => {
            this.observer.observe(section);
        });
        
        // Handle navigation link clicks
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    const targetId = href.substring(1);
                    const targetSection = document.getElementById(targetId);
                    
                    if (targetSection) {
                        // Smooth scroll to section
                        e.preventDefault();
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        
                        // Close mobile menu if open
                        this.closeMobileMenu();
                        
                        // Update active section immediately for better UX
                        this.setActiveSection(targetId);
                    }
                }
            });
        });
    }
    
    setActiveSection(sectionId) {
        console.log(`ActiveNavigation: Setting active section to ${sectionId}`);
        
        // Remove active class from ALL navigation links first
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            // Clear any inline styles to ensure clean state
            if (link.classList.contains('mobile-nav-link')) {
                link.style.background = '';
                link.style.color = '';
                link.style.borderColor = '';
                link.style.transform = '';
                link.style.boxShadow = '';
                link.style.textShadow = '';
            }
        });
        
        // Add active class ONLY to current section's navigation link
        const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
            this.activeSection = sectionId;
            console.log(`ActiveNavigation: Active section set to ${sectionId}`, activeLink);
            
            // Force a reflow to ensure CSS changes are applied
            activeLink.offsetHeight;
            
            // Apply hover effects ONLY to the active mobile navigation link
            if (activeLink.classList.contains('mobile-nav-link')) {
                console.log('ActiveNavigation: Applying hover effects to mobile nav link for section:', sectionId);
                // Force apply hover styles ONLY for the active mobile navigation link
                activeLink.style.background = 'rgba(16, 185, 129, 0.3)';
                activeLink.style.color = '#10b981';
                activeLink.style.borderColor = 'rgba(16, 185, 129, 0.6)';
                activeLink.style.transform = 'translateY(-2px) scale(1.02)';
                activeLink.style.boxShadow = '0 12px 35px rgba(16, 185, 129, 0.4), 0 0 60px rgba(16, 185, 129, 0.3)';
                activeLink.style.textShadow = '0 2px 12px rgba(16, 185, 129, 0.5)';
            }
        } else {
            console.warn(`ActiveNavigation: Could not find navigation link for section: ${sectionId}`);
            
            // Debug: Log all available links
            console.log('Available navigation links:', this.navLinks);
            this.navLinks.forEach((link, index) => {
                console.log(`Link ${index}:`, link.href, link.className);
            });
        }
    }
    
    closeMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const burgerBtn = document.getElementById('burger-btn');
        
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            burgerBtn.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Public method to manually set active section
    setActive(sectionId) {
        this.setActiveSection(sectionId);
    }
    
    // Dedicated method to activate Home link with hover effects
    activateHomeLink() {
        console.log('ActiveNavigation: Activating Home link with hover effects');
        
        // Remove active class from all navigation links
        this.navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Find and activate Home links in both mobile and desktop navigation
        const homeLinks = document.querySelectorAll('a[href="#home"]');
        homeLinks.forEach(link => {
            link.classList.add('active');
            console.log('ActiveNavigation: Home link activated:', link);
            
            // Force apply hover styles directly for immediate effect
            if (link.classList.contains('mobile-nav-link')) {
                link.style.background = 'rgba(16, 185, 129, 0.3)';
                link.style.color = '#10b981';
                link.style.borderColor = 'rgba(16, 185, 129, 0.6)';
                link.style.transform = 'translateY(-2px) scale(1.02)';
                link.style.boxShadow = '0 12px 35px rgba(16, 185, 129, 0.4)';
            } else if (link.closest('.desktop-nav')) {
                link.style.color = 'var(--text)';
                link.style.transform = 'translateY(-2px)';
                link.style.textShadow = '0 0 20px rgba(16, 185, 129, 0.4)';
                link.style.background = 'rgba(16, 185, 129, 0.1)';
                link.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.2)';
            }
        });
        
        this.activeSection = 'home';
    }
    
    // Cleanup method
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
        this.sections = [];
        this.navLinks = [];
        this.activeSection = null;
    }
}

// Initialize Active Navigation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Create global instance
    window.activeNavigation = new ActiveNavigation();
    
    console.log('ActiveNavigation: Navigation active detection initialized');
});

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ActiveNavigation;
}
