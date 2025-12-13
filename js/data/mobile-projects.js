/**
 * Mobile Projects Data - Complete Version
 * Easy to edit - Add/remove/modify mobile apps easily
 * Supports: quiz, smart, utility, others categories
 */

const mobileProjectsData = {
    // File metadata
    fileId: "mobile-projects-data-001",
    fileType: "mobile-projects",
    created: "2024-12-17",
    lastUpdated: "2024-12-17",
    
    // Quiz Apps Category
    quiz: [
        {
            id: "mobile-quiz-001",
            title: "General Knowledge Quiz",
            description: "Interactive quiz app with 5000+ questions across 10+ categories, featuring leaderboards and daily challenges.",
            technologies: ["Kodular", "Android", "Quiz Logic"],
            images: ["images/mobile-projects/quiz-general.jpg"],
            links: [
                {
                    name: "Google Play",
                    url: "https://play.google.com/store/apps/details?id=com.youness.quiz",
                    icon: "fa-google-play"
                }
            ],
            features: [
                "5000+ questions in 10+ categories",
                "Daily challenges and rewards",
                "Leaderboard system",
                "Offline mode available",
                "Progress tracking"
            ],
            downloads: "10K+",
            rating: 4.5
        },
        {
            id: "mobile-quiz-002",
            title: "Math Quiz Challenge",
            description: "Educational math quiz app for students of all levels with step-by-step solutions.",
            technologies: ["Kodular", "Android", "Math Engine", "Progress Tracking"],
            images: ["images/mobile-projects/quiz-math.jpg"],
            links: [
                {
                    name: "Google Play",
                    url: "https://play.google.com/store/apps/details?id=com.youness.mathquiz",
                    icon: "fa-google-play"
                }
            ],
            features: [
                "Grade levels 1-12",
                "Step-by-step solutions",
                "Progress reports",
                "Parent dashboard",
                "1000+ math problems"
            ],
            downloads: "20K+",
            rating: 4.3
        },
        {
            id: "mobile-quiz-003",
            title: "Science Quiz Master",
            description: "Comprehensive science quiz covering physics, chemistry, biology, and astronomy.",
            technologies: ["Android SDK", "Firebase", "Science Database", "Progress Tracking"],
            images: ["images/mobile-projects/quiz-science.jpg"],
            links: [
                {
                    name: "Google Play",
                    url: "https://play.google.com/store/apps/details?id=com.youness.sciencequiz",
                    icon: "fa-google-play"
                }
            ],
            features: [
                "Physics, Chemistry, Biology categories",
                "Image-based questions",
                "Detailed explanations",
                "Bookmark difficult questions",
                "Daily science facts"
            ],
            downloads: "15K+",
            rating: 4.7
        }
        // ADD MORE QUIZ APPS HERE
    ],
    
    // Smart Home Apps Category
    smart: [
        {
            id: "mobile-smart-001",
            title: "Home Automation Pro",
            description: "Control your smart home devices from your phone with advanced automation and scheduling.",
            technologies: ["Android SDK", "Bluetooth", "IoT", "Firebase", "Push Notifications"],
            images: ["images/mobile-projects/smart-home.jpg"],
            links: [
                {
                    name: "Google Play",
                    url: "https://play.google.com/store/apps/details?id=com.youness.smarthome",
                    icon: "fa-google-play"
                }
            ],
            features: [
                "Control lights, fans, and appliances",
                "Schedule automation",
                "Energy consumption monitoring",
                "Voice commands integration",
                "Remote access via internet"
            ],
            downloads: "50K+",
            rating: 4.8
        },
        {
            id: "mobile-smart-002",
            title: "Smart Security Manager",
            description: "Monitor your home security system with real-time alerts and camera integration.",
            technologies: ["Android SDK", "IP Cameras", "Push Notifications", "Encryption"],
            images: ["images/mobile-projects/smart-security.jpg"],
            links: [
                {
                    name: "Google Play",
                    url: "https://play.google.com/store/apps/details?id=com.youness.securitymanager",
                    icon: "fa-google-play"
                }
            ],
            features: [
                "Live camera feed",
                "Motion detection alerts",
                "Door/window sensors",
                "Emergency contacts",
                "Activity logs"
            ],
            downloads: "30K+",
            rating: 4.6
        }
        // ADD MORE SMART HOME APPS HERE
    ],
    
    // Utility Apps Category
    utility: [
        {
            id: "mobile-utility-001",
            title: "Unit Converter Pro",
            description: "Convert between 1000+ units across 30+ categories with offline functionality.",
            technologies: ["Kotlin", "Material Design", "Offline Storage", "Conversion Logic"],
            images: ["images/mobile-projects/unit-converter.jpg"],
            links: [
                {
                    name: "Google Play",
                    url: "https://play.google.com/store/apps/details?id=com.youness.unitconverter",
                    icon: "fa-google-play"
                }
            ],
            features: [
                "30+ categories (length, weight, temperature, etc.)",
                "Offline operation",
                "Calculation history",
                "Favorite conversions",
                "Dark mode support"
            ],
            downloads: "100K+",
            rating: 4.6
        },
        {
            id: "mobile-utility-002",
            title: "Expense Tracker",
            description: "Track your daily expenses with charts, budget planning, and financial reports.",
            technologies: ["Java", "MPAndroidChart", "SQLite", "Financial Calculations"],
            images: ["images/mobile-projects/expense-tracker.jpg"],
            links: [
                {
                    name: "Google Play",
                    url: "https://play.google.com/store/apps/details?id=com.youness.expensetracker",
                    icon: "fa-google-play"
                }
            ],
            features: [
                "Expense categorization",
                "Monthly budget planning",
                "Visual charts and reports",
                "Data backup to cloud",
                "Bill reminders"
            ],
            downloads: "25K+",
            rating: 4.4
        },
        {
            id: "mobile-utility-003",
            title: "Voice Notes & Reminders",
            description: "Record voice notes and set reminders with speech-to-text conversion.",
            technologies: ["Flutter", "Voice Recognition", "Local Notifications", "Text-to-Speech"],
            images: ["images/mobile-projects/voice-notes.jpg"],
            links: [
                {
                    name: "Google Play",
                    url: "https://play.google.com/store/apps/details?id=com.youness.voicenotes",
                    icon: "fa-google-play"
                }
            ],
            features: [
                "Voice recording and transcription",
                "Smart reminders",
                "Organize by categories",
                "Search within notes",
                "Cloud sync"
            ],
            downloads: "40K+",
            rating: 4.7
        }
        // ADD MORE UTILITY APPS HERE
    ],
    
    // Other Apps Category
    others: [
        {
            id: "mobile-others-001",
            title: "Meditation & Relaxation",
            description: "Guided meditation app with timer, sleep sounds, and progress tracking.",
            technologies: ["Flutter", "Audio Player", "Local Notifications", "Progress Tracking"],
            images: ["images/mobile-projects/meditation.jpg"],
            links: [
                {
                    name: "Google Play",
                    url: "https://play.google.com/store/apps/details?id=com.youness.meditation",
                    icon: "fa-google-play"
                }
            ],
            features: [
                "50+ guided meditation sessions",
                "Sleep sounds and white noise",
                "Breathing exercises",
                "Progress tracking",
                "Daily reminders"
            ],
            downloads: "15K+",
            rating: 4.9
        },
        {
            id: "mobile-others-002",
            title: "Music Player Pro",
            description: "Feature-rich music player with equalizer, lyrics, and playlist management.",
            technologies: ["Android SDK", "Audio Player", "Equalizer", "Lyrics API"],
            images: ["images/mobile-projects/music-player.jpg"],
            links: [
                {
                    name: "Google Play",
                    url: "https://play.google.com/store/apps/details?id=com.youness.musicplayer",
                    icon: "fa-google-play"
                }
            ],
            features: [
                "10-band equalizer",
                "Auto-download lyrics",
                "Create smart playlists",
                "Sleep timer",
                "Backup playlists"
            ],
            downloads: "80K+",
            rating: 4.8
        },
        {
            id: "mobile-others-003",
            title: "Document Scanner",
            description: "Scan documents, receipts, and books with OCR text recognition.",
            technologies: ["Kotlin", "CameraX", "OCR", "PDF Generation"],
            images: ["images/mobile-projects/document-scanner.jpg"],
            links: [
                {
                    name: "Google Play",
                    url: "https://play.google.com/store/apps/details?id=com.youness.documentscanner",
                    icon: "fa-google-play"
                }
            ],
            features: [
                "High-quality scanning",
                "OCR text recognition",
                "Export to PDF/Word",
                "Cloud storage integration",
                "Batch scanning"
            ],
            downloads: "60K+",
            rating: 4.5
        }
        // ADD MORE OTHER APPS HERE
    ]
};

