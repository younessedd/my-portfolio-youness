/**
 * Startup Image Preloader
 *
 * This class implements a comprehensive image preloading system that loads all popup images
 * at application startup to ensure instant display when users click on project cards.
 * It uses aggressive parallel loading with batch optimization for maximum performance.
 */

// Main class for managing image preloading at application startup
class StartupImagePreloader {
    // Constructor initializes the preloader state
    constructor() {
        // Map to store successfully preloaded images
        this.preloadedImages = new Map();
        // Total number of images to preload
        this.totalImages = 0;
        // Number of successfully loaded images
        this.loadedImages = 0;
        // Number of failed image loads
        this.failedImages = 0;
        // Callback function for progress updates
        this.progressCallback = null;
        // Callback function for completion
        this.completionCallback = null;
    }

    // Main initialization method called at application startup
    async init(progressCallback = null, completionCallback = null) {
        // Store callback functions for progress reporting
        this.progressCallback = progressCallback;
        this.completionCallback = completionCallback;

        // Collect all image URLs from project data
        const allImageUrls = this.collectAllImageUrls();
        this.totalImages = allImageUrls.length;

        // Exit if no images to preload
        if (this.totalImages === 0) {
            this.completePreloading();
            return;
        }

        // Start aggressive parallel preloading for maximum speed
        await this.preloadImagesAggressive(allImageUrls);
    }

    // Collect all image URLs from different project data sources
    collectAllImageUrls() {
        // Use Set to avoid duplicate URLs
        const imageUrls = new Set();

        // Collect images from web projects data
        if (window.webProjectsData) {
            Object.values(window.webProjectsData).forEach(category => {
                category.forEach(project => {
                    if (project.images) {
                        // Add all images from this project
                        project.images.forEach(img => imageUrls.add(img));
                    }
                });
            });
        }

        // Collect images from mobile projects data
        if (window.mobileProjectsData) {
            Object.values(window.mobileProjectsData).forEach(category => {
                category.forEach(project => {
                    if (project.images) {
                        // Add all images from this project
                        project.images.forEach(img => imageUrls.add(img));
                    }
                });
            });
        }

        // Collect images from IoT projects data
        if (window.iotProjectsData) {
            Object.values(window.iotProjectsData).forEach(category => {
                category.forEach(project => {
                    if (project.images) {
                        // Add all images from this project
                        project.images.forEach(img => imageUrls.add(img));
                    }
                });
            });
        }

        // Collect images from skills data (if any)
        if (window.skillsData) {
            Object.values(window.skillsData).forEach(category => {
                category.forEach(skill => {
                    if (skill.image) {
                        // Add skill image
                        imageUrls.add(skill.image);
                    }
                });
            });
        }

        // Optimize loading order and return as array
        return this.optimizeImageOrder(Array.from(imageUrls));
    }

    // Optimize image loading order for better performance
    optimizeImageOrder(urls) {
        return urls.sort((a, b) => {
            // Prioritize WebP images as they load faster
            const aIsWebP = a.includes('.webp');
            const bIsWebP = b.includes('.webp');

            if (aIsWebP && !bIsWebP) return -1;
            if (!aIsWebP && bIsWebP) return 1;

            // Then prioritize hero images and main images
            const aIsHero = a.includes('hero') || a.includes('main');
            const bIsHero = b.includes('hero') || b.includes('main');

            if (aIsHero && !bIsHero) return -1;
            if (!aIsHero && bIsHero) return 1;

            // Keep original order for others
            return 0;
        });
    }

    // Aggressive parallel preloading using optimized batches
    async preloadImagesAggressive(imageUrls) {
        // Process images in batches for optimal performance
        const batchSize = 8; // Load 8 images simultaneously

        for (let i = 0; i < imageUrls.length; i += batchSize) {
            // Get current batch of images
            const batch = imageUrls.slice(i, i + batchSize);
            // Create promises for each image in the batch
            const batchPromises = batch.map(url => this.preloadImageFast(url));

            // Wait for current batch to complete before starting next batch
            await Promise.allSettled(batchPromises);

            // Small delay between batches to prevent browser overload
            if (i + batchSize < imageUrls.length) {
                await new Promise(resolve => setTimeout(resolve, 10));
            }
        }

        // Mark preloading as complete
        this.completePreloading();
    }

