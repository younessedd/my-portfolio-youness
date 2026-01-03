// CV Cards Click Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all CV cards
    const cvCards = document.querySelectorAll('.cv-card');
    
    cvCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Prevent button clicks from triggering card click
            if (e.target.closest('.cv-popup-btn')) {
                return;
            }
            
            // Find the button inside this card and click it
            const button = this.querySelector('.cv-popup-btn');
            if (button) {
                button.click();
            }
        });
        
        // Add hover effect for better UX
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    console.log('📄 CV Cards click functionality initialized');
});
