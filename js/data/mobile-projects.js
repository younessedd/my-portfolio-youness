/**
 * mobile-projects.js - Mobile Projects Data
 * Contains all mobile project data organized by categories
 */

const mobileProjectsData = {
    // Quiz Apps (5 projects)
    quiz: [
        {
            id: 16,
            title: "Tech Quiz Challenge",
            description: "Interactive quiz app with multiple categories, timed challenges, and leaderboard system.",
            category: "quiz",
            images: [
                "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "Multiple quiz categories",
                "Timed challenge mode",
                "Global leaderboard",
                "Achievement system"
            ],
            technologies: ["Kodular", "Android", "Firebase", "Quiz Logic"],
            links: [
                { name: "Play Store", url: "#", icon: "fa-google-play" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        },
        {
            id: 17,
            title: "Math Brain Trainer",
            description: "Math quiz app for improving calculation speed with difficulty levels and progress tracking.",
            category: "quiz",
            images: [
                "https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "Progressive difficulty levels",
                "Speed calculation training",
                "Progress statistics",
                "Daily challenges"
            ],
            technologies: ["Kodular", "Android", "Math Engine", "Progress Tracking"],
            links: [
                { name: "Play Store", url: "#", icon: "fa-google-play" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        },
        {
            id: 18,
            title: "Language Learning Quiz",
            description: "Language learning app with vocabulary quizzes, pronunciation practice, and grammar tests.",
            category: "quiz",
            images: [
                "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "Multiple language support",
                "Pronunciation practice",
                "Grammar tests",
                "Vocabulary builder"
            ],
            technologies: ["Kodular", "Android", "Text-to-Speech", "Language API"],
            links: [
                { name: "Play Store", url: "#", icon: "fa-google-play" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        },
        {
            id: 19,
            title: "Science Trivia Master",
            description: "Science trivia app covering physics, chemistry, biology, and astronomy with expert explanations.",
            category: "quiz",
            images: [
                "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "Four science categories",
                "Expert explanations",
                "Image-based questions",
                "Score history"
            ],
            technologies: ["Kodular", "Android", "Firebase", "Science Database"],
            links: [
                { name: "Play Store", url: "#", icon: "fa-google-play" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        },
        {
            id: 20,
            title: "History Quiz Adventure",
            description: "Historical timeline quiz app with period-based challenges and educational content.",
            category: "quiz",
            images: [
                "https://images.unsplash.com/photo-1505664194779-8beaceb93744?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "Historical timeline navigation",
                "Period-based challenges",
                "Educational facts",
                "Multiplayer mode"
            ],
            technologies: ["Kodular", "Android", "Timeline Engine", "Multiplayer"],
            links: [
                { name: "Play Store", url: "#", icon: "fa-google-play" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        }
    ],
    
    // Smart Home Apps (5 projects)
    smart: [
        {
            id: 21,
            title: "Smart Home Control",
            description: "Mobile app for controlling smart home devices including lights, thermostats, and security systems.",
            category: "smart",
            images: [
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "Device control dashboard",
                "Scheduling and automation",
                "Energy usage monitoring",
                "Remote access"
            ],
            technologies: ["Kodular", "Android", "Bluetooth", "MQTT", "IoT"],
            links: [
                { name: "Play Store", url: "#", icon: "fa-google-play" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        },
        {
            id: 22,
            title: "IoT Garden Monitor",
            description: "App for monitoring and controlling smart garden systems including irrigation and soil sensors.",
            category: "smart",
            images: [
                "https://images.unsplash.com/photo-1417733403748-83bbc7c05140?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1464457312035-3d7d0e0c058e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "Soil moisture monitoring",
                "Automatic irrigation control",
                "Plant health tracking",
                "Weather integration"
            ],
            technologies: ["Kodular", "Android", "ESP32", "Soil Sensors", "Weather API"],
            links: [
                { name: "Play Store", url: "#", icon: "fa-google-play" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        },
        {
            id: 23,
            title: "Smart Energy Saver",
            description: "Energy monitoring app that tracks electricity usage and suggests optimization strategies.",
            category: "smart",
            images: [
                "https://images.unsplash.com/photo-1507502707540-9cb6a5e6c8c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1501139083538-0139583c060f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "Real-time energy monitoring",
                "Cost calculation",
                "Usage pattern analysis",
                "Energy saving tips"
            ],
            technologies: ["Kodular", "Android", "Energy Sensors", "Data Analytics", "Charts"],
            links: [
                { name: "Play Store", url: "#", icon: "fa-google-play" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        },
        {
            id: 24,
            title: "Home Security Monitor",
            description: "Security monitoring app with live camera feeds, motion detection alerts, and emergency contacts.",
            category: "smart",
            images: [
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "Live camera streaming",
                "Motion detection alerts",
                "Emergency contact list",
                "Security logs"
            ],
            technologies: ["Kodular", "Android", "IP Cameras", "Push Notifications", "Security"],
            links: [
                { name: "Play Store", url: "#", icon: "fa-google-play" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        },
        {
            id: 25,
            title: "Voice Home Assistant",
            description: "Voice-controlled home automation app with voice commands and scene management.",
            category: "smart",
            images: [
                "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "Voice command recognition",
                "Scene and routine management",
                "Device grouping",
                "Voice feedback"
            ],
            technologies: ["Kodular", "Android", "Voice Recognition", "Scene Control", "Automation"],
            links: [
                { name: "Play Store", url: "#", icon: "fa-google-play" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        }
    ],
    
    // Utility Apps (5 projects)
    utility: [
        {
            id: 26,
            title: "Unit Converter Pro",
            description: "Comprehensive unit conversion app with offline support and calculation history.",
            category: "utility",
            images: [
                "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "Multiple unit categories",
                "Offline functionality",
                "Calculation history",
                "Favorites system"
            ],
            technologies: ["Kodular", "Android", "Conversion Logic", "Offline Storage"],
            links: [
                { name: "Play Store", url: "#", icon: "fa-google-play" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        },
        {
            id: 27,
            title: "Expense Tracker",
            description: "Personal finance app for tracking expenses, setting budgets, and generating reports.",
            category: "utility",
            images: [
                "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "Expense categorization",
                "Budget planning",
                "Monthly reports",
                "Bill reminders"
            ],
            technologies: ["Kodular", "Android", "Financial Calculations", "Charts", "Reminders"],
            links: [
                { name: "Play Store", url: "#", icon: "fa-google-play" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        },
        {
            id: 28,
            title: "Password Manager",
            description: "Secure password management app with encryption and biometric authentication.",
            category: "utility",
            images: [
                "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "Military-grade encryption",
                "Biometric authentication",
                "Password generator",
                "Auto-fill capability"
            ],
            technologies: ["Kodular", "Android", "Encryption", "Biometrics", "Security"],
            links: [
                { name: "Play Store", url: "#", icon: "fa-google-play" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        },
        {
            id: 29,
            title: "File Manager Pro",
            description: "Advanced file management app with cloud integration and file operations.",
            category: "utility",
            images: [
                "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "File browsing and organization",
                "Cloud storage integration",
                "File compression",
                "Search functionality"
            ],
            technologies: ["Kodular", "Android", "File System", "Cloud API", "Compression"],
            links: [
                { name: "Play Store", url: "#", icon: "fa-google-play" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        },
        {
            id: 30,
            title: "Task Reminder",
            description: "Smart task reminder app with location-based alerts and priority system.",
            category: "utility",
            images: [
                "https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "Location-based reminders",
                "Priority levels",
                "Recurring tasks",
                "Voice notes"
            ],
            technologies: ["Kodular", "Android", "Location Services", "Notifications", "Voice"],
            links: [
                { name: "Play Store", url: "#", icon: "fa-google-play" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        }
    ],
    
    // Other Apps (5 projects)
    others: [
        {
            id: 31,
            title: "Health Fitness Tracker",
            description: "Health and fitness tracking app with workout plans and nutrition logging.",
            category: "others",
            images: [
                "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "Workout tracking",
                "Nutrition logging",
                "Progress charts",
                "Goal setting"
            ],
            technologies: ["Kodular", "Android", "Health Tracking", "Charts", "Goals"],
            links: [
                { name: "Play Store", url: "#", icon: "fa-google-play" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        },
        {
            id: 32,
            title: "Music Player Plus",
            description: "Feature-rich music player with equalizer, playlists, and lyrics display.",
            category: "others",
            images: [
                "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "Audio equalizer",
                "Playlist management",
                "Lyrics display",
                "Sleep timer"
            ],
            technologies: ["Kodular", "Android", "Audio Player", "Equalizer", "Lyrics API"],
            links: [
                { name: "Play Store", url: "#", icon: "fa-google-play" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        },
        {
            id: 33,
            title: "Recipe Manager",
            description: "Recipe management app with ingredient scanner and meal planning.",
            category: "others",
            images: [
                "https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "Recipe database",
                "Ingredient scanner",
                "Meal planning",
                "Shopping list"
            ],
            technologies: ["Kodular", "Android", "Database", "Scanner", "Planning"],
            links: [
                { name: "Play Store", url: "#", icon: "fa-google-play" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        },
        {
            id: 34,
            title: "Language Translator",
            description: "Real-time language translation app with text and voice input.",
            category: "others",
            images: [
                "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "Multiple languages",
                "Text translation",
                "Voice input",
                "Offline mode"
            ],
            technologies: ["Kodular", "Android", "Translation API", "Voice Recognition", "Offline"],
            links: [
                { name: "Play Store", url: "#", icon: "fa-google-play" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        },
        {
            id: 35,
            title: "Weather Forecast Pro",
            description: "Advanced weather forecasting app with detailed reports and alerts.",
            category: "others",
            images: [
                "https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1561484930-998b6a7b22e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "Detailed forecasts",
                "Weather alerts",
                "Radar maps",
                "Location-based updates"
            ],
            technologies: ["Kodular", "Android", "Weather API", "Maps", "Alerts"],
            links: [
                { name: "Play Store", url: "#", icon: "fa-google-play" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        }
    ]
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = mobileProjectsData;
}