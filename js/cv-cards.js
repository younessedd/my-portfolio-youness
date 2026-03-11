/**
 * CV Cards Interactive Effects
 *
 * This script manages the hover effects for CV cards in the portfolio.
 * It provides smooth animations when users hover over CV card elements.
 * Card clicks have been disabled to prevent navigation conflicts.
 */

// Wait for DOM to be fully loaded before initializing CV card effects
document.addEventListener('DOMContentLoaded', function() {
    // Get all CV card elements on the page
    const cvCards = document.querySelectorAll('.cv-card');

    // Loop through each CV card to add interactive effects
    cvCards.forEach(card => {
        // Add mouse enter event listener for hover-in effect
        card.addEventListener('mouseenter', function() {
            // Apply transform effect: lift up and slightly scale the card
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        // Add mouse leave event listener for hover-out effect
        card.addEventListener('mouseleave', function() {
            // Reset transform to original position and scale
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Log successful initialization of CV card effects
    console.log('📄 CV Cards hover effects initialized (clicks removed)');
});
