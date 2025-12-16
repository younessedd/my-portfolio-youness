/**
 * skills-data.js - Skills Data
 * Contains all skills data for the portfolio
 */

window.skillsData = {
    // Web Development Skills Category - 3 Cards
    web: [
        {
            id: "skill-web-001",
            category: "web",
            title: "Frontend Development",
            description: "Modern frontend technologies and frameworks for building responsive web applications",
            skills: [
                { name: "HTML5", icon: "fab fa-html5", color: "#E34F26" },
                { name: "CSS3", icon: "fab fa-css3-alt", color: "#1572B6" },
                { name: "JavaScript", icon: "fab fa-js", color: "#F7DF1E" },
                { name: "React.js", icon: "fab fa-react", color: "#61DAFB" },
                { name: "Vue.js", icon: "fab fa-vuejs", color: "#4FC08D" },
                { name: "TypeScript", icon: "fas fa-code", color: "#3178C6" },
                { name: "SASS/SCSS", icon: "fab fa-sass", color: "#CC6699" },
                { name: "Bootstrap", icon: "fab fa-bootstrap", color: "#7952B3" },
                { name: "Tailwind", icon: "fas fa-wind", color: "#38B2AC" },
                { name: "Webpack", icon: "fas fa-cube", color: "#8DD6F9" },
                { name: "jQuery", icon: "fas fa-bolt", color: "#0769AD" },
                { name: "Responsive Design", icon: "fas fa-mobile-alt", color: "#4A90E2" },
                { name: "UI/UX Design", icon: "fas fa-palette", color: "#FF6B6B" },
                { name: "Git", icon: "fab fa-git-alt", color: "#F05032" },
                { name: "REST APIs", icon: "fas fa-network-wired", color: "#00BCD4" }
            ],
            features: [
                "Responsive web design & mobile-first approach",
                "Cross-browser compatibility & performance optimization",
                "Component-based architecture & state management",
                "Modern JavaScript frameworks & libraries",
                "Build tools & package management"
            ]
        },
        {
            id: "skill-web-002",
            category: "web",
            title: "Backend Development",
            description: "Server-side technologies and database management for robust web applications",
            skills: [
                { name: "Node.js", icon: "fab fa-node-js", color: "#339933" },
                { name: "Python", icon: "fab fa-python", color: "#3776AB" },
                { name: "PHP", icon: "fab fa-php", color: "#777BB4" },
                { name: "Express.js", icon: "fas fa-server", color: "#000000" },
                { name: "Django", icon: "fab fa-python", color: "#092E20" },
                { name: "Laravel", icon: "fab fa-laravel", color: "#FF2D20" },
                { name: "MongoDB", icon: "fas fa-database", color: "#47A248" },
                { name: "MySQL", icon: "fas fa-database", color: "#4479A1" },
                { name: "PostgreSQL", icon: "fas fa-database", color: "#336791" },
                { name: "Firebase", icon: "fas fa-fire", color: "#FFCA28" },
                { name: "Redis", icon: "fas fa-database", color: "#DC382D" },
                { name: "GraphQL", icon: "fas fa-project-diagram", color: "#E10098" },
                { name: "Docker", icon: "fab fa-docker", color: "#2496ED" },
                { name: "AWS", icon: "fab fa-aws", color: "#FF9900" },
                { name: "Nginx", icon: "fas fa-server", color: "#009639" }
            ],
            features: [
                "RESTful API design & development",
                "Database design & optimization",
                "Authentication & authorization systems",
                "Server deployment & maintenance",
                "Cloud services integration"
            ]
        },
        {
            id: "skill-web-003",
            category: "web",
            title: "Fullstack Development",
            description: "End-to-end web development combining frontend and backend technologies",
            skills: [
                { name: "MERN Stack", icon: "fas fa-layer-group", color: "#61DAFB" },
                { name: "MEAN Stack", icon: "fas fa-layer-group", color: "#DD0031" },
                { name: "LAMP Stack", icon: "fas fa-layer-group", color: "#F7931E" },
                { name: "Docker", icon: "fab fa-docker", color: "#2496ED" },
                { name: "Kubernetes", icon: "fas fa-ship", color: "#326CE5" },
                { name: "CI/CD", icon: "fas fa-sync-alt", color: "#4CAF50" },
                { name: "Git", icon: "fab fa-git-alt", color: "#F05032" },
                { name: "GitHub", icon: "fab fa-github", color: "#181717" },
                { name: "GitLab", icon: "fab fa-gitlab", color: "#FC6D26" },
                { name: "Jest", icon: "fas fa-vial", color: "#C21325" },
                { name: "Mocha", icon: "fas fa-flask", color: "#8D6748" },
                { name: "WebSockets", icon: "fas fa-plug", color: "#4CAF50" },
                { name: "OAuth", icon: "fas fa-key", color: "#4285F4" },
                { name: "JWT", icon: "fas fa-shield-alt", color: "#000000" },
                { name: "Microservices", icon: "fas fa-cubes", color: "#FF6B6B" }
            ],
            features: [
                "Complete web application development lifecycle",
                "DevOps & deployment automation",
                "Version control & collaboration",
                "Testing & quality assurance",
                "Security best practices"
            ]
        }
    ],
    
    // IoT & Electronics Skills Category
    iot: [
        {
            id: "skill-iot-001",
            category: "iot",
            title: "Embedded Systems",
            description: "Microcontroller programming and embedded systems development",
            skills: [
                { name: "Arduino", icon: "fas fa-microchip", color: "#00979D" },
                { name: "ESP32", icon: "fas fa-microchip", color: "#5C2D91" },
                { name: "Raspberry Pi", icon: "fab fa-raspberry-pi", color: "#C51A4A" },
                { name: "C Programming", icon: "fas fa-code", color: "#00599C" },
                { name: "C++", icon: "fas fa-code", color: "#00599C" },
                { name: "Python", icon: "fab fa-python", color: "#3776AB" },
                { name: "Circuit Design", icon: "fas fa-bolt", color: "#FF6F00" },
                { name: "PCB Design", icon: "fas fa-tools", color: "#FF9800" },
                { name: "Eagle CAD", icon: "fas fa-pen-ruler", color: "#0072CE" },
                { name: "KiCad", icon: "fas fa-pen-ruler", color: "#314CFF" },
                { name: "Sensors", icon: "fas fa-thermometer-half", color: "#4CAF50" },
                { name: "Actuators", icon: "fas fa-cogs", color: "#607D8B" },
                { name: "Bluetooth", icon: "fab fa-bluetooth", color: "#0082FC" },
                { name: "WiFi", icon: "fas fa-wifi", color: "#4CAF50" },
                { name: "MQTT", icon: "fas fa-broadcast-tower", color: "#660066" }
            ],
            features: [
                "Microcontroller programming & firmware development",
                "Circuit prototyping & PCB design",
                "Low-level hardware interaction",
                "Wireless communication protocols",
                "Sensor integration & data acquisition"
            ]
        },
        {
            id: "skill-iot-002",
            category: "iot",
            title: "IoT Development",
            description: "Internet of Things systems and connected devices",
            skills: [
                { name: "Node-RED", icon: "fas fa-project-diagram", color: "#8F0000" },
                { name: "MQTT", icon: "fas fa-satellite", color: "#660066" },
                { name: "CoAP", icon: "fas fa-network-wired", color: "#FF9800" },
                { name: "LoRaWAN", icon: "fas fa-satellite-dish", color: "#00BCD4" },
                { name: "Zigbee", icon: "fas fa-signal", color: "#FFC107" },
                { name: "Z-Wave", icon: "fas fa-wave-square", color: "#1E88E5" },
                { name: "AWS IoT", icon: "fab fa-aws", color: "#FF9900" },
                { name: "Azure IoT", icon: "fas fa-cloud", color: "#0078D4" },
                { name: "Google Cloud IoT", icon: "fab fa-google", color: "#4285F4" },
                { name: "Home Assistant", icon: "fas fa-home", color: "#41BDF5" },
                { name: "InfluxDB", icon: "fas fa-database", color: "#22ADF6" },
                { name: "Grafana", icon: "fas fa-chart-line", color: "#F46800" },
                { name: "Docker", icon: "fab fa-docker", color: "#2496ED" },
                { name: "Kubernetes", icon: "fas fa-ship", color: "#326CE5" },
                { name: "REST APIs", icon: "fas fa-code", color: "#00BCD4" }
            ],
            features: [
                "IoT protocol implementation",
                "Cloud platform integration",
                "Real-time data processing",
                "Device management & monitoring",
                "Edge computing solutions"
            ]
        }
    ],
    
    // Mobile Development Skills Category
    mobile: [
        {
            id: "skill-mobile-001",
            category: "mobile",
            title: "Cross-Platform Development",
            description: "Build mobile apps for multiple platforms using a single codebase",
            skills: [
                { name: "React Native", icon: "fab fa-react", color: "#61DAFB" },
                { name: "Flutter", icon: "fab fa-flutter", color: "#02569B" },
                { name: "Ionic", icon: "fab fa-ionic", color: "#3880FF" },
                { name: "JavaScript", icon: "fab fa-js", color: "#F7DF1E" },
                { name: "TypeScript", icon: "fas fa-code", color: "#3178C6" },
                { name: "Dart", icon: "fas fa-code", color: "#0175C2" },
                { name: "Redux", icon: "fas fa-box", color: "#764ABC" },
                { name: "MobX", icon: "fas fa-box", color: "#FF9955" },
                { name: "Firebase", icon: "fas fa-fire", color: "#FFCA28" },
                { name: "App Store", icon: "fab fa-app-store", color: "#0D96F6" },
                { name: "Google Play", icon: "fab fa-google-play", color: "#0F9D58" },
                { name: "Push Notifications", icon: "fas fa-bell", color: "#FF6B6B" },
                { name: "In-App Purchases", icon: "fas fa-shopping-cart", color: "#4CAF50" },
                { name: "App Analytics", icon: "fas fa-chart-bar", color: "#FF9800" },
                { name: "App Security", icon: "fas fa-shield-alt", color: "#2196F3" }
            ],
            features: [
                "Single codebase for iOS & Android",
                "Hot reload for faster development",
                "Native performance optimization",
                "App store deployment",
                "Mobile-specific features integration"
            ]
        },
        {
            id: "skill-mobile-002",
            category: "mobile",
            title: "Native Development",
            description: "Platform-specific mobile app development",
            skills: [
                { name: "Swift", icon: "fas fa-apple-alt", color: "#FA7343" },
                { name: "Kotlin", icon: "fas fa-code", color: "#7F52FF" },
                { name: "Java", icon: "fab fa-java", color: "#007396" },
                { name: "Xcode", icon: "fas fa-laptop-code", color: "#1575F9" },
                { name: "Android Studio", icon: "fas fa-laptop-code", color: "#3DDC84" },
                { name: "iOS SDK", icon: "fab fa-apple", color: "#000000" },
                { name: "Android SDK", icon: "fab fa-android", color: "#3DDC84" },
                { name: "Core Data", icon: "fas fa-database", color: "#007AFF" },
                { name: "Room DB", icon: "fas fa-database", color: "#4CAF50" },
                { name: "ARKit", icon: "fas fa-vr-cardboard", color: "#5856D6" },
                { name: "ARCore", icon: "fas fa-vr-cardboard", color: "#4285F4" },
                { name: "Metal", icon: "fas fa-gamepad", color: "#8E8E93" },
                { name: "OpenGL ES", icon: "fas fa-gamepad", color: "#5586A4" },
                { name: "Camera API", icon: "fas fa-camera", color: "#FF3B30" },
                { name: "Location Services", icon: "fas fa-map-marker-alt", color: "#34C759" }
            ],
            features: [
                "Native iOS & Android development",
                "Platform-specific optimizations",
                "Hardware access & integration",
                "Advanced UI/UX implementation",
                "App performance tuning"
            ]
        }
    ],
    
    // Soft Skills Category
    soft: [
        {
            id: "skill-soft-001",
            category: "soft",
            title: "Communication & Collaboration",
            description: "Essential skills for effective teamwork and professional communication",
            skills: [
                { name: "Teamwork", icon: "fas fa-users", color: "#4CAF50" },
                { name: "Communication", icon: "fas fa-comments", color: "#2196F3" },
                { name: "Active Listening", icon: "fas fa-ear-listen", color: "#9C27B0" },
                { name: "Presentation", icon: "fas fa-presentation", color: "#FF9800" },
                { name: "Writing", icon: "fas fa-pen", color: "#795548" },
                { name: "Feedback", icon: "fas fa-comment-dots", color: "#00BCD4" },
                { name: "Negotiation", icon: "fas fa-handshake", color: "#FFC107" },
                { name: "Conflict Resolution", icon: "fas fa-peace", color: "#E91E63" },
                { name: "Public Speaking", icon: "fas fa-microphone", color: "#673AB7" },
                { name: "Email Etiquette", icon: "fas fa-envelope", color: "#FF5722" },
                { name: "Meeting Facilitation", icon: "fas fa-chalkboard-teacher", color: "#009688" },
                { name: "Cross-cultural", icon: "fas fa-globe-americas", color: "#3F51B5" },
                { name: "Mentoring", icon: "fas fa-hands-helping", color: "#FF9800" },
                { name: "Leadership", icon: "fas fa-crown", color: "#FFD700" },
                { name: "Networking", icon: "fas fa-network-wired", color: "#607D8B" }
            ],
            features: [
                "Effective team collaboration & coordination",
                "Clear & concise communication",
                "Active listening & empathy",
                "Professional presentation skills",
                "Cross-functional teamwork"
            ]
        },
        {
            id: "skill-soft-002",
            category: "soft",
            title: "Problem Solving & Critical Thinking",
            description: "Analytical skills for tackling complex challenges",
            skills: [
                { name: "Problem Solving", icon: "fas fa-puzzle-piece", color: "#FF6B6B" },
                { name: "Critical Thinking", icon: "fas fa-brain", color: "#4ECDC4" },
                { name: "Analytical Skills", icon: "fas fa-chart-line", color: "#45B7D1" },
                { name: "Decision Making", icon: "fas fa-clipboard-check", color: "#96CEB4" },
                { name: "Creativity", icon: "fas fa-lightbulb", color: "#FFEAA7" },
                { name: "Research", icon: "fas fa-search", color: "#DDA0DD" },
                { name: "Data Analysis", icon: "fas fa-chart-bar", color: "#98D8C8" },
                { name: "Logical Thinking", icon: "fas fa-sitemap", color: "#F7DC6F" },
                { name: "Innovation", icon: "fas fa-rocket", color: "#FFA07A" },
                { name: "Adaptability", icon: "fas fa-random", color: "#20B2AA" },
                { name: "Time Management", icon: "fas fa-clock", color: "#778899" },
                { name: "Prioritization", icon: "fas fa-tasks", color: "#9370DB" },
                { name: "Risk Assessment", icon: "fas fa-exclamation-triangle", color: "#FF4500" },
                { name: "Strategic Planning", icon: "fas fa-chess-board", color: "#2E8B57" },
                { name: "Attention to Detail", icon: "fas fa-search-plus", color: "#4682B4" }
            ],
            features: [
                "Systematic problem-solving approach",
                "Data-driven decision making",
                "Creative solution development",
                "Risk assessment & management",
                "Continuous improvement mindset"
            ]
        }
    ]
};

console.log("🎯 Skills data loaded successfully!");