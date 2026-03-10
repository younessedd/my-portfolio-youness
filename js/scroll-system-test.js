/**
 * Scroll System Test Suite
 * Tests the comprehensive scroll management system
 */

class ScrollSystemTester {
    constructor() {
        this.tests = [];
        this.passed = 0;
        this.failed = 0;
        this.results = [];
    }
    
    // Test helper methods
    assert(condition, message) {
        if (condition) {
            this.passed++;
            this.results.push(`✅ PASS: ${message}`);
            console.log(`✅ PASS: ${message}`);
        } else {
            this.failed++;
            this.results.push(`❌ FAIL: ${message}`);
            console.error(`❌ FAIL: ${message}`);
        }
    }
    
    async delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // Test 1: Scroll Manager Initialization
    async testScrollManagerInit() {
        console.log('🧪 Testing Scroll Manager Initialization...');
        
        this.assert(
            typeof window.scrollManager !== 'undefined',
            'Scroll manager is defined globally'
        );
        
        this.assert(
            window.scrollManager instanceof ScrollManager,
            'Scroll manager is instance of ScrollManager class'
        );
        
        this.assert(
            typeof window.scrollManager.lockScroll === 'function',
            'lockScroll method exists'
        );
        
        this.assert(
            typeof window.scrollManager.unlockScroll === 'function',
            'unlockScroll method exists'
        );
        
        this.assert(
            typeof window.scrollManager.smoothScrollTo === 'function',
            'smoothScrollTo method exists'
        );
    }
    
    // Test 2: Scroll Lock/Unlock Functionality
    async testScrollLockUnlock() {
        console.log('🧪 Testing Scroll Lock/Unlock...');
        
        const initialScrollY = window.pageYOffset;
        const initialOverflow = document.body.style.overflow;
        
        // Test lock scroll
        window.scrollManager.lockScroll('test-popup');
        
        this.assert(
            document.body.style.overflow === 'hidden',
            'Body overflow is hidden when scroll is locked'
        );
        
        this.assert(
            document.body.style.position === 'fixed',
            'Body position is fixed when scroll is locked'
        );
        
        this.assert(
            window.scrollManager.isScrollLocked(),
            'isScrollLocked returns true when locked'
        );
        
        // Test unlock scroll
        window.scrollManager.unlockScroll('test-popup');
        
        this.assert(
            document.body.style.overflow === '',
            'Body overflow is restored when scroll is unlocked'
        );
        
        this.assert(
            document.body.style.position === '',
            'Body position is restored when scroll is unlocked'
        );
        
        this.assert(
            !window.scrollManager.isScrollLocked(),
            'isScrollLocked returns false when unlocked'
        );
        
        // Verify scroll position is restored
        await this.delay(100);
        const finalScrollY = window.pageYOffset;
        this.assert(
            Math.abs(finalScrollY - initialScrollY) < 5,
            'Scroll position is restored after unlock'
        );
    }
    
    // Test 3: Multiple Popup Lock Management
    async testMultiplePopupLocks() {
        console.log('🧪 Testing Multiple Popup Lock Management...');
        
        // Lock with first popup
        window.scrollManager.lockScroll('popup1');
        this.assert(
            window.scrollManager.isScrollLocked(),
            'Scroll is locked by first popup'
        );
        
        // Lock with second popup
        window.scrollManager.lockScroll('popup2');
        this.assert(
            window.scrollManager.isScrollLocked(),
            'Scroll remains locked with second popup'
        );
        
        // Unlock first popup - should remain locked
        window.scrollManager.unlockScroll('popup1');
        this.assert(
            window.scrollManager.isScrollLocked(),
            'Scroll remains locked when one popup closes'
        );
        
        // Unlock second popup - should unlock
        window.scrollManager.unlockScroll('popup2');
        this.assert(
            !window.scrollManager.isScrollLocked(),
            'Scroll is unlocked when all popups close'
        );
    }
    
    // Test 4: Smooth Scrolling
    async testSmoothScrolling() {
        console.log('🧪 Testing Smooth Scrolling...');
        
        // Create test section if it doesn't exist
        if (!document.getElementById('test-section')) {
            const testSection = document.createElement('div');
            testSection.id = 'test-section';
            testSection.style.height = '2000px';
            testSection.style.paddingTop = '1000px';
            document.body.appendChild(testSection);
        }
        
        const testSection = document.getElementById('test-section');
        const targetPosition = testSection.offsetTop - 100;
        
        // Test smooth scroll to element
        window.scrollManager.scrollToElement('#test-section', 500, 100);
        
        // Wait for scroll to complete
        await this.delay(600);
        
        const finalScrollY = window.pageYOffset;
        this.assert(
            Math.abs(finalScrollY - targetPosition) < 10,
            'Smooth scroll positions correctly'
        );
        
        // Clean up
        testSection.remove();
    }
    
