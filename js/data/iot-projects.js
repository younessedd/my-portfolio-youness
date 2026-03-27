/**
 * IoT Projects Data Structure - UPDATED VERSION
 */

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
            "A smart lighting system that allows remote control and automation using mobile applications and scheduling features.",

            images: ["images/iot/SMARTHOME.webp"],

            technologies: ["ESP32", "Relay Module", "WiFi", "Mobile App", "MQTT", "Light Sensor"],

            features: [
                "Remote ON/OFF control",
                "Lighting scheduling",
                "Energy saving automation",
                "Mobile interface"
            ]
        },

        {
            id: "iot-home-002",
            category: "smarthome_apps",
            type: "iot",

            title: "Smart Door Lock (RFID)",

            description:
            "Secure smart door lock system using RFID authentication and servo motor mechanism.",

            images: ["images/iot/DOOR.webp"],

            technologies: ["ESP32", "RFID", "Servo Motor", "WiFi", "Mobile App", "Battery Monitor"],

            features: [
                "RFID authentication",
                "Secure access",
                "Manual override",
                "Low power usage"
            ]
        },

        {
            id: "iot-home-003",
            category: "smarthome_apps",
            type: "iot",

            title: "Complete Smart Home System",

            description:
            "Full smart home automation system integrating lighting, sensors, and remote control using ESP32.",

            images: ["images/iot/SMART-SYSTEM.webp"],

            technologies: ["ESP32", "Sensors", "WiFi", "Relays", "MQTT", "Mobile App"],

            features: [
                "Full home automation",
                "Remote control",
                "Security system",
                "Energy optimization"
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
            "Industrial system for controlling motors with protection and automation features.",

            images: ["images/iot/ELEC MOTOR.webp"],

            technologies: ["Relays", "Timers", "Electrical Wiring", "ESP32", "Sensors", "PLC Integration"],

            features: [
                "Motor control",
                "Overload protection",
                "Manual/Auto mode",
                "Industrial safety"
            ]
        },

        {
            id: "iot-industrial-002",
            category: "industrial_iot",
            type: "iot",

            title: "Product Counter System",

            description:
            "Automated system that counts products on a production line using sensors.",

            images: ["images/iot/SYSTEM INDESTRY.webp"],

            technologies: ["ESP32", "IR Sensor", "LCD", "WiFi", "MQTT", "Data Logging"],

            features: [
                "Real-time counting",
                "LCD display",
                "High accuracy",
                "Reset system"
            ]
        },

        {
            id: "iot-industrial-003",
            category: "industrial_iot",
            type: "iot",

            title: "Automated Electrical Panel",

            description:
            "Electrical panel integrating automation logic with relays and industrial components.",

            images: ["images/iot/ELECTRICAL PANEL.webp"],

            technologies: ["Relays", "Contactors", "ESP32", "WiFi", "Sensors", "Industrial IoT Protocols"],

            features: [
                "Automatic control",
                "Safety system",
                "Manual override",
                "Industrial integration"
            ]
        }

    ],

    /* =========================================
       SENSOR PROJECTS
    ========================================= */

    sensor_projects: [

        {
            id: "iot-sensor-001",
            category: "sensor_projects",
            type: "iot",

            title: "Temperature & Humidity Monitor",

            description:
            "System that measures temperature and humidity in real-time using sensors.",

            images: ["images/iot/TEMP SENSOR.webp"],

            technologies: ["DHT11", "ESP32", "LCD", "WiFi", "Data Logging", "MQTT"],

            features: [
                "Real-time monitoring",
                "Stable readings",
                "Low cost",
                "Simple display"
            ]
        },

        {
            id: "iot-sensor-002",
            category: "sensor_projects",
            type: "iot",

            title: "Gas Leakage Detection System",

            description:
            "Safety system that detects gas leakage and triggers an alarm instantly.",

            images: ["images/iot/GAZ SENSOR.webp"],

            technologies: ["MQ Sensor", "ESP32", "Buzzer", "WiFi", "Alarm System", "MQTT"],

            features: [
                "Gas detection",
                "Alarm system",
                "Fast response",
                "Safety protection"
            ]
        },

        {
            id: "iot-sensor-003",
            category: "sensor_projects",
            type: "iot",

            title: "Weather Monitoring Station",

            description:
            "IoT weather station that collects environmental data and sends it to the cloud.",

            images: ["images/iot/WEATHER.webp"],

            technologies: ["ESP8266", "DHT22", "BMP280", "WiFi", "Cloud Integration", "MQTT"],

            features: [
                "Weather data",
                "Cloud integration",
                "Multi sensors",
                "Remote monitoring"
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
            "Autonomous robot that avoids obstacles using ultrasonic sensors.",

            images: ["images/iot/OBSTACLE.webp"],

            technologies: ["ESP32", "Ultrasonic Sensor", "Motor Driver", "Battery", "WiFi", "Mobile App"],

            features: [
                "Obstacle detection",
                "Autonomous movement",
                "Motor control",
                "Navigation logic"
            ]
        },

        {
            id: "iot-robot-002",
            category: "robotics_iot",
            type: "iot",

            title: "Bluetooth Control Robot",

            description:
            "Robot controlled using a smartphone via Bluetooth communication.",

            images: ["images/iot/ROBOT REMOT.webp"],

            technologies: ["ESP32", "Bluetooth", "Motor Driver", "Battery", "Mobile App", "Sensors"],

            features: [
                "Mobile control",
                "Directional movement",
                "Wireless control",
                "Low latency"
            ]
        },

        {
            id: "iot-robot-003",
            category: "robotics_iot",
            type: "iot",

            title: "Smart Garden System",

            description:
            "Automated irrigation system based on soil moisture detection.",

            images: ["images/iot/GARDEN.webp"],

            technologies: ["ESP32", "Soil Sensor", "Pump", "Relay Module", "WiFi", "Mobile App"],

            features: [
                "Auto watering",
                "Water saving",
                "Soil monitoring",
                "Simple automation"
            ]
        }

    ],

    /* =========================================
       MOBILE IoT APPS
    ========================================= */

    iot_mobile_apps: [

        {
            id: "iot-app-001",
            category: "iot_mobile_apps",
            type: "iot",

            title: "Smart Home Mobile App",

            description:
            "Mobile application for controlling IoT devices using Bluetooth and WiFi.",

            images: ["images/iot/MOBILE APP.webp"],

            technologies: ["Kodular", "ESP32", "ESP8266", "Bluetooth", "WiFi", "MQTT"],

            features: [
                "Device control",
                "Real-time interaction",
                "User interface",
                "Wireless connection"
            ]
        }

    ],

    /* =========================================
       AI SYSTEMS
    ========================================= */

    ai_iot_systems: [

        {
            id: "iot-ai-001",
            category: "ai_iot_systems",
            type: "iot",

            title: "AI Smart Home Assistant",

            description:
            "AI-powered system that controls smart home devices using voice commands.",

            images: ["images/iot/AI HOME.webp"],

            technologies: ["ESP32", "ESP8266", "AI API", "WiFi", "Mobile App", "Voice Recognition"],

            features: [
                "Voice control",
                "AI automation",
                "Smart interaction",
                "Real-time response"
            ]
        }

    ]

};

console.log("📡 IoT projects UPDATED data loaded!");