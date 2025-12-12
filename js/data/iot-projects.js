/**
 * iot-projects.js - IoT Projects Data
 * Contains all IoT project data organized by categories
 */

const iotProjectsData = {
    // Smart Home Projects (5 projects)
    home: [
        {
            id: 36,
            title: "Smart Home Hub",
            description: "Centralized smart home control system integrating multiple IoT devices and automation routines.",
            category: "home",
            images: [
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "Centralized device control",
                "Automation scheduling",
                "Voice control integration",
                "Energy monitoring"
            ],
            technologies: ["ESP32", "MQTT", "Home Assistant", "Node-RED", "WebSocket"],
            links: [
                { name: "Demo Video", url: "#", icon: "fa-youtube" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        },
        {
            id: 37,
            title: "Smart Lighting System",
            description: "Intelligent lighting system with color control, scheduling, and presence detection.",
            category: "home",
            images: [
                "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "RGB color control",
                "Motion detection",
                "Sunrise/sunset scheduling",
                "Voice control"
            ],
            technologies: ["ESP8266", "PIR Sensors", "RGB LEDs", "HomeKit", "WiFi"],
            links: [
                { name: "Demo Video", url: "#", icon: "fa-youtube" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        },
        {
            id: 38,
            title: "Climate Control System",
            description: "Automated climate control for home with temperature, humidity, and air quality monitoring.",
            category: "home",
            images: [
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "Temperature monitoring",
                "Humidity control",
                "Air quality sensors",
                "Smart thermostat"
            ],
            technologies: ["ESP32", "DHT22", "CO2 Sensor", "Relays", "Mobile App"],
            links: [
                { name: "Demo Video", url: "#", icon: "fa-youtube" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        },
        {
            id: 39,
            title: "Security Camera System",
            description: "DIY security camera system with motion detection and cloud storage.",
            category: "home",
            images: [
                "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "Motion detection alerts",
                "Cloud storage",
                "Live streaming",
                "Night vision"
            ],
            technologies: ["Raspberry Pi", "Camera Module", "Motion Detection", "Cloud API", "Python"],
            links: [
                { name: "Demo Video", url: "#", icon: "fa-youtube" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        },
        {
            id: 40,
            title: "Smart Irrigation System",
            description: "Automated garden irrigation system with soil moisture sensing and weather integration.",
            category: "home",
            images: [
                "https://images.unsplash.com/photo-1464457312035-3d7d0e0c058e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1417733403748-83bbc7c05140?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "Soil moisture sensing",
                "Weather-based scheduling",
                "Water conservation",
                "Mobile notifications"
            ],
            technologies: ["ESP32", "Soil Sensors", "Solenoid Valves", "Weather API", "MQTT"],
            links: [
                { name: "Demo Video", url: "#", icon: "fa-youtube" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        }
    ],
    
    // Industrial IoT Projects (5 projects)
    industrial: [
        {
            id: 41,
            title: "Industrial Monitoring System",
            description: "Real-time monitoring system for industrial equipment with predictive maintenance.",
            category: "industrial",
            images: [
                "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "Equipment monitoring",
                "Predictive maintenance",
                "Alert system",
                "Performance analytics"
            ],
            technologies: ["Arduino", "Vibration Sensors", "PLC", "SCADA", "Industrial IoT"],
            links: [
                { name: "Case Study", url: "#", icon: "fa-file-alt" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        },
        {
            id: 42,
            title: "Energy Management System",
            description: "Industrial energy consumption monitoring and optimization system.",
            category: "industrial",
            images: [
                "https://images.unsplash.com/photo-1501139083538-0139583c060f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "Real-time energy monitoring",
                "Cost optimization",
                "Peak load management",
                "Reporting dashboard"
            ],
            technologies: ["Current Sensors", "ESP32", "Energy Monitoring", "Data Analytics", "Cloud"],
            links: [
                { name: "Case Study", url: "#", icon: "fa-file-alt" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        },
        {
            id: 43,
            title: "Production Line Monitoring",
            description: "Automated monitoring system for production line efficiency and quality control.",
            category: "industrial",
            images: [
                "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "Production counting",
                "Quality control sensors",
                "Downtime tracking",
                "Efficiency reporting"
            ],
            technologies: ["PLC", "Sensors", "Industrial IoT", "Data Collection", "Analytics"],
            links: [
                { name: "Case Study", url: "#", icon: "fa-file-alt" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        },
        {
            id: 44,
            title: "Warehouse Automation",
            description: "IoT-based warehouse management with inventory tracking and automated systems.",
            category: "industrial",
            images: [
                "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "Inventory tracking",
                "Automated sorting",
                "RFID technology",
                "Real-time updates"
            ],
            technologies: ["RFID", "ESP32", "Conveyor Systems", "Database", "Industrial IoT"],
            links: [
                { name: "Case Study", url: "#", icon: "fa-file-alt" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        },
        {
            id: 45,
            title: "Environmental Monitoring",
            description: "Industrial environmental monitoring for safety compliance and hazard detection.",
            category: "industrial",
            images: [
                "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "Gas leak detection",
                "Temperature monitoring",
                "Safety compliance",
                "Emergency alerts"
            ],
            technologies: ["Gas Sensors", "ESP32", "Safety Systems", "Alerts", "Industrial IoT"],
            links: [
                { name: "Case Study", url: "#", icon: "fa-file-alt" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        }
    ],
    
    // Sensor Projects (5 projects)
    sensors: [
        {
            id: 46,
            title: "Weather Station",
            description: "DIY weather station with multiple sensors for comprehensive weather monitoring.",
            category: "sensors",
            images: [
                "https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1561484930-998b6a7b22e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "Temperature monitoring",
                "Humidity sensing",
                "Wind speed measurement",
                "Rain detection"
            ],
            technologies: ["DHT22", "Rain Sensor", "Anemometer", "ESP32", "Weather Station"],
            links: [
                { name: "Demo Video", url: "#", icon: "fa-youtube" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        },
        {
            id: 47,
            title: "Water Quality Monitor",
            description: "Portable water quality monitoring device with multiple parameter measurements.",
            category: "sensors",
            images: [
                "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1417733403748-83bbc7c05140?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "pH level measurement",
                "Turbidity sensing",
                "Temperature monitoring",
                "Data logging"
            ],
            technologies: ["pH Sensor", "Turbidity Sensor", "Arduino", "Data Logging", "Water Quality"],
            links: [
                { name: "Demo Video", url: "#", icon: "fa-youtube" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        },
        {
            id: 48,
            title: "Air Quality Monitor",
            description: "Indoor air quality monitoring system with multiple pollutant detection.",
            category: "sensors",
            images: [
                "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "CO2 monitoring",
                "PM2.5 detection",
                "VOC sensing",
                "Air quality index"
            ],
            technologies: ["CO2 Sensor", "Particulate Sensor", "ESP32", "Air Quality", "Monitoring"],
            links: [
                { name: "Demo Video", url: "#", icon: "fa-youtube" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        },
        {
            id: 49,
            title: "Smart Parking Sensor",
            description: "IoT-based parking space detection and guidance system.",
            category: "sensors",
            images: [
                "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "Parking space detection",
                "Occupancy monitoring",
                "Mobile app integration",
                "Guidance system"
            ],
            technologies: ["Ultrasonic Sensors", "ESP8266", "Mobile App", "Parking System", "IoT"],
            links: [
                { name: "Demo Video", url: "#", icon: "fa-youtube" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        },
        {
            id: 50,
            title: "Soil Monitoring System",
            description: "Comprehensive soil monitoring for agriculture with multiple parameter sensing.",
            category: "sensors",
            images: [
                "https://images.unsplash.com/photo-1417733403748-83bbc7c05140?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1464457312035-3d7d0e0c058e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "Soil moisture sensing",
                "Nutrient level detection",
                "Temperature monitoring",
                "Data analytics"
            ],
            technologies: ["Soil Sensors", "ESP32", "Agriculture IoT", "Data Analysis", "Farming"],
            links: [
                { name: "Demo Video", url: "#", icon: "fa-youtube" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        }
    ],
    
    // Other IoT Projects (5 projects)
    othersiot: [
        {
            id: 51,
            title: "IoT Pet Feeder",
            description: "Smart pet feeding system with scheduling and remote control capabilities.",
            category: "othersiot",
            images: [
                "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "Scheduled feeding",
                "Portion control",
                "Mobile app control",
                "Food level monitoring"
            ],
            technologies: ["ESP32", "Servo Motors", "Mobile App", "Scheduling", "Pet Tech"],
            links: [
                { name: "Demo Video", url: "#", icon: "fa-youtube" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        },
        {
            id: 52,
            title: "Smart Mailbox",
            description: "IoT-enabled mailbox with delivery notifications and security features.",
            category: "othersiot",
            images: [
                "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "Delivery detection",
                "Notification system",
                "Security lock",
                "Weather protection"
            ],
            technologies: ["ESP8266", "Proximity Sensors", "Mobile Notifications", "Security", "IoT"],
            links: [
                { name: "Demo Video", url: "#", icon: "fa-youtube" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        },
        {
            id: 53,
            title: "Smart Plant Monitor",
            description: "Automated plant monitoring system with watering and growth tracking.",
            category: "othersiot",
            images: [
                "https://images.unsplash.com/photo-1417733403748-83bbc7c05140?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1464457312035-3d7d0e0c058e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "Soil moisture monitoring",
                "Automatic watering",
                "Light level sensing",
                "Growth tracking"
            ],
            technologies: ["Soil Sensors", "ESP32", "Water Pump", "Light Sensor", "Plant Care"],
            links: [
                { name: "Demo Video", url: "#", icon: "fa-youtube" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        },
        {
            id: 54,
            title: "IoT Door Lock",
            description: "Smart door lock system with multiple access methods and security features.",
            category: "othersiot",
            images: [
                "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "RFID access",
                "Mobile app control",
                "Access logs",
                "Emergency unlocking"
            ],
            technologies: ["RFID", "ESP32", "Electronic Lock", "Security", "Access Control"],
            links: [
                { name: "Demo Video", url: "#", icon: "fa-youtube" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        },
        {
            id: 55,
            title: "IoT Health Monitor",
            description: "Wearable health monitoring device with multiple biometric sensors.",
            category: "othersiot",
            images: [
                "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "Heart rate monitoring",
                "Body temperature",
                "Activity tracking",
                "Emergency alerts"
            ],
            technologies: ["Biometric Sensors", "ESP32", "Bluetooth", "Health Monitoring", "Wearable"],
            links: [
                { name: "Demo Video", url: "#", icon: "fa-youtube" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        }
    ]
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = iotProjectsData;
}