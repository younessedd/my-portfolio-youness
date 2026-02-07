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
        "images/iot/SMARTHOME.webp"
      ],
      technologies: ["ESP32", "Relay", "WiFi", "Mobile App"],
      features: [
        "Remote ON/OFF control",
        "Scheduling system",
        "Energy saving mode",
        "Mobile app control"
      ]
    },
    {
      id: "home-002",
      category: "home",
      title: "Smart Door Lock (RFID)",
      description: "Secure smart door system using RFID authentication with access logging.",
      images: [
        "images/iot/DOOR.webp"
      ],
      technologies: ["Arduino", "RFID", "Servo Motor"],
      features: [
        "RFID authentication",
        "Access history",
        "Manual override",
        "Low power consumption"
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
        "images/iot/ELEC MOTOR.webp"
      ],
      technologies: ["Arduino", "Relay", "Timers", "Industrial Wiring"],
      features: [
        "Start / Stop buttons",
        "Overload protection",
        "Manual and auto modes",
        "Industrial-grade relays"
      ]
    },
    {
      id: "industrial-002",
      category: "industrial",
      title: "Product Counter System",
      description: "Automatic product counting system for production lines using IR sensors.",
      images: [
        "images/iot/SYSTEM INDESTRY.webp"
      ],
      technologies: ["Arduino", "IR Sensor", "LCD"],
      features: [
        "Real-time counting",
        "Reset function",
        "LCD display",
        "High accuracy"
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
        "images/iot/TEMP SENSOR.webp"
      ],
      technologies: ["DHT11", "Arduino", "LCD"],
      features: [
        "Live temperature display",
        "Humidity monitoring",
        "Low cost sensors",
        "Stable readings"
      ]
    },
    {
      id: "sensor-002",
      category: "sensors",
      title: "Gas Leakage Detection System",
      description: "Safety system to detect gas leakage and trigger alarms.",
      images: [
        "images/iot/GAZ SENSOR.webp"
      ],
      technologies: ["MQ Sensor", "Buzzer", "Arduino"],
      features: [
        "Gas level detection",
        "Sound alarm alert",
        "Fast response time",
        "Home & industrial use"
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
        "images/iot/OBSTACLE.webp"
      ],
      technologies: ["Arduino", "Ultrasonic Sensor", "Motor Driver"],
      features: [
        "Autonomous navigation",
        "Real-time obstacle detection",
        "Motor speed control",
        "Efficient algorithm"
      ]
    },
    {
      id: "other-002",
      category: "othersiot",
      title: "Bluetooth Control Robot",
      description: "Robot controlled via smartphone using Bluetooth communication.",
      images: [
        "images/iot/ROBOT REMOT.webp"
      ],
      technologies: ["Arduino", "Bluetooth", "Motor Driver"],
      features: [
        "Mobile control",
        "Directional movement",
        "Low latency response",
        "Simple UI"
      ]
    }
  ]
};

console.log("📡 IoT projects data loaded successfully!");
