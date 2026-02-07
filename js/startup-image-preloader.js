/* ============================================
   COMPREHENSIVE STARTUP IMAGE PRELOADER
   Preload ALL popup images on app start for instant display
============================================ */

class StartupImagePreloader {
    constructor() {
        this.preloadedImages = new Map();
        this.totalImages = 0;
        this.loadedImages = 0;
        this.failedImages = 0;
        this.progressCallback = null;
        this.completionCallback = null;
    }

    // Main initialization method - called on app start
    async init(progressCallback = null, completionCallback = null) {
        this.progressCallback = progressCallback;
        this.completionCallback = completionCallback;
        
        // Collect all image URLs from project data
        const allImageUrls = this.collectAllImageUrls();
        this.totalImages = allImageUrls.length;
        
        if (this.totalImages === 0) {
            this.completePreloading();
            return;
        }

        // Start aggressive parallel preloading for maximum speed
        await this.preloadImagesAggressive(allImageUrls);
    }

    // Collect all image URLs from project data
    collectAllImageUrls() {
        const imageUrls = new Set();
        
        // Collect web project images
        if (window.webProjectsData) {
            Object.values(window.webProjectsData).forEach(category => {
                category.forEach(project => {
                    if (project.images) {
                        project.images.forEach(img => imageUrls.add(img));
                    }
                });
            });
        }

        // Collect mobile project images
        if (window.mobileProjectsData) {
            Object.values(window.mobileProjectsData).forEach(category => {
                category.forEach(project => {
                    if (project.images) {
                        project.images.forEach(img => imageUrls.add(img));
                    }
                });
            });
        }

        // Collect IoT project images
        if (window.iotProjectsData) {
            Object.values(window.iotProjectsData).forEach(category => {
                category.forEach(project => {
                    if (project.images) {
                        project.images.forEach(img => imageUrls.add(img));
                    }
                });
            });
        }

        // Collect skills images
        if (window.skillsData) {
            Object.values(window.skillsData).forEach(category => {
                category.forEach(skill => {
                    if (skill.image) {
                        imageUrls.add(skill.image);
                    }
                });
            });
        }

        return this.optimizeImageOrder(Array.from(imageUrls));
    }

    // Optimize image loading order - WebP first, then critical images
    optimizeImageOrder(urls) {
        return urls.sort((a, b) => {
            // Prioritize WebP images (faster loading)
            const aIsWebP = a.includes('.webp');
            const bIsWebP = b.includes('.webp');
            
            if (aIsWebP && !bIsWebP) return -1;
            if (!aIsWebP && bIsWebP) return 1;
            
            // Then prioritize hero and first images
            const aIsHero = a.includes('hero') || a.includes('main');
            const bIsHero = b.includes('hero') || b.includes('main');
            
            if (aIsHero && !bIsHero) return -1;
            if (!aIsHero && bIsHero) return 1;
            
            return 0;
        });
    }

    // Aggressive parallel preloading with batch optimization
    async preloadImagesAggressive(imageUrls) {
        // Process in parallel batches for maximum speed
        const batchSize = 8; // Load 8 images simultaneously
        
        for (let i = 0; i < imageUrls.length; i += batchSize) {
            const batch = imageUrls.slice(i, i + batchSize);
            const batchPromises = batch.map(url => this.preloadImageFast(url));
            
            // Wait for current batch to complete before next batch
            await Promise.allSettled(batchPromises);
            
            // Small delay between batches to prevent browser overload
            if (i + batchSize < imageUrls.length) {
                await new Promise(resolve => setTimeout(resolve, 10));
            }
        }
        
        this.completePreloading();
    }

    // Ultra-fast image preloading with optimization
    preloadImageFast(url) {
        return new Promise((resolve) => {
            // Skip if already preloaded
            if (this.preloadedImages.has(url)) {
                resolve();
                return;
            }

            // Use link preload for maximum performance
            const preloadLink = document.createElement('link');
            preloadLink.rel = 'preload';
            preloadLink.as = 'image';
            preloadLink.href = url;
            preloadLink.fetchPriority = 'high';
            
            // Add to head for immediate loading
            document.head.appendChild(preloadLink);
            
            // Also create Image object for caching
            const img = new Image();
            
            img.onload = () => {
                this.preloadedImages.set(url, img);
                this.loadedImages++;
                this.updateProgress();
                document.head.removeChild(preloadLink);
                resolve();
            };
            
            img.onerror = () => {
                this.preloadedImages.set(url, null);
                this.failedImages++;
                this.updateProgress();
                if (document.head.contains(preloadLink)) {
                    document.head.removeChild(preloadLink);
                }
                resolve();
            };
            
            // Start loading immediately with highest priority
            img.src = url;
            img.fetchPriority = 'high';
            img.loading = 'eager';
        });
    }