    // Test 5: Mobile Menu Integration
    async testMobileMenuIntegration() {
        console.log('🧪 Testing Mobile Menu Integration...');
        
        const mobileMenu = document.getElementById('mobile-menu');
        const burgerBtn = document.getElementById('burger-btn');
        
        if (mobileMenu && burgerBtn) {
            // Test mobile menu open
            burgerBtn.click();
            await this.delay(100);
            
            this.assert(
                mobileMenu.classList.contains('active'),
                'Mobile menu opens on burger click'
            );
            
            this.assert(
                window.scrollManager.isScrollLocked(),
                'Scroll is locked when mobile menu opens'
            );
            
            // Test mobile menu close
            burgerBtn.click();
            await this.delay(100);
            
            this.assert(
                !mobileMenu.classList.contains('active'),
                'Mobile menu closes on burger click'
            );
            
            this.assert(
                !window.scrollManager.isScrollLocked(),
                'Scroll is unlocked when mobile menu closes'
            );
        } else {
            this.results.push('⚠️ SKIP: Mobile menu not found for testing');
        }
    }
    
    // Test 6: Popup Integration
    async testPopupIntegration() {
        console.log('🧪 Testing Popup Integration...');
        
        // Test skills popup
        if (window.SkillsManager) {
            // Open popup
            window.SkillsManager.showCategory('webDevelopment', 'Web Development');
            await this.delay(100);
            
            this.assert(
                window.scrollManager.isScrollLocked(),
                'Scroll is locked when skills popup opens'
            );
            
            // Close popup
            window.SkillsManager.closePopup();
            await this.delay(100);
            
            this.assert(
                !window.scrollManager.isScrollLocked(),
                'Scroll is unlocked when skills popup closes'
            );
        } else {
            this.results.push('⚠️ SKIP: SkillsManager not found for testing');
        }
    }
    
    // Test 7: Performance and Memory
    async testPerformanceAndMemory() {
        console.log('🧪 Testing Performance and Memory...');
        
        const startTime = performance.now();
        
        // Perform multiple scroll operations
        for (let i = 0; i < 50; i++) {
            window.scrollManager.lockScroll(`test-${i}`);
            window.scrollManager.unlockScroll(`test-${i}`);
        }
        
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        this.assert(
            duration < 1000,
            `Scroll operations complete in reasonable time (${duration.toFixed(2)}ms)`
        );
        
        // Test memory cleanup
        const initialListeners = document.eventListeners || 0;
        window.scrollManager.destroy();
        
        this.assert(
            !window.scrollManager.isScrollLocked(),
            'Scroll is unlocked after destroy'
        );
        
        // Reinitialize for other tests
        window.scrollManager = new ScrollManager();
    }
    
    // Run all tests
    async runAllTests() {
        console.log('🚀 Starting Scroll System Test Suite...');
        console.log('='.repeat(50));
        
        try {
            await this.testScrollManagerInit();
            await this.delay(100);
            
            await this.testScrollLockUnlock();
            await this.delay(100);
            
            await this.testMultiplePopupLocks();
            await this.delay(100);
            
            await this.testSmoothScrolling();
            await this.delay(100);
            
            await this.testMobileMenuIntegration();
            await this.delay(100);
            
            await this.testPopupIntegration();
            await this.delay(100);
            
            await this.testPerformanceAndMemory();
            
        } catch (error) {
            console.error('💥 Test suite error:', error);
            this.failed++;
            this.results.push(`💥 ERROR: ${error.message}`);
        }
        
        // Print results
        console.log('='.repeat(50));
        console.log('📊 Test Results:');
        console.log(`✅ Passed: ${this.passed}`);
        console.log(`❌ Failed: ${this.failed}`);
        console.log(`📈 Success Rate: ${((this.passed / (this.passed + this.failed)) * 100).toFixed(1)}%`);
        
        console.log('\n📋 Detailed Results:');
        this.results.forEach(result => console.log(result));
        
        return {
            passed: this.passed,
            failed: this.failed,
            successRate: (this.passed / (this.passed + this.failed)) * 100,
            results: this.results
        };
    }
}

// Auto-run tests when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    // Wait a bit for all scripts to load
    setTimeout(async () => {
        if (window.location.hash === '#test-scroll') {
            const tester = new ScrollSystemTester();
            await tester.runAllTests();
        }
    }, 2000);
});

// Make available globally
window.ScrollSystemTester = ScrollSystemTester;

console.log('🧪 scroll-system-test.js loaded - Run tests with #test-scroll hash');
