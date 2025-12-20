/**
 * mobile-projects-data.js - Mobile Apps Data
 * Categories: Quiz Apps, Utility & Tools, Smart Home
 * All apps made with Kodular
 */

window.mobileProjectsData = {
    // Quiz Apps Category (3 apps made with Kodular, Firebase, AdMob)
    quiz: [
        {
            id: "mobile-quiz-001",
            category: "quiz",
            title: "AmeriQuiz",
            description: "Explore your knowledge about American history, geography, and culture through engaging quizzes.",
            technologies: ["Kodular", "Firebase", "AdMob", "Android"],
            images: [
                "https://play-lh.googleusercontent.com/aLzZPlHLyhw4f5e_H6Y7_rRmMJXhV4f4Tt2WlN0qgN4sB_QbOq8xgCdw9rJH2kzjRg=s180-rw"
            ],
            features: [
                "American history & geography questions",
                "Achievement system",
                "Offline play available",
                "Track progress and scores",
                "Share results with friends"
            ],
            links: [
                { name: "Google Play", url: "https://play.google.com/store/apps/details?id=com.youproproyou.ameriquizquest", icon: "fa-google-play" }
            ],
            downloads: "5K+",
            rating: 4.2
        },
        {
            id: "mobile-quiz-002",
            category: "quiz",
            title: "Quiz Master: Electronics",
            description: "Interactive electronics quiz app with challenging questions and arcade-style gameplay for fun learning.",
            technologies: ["Kodular", "Firebase", "AdMob", "Android"],
            images: [
                "https://play-lh.googleusercontent.com/k6Jh0D6p3Zrhdh4v04D0CkKYlcnjh7yCok2zTcPYtY9Slc_E9SvROuHCmO2d6VYnx5aX=s180-rw"
            ],
            features: [
                "Fun arcade-style quiz",
                "Score tracking and leaderboards",
                "Daily rewards",
                "Offline mode supported",
                "Multiple electronics topics"
            ],
            links: [
                { name: "Google Play", url: "https://play.google.com/store/apps/details?id=com.youproproyou.quizquestanswerarcade", icon: "fa-google-play" }
            ],
            downloads: "8K+",
            rating: 4.4
        },
        {
            id: "mobile-quiz-003",
            category: "quiz",
            title: "Maaref & Puzzles",
            description: "Test your knowledge with thousands of general knowledge and puzzle questions in Arabic and English.",
            technologies: ["Kodular", "Firebase", "AdMob", "Android"],
            images: [
                "https://play-lh.googleusercontent.com/VwXoJKTmruqGrlO6x1JuV9W7YK1wT0qPwOQ_h7Nv1Uy2L7TnsxXrSmpB5v6vUvVDA=s180-rw"
            ],
            features: [
                "Multiple categories of questions",
                "Leaderboard and scoring system",
                "Daily challenges",
                "Offline mode available",
                "Share results with friends"
            ],
            links: [
                { name: "Google Play", url: "https://play.google.com/store/apps/details?id=com.youproproyou.quizgeniuslmrf", icon: "fa-google-play" }
            ],
            downloads: "10K+",
            rating: 4.3
        }
    ],

    // Utility & Tools Category (2 apps made with Kodular)
    utility: [
        {
            id: "mobile-utility-001",
            category: "utility",
            title: "QR Reading Price",
            description: "Scan QR codes and barcodes quickly with your mobile camera and save scanned results.",
            technologies: ["Kodular", "Firebase", "AdMob", "Camera API", "QR Code Scanner"],
            images: [
                "https://play-lh.googleusercontent.com/54iZjd0Yqefn4GajlqRMhD5x7JbyhQG3XnPuwk7zAmIlHVj3F7K2dzr_XOe5HG4x1t6A=s180-rw"
            ],
            features: [
                "Scan QR codes and barcodes",
                "Save scan history",
                "Fast camera scanning",
                "Copy or share scanned results"
            ],
            links: [
                { name: "Google Play", url: "https://play.google.com/store/apps/details?id=com.QR.Scanand.Reading", icon: "fa-google-play" }
            ],
            downloads: "5K+",
            rating: 4.2
        },
        {
            id: "mobile-utility-002",
            category: "utility",
            title: "Test Your Sensors",
            description: "Check and monitor all your device sensors in real-time, including accelerometer, gyroscope, and more.",
            technologies: ["Kodular", "Firebase", "AdMob", "Android Sensors API"],
            images: [
                "https://play-lh.googleusercontent.com/2yMfMqB4tjIqfIuRKEcLPSW-6wPzUuQa9xv8kGm8TvhZwNYPFSm2a44Oz_1pHTmR1kQ=s180-rw"
            ],
            features: [
                "Monitor accelerometer, gyroscope, magnetometer",
                "Real-time sensor readings",
                "Export data",
                "User-friendly interface"
            ],
            links: [
                { name: "Google Play", url: "https://play.google.com/store/apps/details?id=com.FiveStarApp.Test.Sensors.free", icon: "fa-google-play" }
            ],
            downloads: "10K+",
            rating: 4.3
        }
    ],

    // Smart Home Category (1 app made with Kodular, Firebase Auth, ESP32, Bluetooth)
    smartHome: [
        {
            id: "mobile-smarthome-001",
            category: "smartHome",
            title: "DARI CONNECTER",
            description: "Control your smart home devices (lights, power, windows, RGB) via ESP32 using Bluetooth with up to 64 commands.",
            technologies: ["Kodular", "Firebase Auth", "Realtime Database", "ESP32", "Bluetooth", "Android"],
            images: [
                "https://play-lh.googleusercontent.com/$(PLACEHOLDER_ICON_URL)"
            ],
            features: [
                "Bluetooth control for ESP32 devices",
                "Control lights, power, windows, and RGB",
                "Supports 64 commands",
                "Realtime data sync with Firebase",
                "User authentication with Firebase Auth"
            ],
            links: [
                { name: "Google Play", url: "#", icon: "fa-google-play" }
            ],
            downloads: "5K+",
            rating: 4.7
        }
    ]
};

console.log("📱 Mobile projects data loaded successfully!");
