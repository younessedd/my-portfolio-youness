/**
 * Mobile Projects Data Structure
 *
 * This file contains all mobile application projects data organized by categories.
 * Each project includes metadata, technologies, features, and Google Play Store links.
 *
 * Categories:
 * - quiz_apps: Educational quiz applications for learning and testing knowledge
 * - utility_apps: Practical tools and device utilities
 * - iot_apps: Smart home and IoT applications connected to hardware
 */

// Global object containing all mobile projects data
window.mobileProjectsData = {

    /* =========================================
       QUIZ APPLICATIONS
       Educational quiz apps for learning
    ========================================= */

    quiz_apps: [

        {
            id: "mobile-quiz-001",
            category: "quiz_apps",
            type: "mobile",

            title: "AmeriQuiz",

            description:
            "Explore your knowledge about American history geography culture through engaging quizzes.",

            technologies: [
                "Kodular",
                "Firebase",
                "AdMob",
                "Android",
                "Quiz Engine",
                "Achievement System",
                "Offline Mode",
                "Score Tracking"
            ],

            images: [
                "images/mob/ameriaue-quiz.webp"
            ],

            features: [
                "American history & geography questions",
                "Achievement system",
                "Offline play available",
                "Track progress and scores",
                "Share results with friends"
            ],

            links: [
                {
                    name: "Google Play",
                    url: "https://play.google.com/store/apps/details?id=com.youproproyou.ameriquizquest",
                    icon: "fa-brands fa-google-play"
                }
            ],

            downloads: "5K+",
            rating: 4.2
        },

        {
            id: "mobile-quiz-002",
            category: "quiz_apps",
            type: "mobile",

            title: "Quiz Master: Electronics",

            description:
            "Interactive electronics quiz app with challenging questions arcade-style gameplay learning.",

            technologies: [
                "Kodular",
                "Firebase",
                "AdMob",
                "Android",
                "Quiz System",
                "Leaderboard",
                "Daily Rewards",
                "Arcade Gameplay"
            ],

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
            id: "mobile-quiz-003",
            category: "quiz_apps",
            type: "mobile",

            title: "Maaref & Puzzles",

            description:
            "Test your knowledge with thousands general knowledge puzzle questions Arabic English.",

            technologies: [
                "Kodular",
                "Firebase",
                "AdMob",
                "Android",
                "Multi-language Support",
                "Puzzle Engine",
                "Daily Challenges",
                "Scoring System"
            ],

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


    /* =========================================
       UTILITY / TOOLS APPLICATIONS
       Practical mobile utilities
    ========================================= */

    utility_apps: [

        {
            id: "mobile-utility-001",
            category: "utility_apps",
            type: "mobile",

            title: "QR Reading Price",

            description:
            "Scan QR codes barcodes quickly with mobile camera save scanned results.",

            technologies: [
                "Kodular",
                "Firebase",
                "AdMob",
                "Camera API",
                "QR Code Scanner",
                "Barcode Reader",
                "Scan History",
                "Share Function"
            ],

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
            id: "mobile-utility-002",
            category: "utility_apps",
            type: "mobile",

            title: "Test Your Sensors",

            description:
            "Check monitor all your device sensors real-time accelerometer gyroscope more.",

            technologies: [
                "Kodular",
                "Firebase",
                "AdMob",
                "Android Sensors API",
                "Real-time Monitoring",
                "Data Export",
                "Sensor Calibration",
                "Device Testing"
            ],

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
        }

    ],


    /* =========================================
       SMART HOME / IOT APPLICATIONS
       ESP32 and connected devices
    ========================================= */

    iot_apps: [

        {
            id: "mobile-smarthome-001",
            category: "iot_apps",
            type: "mobile",

            title: "DARI CONNECTER",

            description:
            "Control smart home devices lights power windows RGB ESP32 Bluetooth.",

            technologies: [
                "Kodular",
                "Firebase Auth",
                "Realtime Database",
                "ESP32",
                "Bluetooth",
                "Android",
                "Smart Home",
                "Device Control"
            ],

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