// 📝 HOW TO ADD NEW MOBILE APPS:
// ===============================
// 1. Choose a category: 'quiz', 'smart', 'utility', or 'others'
// 2. Create a new project object
// 3. Give it a unique ID (increment the last number)
// 4. Add it to the array

// Example for adding a new quiz app:
/*
const newQuizApp = {
    id: "mobile-quiz-004",
    title: "History Quiz Master",
    description: "Test your history knowledge with timeline-based questions.",
    technologies: ["Android SDK", "Timeline Engine", "Multiplayer"],
    images: ["images/mobile-projects/history-quiz.jpg"],
    links: [
        {
            name: "Google Play",
            url: "https://play.google.com/store/apps/details?id=com.youness.historyquiz",
            icon: "fa-google-play"
        }
    ],
    features: [
        "Timeline-based questions",
        "Historical images and maps",
        "Multiplayer mode",
        "Achievement system",
        "Daily historical facts"
    ],
    downloads: "8K+",
    rating: 4.4
};

// Add to quiz category:
mobileProjectsData.quiz.push(newQuizApp);
*/

// Example for adding a new smart home app:
/*
const newSmartApp = {
    id: "mobile-smart-003",
    title: "Energy Monitor",
    description: "Track and optimize your home energy consumption.",
    technologies: ["Android SDK", "Energy Sensors", "Charts", "IoT"],
    images: ["images/mobile-projects/energy-monitor.jpg"],
    links: [
        {
            name: "Google Play",
            url: "https://play.google.com/store/apps/details?id=com.youness.energymonitor",
            icon: "fa-google-play"
        }
    ],
    features: [
        "Real-time energy monitoring",
        "Cost calculation",
        "Usage patterns analysis",
        "Energy saving tips",
        "Monthly reports"
    ],
    downloads: "35K+",
    rating: 4.7
};

// Add to smart category:
mobileProjectsData.smart.push(newSmartApp);
*/

