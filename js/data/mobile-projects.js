/**
 * Mobile Projects Data Structure
 *
 * This file contains all mobile application projects data organized by categories.
 * Each project includes metadata, technologies, features, and Google Play Store links.
 *
 * Categories:
 * - quiz: Educational quiz applications for learning and testing knowledge
 * - others: Utility and smart home applications with practical functionality
 */

// Global object containing all mobile projects data
window.mobileProjectsData = {

    // Quiz Category - Educational applications focused on learning and knowledge testing
    quiz: [
        {
            // Unique project identifier for tracking
            id: "mobile-quiz-001",
            // Project category for filtering and organization
            category: "quiz",
            // Display title of the mobile application
            title: "AmeriQuiz",
            // Detailed description of the app's purpose and functionality
            description: "Explore your knowledge about American history, geography, and culture through engaging quizzes.",
            // Technologies used to develop the application
            technologies: ["Kodular", "Firebase", "AdMob", "Android"],
            // Application screenshots (only first image used for cards)
            images: [
                "images/mob/ameriaue-quiz.webp"
            ],
            // Key features of the application
            features: [
                "American history & geography questions",
                "Achievement system",
                "Offline play available",
                "Track progress and scores",
                "Share results with friends"
            ],
            // Links to Google Play Store
            links: [
                {
                    name: "Google Play",
                    url: "https://play.google.com/store/apps/details?id=com.youproproyou.ameriquizquest",
                    icon: "fa-brands fa-google-play"
                }
            ],
            // Download statistics from Play Store
            downloads: "5K+",
            // User rating from Play Store
            rating: 4.2
        },
        {
            // Second quiz application
            id: "mobile-quiz-002",
            category: "quiz",
            title: "Quiz Master: Electronics",
            description: "Interactive electronics quiz app with challenging questions and arcade-style gameplay for fun learning.",
            technologies: ["Kodular", "Firebase", "AdMob", "Android"],
            images: [
                "images/mob/quiz-electronic.webp"
            ],
            features: [
                "Fun arcade-style quiz",
                "Score tracking and leaderboards",
                "Daily rewards",
                "Offline mode supported",
                "Multiple electronics topics"
            ],
            links: [
                {
                    name: "Google Play",
                    url: "https://play.google.com/store/apps/details?id=com.youproproyou.quizquestanswerarcade",
                    icon: "fa-brands fa-google-play"
                }
            ],
            downloads: "8K+",
            rating: 4.4
        },
        {
            // Third quiz application
            id: "mobile-quiz-003",
            category: "quiz",
            title: "Maaref & Puzzles",
            description: "Test your knowledge with thousands of general knowledge and puzzle questions in Arabic and English.",
            technologies: ["Kodular", "Firebase", "AdMob", "Android"],
            images: [
                "images/mob/quiz-ar.webp"
            ],
            features: [
                "Multiple categories of questions",
                "Leaderboard and scoring system",
                "Daily challenges",
                "Offline mode available",
                "Share results with friends"
            ],
            links: [
                {
                    name: "Google Play",
                    url: "https://play.google.com/store/apps/details?id=com.youproproyou.quizgeniuslmrf",
                    icon: "fa-brands fa-google-play"
                }
            ],
            downloads: "10K+",
            rating: 4.3
        }
    ],

    // Others Category - Utility and smart home applications
    others: [
        {
            // First utility application
            id: "mobile-utility-001",
            category: "others",
            title: "QR Reading Price",
            description: "Scan QR codes and barcodes quickly with your mobile camera and save scanned results.",
            technologies: ["Kodular", "Firebase", "AdMob", "Camera API", "QR Code Scanner"],
            images: [
                "images/mob/qr.webp"
            ],
            features: [
                "Scan QR codes and barcodes",
                "Save scan history",
                "Fast camera scanning",
                "Copy or share scanned results"
            ],
            links: [
                {
                    name: "Google Play",
                    url: "https://play.google.com/store/apps/details?id=com.QR.Scanand.Reading",
                    icon: "fa-brands fa-google-play"
                }
            ],
            downloads: "5K+",
            rating: 4.2
        },
        {
            // Second utility application
            id: "mobile-utility-002",
            category: "others",
            title: "Test Your Sensors",
            description: "Check and monitor all your device sensors in real-time, including accelerometer, gyroscope, and more.",
            technologies: ["Kodular", "Firebase", "AdMob", "Android Sensors API"],
            images: [
                "images/mob/test-sensor.webp"
            ],
            features: [
                "Monitor accelerometer, gyroscope, magnetometer",
                "Real-time sensor readings",
                "Export data",
                "User-friendly interface"
            ],
            links: [
                {
                    name: "Google Play",
                    url: "https://play.google.com/store/apps/details?id=com.FiveStarApp.Test.Sensors.free",
                    icon: "fa-brands fa-google-play"
                }
            ],
            downloads: "10K+",
            rating: 4.3
        },
        {
            // Smart home application
            id: "mobile-smarthome-001",
            category: "others",
            title: "DARI CONNECTER",
            description: "Control your smart home devices (lights, power, windows, RGB) via ESP32 using Bluetooth with up to 64 commands.",
            technologies: ["Kodular", "Firebase Auth", "Realtime Database", "ESP32", "Bluetooth", "Android"],
            images: [
                "images/mob/home-smart.webp"
            ],
            features: [
                "Bluetooth control for ESP32 devices",
                "Control lights, power, windows, and RGB",
                "Supports 64 commands",
                "Realtime data sync with Firebase",
                "User authentication with Firebase Auth"
            ],
            links: [
                {
                    name: "Google Play",
                    url: "#",
                    icon: "fa-brands fa-google-play"
                }
            ],
            downloads: "5K+",
            rating: 4.7
        }
    ]
};

// Console log to confirm data loading
console.log("📱 Mobile projects data loaded successfully!");
