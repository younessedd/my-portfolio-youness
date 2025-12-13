/**
 * skills-data.js - Skills Data Management
 * Easy to edit - Add/remove/modify skills easily
 * Supports: web, iot, mobile, soft categories
 */

const skillsData = {
    // File metadata
    fileId: "skills-data-001",
    fileType: "skills",
    created: "2024-12-17",
    lastUpdated: "2024-12-17",
    
    // Web Development Skills Category
    web: [
        {
            id: "skill-web-001",
            category: "web",
            title: "Web Development",
            description: "Full spectrum of web development skills from frontend to backend",
            skills: [
                {
                    name: "HTML5",
                    icon: "fab fa-html5",
                    color: "#E34F26"
                },
                {
                    name: "CSS3",
                    icon: "fab fa-css3-alt",
                    color: "#1572B6"
                },
                {
                    name: "JavaScript",
                    icon: "fab fa-js",
                    color: "#F7DF1E"
                },
                {
                    name: "React.js",
                    icon: "fab fa-react",
                    color: "#61DAFB"
                },
                {
                    name: "Node.js",
                    icon: "fab fa-node-js",
                    color: "#339933"
                },
                {
                    name: "Python",
                    icon: "fab fa-python",
                    color: "#3776AB"
                },
                {
                    name: "MongoDB",
                    icon: "fas fa-database",
                    color: "#47A248"
                },
                {
                    name: "MySQL",
                    icon: "fas fa-database",
                    color: "#4479A1"
                },
                {
                    name: "Git",
                    icon: "fab fa-git-alt",
                    color: "#F05032"
                },
                {
                    name: "Bootstrap",
                    icon: "fab fa-bootstrap",
                    color: "#7952B3"
                },
                {
                    name: "Tailwind CSS",
                    icon: "fas fa-wind",
                    color: "#06B6D4"
                },
                {
                    name: "REST APIs",
                    icon: "fas fa-server",
                    color: "#FF6B35"
                }
            ],
            features: [
                "Responsive web design & mobile-first approach",
                "Cross-browser compatibility & performance optimization",
                "API integration & state management",
                "Version control with Git & GitHub",
                "Modern frameworks & libraries expertise",
                "Database design & management"
            ]
        }
        // ADD MORE WEB SKILLS SETS HERE
    ],
    
    // IoT & Electronics Skills Category
    iot: [
        {
            id: "skill-iot-001",
            category: "iot",
            title: "IoT & Embedded Systems",
            description: "Hardware and software skills for Internet of Things and embedded systems",
            skills: [
                {
                    name: "Arduino",
                    icon: "fas fa-microchip",
                    color: "#00979D"
                },
                {
                    name: "Raspberry Pi",
                    icon: "fas fa-microchip",
                    color: "#C51A4A"
                },
                {
                    name: "ESP32/8266",
                    icon: "fas fa-satellite-dish",
                    color: "#5C2D91"
                },
                {
                    name: "Circuit Design",
                    icon: "fas fa-bolt",
                    color: "#FF6F00"
                },
                {
                    name: "Sensor Integration",
                    icon: "fas fa-sensor",
                    color: "#4CAF50"
                },
                {
                    name: "Wireless Comm",
                    icon: "fas fa-wifi",
                    color: "#2196F3"
                },
                {
                    name: "C/C++ Programming",
                    icon: "fas fa-code",
                    color: "#00599C"
                },
                {
                    name: "PCB Design",
                    icon: "fas fa-tools",
                    color: "#FF9800"
                },
                {
                    name: "IoT Protocols",
                    icon: "fas fa-network-wired",
                    color: "#607D8B"
                },
                {
                    name: "Home Automation",
                    icon: "fas fa-home",
                    color: "#9C27B0"
                },
                {
                    name: "Power Management",
                    icon: "fas fa-charging-station",
                    color: "#FF5722"
                },
                {
                    name: "Industrial IoT",
                    icon: "fas fa-industry",
                    color: "#455A64"
                }
            ],
            features: [
                "Microcontroller programming & embedded systems",
                "Circuit prototyping & PCB design",
                "Wireless sensor networks & IoT cloud platforms",
                "Smart home & industrial automation",
                "Power management & energy efficiency",
                "Real-time monitoring & control systems"
            ]
        }
        // ADD MORE IOT SKILLS SETS HERE
    ],
    
    // Mobile Development Skills Category
    mobile: [
        {
            id: "skill-mobile-001",
            category: "mobile",
            title: "Mobile Development",
            description: "Cross-platform and native mobile application development",
            skills: [
                {
                    name: "React Native",
                    icon: "fab fa-react",
                    color: "#61DAFB"
                },
                {
                    name: "Android Dev",
                    icon: "fab fa-android",
                    color: "#3DDC84"
                },
                {
                    name: "iOS Development",
                    icon: "fab fa-apple",
                    color: "#000000"
                },
                {
                    name: "Flutter",
                    icon: "fab fa-flutter",
                    color: "#02569B"
                },
                {
                    name: "Cross-Platform",
                    icon: "fas fa-mobile-alt",
                    color: "#4FC3F7"
                },
                {
                    name: "UI/UX Design",
                    icon: "fas fa-paint-brush",
                    color: "#E91E63"
                },
                {
                    name: "Mobile APIs",
                    icon: "fas fa-cloud",
                    color: "#03A9F4"
                },
                {
                    name: "Local Storage",
                    icon: "fas fa-database",
                    color: "#795548"
                },
                {
                    name: "App Security",
                    icon: "fas fa-shield-alt",
                    color: "#FF5722"
                },
                {
                    name: "Firebase",
                    icon: "fas fa-fire",
                    color: "#FFCA28"
                },
                {
                    name: "Push Notifications",
                    icon: "fas fa-bell",
                    color: "#FF9800"
                },
                {
                    name: "App Store Deployment",
                    icon: "fas fa-upload",
                    color: "#2196F3"
                }
            ],
            features: [
                "Cross-platform mobile app development",
                "Google Play Store & App Store deployment",
                "Push notifications & offline functionality",
                "Performance optimization & mobile UI/UX",
                "API integration & cloud services",
                "App security & data protection"
            ]
        }
        // ADD MORE MOBILE SKILLS SETS HERE
    ],
    
    // Soft Skills Category
    soft: [
        {
            id: "skill-soft-001",
            category: "soft",
            title: "Professional & Soft Skills",
            description: "Essential professional skills for effective collaboration and problem-solving",
            skills: [
                {
                    name: "Communication",
                    icon: "fas fa-comments",
                    color: "#2196F3"
                },
                {
                    name: "Teamwork",
                    icon: "fas fa-users",
                    color: "#4CAF50"
                },
                {
                    name: "Problem Solving",
                    icon: "fas fa-lightbulb",
                    color: "#FFC107"
                },
                {
                    name: "Time Management",
                    icon: "fas fa-tasks",
                    color: "#9C27B0"
                },
                {
                    name: "Leadership",
                    icon: "fas fa-bullseye",
                    color: "#F44336"
                },
                {
                    name: "Adaptability",
                    icon: "fas fa-sync-alt",
                    color: "#00BCD4"
                },
                {
                    name: "Collaboration",
                    icon: "fas fa-handshake",
                    color: "#8BC34A"
                },
                {
                    name: "Critical Thinking",
                    icon: "fas fa-brain",
                    color: "#673AB7"
                },
                {
                    name: "Project Management",
                    icon: "fas fa-chart-line",
                    color: "#FF9800"
                },
                {
                    name: "Client Communication",
                    icon: "fas fa-user-tie",
                    color: "#607D8B"
                },
                {
                    name: "Technical Writing",
                    icon: "fas fa-file-alt",
                    color: "#795548"
                },
                {
                    name: "Continuous Learning",
                    icon: "fas fa-graduation-cap",
                    color: "#3F51B5"
                }
            ],
            features: [
                "Effective communication in technical & non-technical contexts",
                "Team collaboration & agile methodology",
                "Creative problem-solving & analytical thinking",
                "Adaptability to new technologies & changing requirements",
                "Client relationship management & stakeholder communication",
                "Continuous learning & professional development"
            ]
        }
        // ADD MORE SOFT SKILLS SETS HERE
    ]
};

console.log("🎯 Skills data loaded successfully!");
console.log(`📊 Total skill sets: ${skillsData.web.length + skillsData.iot.length + skillsData.mobile.length + skillsData.soft.length}`);
console.log(`🖥️ Web: ${skillsData.web.length}, 🔌 IoT: ${skillsData.iot.length}, 📱 Mobile: ${skillsData.mobile.length}, 💼 Soft: ${skillsData.soft.length}`);