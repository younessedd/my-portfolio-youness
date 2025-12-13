/**
 * IoT Projects Data - Complete Version
 * Easy to edit - Add/remove/modify IoT projects easily
 * Supports: home, industrial, sensors, othersiot categories
 */

const iotProjectsData = {
    // File metadata
    fileId: "iot-projects-data-001",
    fileType: "iot-projects",
    created: "2024-12-17",
    lastUpdated: "2024-12-17",
    
    // Smart Home Category
    home: [
        {
            id: "iot-home-001",
            title: "Smart Home Automation System",
            description: "Complete home automation system with voice control, mobile app integration, and energy monitoring.",
            technologies: ["ESP32", "Node-RED", "MQTT", "React Native", "WiFi"],
            images: ["images/iot-projects/smart-home-system.jpg"],
            links: [
                {
                    name: "GitHub",
                    url: "https://github.com/yourusername/smart-home-iot",
                    icon: "fa-github"
                },
                {
                    name: "Demo Video",
                    url: "https://youtube.com/watch?v=example",
                    icon: "fa-youtube"
                }
            ],
            features: [
                "Voice control with Google Assistant/Alexa",
                "Real-time energy consumption monitoring",
                "Security system with motion detection",
                "Remote access via mobile app",
                "Scene automation (Good Morning, Good Night)"
            ],
            components: ["ESP32", "Relays", "PIR Sensors", "Raspberry Pi", "LCD Display"]
        },
        {
            id: "iot-home-002",
            title: "Intelligent Lighting System",
            description: "Automated lighting system with motion detection, color control, and schedule programming.",
            technologies: ["Arduino", "PIR Sensors", "RGB LEDs", "WiFi", "Bluetooth"],
            images: ["images/iot-projects/smart-lighting.jpg"],
            links: [
                {
                    name: "GitHub",
                    url: "https://github.com/yourusername/smart-lighting",
                    icon: "fa-github"
                }
            ],
            features: [
                "Motion-based automatic activation",
                "16 million color options",
                "Energy saving mode",
                "Schedule programming",
                "Voice control compatible"
            ],
            components: ["Arduino Nano", "PIR Sensor", "RGB LED Strip", "Relay Module", "Power Supply"]
        },
        {
            id: "iot-home-003",
            title: "Smart Security System",
            description: "Home security system with facial recognition, intrusion detection, and remote monitoring.",
            technologies: ["Raspberry Pi", "Camera Module", "Python", "OpenCV", "MQTT"],
            images: ["images/iot-projects/smart-security.jpg"],
            links: [
                {
                    name: "GitHub",
                    url: "https://github.com/yourusername/smart-security",
                    icon: "fa-github"
                }
            ],
            features: [
                "Facial recognition for authorized access",
                "Intrusion detection with alarms",
                "Live camera feed to mobile app",
                "Motion detection alerts",
                "Emergency notifications"
            ],
            components: ["Raspberry Pi 4", "Camera Module", "PIR Sensors", "Buzzer", "LCD Screen"]
        }
        // ADD MORE SMART HOME PROJECTS HERE
    ],
    
    // Industrial IoT Category
    industrial: [
        {
            id: "iot-industrial-001",
            title: "Factory Monitoring System",
            description: "Real-time monitoring of industrial equipment with predictive maintenance alerts.",
            technologies: ["ESP8266", "ThingsBoard", "Python", "Grafana", "PLC"],
            images: ["images/iot-projects/factory-monitoring.jpg"],
            links: [
                {
                    name: "GitHub",
                    url: "https://github.com/yourusername/industrial-iot",
                    icon: "fa-github"
                }
            ],
            features: [
                "Real-time equipment monitoring",
                "Predictive maintenance alerts",
                "Energy consumption tracking",
                "Remote control of machinery",
                "Production analytics dashboard"
            ],
            components: ["ESP8266", "Current Sensors", "Temperature Sensors", "Vibration Sensors", "LCD Display"]
        },
        {
            id: "iot-industrial-002",
            title: "Warehouse Inventory System",
            description: "Automated inventory management using RFID and weight sensors.",
            technologies: ["Arduino", "RFID", "Load Cells", "WiFi", "Database"],
            images: ["images/iot-projects/warehouse-inventory.jpg"],
            links: [
                {
                    name: "GitHub",
                    url: "https://github.com/yourusername/warehouse-iot",
                    icon: "fa-github"
                }
            ],
            features: [
                "RFID-based item tracking",
                "Weight-based quantity verification",
                "Automatic reorder alerts",
                "Inventory dashboard",
                "Barcode scanning integration"
            ],
            components: ["Arduino Mega", "RFID Reader", "Load Cells", "ESP8266", "LCD Touch Screen"]
        },
        {
            id: "iot-industrial-003",
            title: "Safety Monitoring System",
            description: "Industrial safety system monitoring temperature, gas, and worker presence.",
            technologies: ["ESP32", "Gas Sensors", "Temperature Sensors", "SCADA", "Safety Systems"],
            images: ["images/iot-projects/safety-monitoring.jpg"],
            links: [
                {
                    name: "GitHub",
                    url: "https://github.com/yourusername/safety-iot",
                    icon: "fa-github"
                }
            ],
            features: [
                "Gas leak detection and alerts",
                "Temperature threshold monitoring",
                "Worker presence detection",
                "Emergency shutdown control",
                "Compliance reporting"
            ],
            components: ["ESP32", "MQ-2 Gas Sensor", "DHT22", "PIR Sensor", "Alarm System"]
        }
        // ADD MORE INDUSTRIAL IOT PROJECTS HERE
    ],
    
    // Sensor Projects Category
    sensors: [
        {
            id: "iot-sensors-001",
            title: "Weather Station",
            description: "Wireless weather station measuring temperature, humidity, pressure, and rainfall.",
            technologies: ["Arduino", "DHT22", "BMP180", "LoRa", "WebSocket"],
            images: ["images/iot-projects/weather-station.jpg"],
            links: [
                {
                    name: "GitHub",
                    url: "https://github.com/yourusername/iot-weather-station",
                    icon: "fa-github"
                }
            ],
            features: [
                "Temperature & humidity monitoring",
                "Barometric pressure measurement",
                "Rainfall detection",
                "Wind speed/direction",
                "Web dashboard with historical data"
            ],
            components: ["Arduino Uno", "DHT22", "BMP180", "Rain Sensor", "LoRa Module", "Solar Panel"]
        },
        {
            id: "iot-sensors-002",
            title: "Soil Monitoring System",
            description: "Agriculture IoT system for monitoring soil conditions and automatic irrigation.",
            technologies: ["ESP32", "Soil Moisture Sensors", "Water Pump", "Blynk", "Agriculture IoT"],
            images: ["images/iot-projects/soil-monitoring.jpg"],
            links: [
                {
                    name: "GitHub",
                    url: "https://github.com/yourusername/smart-agriculture",
                    icon: "fa-github"
                }
            ],
            features: [
                "Soil moisture monitoring",
                "Automatic irrigation control",
                "Weather forecast integration",
                "Mobile notifications",
                "Water usage optimization"
            ],
            components: ["ESP32", "Soil Moisture Sensors", "Water Pump", "Relay Module", "Solar Panel", "Battery"]
        },
        {
            id: "iot-sensors-003",
            title: "Water Quality Monitor",
            description: "Real-time water quality monitoring system for pH, turbidity, and temperature.",
            technologies: ["Arduino", "pH Sensor", "Turbidity Sensor", "IoT", "Sensors"],
            images: ["images/iot-projects/water-quality.jpg"],
            links: [
                {
                    name: "GitHub",
                    url: "https://github.com/yourusername/water-quality-iot",
                    icon: "fa-github"
                }
            ],
            features: [
                "pH level monitoring",
                "Turbidity measurement",
                "Water temperature tracking",
                "Contamination alerts",
                "Data logging and analysis"
            ],
            components: ["Arduino Nano", "pH Sensor", "Turbidity Sensor", "Temperature Probe", "LCD Display"]
        }
        // ADD MORE SENSOR PROJECTS HERE
    ],
    
    // Other IoT Projects Category
    othersiot: [
        {
            id: "iot-othersiot-001",
            title: "GPS Tracker",
            description: "Vehicle tracking system with real-time location, geofencing, and speed monitoring.",
            technologies: ["ESP32", "GPS Module", "Google Maps API", "Firebase", "API"],
            images: ["images/iot-projects/gps-tracker.jpg"],
            links: [
                {
                    name: "GitHub",
                    url: "https://github.com/yourusername/gps-tracker-iot",
                    icon: "fa-github"
                }
            ],
            features: [
                "Real-time GPS tracking",
                "Geofencing with alerts",
                "Speed monitoring",
                "Historical route playback",
                "Battery status monitoring"
            ],
            components: ["ESP32", "GPS Module", "GSM Module", "Battery Pack", "OLED Display"]
        },
        {
            id: "iot-othersiot-002",
            title: "Smart Parking System",
            description: "IoT-based parking system with availability detection and reservation.",
            technologies: ["Arduino", "Ultrasonic Sensors", "LED Display", "Web App", "UI/UX"],
            images: ["images/iot-projects/smart-parking.jpg"],
            links: [
                {
                    name: "GitHub",
                    url: "https://github.com/yourusername/smart-parking",
                    icon: "fa-github"
                }
            ],
            features: [
                "Parking slot availability detection",
                "LED display showing free spots",
                "Mobile app for reservation",
                "Payment integration",
                "Parking duration tracking"
            ],
            components: ["Arduino Mega", "Ultrasonic Sensors", "LED Matrix Display", "RFID Reader", "Servo Motor"]
        },
        {
            id: "iot-othersiot-003",
            title: "Wearable Health Monitor",
            description: "IoT wearable device monitoring heart rate, temperature, and activity.",
            technologies: ["ESP32", "Heart Rate Sensor", "Temperature Sensor", "Bluetooth", "Wearable"],
            images: ["images/iot-projects/wearable-health.jpg"],
            links: [
                {
                    name: "GitHub",
                    url: "https://github.com/yourusername/wearable-health",
                    icon: "fa-github"
                }
            ],
            features: [
                "Heart rate monitoring",
                "Body temperature tracking",
                "Activity and step counting",
                "Fall detection alert",
                "Mobile app dashboard"
            ],
            components: ["ESP32", "Heart Rate Sensor", "Temperature Sensor", "Vibration Motor", "OLED Display"]
        }
        // ADD MORE OTHER IOT PROJECTS HERE
    ]
};

