/**
 * skills-data.js
 * Extended real skills data (6 Categories) with Bluetooth in IoT
 */

window.skillsData = {

  /* =======================
     1️⃣ Web Development
  ======================== */
  webDevelopment: [
    {
      id: "skill-web-001",
      category: "webDevelopment",
      title: "Web Development",
      description: "Design and development of modern and responsive web applications",
      skills: [
        { name: "HTML5", icon: "fab fa-html5", color: "#E34F26" },
        { name: "CSS3", icon: "fab fa-css3-alt", color: "#1572B6" },
        { name: "JavaScript (ES6+)", icon: "fab fa-js", color: "#F7DF1E" },
        { name: "React.js", icon: "fab fa-react", color: "#61DAFB" },
        { name: "Laravel", icon: "fab fa-laravel", color: "#FF2D20" },
        { name: "PHP", icon: "fab fa-php", color: "#777BB4" },
        { name: "MySQL", icon: "fas fa-database", color: "#4479A1" },
        { name: "REST API", icon: "fas fa-network-wired", color: "#00BCD4" },
        { name: "Bootstrap", icon: "fab fa-bootstrap", color: "#7952B3" },
        { name: "Tailwind CSS", icon: "fas fa-wind", color: "#38B2AC" },
        { name: "Git", icon: "fab fa-git-alt", color: "#F05032" },
        { name: "GitHub", icon: "fab fa-github", color: "#181717" }
      ],
      features: [
        "Responsive & mobile-first design",
        "CRUD applications",
        "REST API integration",
        "Authentication systems",
        "Clean and maintainable code"
      ]
    }
  ],

  /* =======================
     2️⃣ Mobile Development
  ======================== */
  mobileDevelopment: [
    {
      id: "skill-mobile-001",
      category: "mobileDevelopment",
      title: "Mobile App Development (Beginner)",
      description: "Building simple Android applications using visual tools and beginner frameworks",
      skills: [
        { name: "MIT App Inventor", icon: "fas fa-mobile-alt", color: "#4CAF50" },
        { name: "Kodular", icon: "fas fa-th-large", color: "#673AB7" },
        { name: "Firebase", icon: "fas fa-fire", color: "#FFCA28" },
        { name: "Firebase Auth", icon: "fas fa-user-shield", color: "#FFA000" },
        { name: "Firebase Realtime DB", icon: "fas fa-database", color: "#FFCA28" },
        { name: "Flutter (Beginner)", icon: "fab fa-flutter", color: "#02569B" },
        { name: "Dart (Basics)", icon: "fas fa-code", color: "#0175C2" }
      ],
      features: [
        "Simple Android apps",
        "Visual block-based programming",
        "Login & user management",
        "Basic UI/UX",
        "IoT & Firebase connected apps"
      ]
    }
  ],

  /* =======================
     3️⃣ IoT & Domotic
  ======================== */
  iotAndDomotic: [
    {
      id: "skill-iot-001",
      category: "iotAndDomotic",
      title: "IoT & Smart Home",
      description: "Smart home automation and connected devices",
      skills: [
        { name: "Arduino", icon: "fas fa-microchip", color: "#00979D" },
        { name: "ESP32", icon: "fas fa-microchip", color: "#5C2D91" },
        { name: "Sensors", icon: "fas fa-thermometer-half", color: "#FF5722" },
        { name: "Relays & Actuators", icon: "fas fa-toggle-on", color: "#4CAF50" },
        { name: "MQTT", icon: "fas fa-satellite", color: "#660066" },
        { name: "Node-RED", icon: "fas fa-project-diagram", color: "#8F0000" },
        { name: "Home Assistant", icon: "fas fa-home", color: "#41BDF5" },
        { name: "WiFi Communication", icon: "fas fa-wifi", color: "#2196F3" },
        { name: "Bluetooth Communication", icon: "fas fa-bluetooth", color: "#0082FC" } // ✅ جديد
      ],
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

  /* =======================
     4️⃣ Electronics & Electrical
  ======================== */
  electronicsAndElectric: [
    {
      id: "skill-elec-001",
      category: "electronicsAndElectric",
      title: "Electronics & Electrical",
      description: "Electrical systems, electronics and maintenance",
      skills: [
        { name: "Electrical Wiring", icon: "fas fa-bolt", color: "#FFC107" },
        { name: "Industrial Electricity", icon: "fas fa-industry", color: "#607D8B" },
        { name: "Single Phase Systems", icon: "fas fa-plug", color: "#FF9800" },
        { name: "Three Phase Systems", icon: "fas fa-plug", color: "#FF5722" },
        { name: "Basic Electronics", icon: "fas fa-microchip", color: "#9C27B0" },
        { name: "Multimeter Usage", icon: "fas fa-tachometer-alt", color: "#2196F3" },
        { name: "Maintenance", icon: "fas fa-tools", color: "#FF9800" },
        { name: "Electrical Safety", icon: "fas fa-shield-alt", color: "#4CAF50" }
      ],
      features: [
        "Electrical installation",
        "Fault diagnosis",
        "Preventive maintenance",
        "Electrical safety standards",
        "Basic troubleshooting"
      ]
    }
  ],

  /* =======================
     5️⃣ Robotics & Automation
  ======================== */
  roboticsAndAutomatism: [
    {
      id: "skill-robot-001",
      category: "roboticsAndAutomatism",
      title: "Robotics & Automation",
      description: "Automation systems and robotics basics",
      skills: [
        { name: "Arduino Programming", icon: "fas fa-microchip", color: "#00979D" },
        { name: "Sensors & Actuators", icon: "fas fa-cogs", color: "#607D8B" },
        { name: "Basic Robotics", icon: "fas fa-robot", color: "#455A64" },
        { name: "PLC Basics", icon: "fas fa-industry", color: "#FF5722" },
        { name: "Control Logic", icon: "fas fa-sitemap", color: "#FF9800" },
        { name: "Automation Projects", icon: "fas fa-project-diagram", color: "#4CAF50" }
      ],
      features: [
        "Automation logic",
        "Simple robotic systems",
        "Sensor-based control",
        "Intro to industrial automation"
      ]
    }
  ],

  /* =======================
     6️⃣ Soft Skills
  ======================== */
  softSkills: [
    {
      id: "skill-soft-001",
      category: "softSkills",
      title: "Soft Skills",
      description: "Professional and interpersonal skills",
      skills: [
        { name: "Problem Solving", icon: "fas fa-puzzle-piece", color: "#FF6B6B" },
        { name: "Teamwork", icon: "fas fa-users", color: "#4CAF50" },
        { name: "Communication", icon: "fas fa-comments", color: "#2196F3" },
        { name: "Adaptability", icon: "fas fa-random", color: "#20B2AA" },
        { name: "Time Management", icon: "fas fa-clock", color: "#607D8B" },
        { name: "Self Learning", icon: "fas fa-book", color: "#9C27B0" },
        { name: "Responsibility", icon: "fas fa-check-circle", color: "#4CAF50" }
      ],
      features: [
        "Team collaboration",
        "Fast learner",
        "Project-based mindset",
        "Autonomy & responsibility"
      ]
    }
  ],

/* =======================
1️⃣ AI Prompt Engineering
======================== */
aiPrompt: [
{
id: "skill-ai-001",
category: "aiPrompt",
title: "AI Prompt Engineering",
description: "Crafting and optimizing prompts for large language models (LLMs)",
skills: [
{ name: "Prompt Design", icon: "fas fa-lightbulb", color: "#FFC107" },
{ name: "ChatGPT", icon: "fas fa-robot", color: "#74AA9C" },
{ name: "Gemini", icon: "fas fa-robot", color: "#4285F4" },
{ name: "Midjourney", icon: "fas fa-image", color: "#1E90FF" },
{ name: "Stable Diffusion", icon: "fas fa-image", color: "#8E44AD" },
{ name: "Contextual Prompting", icon: "fas fa-align-left", color: "#2ECC71" },
{ name: "Chain of Thought", icon: "fas fa-project-diagram", color: "#F39C12" },
{ name: "GitHub Copilot", icon: "fab fa-github", color: "#4078C0" },
{ name: "Cursor AI", icon: "fas fa-cursor", color: "#5865F2" },
{ name: "Vibe Coding", icon: "fas fa-wave-square", color: "#00BCD4" },
{ name: "Ideogram", icon: "fas fa-video", color: "#E91E63" },
{ name: "DALL-E", icon: "fas fa-palette", color: "#9C27B0" },
{ name: "Adobe Firefly", icon: "fab fa-adobe", color: "#FF0000" },
{ name: "Runway ML", icon: "fas fa-film", color: "#000000" },
{ name: "Figma AI", icon: "fab fa-figma", color: "#F24E1E" }
],
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

console.log("🚀 Extended skills data with Bluetooth loaded successfully!");
