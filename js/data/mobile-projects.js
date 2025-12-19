/**
 * mobile-projects-data.js - Mobile Projects JSON Data
 * UPDATED: Single image per card
 */

window.mobileProjectsData = {
    // Quiz Apps Category
    quiz: [
        {
            id: "mobile-quiz-001",
            category: "quiz",
            title: "General Knowledge Quiz",
            description: "Interactive quiz app with 5000+ questions across 10+ categories, featuring leaderboards and daily challenges.",
            technologies: ["Android", "Kotlin", "Firebase", "Quiz Logic"],
            images: [
                "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&auto=format&fit=crop"
            ],
            features: [
                "5000+ questions in 10+ categories",
                "Daily challenges and rewards",
                "Leaderboard system",
                "Offline mode available",
                "Progress tracking and statistics"
            ],
            links: [
                {
                    name: "Google Play",
                    url: "https://play.google.com/store/apps/details?id=com.youness.quiz",
                    icon: "fa-google-play"
                }
            ],
            downloads: "10K+",
            rating: 4.5
        },
        {
            id: "mobile-quiz-002",
            category: "quiz",
            title: "Math Quiz Challenge",
            description: "Educational math quiz app for students of all levels with step-by-step solutions and progress tracking.",
            technologies: ["Android", "Java", "Math Engine", "Firebase"],
            images: [
                "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop"
            ],
            features: [
                "Grade levels 1-12",
                "Step-by-step solutions",
                "Progress reports and analytics",
                "Parent dashboard",
                "1000+ math problems with explanations"
            ],
            links: [
                {
                    name: "Google Play",
                    url: "https://play.google.com/store/apps/details?id=com.youness.mathquiz",
                    icon: "fa-google-play"
                }
            ],
            downloads: "20K+",
            rating: 4.3
        }
    ],
    
    // Smart Home Apps Category
    smart: [
        {
            id: "mobile-smart-001",
            category: "smart",
            title: "Home Automation Pro",
            description: "Control your smart home devices from your phone with advanced automation and scheduling features.",
            technologies: ["Android", "Bluetooth", "IoT", "Firebase"],
            images: [
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop"
            ],
            features: [
                "Control lights, fans, and appliances remotely",
                "Schedule automation for daily routines",
                "Energy consumption monitoring",
                "Voice commands integration",
                "Remote access via internet"
            ],
            links: [
                {
                    name: "Google Play",
                    url: "https://play.google.com/store/apps/details?id=com.youness.smarthome",
                    icon: "fa-google-play"
                }
            ],
            downloads: "50K+",
            rating: 4.8
        },
        {
            id: "mobile-smart-002",
            category: "smart",
            title: "Smart Security Manager",
            description: "Monitor your home security system with real-time alerts and camera integration for complete protection.",
            technologies: ["Android", "IP Cameras", "Push Notifications", "Encryption"],
            images: [
                "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&auto=format&fit=crop"
            ],
            features: [
                "Live camera feed monitoring",
                "Motion detection alerts with images",
                "Door/window sensors integration",
                "Emergency contacts and alerts",
                "Activity logs and history"
            ],
            links: [
                {
                    name: "Google Play",
                    url: "https://play.google.com/store/apps/details?id=com.youness.securitymanager",
                    icon: "fa-google-play"
                }
            ],
            downloads: "30K+",
            rating: 4.6
        }
    ],
    
    // Utility Apps Category
    utility: [
        {
            id: "mobile-utility-001",
            category: "utility",
            title: "Unit Converter Pro",
            description: "Convert between 1000+ units across 30+ categories with offline functionality and favorites.",
            technologies: ["Kotlin", "Material Design", "Offline Storage"],
            images: [
                "https://images.unsplash.com/photo-1596496050827-8291e5c2d0b3?w=800&auto=format&fit=crop"
            ],
            features: [
                "30+ categories (length, weight, temperature, etc.)",
                "Offline operation without internet",
                "Calculation history and favorites",
                "Dark mode and themes",
                "Quick conversion shortcuts"
            ],
            links: [
                {
                    name: "Google Play",
                    url: "https://play.google.com/store/apps/details?id=com.youness.unitconverter",
                    icon: "fa-google-play"
                }
            ],
            downloads: "100K+",
            rating: 4.6
        },
        {
            id: "mobile-utility-002",
            category: "utility",
            title: "Expense Tracker",
            description: "Track your daily expenses with charts, budget planning, and financial reports for better money management.",
            technologies: ["Java", "MPAndroidChart", "SQLite", "Financial Calculations"],
            images: [
                "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&auto=format&fit=crop"
            ],
            features: [
                "Expense categorization and tags",
                "Monthly budget planning and alerts",
                "Visual charts and reports",
                "Data backup to cloud services",
                "Bill reminders and notifications"
            ],
            links: [
                {
                    name: "Google Play",
                    url: "https://play.google.com/store/apps/details?id=com.youness.expensetracker",
                    icon: "fa-google-play"
                }
            ],
            downloads: "25K+",
            rating: 4.4
        }
    ]
};

console.log("📱 Mobile projects data loaded successfully!");