// 📝 HOW TO ADD NEW IOT PROJECTS:
// ===============================
// 1. Choose a category: 'home', 'industrial', 'sensors', or 'othersiot'
// 2. Create a new project object
// 3. Give it a unique ID (increment the last number)
// 4. Add it to the array

// Example for adding a new smart home project:
/*
const newSmartHomeProject = {
    id: "iot-home-004",
    title: "Voice Controlled Curtains",
    description: "Automated curtains controlled by voice commands and schedule.",
    technologies: ["ESP32", "Stepper Motor", "Voice Recognition", "HomeKit", "Automation"],
    images: ["images/iot-projects/smart-curtains.jpg"],
    links: [
        {
            name: "GitHub",
            url: "https://github.com/yourusername/smart-curtains",
            icon: "fa-github"
        }
    ],
    features: [
        "Voice control with Google Assistant",
        "Schedule-based operation",
        "Light sensor integration",
        "Manual override option",
        "Energy saving mode"
    ],
    components: ["ESP32", "Stepper Motor", "Motor Driver", "Light Sensor", "Power Supply"]
};

// Add to home category:
iotProjectsData.home.push(newSmartHomeProject);
*/

// Example for adding a new industrial IoT project:
/*
const newIndustrialProject = {
    id: "iot-industrial-004",
    title: "Conveyor Belt Monitor",
    description: "Monitoring system for conveyor belt speed, load, and maintenance.",
    technologies: ["ESP8266", "Encoder", "Load Cells", "Industrial IoT", "SCADA"],
    images: ["images/iot-projects/conveyor-monitor.jpg"],
    links: [
        {
            name: "GitHub",
            url: "https://github.com/yourusername/conveyor-monitor",
            icon: "fa-github"
        }
    ],
    features: [
        "Belt speed monitoring",
        "Load weight measurement",
        "Predictive maintenance alerts",
        "Efficiency calculation",
        "Dashboard with KPIs"
    ],
    components: ["ESP8266", "Rotary Encoder", "Load Cells", "Temperature Sensor", "LCD Display"]
};

// Add to industrial category:
iotProjectsData.industrial.push(newIndustrialProject);
*/