    // Preload multiple images with progress tracking
    async preloadImages(imageUrls) {
        const preloadPromises = imageUrls.map(url => this.preloadSingleImage(url));
        
        // Wait for all images to complete (success or failure)
        await Promise.allSettled(preloadPromises);
        
        this.completePreloading();
    }

    // Preload a single image with progress tracking
    preloadSingleImage(url) {
        return new Promise((resolve, reject) => {
            // Skip if already preloaded
            if (this.preloadedImages.has(url)) {
                resolve();
                return;
            }

            const img = new Image();
            
            img.onload = () => {
                this.preloadedImages.set(url, img);
                this.loadedImages++;
                this.updateProgress();
                resolve();
            };
            
            img.onerror = () => {
                this.preloadedImages.set(url, null);
                this.failedImages++;
                this.updateProgress();
                resolve(); // Resolve even on error to continue preloading
            };
            
            // Start loading with high priority
            img.src = url;
            img.fetchpriority = 'high';
        });
    }

    // Update progress callback
    updateProgress() {
        if (this.progressCallback) {
            const progress = (this.loadedImages + this.failedImages) / this.totalImages;
            const percentage = Math.round(progress * 100);
            this.progressCallback({
                loaded: this.loadedImages,
                failed: this.failedImages,
                total: this.totalImages,
                percentage: percentage
            });
        }
    }

    // Complete preloading process
    completePreloading() {
        if (this.completionCallback) {
            this.completionCallback({
                loaded: this.loadedImages,
                failed: this.failedImages,
                total: this.totalImages,
                success: this.loadedImages > 0
            });
        }
        
        console.log(`Startup Image Preloading Complete: ${this.loadedImages}/${this.totalImages} images loaded, ${this.failedImages} failed`);
    }

    // Check if image is preloaded
    isPreloaded(url) {
        return this.preloadedImages.has(url) && this.preloadedImages.get(url) !== null;
    }

    // Get preloaded image
    getPreloadedImage(url) {
        return this.preloadedImages.get(url);
    }

    // Get preloading statistics
    getStats() {
        return {
            total: this.totalImages,
            loaded: this.loadedImages,
            failed: this.failedImages,
            successRate: this.totalImages > 0 ? (this.loadedImages / this.totalImages) * 100 : 0
        };
    }

    // Force preload specific images (useful for dynamic content)
    async forcePreload(urls) {
        const uniqueUrls = [...new Set(urls)];
        await this.preloadImages(uniqueUrls);
    }
}

// Global instance for startup preloading
window.startupImagePreloader = new StartupImagePreloader();

// Auto-initialize when data is available
function initializeStartupPreloading() {
    // Check if project data is loaded
    if (window.webProjectsData && window.mobileProjectsData && window.iotProjectsData && window.skillsData) {
        
        // Start image loading in background (doesn't control splash screen)
        window.startupImagePreloader.init(
            // Progress callback (background only)
            (progress) => {
                console.log(`📊 Background loading: ${progress.percentage}%`);
            },
            // Completion callback (background only)
            (result) => {
                console.log(`✅ Background loading complete: ${result.loaded} images loaded`);
            }
        );
    } else {
        // Retry after data loads
        setTimeout(initializeStartupPreloading, 50);
    }
}

// Hide splash screen function
function hideSplashScreen() {
    const splashScreen = document.getElementById('splash-screen');
    if (splashScreen && splashScreen.style.display !== 'none') {
        splashScreen.style.opacity = '0';
        setTimeout(() => {
            splashScreen.style.display = 'none';
        }, 300);
    }
}

// Preload critical images immediately for instant popup display
function preloadCriticalImages() {
    const criticalUrls = [];
    
    // Add first images from each category (most likely to be clicked first)
    if (window.webProjectsData?.frontend?.[0]?.images?.[0]) {
        criticalUrls.push(window.webProjectsData.frontend[0].images[0]);
    }
    if (window.mobileProjectsData?.quiz?.[0]?.images?.[0]) {
        criticalUrls.push(window.mobileProjectsData.quiz[0].images[0]);
    }
    if (window.iotProjectsData?.home?.[0]?.images?.[0]) {
        criticalUrls.push(window.iotProjectsData.home[0].images[0]);
    }
    if (window.skillsData?.webDevelopment?.[0]?.image) {
        criticalUrls.push(window.skillsData.webDevelopment[0].image);
    }
    
    // Preload critical images with highest priority
    criticalUrls.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = url;
        link.fetchPriority = 'highest';
        document.head.appendChild(link);
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Start preloading after a short delay to ensure data is loaded
    setTimeout(initializeStartupPreloading, 500);
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StartupImagePreloader;
}
