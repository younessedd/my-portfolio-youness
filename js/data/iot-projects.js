/**
 * IoT Projects Data Structure
 *
 * This file contains all Internet of Things (IoT) projects data organized by categories.
 * Each project includes metadata, technologies, features, and technical specifications.
 *
 * Categories:
 * - InternetofThings: Smart home and industrial automation projects
 * - others: Sensor-based and robotic IoT applications
 */

// Global object containing all IoT projects data
window.iotProjectsData = {

  // Internet of Things Category - Smart home and industrial automation systems
  InternetofThings: [
    {
      // Unique project identifier for tracking
      id: "home-001",
      // Project category for filtering and organization
      category: "InternetofThings",
      // Display title of the IoT project
      title: "Smart Lighting Control",
      // Detailed description of the IoT system's purpose and functionality
      description: "Control home lighting remotely using a mobile app with automation and scheduling features.",
      // Project images array (only first image used for cards)
      images: [
        "images/iot/SMARTHOME.webp"
      ],
      // Technologies used to build the IoT system
      technologies: ["ESP32", "Relay", "WiFi", "Mobile App"],
      // Key features of the IoT project
      features: [
        "Remote ON/OFF control",
        "Scheduling system",
        "Energy saving mode",
        "Mobile app control"
      ]
    },
    {
      // Second IoT project - Smart door access control
      id: "home-002",
      category: "InternetofThings",
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
    },
    {
      // Third IoT project - Industrial motor control
      id: "industrial-001",
      category: "InternetofThings",
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
      // Fourth IoT project - Production line automation
      id: "industrial-002",
      category: "InternetofThings",
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

  // Others Category - Additional IoT applications with sensors and robotics
  others: [
    {
      // First sensor-based IoT project
      id: "sensor-001",
      category: "others",
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
      // Second sensor-based IoT project
      id: "sensor-002",
      category: "others",
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
    },
    {
      // Robotic IoT project
      id: "other-001",
      category: "others",
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
      // Bluetooth-controlled robotic project
      id: "other-002",
      category: "others",
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
    },
    {
      // Weather monitoring IoT project
      id: "others-001",
      category: "others",
      title: "Weather Station",
      description: "Remote weather monitoring system with cloud data storage and real-time updates.",
      images: [
        "images/iot/WEATHER.webp"
      ],
      technologies: ["ESP8266", "DHT22", "BMP280", "WiFi"],
      features: [
        "Cloud data storage",
        "Real-time updates",
        "Multi-sensor support",
        "Mobile app access"
      ]
    },
    {
      // Smart garden IoT project
      id: "others-002",
      category: "others",
      title: "Smart Garden System",
      description: "Automated plant watering and monitoring system for home gardens.",
      images: [
        "images/iot/GARDEN.webp"
      ],
      technologies: ["Arduino", "Soil Moisture Sensor", "Relay", "Pump"],
      features: [
        "Auto watering",
        "Soil moisture monitoring",
        "Mobile notifications",
        "Low water consumption"
      ]
    }
  ]
};

// Console log to confirm data loading
console.log("📡 IoT projects data loaded successfully!");
