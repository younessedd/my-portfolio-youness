/**
 * IoT Projects Data - Single image per card
 */

window.iotProjectsData = {

  /* ===============================
     1️⃣ Smart Home
  =============================== */
  home: [
    {
      id: "home-001",
      category: "home",
      title: "Smart Lighting Control",
      description: "Control home lighting remotely using a mobile app with automation and scheduling features.",
      images: [
        "https://placehold.co/600x400/0f172a/ffffff?text=Smart+Lighting"
      ],
      technologies: ["ESP32", "Relay", "WiFi", "Mobile App"],
      features: [
        "Remote ON/OFF control",
        "Scheduling system",
        "Energy saving mode",
        "Mobile app control"
      ],
      links: [
        { name: "GitHub", url: "#", icon: "fa-github" }
      ]
    },
    {
      id: "home-002",
      category: "home",
      title: "Smart Door Lock (RFID)",
      description: "Secure smart door system using RFID authentication with access logging.",
      images: [
        "https://placehold.co/600x400/1e293b/ffffff?text=Smart+Door"
      ],
      technologies: ["Arduino", "RFID", "Servo Motor"],
      features: [
        "RFID authentication",
        "Access history",
        "Manual override",
        "Low power consumption"
      ],
      links: [
        { name: "GitHub", url: "#", icon: "fa-github" }
      ]
    }
  ],

  /* ===============================
     2️⃣ Industrial IoT
  =============================== */
  industrial: [
    {
      id: "industrial-001",
      category: "industrial",
      title: "Industrial Motor Control Panel",
      description: "Industrial automation system for controlling motors with safety features.",
      images: [
        "https://placehold.co/600x400/374151/ffffff?text=Motor+Control"
      ],
      technologies: ["Arduino", "Relay", "Timers", "Industrial Wiring"],
      features: [
        "Start / Stop buttons",
        "Overload protection",
        "Manual and auto modes",
        "Industrial-grade relays"
      ],
      links: [
        { name: "GitHub", url: "#", icon: "fa-github" }
      ]
    },
    {
      id: "industrial-002",
      category: "industrial",
      title: "Product Counter System",
      description: "Automatic product counting system for production lines using IR sensors.",
      images: [
        "https://placehold.co/600x400/4b5563/ffffff?text=Product+Counter"
      ],
      technologies: ["Arduino", "IR Sensor", "LCD"],
      features: [
        "Real-time counting",
        "Reset function",
        "LCD display",
        "High accuracy"
      ],
      links: [
        { name: "GitHub", url: "#", icon: "fa-github" }
      ]
    }
  ],

  /* ===============================
     3️⃣ Sensor Projects
  =============================== */
  sensors: [
    {
      id: "sensor-001",
      category: "sensors",
      title: "Temperature & Humidity Monitor",
      description: "Environmental monitoring system using temperature and humidity sensors.",
      images: [
        "https://placehold.co/600x400/6b7280/ffffff?text=Temp+Humidity"
      ],
      technologies: ["DHT11", "Arduino", "LCD"],
      features: [
        "Live temperature display",
        "Humidity monitoring",
        "Low cost sensors",
        "Stable readings"
      ],
      links: [
        { name: "GitHub", url: "#", icon: "fa-github" }
      ]
    },
    {
      id: "sensor-002",
      category: "sensors",
      title: "Gas Leakage Detection System",
      description: "Safety system to detect gas leakage and trigger alarms.",
      images: [
        "https://placehold.co/600x400/71717a/ffffff?text=Gas+Detection"
      ],
      technologies: ["MQ Sensor", "Buzzer", "Arduino"],
      features: [
        "Gas level detection",
        "Sound alarm alert",
        "Fast response time",
        "Home & industrial use"
      ],
      links: [
        { name: "GitHub", url: "#", icon: "fa-github" }
      ]
    }
  ],

  /* ===============================
     4️⃣ Other IoT Projects
  =============================== */
  othersiot: [
    {
      id: "other-001",
      category: "othersiot",
      title: "Obstacle Avoiding Robot",
      description: "Autonomous robot that avoids obstacles using ultrasonic sensors.",
      images: [
        "https://placehold.co/600x400/64748b/ffffff?text=Obstacle+Robot"
      ],
      technologies: ["Arduino", "Ultrasonic Sensor", "Motor Driver"],
      features: [
        "Autonomous navigation",
        "Real-time obstacle detection",
        "Motor speed control",
        "Efficient algorithm"
      ],
      links: [
        { name: "GitHub", url: "#", icon: "fa-github" }
      ]
    },
    {
      id: "other-002",
      category: "othersiot",
      title: "Bluetooth Control Robot",
      description: "Robot controlled via smartphone using Bluetooth communication.",
      images: [
        "https://placehold.co/600x400/475569/ffffff?text=Bluetooth+Robot"
      ],
      technologies: ["Arduino", "Bluetooth", "Motor Driver"],
      features: [
        "Mobile control",
        "Directional movement",
        "Low latency response",
        "Simple UI"
      ],
      links: [
        { name: "GitHub", url: "#", icon: "fa-github" }
      ]
    }
  ]
};

console.log("📡 IoT projects data loaded successfully!");
