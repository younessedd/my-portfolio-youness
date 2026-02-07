// Fast Splash Screen - Clean & Optimized
window.addEventListener('load', () => {
    const splashScreen = document.getElementById('splash-screen');
    const loadingText = document.querySelector('.loading-text');
    const progressFill = document.querySelector('.progress-fill');
    
    if (!splashScreen) return;
    
    // Fast loading messages
    const messages = ["Loading...", "Ready!"];
    let msgIndex = 0;
    const msgInterval = setInterval(() => {
        if (loadingText && msgIndex < messages.length) {
            loadingText.textContent = messages[msgIndex++];
        } else {
            clearInterval(msgInterval);
        }
    }, 200);
    
    // Fast progress bar
    let progress = 0;
    const progressInterval = setInterval(() => {
        if (progressFill && progress < 100) {
            progress = Math.min(progress + 20, 100);
            progressFill.style.width = progress + '%';
        } else {
            clearInterval(progressInterval);
        }
    }, 50);
    
    // Hide splash screen quickly
    setTimeout(() => {
        splashScreen.style.transition = 'opacity 0.3s ease-out';
        splashScreen.style.opacity = '0';
        
        setTimeout(() => {
            splashScreen.classList.add('hidden');
            // Activate home link
            document.querySelectorAll('a[href="#home"]').forEach(link => {
                link.classList.add('active');
            });
        }, 300);
    }, 800); // Fast 0.8 second delay
});

// Skip splash with any key
document.addEventListener('keydown', (e) => {
    const splashScreen = document.getElementById('splash-screen');
    if (splashScreen && !splashScreen.classList.contains('hidden')) {
        if (['Escape', 'Enter', ' '].includes(e.key)) {
            splashScreen.style.transition = 'opacity 0.2s ease-out';
            splashScreen.style.opacity = '0';
            setTimeout(() => {
                splashScreen.classList.add('hidden');
                document.querySelectorAll('a[href="#home"]').forEach(link => {
                    link.classList.add('active');
                });
            }, 200);
        }
    }
});
