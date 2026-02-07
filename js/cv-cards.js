// CV Cards Click Functionality - REMOVED CARD CLICKS
document.addEventListener('DOMContentLoaded', function() {
    // Get all CV cards - REMOVED CLICK HANDLERS
    const cvCards = document.querySelectorAll('.cv-card');
    
    cvCards.forEach(card => {
        // REMOVED: card click event listener
        // Card clicks are now disabled - only <a> tags remain clickable
        
        // Add hover effect for better UX (keeping this)
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    console.log('📄 CV Cards hover effects initialized (clicks removed)');
});
