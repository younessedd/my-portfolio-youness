window.addEventListener('load', () => {
    const splashScreen = document.getElementById('splash-screen');
    if (splashScreen) {
        setTimeout(() => {
            splashScreen.classList.add('hidden');
        }, 500); // Delay to ensure a smooth transition
    }
});
