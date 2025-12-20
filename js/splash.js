window.addEventListener('load', () => {
    const splashScreen = document.getElementById('splash-screen');
    const loadingText = document.querySelector('.loading-text');
    const progressFill = document.querySelector('.progress-fill');
    const codeLines = document.querySelectorAll('.code-line');
    
    if (splashScreen) {
        // Dynamic loading text updates
        const loadingMessages = [
            "Initializing...",
            "Loading modules...", 
            "Building portfolio...",
            "Optimizing performance...",
            "Ready to launch!"
        ];
        
        let messageIndex = 0;
        const messageInterval = setInterval(() => {
            if (loadingText && messageIndex < loadingMessages.length) {
                loadingText.textContent = loadingMessages[messageIndex];
                messageIndex++;
            } else {
                clearInterval(messageInterval);
            }
        }, 600);
        
        // Animate code lines typing effect
        codeLines.forEach((line, index) => {
            const codeText = line.querySelector('.code-text');
            if (codeText) {
                const originalText = codeText.textContent;
                codeText.textContent = '';
                
                setTimeout(() => {
                    typeCode(codeText, originalText, 50);
                }, 200 + (index * 300));
            }
        });
        
        function typeCode(element, text, speed) {
            let i = 0;
            const cursor = element.querySelector('.cursor');
            
            function type() {
                if (i < text.length) {
                    if (cursor) {
                        element.insertBefore(document.createTextNode(text.charAt(i)), cursor);
                    } else {
                        element.textContent += text.charAt(i);
                    }
                    i++;
                    setTimeout(type, speed);
                }
            }
            
            type();
        }
        
        // Progress bar animation with realistic loading
        let progress = 0;
        const progressInterval = setInterval(() => {
            if (progressFill && progress < 100) {
                // Simulate realistic loading with varying speeds
                const increment = Math.random() * 15 + 5;
                progress = Math.min(progress + increment, 100);
                progressFill.style.width = progress + '%';
                
                // Add glow effect when near completion
                if (progress > 80) {
                    progressFill.style.boxShadow = '0 0 30px rgba(16, 185, 129, 0.8)';
                }
            } else {
                clearInterval(progressInterval);
            }
        }, 200);
        
        // Hide splash screen after loading completes
        setTimeout(() => {
            if (splashScreen) {
                // Add fade out effect
                splashScreen.style.transition = 'opacity 1s ease-out, visibility 1s';
                splashScreen.style.opacity = '0';
                splashScreen.style.visibility = 'hidden';
                
                // Remove from DOM after transition
                setTimeout(() => {
                    splashScreen.classList.add('hidden');
                }, 1000);
            }
        }, 3500); // Extended delay for better loading experience
    }
});

// Add keyboard interaction for professional feel
document.addEventListener('keydown', (e) => {
    const splashScreen = document.getElementById('splash-screen');
    if (splashScreen && !splashScreen.classList.contains('hidden')) {
        // Allow skipping splash screen with any key press
        if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
            splashScreen.style.transition = 'opacity 0.5s ease-out, visibility 0.5s';
            splashScreen.style.opacity = '0';
            splashScreen.style.visibility = 'hidden';
            
            setTimeout(() => {
                splashScreen.classList.add('hidden');
            }, 500);
        }
    }
});