// Example for adding a new utility app:
/*
const newUtilityApp = {
    id: "mobile-utility-004",
    title: "Task Planner Pro",
    description: "Advanced task management with project organization.",
    technologies: ["React Native", "Redux", "Local Storage", "Notifications"],
    images: ["images/mobile-projects/task-planner.jpg"],
    links: [
        {
            name: "Google Play",
            url: "https://play.google.com/store/apps/details?id=com.youness.taskplanner",
            icon: "fa-google-play"
        }
    ],
    features: [
        "Project-based organization",
        "Priority levels",
        "Recurring tasks",
        "Progress tracking",
        "Team collaboration"
    ],
    downloads: "45K+",
    rating: 4.6
};

// Add to utility category:
mobileProjectsData.utility.push(newUtilityApp);
*/

// 📌 IMPORTANT NOTES:
// 1. Keep IDs unique across all categories
// 2. Add actual image files to images/mobile-projects/ folder
// 3. Update download counts and ratings based on actual data
// 4. Add real Google Play URLs
// 5. Technologies array supports techClassMap in your mobile-projects-new.js

console.log("📱 Mobile projects data loaded successfully!");
console.log(`📊 Total apps: ${mobileProjectsData.quiz.length + mobileProjectsData.smart.length + mobileProjectsData.utility.length + mobileProjectsData.others.length}`);