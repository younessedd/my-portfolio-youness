// Force Home link to show hover effects when app opens
document.addEventListener('DOMContentLoaded', function() {
    console.log('ForceHomeHover: DOM loaded, activating Home link');
    
    function activateHomeLink() {
        console.log('ForceHomeHover: Activating Home link');
        
        // Find all Home links
        const homeLinks = document.querySelectorAll('a[href="#home"]');
        console.log('ForceHomeHover: Found', homeLinks.length, 'Home links');
        
        homeLinks.forEach((link, index) => {
            console.log(`ForceHomeHover: Activating Home link ${index}:`, link);
            
            // Add active class
            link.classList.add('active');
            
            // Force styles for mobile navigation
            if (link.classList.contains('mobile-nav-link')) {
                link.style.cssText = `
                    background: rgba(16, 185, 129, 0.3) !important;
                    color: #10b981 !important;
                    border-color: rgba(16, 185, 129, 0.6) !important;
                    transform: translateY(-2px) scale(1.02) !important;
                    box-shadow: 0 12px 35px rgba(16, 185, 129, 0.4), 0 0 60px rgba(16, 185, 129, 0.3) !important;
                    text-shadow: 0 2px 12px rgba(16, 185, 129, 0.5) !important;
                `;
            }
            // Force styles for desktop navigation
            else if (link.closest('.desktop-nav')) {
                link.style.cssText = `
                    color: var(--text) !important;
                    transform: translateY(-2px) !important;
                    text-shadow: 0 0 20px rgba(16, 185, 129, 0.4) !important;
                    background: rgba(16, 185, 129, 0.1) !important;
                    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2) !important;
                `;
            }
        });
    }
    
    // Activate immediately
    activateHomeLink();
    
    // Activate multiple times to ensure it works
    setTimeout(activateHomeLink, 100);
    setTimeout(activateHomeLink, 300);
    setTimeout(activateHomeLink, 500);
    setTimeout(activateHomeLink, 1000);
});

// Also activate when window loads
window.addEventListener('load', function() {
    console.log('ForceHomeHover: Window loaded, activating Home link');
    
    function activateHomeLink() {
        const homeLinks = document.querySelectorAll('a[href="#home"]');
        homeLinks.forEach(link => {
            link.classList.add('active');
            
            if (link.classList.contains('mobile-nav-link')) {
                link.style.cssText = `
                    background: rgba(16, 185, 129, 0.3) !important;
                    color: #10b981 !important;
                    border-color: rgba(16, 185, 129, 0.6) !important;
                    transform: translateY(-2px) scale(1.02) !important;
                    box-shadow: 0 12px 35px rgba(16, 185, 129, 0.4), 0 0 60px rgba(16, 185, 129, 0.3) !important;
                    text-shadow: 0 2px 12px rgba(16, 185, 129, 0.5) !important;
                `;
            } else if (link.closest('.desktop-nav')) {
                link.style.cssText = `
                    color: var(--text) !important;
                    transform: translateY(-2px) !important;
                    text-shadow: 0 0 20px rgba(16, 185, 129, 0.4) !important;
                    background: rgba(16, 185, 129, 0.1) !important;
                    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2) !important;
                `;
            }
        });
    }
    
    activateHomeLink();
    setTimeout(activateHomeLink, 200);
});
