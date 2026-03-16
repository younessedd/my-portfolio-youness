/**
 * IoT Projects Data Structure
 *
 * This file contains all Internet of Things (IoT) projects data organized by categories.
 * Each project includes metadata, technologies, and system features.
 *
 * Categories:
 * - smarthome_apps: Smart home automation systems
 * - industrial_iot: Industrial automation and electrical control systems
 * - sensor_projects: Sensor-based monitoring systems
 * - robotics_iot: Robotics and autonomous systems
 */

// Global object containing all IoT projects data
window.iotProjectsData = {

    /* =========================================
       SMART HOME AUTOMATION
    ========================================= */

    smarthome_apps: [

        {
            id: "iot-home-001",
            category: "smarthome_apps",
            type: "iot",

            title: "Smart Lighting Control",

            description:
            "Control home lighting remotely using mobile application automation scheduling features.",

            images: [
                "images/iot/SMARTHOME.webp"
            ],

            technologies: [
                "ESP32",
                "Relay Module",
                "WiFi",
                "Mobile App",
                "Arduino IDE",
                "Home Automation",
                "Light Control",
                "Scheduling System"
            ],

            features: [
                "Remote ON / OFF control",
                "Lighting scheduling system",
                "Energy saving automation",
                "Mobile application interface"
            ]
        },

        {
            id: "iot-home-002",
            category: "smarthome_apps",
            type: "iot",

            title: "Smart Door Lock (RFID)",

            description:
            "Secure smart door access system using RFID authentication servo motor.",

            images: [
                "images/iot/DOOR.webp"
            ],

            technologies: [
                "Arduino",
                "RFID Module",
                "Servo Motor",
                "Access Control",
                "Security System",
                "Door Lock",
                "Authentication",
                "Home Security"
            ],

            features: [
                "RFID authentication",
                "Secure access system",
                "Manual override mode",
                "Low power consumption"
            ]
        }

    ],


    /* =========================================
       INDUSTRIAL AUTOMATION
    ========================================= */

    industrial_iot: [

        {
            id: "iot-industrial-001",
            category: "industrial_iot",
            type: "iot",

            title: "Industrial Motor Control Panel",

            description:
            "Industrial automation system used control motors protection safety mechanisms.",

            images: [
                "images/iot/ELEC MOTOR.webp"
            ],

            technologies: [
                "Arduino",
                "Industrial Relays",
                "Timers",
                "Electrical Control Wiring",
                "Motor Control",
                "Safety Systems",
                "Automation",
                "Industrial Grade"
            ],

            features: [
                "Start / Stop motor control",
                "Overload protection",
                "Manual and automatic modes",
                "Industrial safety system"
            ]
        },

        {
            id: "iot-industrial-002",
            category: "industrial_iot",
            type: "iot",

            title: "Product Counter System",

            description:
            "Automatic product counting system for industrial production lines using sensors.",

            images: [
                "images/iot/SYSTEM INDESTRY.webp"
            ],

            technologies: [
                "Arduino",
                "IR Sensor",
                "LCD Display",
                "Industrial Automation",
                "Product Counting",
                "Manufacturing",
                "Quality Control",
                "Production Line"
            ],

            features: [
                "Real-time product counting",
                "Reset function",
                "LCD display interface",
                "High accuracy detection"
            ]
        }

    ],


    /* =========================================
       SENSOR BASED PROJECTS
    ========================================= */

    sensor_projects: [

        {
            id: "iot-sensor-001",
            category: "sensor_projects",
            type: "iot",

            title: "Temperature & Humidity Monitor",

            description:
            "Environmental monitoring system measuring temperature humidity real-time data.",

            images: [
                "images/iot/TEMP SENSOR.webp"
            ],

            technologies: [
                "DHT11 Sensor",
                "Arduino",
                "LCD Display",
                "Temperature Monitoring",
                "Humidity Sensing",
                "Environmental Data",
                "Real-time Display",
                "Low Cost Sensor"
            ],

            features: [
                "Live temperature monitoring",
                "Humidity detection",
                "Stable sensor readings",
                "Low cost implementation"
            ]
        },

        {
            id: "iot-sensor-002",
            category: "sensor_projects",
            type: "iot",

            title: "Gas Leakage Detection System",

            description:
            "Safety monitoring system designed detect gas leakage trigger alarm.",

            images: [
                "images/iot/GAZ SENSOR.webp"
            ],

            technologies: [
                "MQ Gas Sensor",
                "Arduino",
                "Buzzer Alarm",
                "Gas Detection",
                "Safety System",
                "Alarm Monitoring",
                "Industrial Safety",
                "Emergency Alert"
            ],

            features: [
                "Gas level monitoring",
                "Sound alarm system",
                "Fast response detection",
                "Home and industrial safety"
            ]
        },

        {
            id: "iot-sensor-003",
            category: "sensor_projects",
            type: "iot",

            title: "Weather Monitoring Station",

            description:
            "Remote weather monitoring system with multiple sensors real-time environmental data.",

            images: [
                "images/iot/WEATHER.webp"
            ],

            technologies: [
                "ESP8266",
                "DHT22",
                "BMP280",
                "WiFi",
                "Weather Station",
                "Cloud Data",
                "Environmental Monitoring",
                "Remote Sensing"
            ],

            features: [
                "Real-time weather data",
                "Multi sensor support",
                "Cloud data transmission",
                "Mobile monitoring"
            ]
        }

    ],


    /* =========================================
       ROBOTICS PROJECTS
    ========================================= */

    robotics_iot: [

        {
            id: "iot-robot-001",
            category: "robotics_iot",
            type: "iot",

            title: "Obstacle Avoiding Robot",

            description:
            "Autonomous robot capable detecting avoiding obstacles using ultrasonic sensors.",

            images: [
                "images/iot/OBSTACLE.webp"
            ],

            technologies: [
                "Arduino",
                "Ultrasonic Sensor",
                "Motor Driver",
                "Obstacle Detection",
                "Autonomous Navigation",
                "Robot Control",
                "Sensor Fusion",
                "Path Planning"
            ],

            features: [
                "Autonomous navigation",
                "Obstacle detection",
                "Motor speed control",
                "Efficient movement algorithm"
            ]
        },

        {
            id: "iot-robot-002",
            category: "robotics_iot",
            type: "iot",

            title: "Bluetooth Control Robot",

            description:
            "Smart robot controlled through mobile phone using Bluetooth communication.",

            images: [
                "images/iot/ROBOT REMOT.webp"
            ],

            technologies: [
                "Arduino",
                "Bluetooth Module",
                "Motor Driver",
                "Mobile Control",
                "Wireless Communication",
                "Robot Interface",
                "Remote Operation",
                "Bluetooth Protocol"
            ],

            features: [
                "Mobile phone control",
                "Directional movement",
                "Low latency communication",
                "Simple control interface"
            ]
        },

        {
            id: "iot-robot-003",
            category: "robotics_iot",
            type: "iot",

            title: "Smart Garden System",

            description:
            "Automated garden irrigation system that waters plants based soil moisture.",

            images: [
                "images/iot/GARDEN.webp"
            ],

            technologies: [
                "Arduino",
                "Soil Moisture Sensor",
                "Relay",
                "Water Pump",
                "Garden Automation",
                "Irrigation System",
                "Plant Care",
                "Smart Agriculture"
            ],

            features: [
                "Automatic plant watering",
                "Soil moisture monitoring",
                "Water saving system",
                "Simple automation setup"
            ]
        }

    ]

};


// Console log to confirm data loading
console.log("📡 IoT projects data loaded successfully!");