// Example for adding a new sensor project:
/*
const newSensorProject = {
    id: "iot-sensors-004",
    title: "Air Quality Monitor",
    description: "Monitor air pollution levels with CO2, CO, and particulate matter sensors.",
    technologies: ["Arduino", "MQ-135", "PMS5003", "API", "Sensors"],
    images: ["images/iot-projects/air-quality.jpg"],
    links: [
        {
            name: "GitHub",
            url: "https://github.com/yourusername/air-quality-iot",
            icon: "fa-github"
        }
    ],
    features: [
        "CO2 and CO levels monitoring",
        "PM2.5 and PM10 detection",
        "Air quality index calculation",
        "Mobile alerts for poor air quality",
        "Historical data analysis"
    ],
    components: ["Arduino Uno", "MQ-135 Sensor", "PMS5003", "OLED Display", "Buzzer"]
};

// Add to sensors category:
iotProjectsData.sensors.push(newSensorProject);
*/

// Example for adding to othersiot category:
/*
const newOtherIoTProject = {
    id: "iot-othersiot-004",
    title: "Smart Pet Feeder",
    description: "Automated pet feeder with schedule, portion control, and remote control.",
    technologies: ["ESP32", "Servo Motor", "Load Cell", "Mobile App", "Automation"],
    images: ["images/iot-projects/pet-feeder.jpg"],
    links: [
        {
            name: "GitHub",
            url: "https://github.com/yourusername/smart-pet-feeder",
            icon: "fa-github"
        }
    ],
    features: [
        "Scheduled feeding",
        "Portion control",
        "Remote feeding via app",
        "Food level monitoring",
        "Feeding history"
    ],
    components: ["ESP32", "Servo Motor", "Load Cell", "Food Hopper", "OLED Display"]
};

// Add to othersiot category:
iotProjectsData.othersiot.push(newOtherIoTProject);
*/

// 📌 IMPORTANT NOTES:
// 1. Keep IDs unique across all categories
// 2. Add actual image files to images/iot-projects/ folder
// 3. Update GitHub URLs with your actual repositories
// 4. Technologies array matches techClassMap in your iot-projects-new.js
// 5. Components list helps users understand hardware requirements

console.log("📡 IoT projects data loaded successfully!");
console.log(`📊 Total projects: ${iotProjectsData.home.length + iotProjectsData.industrial.length + iotProjectsData.sensors.length + iotProjectsData.othersiot.length}`);