    // Ultra-fast image preloading using link preload and Image objects
    preloadImageFast(url) {
        return new Promise((resolve) => {
            // Skip if image is already preloaded
            if (this.preloadedImages.has(url)) {
                resolve();
                return;
            }

            // Use link preload for maximum browser optimization
            const preloadLink = document.createElement('link');
            preloadLink.rel = 'preload';
            preloadLink.as = 'image';
            preloadLink.href = url;
            preloadLink.fetchPriority = 'high';

            // Add preload link to document head for immediate loading
            document.head.appendChild(preloadLink);

            // Also create Image object for additional caching
            const img = new Image();

            // Handle successful image load
            img.onload = () => {
                // Store successfully loaded image
                this.preloadedImages.set(url, img);
                this.loadedImages++;
                // Update progress callback
                this.updateProgress();
                // Remove preload link from DOM
                document.head.removeChild(preloadLink);
                resolve();
            };

            // Handle image loading failure
            img.onerror = () => {
                // Store null for failed image
                this.preloadedImages.set(url, null);
                this.failedImages++;
                // Update progress callback
                this.updateProgress();
                // Remove preload link if still in DOM
                if (document.head.contains(preloadLink)) {
                    document.head.removeChild(preloadLink);
                }
                resolve();
            };

            // Start loading image with highest priority settings
            img.src = url;
            img.fetchPriority = 'high';
            img.loading = 'eager';
        });
    }

    // Preload multiple images with progress tracking (alternative method)
    async preloadImages(imageUrls) {
        // Create promises for each image
        const preloadPromises = imageUrls.map(url => this.preloadSingleImage(url));

        // Wait for all images to complete (success or failure)
        await Promise.allSettled(preloadPromises);

        // Mark preloading as complete
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

            // Handle successful load
            img.onload = () => {
                this.preloadedImages.set(url, img);
                this.loadedImages++;
                this.updateProgress();
                resolve();
            };

            // Handle loading failure
            img.onerror = () => {
                this.preloadedImages.set(url, null);
                this.failedImages++;
                this.updateProgress();
                // Resolve instead of reject to continue preloading others
                resolve();
            };

            // Start loading with high priority
            img.src = url;
            img.fetchpriority = 'high';
        });
    }

    // Update progress callback with current loading statistics
    updateProgress() {
        if (this.progressCallback) {
            // Calculate progress percentage
            const progress = (this.loadedImages + this.failedImages) / this.totalImages;
            const percentage = Math.round(progress * 100);
            // Call progress callback with detailed statistics
            this.progressCallback({
                loaded: this.loadedImages,
                failed: this.failedImages,
                total: this.totalImages,
                percentage: percentage
            });
        }
    }

    // Complete the preloading process and call completion callback
    completePreloading() {
        if (this.completionCallback) {
            // Call completion callback with final statistics
            this.completionCallback({
                loaded: this.loadedImages,
                failed: this.failedImages,
                total: this.totalImages,
                success: this.loadedImages > 0
            });
        }

        // Log completion statistics to console
        console.log(`Startup Image Preloading Complete: ${this.loadedImages}/${this.totalImages} images loaded, ${this.failedImages} failed`);
    }

    // Check if a specific image URL has been preloaded successfully
    isPreloaded(url) {
        return this.preloadedImages.has(url) && this.preloadedImages.get(url) !== null;
    }

    // Get the preloaded Image object for a specific URL
    getPreloadedImage(url) {
        return this.preloadedImages.get(url);
    }

    // Get comprehensive statistics about the preloading process
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
        // Remove duplicates from URL array
        const uniqueUrls = [...new Set(urls)];
        // Start preloading the specified images
        await this.preloadImages(uniqueUrls);
    }
}

// Create global instance for application-wide access
window.startupImagePreloader = new StartupImagePreloader();

// Auto-initialize preloading when project data becomes available
function initializeStartupPreloading() {
    // Check if all required project data is loaded
    if (window.webProjectsData && window.mobileProjectsData && window.iotProjectsData && window.skillsData) {

        // Start background image loading (doesn't control splash screen timing)
        window.startupImagePreloader.init(
            // Progress callback for background loading updates
            (progress) => {
                console.log(`📊 Background loading: ${progress.percentage}%`);
            },
            // Completion callback for final statistics
            (result) => {
                console.log(`✅ Background loading complete: ${result.loaded} images loaded`);
            }
        );
    } else {
        // Retry initialization after a short delay if data not ready
        setTimeout(initializeStartupPreloading, 50);
    }
}

// Function to hide splash screen with smooth transition
function hideSplashScreen() {
    const splashScreen = document.getElementById('splash-screen');
    if (splashScreen && splashScreen.style.display !== 'none') {
        // Fade out splash screen
        splashScreen.style.opacity = '0';
        setTimeout(() => {
            // Hide completely after fade animation
            splashScreen.style.display = 'none';
        }, 300);
    }
}

// Preload critical images immediately for instant popup display
function preloadCriticalImages() {
    // Array to store URLs of most important images
    const criticalUrls = [];

    // Add first image from each major category (most likely to be viewed first)
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

    // Preload critical images with highest browser priority
    criticalUrls.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = url;
        link.fetchPriority = 'highest';
        document.head.appendChild(link);
    });
}

// Initialize image preloading when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Start preloading after a delay to ensure all data is loaded
    setTimeout(initializeStartupPreloading, 500);
});

// Export for use in other modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StartupImagePreloader;
}
