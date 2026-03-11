/**
 * Skills Data Structure
 *
 * This file contains all professional skills data organized by categories.
 * Each category includes a title, description, and list of individual skills with icons and colors.
 *
 * Categories:
 * - webDevelopment: Frontend and backend web development skills
 * - mobileDevelopment: Mobile application development skills
 * - iotAndDomotic: Internet of Things and smart home automation skills
 * - electronicsAndElectric: Electronics and electrical engineering skills
 * - roboticsAndAutomatism: Robotics and automation control skills
 * - softSkills: Professional and interpersonal skills
 * - aiPrompt: Artificial intelligence and prompt engineering skills
 */

// Global object containing all skills data organized by categories
window.skillsData = {

  // Web Development Category - Frontend and backend web technologies
  webDevelopment: [
    {
      // Unique category identifier
      id: "skill-web-001",
      // Category name for filtering and display
      category: "webDevelopment",
      // Display title for the skill category
      title: "Web Development",
      // Detailed description of the skill category
      description: "Design and development of modern and responsive web applications",
      // Array of individual skills within this category
      skills: [
        // HTML5 markup language skill
        { name: "HTML5", icon: "fab fa-html5", color: "#E34F26" },
        // CSS3 styling language skill
        { name: "CSS3", icon: "fab fa-css3-alt", color: "#1572B6" },
        // JavaScript programming language skill
        { name: "JavaScript (ES6+)", icon: "fab fa-js", color: "#F7DF1E" },
        // React.js frontend framework skill
        { name: "React.js", icon: "fab fa-react", color: "#61DAFB" },
        // Laravel PHP framework skill
        { name: "Laravel", icon: "fab fa-laravel", color: "#FF2D20" },
        // PHP server-side programming skill
        { name: "PHP", icon: "fab fa-php", color: "#777BB4" },
        // MySQL database management skill
        { name: "MySQL", icon: "fas fa-database", color: "#4479A1" },
        // REST API design and integration skill
        { name: "REST API", icon: "fas fa-network-wired", color: "#00BCD4" },
        // Bootstrap CSS framework skill
        { name: "Bootstrap", icon: "fab fa-bootstrap", color: "#7952B3" },
        // Tailwind CSS utility framework skill
        { name: "Tailwind CSS", icon: "fas fa-wind", color: "#38B2AC" },
        // Git version control system skill
        { name: "Git", icon: "fab fa-git-alt", color: "#F05032" },
        // GitHub platform for code hosting and collaboration
        { name: "GitHub", icon: "fab fa-github", color: "#181717" }
      ],
      // Key features and competencies in this skill category
      features: [
        "Responsive & mobile-first design",
        "CRUD applications",
        "REST API integration",
        "Authentication systems",
        "Clean and maintainable code"
      ]
    }
  ],

  // Mobile Development Category - Android and mobile application skills
  mobileDevelopment: [
    {
      // Unique category identifier
      id: "skill-mobile-001",
      // Category name for filtering and display
      category: "mobileDevelopment",
      // Display title for the skill category
      title: "Mobile App Development (Beginner)",
      // Detailed description of the skill category
      description: "Building simple Android applications using visual tools and beginner frameworks",
      // Array of individual skills within this category
      skills: [
        // Visual programming tool for Android apps
        { name: "MIT App Inventor", icon: "fas fa-mobile-alt", color: "#4CAF50" },
        // Visual programming platform for mobile apps
        { name: "Kodular", icon: "fas fa-th-large", color: "#673AB7" },
        // Firebase backend platform skill
        { name: "Firebase", icon: "fas fa-fire", color: "#FFCA28" },
        // Firebase authentication service skill
        { name: "Firebase Auth", icon: "fas fa-user-shield", color: "#FFA000" },
        // Firebase realtime database skill
        { name: "Firebase Realtime DB", icon: "fas fa-database", color: "#FFCA28" },
        // Flutter UI framework skill (beginner level)
        { name: "Flutter (Beginner)", icon: "fab fa-flutter", color: "#02569B" },
        // Dart programming language skill (basics)
        { name: "Dart (Basics)", icon: "fas fa-code", color: "#0175C2" }
      ],
      // Key features and competencies in this skill category
      features: [
        "Simple Android apps",
        "Visual block-based programming",
        "Login & user management",
        "Basic UI/UX",
        "IoT & Firebase connected apps"
      ]
    }
  ],

  // IoT and Domotic Category - Smart home and IoT technologies
  iotAndDomotic: [
    {
      // Unique category identifier
      id: "skill-iot-001",
      // Category name for filtering and display
      category: "iotAndDomotic",
      // Display title for the skill category
      title: "IoT & Smart Home",
      // Detailed description of the skill category
      description: "Smart home automation and connected devices",
      // Array of individual skills within this category
      skills: [
        // ESP32 microcontroller skill
        { name: "Arduino", icon: "fas fa-microchip", color: "#00979D" },
        // ESP32 WiFi-enabled microcontroller skill
        { name: "ESP32", icon: "fas fa-microchip", color: "#5C2D91" },
        // Sensor technology skill
        { name: "Sensors", icon: "fas fa-thermometer-half", color: "#FF5722" },
        // Relay and actuator control skill
        { name: "Relays & Actuators", icon: "fas fa-toggle-on", color: "#4CAF50" },
        // MQTT communication protocol skill
        { name: "MQTT", icon: "fas fa-satellite", color: "#660066" },
        // Node-RED programming tool skill
        { name: "Node-RED", icon: "fas fa-project-diagram", color: "#8F0000" },
        // Home Assistant automation platform skill
        { name: "Home Assistant", icon: "fas fa-home", color: "#41BDF5" },
        // WiFi communication technology skill
        { name: "WiFi Communication", icon: "fas fa-wifi", color: "#2196F3" },
        // Bluetooth communication technology skill
        { name: "Bluetooth Communication", icon: "fas fa-bluetooth", color: "#0082FC" }
      ],
      // Key features and competencies in this skill category
      features: [
        "Smart lighting & switches",
        "Sensor data monitoring",
        "Remote control via mobile",
        "Automation scenarios",
        "IoT dashboards",
        "Bluetooth device integration"
      ]
    }
  ],

  // Electronics and Electrical Category - Electrical engineering skills
  electronicsAndElectric: [
    {
      // Unique category identifier
      id: "skill-elec-001",
      // Category name for filtering and display
      category: "electronicsAndElectric",
      // Display title for the skill category
      title: "Electronics & Electrical",
      // Detailed description of the skill category
      description: "Electrical systems, electronics and maintenance",
      // Array of individual skills within this category
      skills: [
        // Electrical wiring installation skill
        { name: "Electrical Wiring", icon: "fas fa-bolt", color: "#FFC107" },
        // Industrial electricity systems skill
        { name: "Industrial Electricity", icon: "fas fa-industry", color: "#607D8B" },
        // Single-phase electrical systems skill
        { name: "Single Phase Systems", icon: "fas fa-plug", color: "#FF9800" },
        // Three-phase electrical systems skill
        { name: "Three Phase Systems", icon: "fas fa-plug", color: "#FF5722" },
        // Basic electronics components skill
        { name: "Basic Electronics", icon: "fas fa-microchip", color: "#9C27B0" },
        // Multimeter measurement tool skill
        { name: "Multimeter Usage", icon: "fas fa-tachometer-alt", color: "#2196F3" },
        // Equipment maintenance skill
        { name: "Maintenance", icon: "fas fa-tools", color: "#FF9800" },
        // Electrical safety standards skill
        { name: "Electrical Safety", icon: "fas fa-shield-alt", color: "#4CAF50" }
      ],
      // Key features and competencies in this skill category
      features: [
        "Electrical installation",
        "Fault diagnosis",
        "Preventive maintenance",
        "Electrical safety standards",
        "Basic troubleshooting"
      ]
    }
  ],

  // Robotics and Automation Category - Robotics and control systems
  roboticsAndAutomatism: [
    {
      // Unique category identifier
      id: "skill-robot-001",
      // Category name for filtering and display
      category: "roboticsAndAutomatism",
      // Display title for the skill category
      title: "Robotics & Automation",
      // Detailed description of the skill category
      description: "Automation systems and robotics basics",
      // Array of individual skills within this category
      skills: [
        // Arduino programming for robotics skill
        { name: "Arduino Programming", icon: "fas fa-microchip", color: "#00979D" },
        // Sensors and actuators integration skill
        { name: "Sensors & Actuators", icon: "fas fa-cogs", color: "#607D8B" },
        // Basic robotics assembly skill
        { name: "Basic Robotics", icon: "fas fa-robot", color: "#455A64" },
        // PLC programming basics skill
        { name: "PLC Basics", icon: "fas fa-industry", color: "#FF5722" },
        // Control logic design skill
        { name: "Control Logic", icon: "fas fa-sitemap", color: "#FF9800" },
        // Automation project development skill
        { name: "Automation Projects", icon: "fas fa-project-diagram", color: "#4CAF50" }
      ],
      // Key features and competencies in this skill category
      features: [
        "Automation logic",
        "Simple robotic systems",
        "Sensor-based control",
        "Intro to industrial automation"
      ]
    }
  ],

  // Soft Skills Category - Professional and interpersonal abilities
  softSkills: [
    {
      // Unique category identifier
      id: "skill-soft-001",
      // Category name for filtering and display
      category: "softSkills",
      // Display title for the skill category
      title: "Soft Skills",
      // Detailed description of the skill category
      description: "Professional and interpersonal skills",
      // Array of individual skills within this category
      skills: [
        // Problem-solving ability skill
        { name: "Problem Solving", icon: "fas fa-puzzle-piece", color: "#FF6B6B" },
        // Team collaboration skill
        { name: "Teamwork", icon: "fas fa-users", color: "#4CAF50" },
        // Communication ability skill
        { name: "Communication", icon: "fas fa-comments", color: "#2196F3" },
        // Adaptability to change skill
        { name: "Adaptability", icon: "fas fa-random", color: "#20B2AA" },
        // Time management skill
        { name: "Time Management", icon: "fas fa-clock", color: "#607D8B" },
        // Self-learning ability skill
        { name: "Self Learning", icon: "fas fa-book", color: "#9C27B0" },
        // Responsibility and reliability skill
        { name: "Responsibility", icon: "fas fa-check-circle", color: "#4CAF50" }
      ],
      // Key features and competencies in this skill category
      features: [
        "Team collaboration",
        "Fast learner",
        "Project-based mindset",
        "Autonomy & responsibility"
      ]
    }
  ],

  // AI Prompt Engineering Category - Artificial intelligence and prompt design
  aiPrompt: [
    {
      // Unique category identifier
      id: "skill-ai-001",
      // Category name for filtering and display
      category: "aiPrompt",
      // Display title for the skill category
      title: "AI Prompt Engineering",
      // Detailed description of the skill category
      description: "Crafting and optimizing prompts for large language models (LLMs)",
      // Array of individual skills within this category
      skills: [
        // Prompt design and creation skill
        { name: "Prompt Design", icon: "fas fa-lightbulb", color: "#FFC107" },
        // ChatGPT interaction skill
        { name: "ChatGPT", icon: "fas fa-robot", color: "#74AA9C" },
        // Gemini AI model skill
        { name: "Gemini", icon: "fas fa-robot", color: "#4285F4" },
        // Midjourney image generation skill
        { name: "Midjourney", icon: "fas fa-image", color: "#1E90FF" },
        // Stable Diffusion image generation skill
        { name: "Stable Diffusion", icon: "fas fa-image", color: "#8E44AD" },
        // Contextual prompt writing skill
        { name: "Contextual Prompting", icon: "fas fa-align-left", color: "#2ECC71" },
        // Chain of thought reasoning skill
        { name: "Chain of Thought", icon: "fas fa-project-diagram", color: "#F39C12" },
        // GitHub Copilot AI coding assistant skill
        { name: "GitHub Copilot", icon: "fab fa-github", color: "#4078C0" },
        // Cursor AI coding assistant skill
        { name: "Cursor AI", icon: "fas fa-cursor", color: "#5865F2" },
        // Vibe coding AI assistant skill
        { name: "Vibe Coding", icon: "fas fa-wave-square", color: "#00BCD4" },
        // Ideogram AI tool skill
        { name: "Ideogram", icon: "fas fa-video", color: "#E91E63" },
        // DALL-E image generation skill
        { name: "DALL-E", icon: "fas fa-palette", color: "#9C27B0" },
        // Adobe Firefly AI tool skill
        { name: "Adobe Firefly", icon: "fab fa-adobe", color: "#FF0000" },
        // Runway ML video generation skill
        { name: "Runway ML", icon: "fas fa-film", color: "#000000" },
        // Figma AI design assistant skill
        { name: "Figma AI", icon: "fab fa-figma", color: "#F24E1E" }
      ],
      // Key features and competencies in this skill category
      features: [
        "Effective prompt writing",
        "Image generation prompts",
        "Code generation prompts",
        "Fine-tuning prompts",
        "Ethical AI usage",
        "AI-powered coding assistance",
        "Design AI tools integration",
        "Video generation AI",
        "UI/UX design with AI"
      ]
    }
  ]
};

// Console log to confirm data loading
console.log("🛠️ Skills data loaded successfully!");
