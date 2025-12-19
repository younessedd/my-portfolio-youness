/**
 * IoT Projects Data - Single image per card
 */

window.iotProjectsData = {
    "othersiot": [
        {
            "id": "other-iot-1",
            "title": "Automated Plant Watering System",
            "category": "othersiot",
            "description": "An IoT system that automatically waters plants based on soil moisture levels.",
            "images": [
                "https://placehold.co/600x400/6b7280/ffffff?text=Plant+Watering"
            ],
            "technologies": ["Arduino", "Soil Moisture Sensor", "Node-RED"],
            "features": [
                "Automatic watering schedule",
                "Remote monitoring via dashboard",
                "Low water level alerts"
            ],
            "links": [
                {
                    "name": "GitHub",
                    "url": "#",
                    "icon": "fa-github"
                },
                {
                    "name": "Live Demo",
                    "url": "#",
                    "icon": "fa-external-link-alt"
                }
            ]
        }
    ],
    home: [
        {
            id: "iot-home-001",
            category: "home",
            title: "Smart Home Automation System",
            description: "Complete home automation system with voice control, mobile app integration, and energy monitoring. Control lights, appliances, security, and climate from anywhere.",
            technologies: ["ESP32", "Arduino", "MQTT", "Bluetooth", "WiFi", "Automation"],
            images: [
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop"
            ],
            features: [
                "Voice control with Google Assistant/Alexa",
                "Real-time energy consumption monitoring",
                "Security system with motion detection",
                "Remote access via mobile app",
                "Scene automation (Good Morning, Good Night)",
                "Temperature and humidity control"
            ],
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
            ]
        },
        {
            id: "iot-home-002",
            category: "home",
            title: "Intelligent Lighting System",
            description: "Automated lighting system with motion detection, color control, schedule programming, and energy optimization. Perfect for modern smart homes.",
            technologies: ["Arduino", "ESP8266", "Sensors", "Automation", "WiFi"],
            images: [
                "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&auto=format&fit=crop"
            ],
            features: [
                "Motion-based automatic activation",
                "16 million color options with RGB control",
                "Energy saving mode with usage tracking",
                "Schedule programming for daily routines",
                "Voice control compatible",
                "Group control for multiple lights"
            ],
            links: [
                {
                    name: "GitHub",
                    url: "https://github.com/yourusername/smart-lighting",
                    icon: "fa-github"
                }
            ]
        }
    ],
    
    industrial: [
        {
            id: "iot-industrial-001",
            category: "industrial",
            title: "Factory Monitoring System",
            description: "Real-time monitoring of industrial equipment with predictive maintenance alerts, energy tracking, and production analytics.",
            technologies: ["ESP8266", "PLC", "SCADA", "Sensors", "Industrial IoT"],
            images: [
                "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&auto=format&fit=crop"
            ],
            features: [
                "Real-time equipment monitoring",
                "Predictive maintenance alerts",
                "Energy consumption tracking",
                "Remote control of machinery",
                "Production analytics dashboard",
                "Safety compliance monitoring"
            ],
            links: [
                {
                    name: "GitHub",
                    url: "https://github.com/yourusername/industrial-iot",
                    icon: "fa-github"
                }
            ]
        },
        {
            id: "iot-industrial-002",
            category: "industrial",
            title: "Warehouse Inventory System",
            description: "Automated inventory management using RFID, weight sensors, and real-time tracking for efficient warehouse operations.",
            technologies: ["Arduino", "RFID", "Sensors", "Automation", "IoT"],
            images: [
                "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop"
            ],
            features: [
                "RFID-based item tracking",
                "Weight-based quantity verification",
                "Automatic reorder alerts",
                "Inventory dashboard with analytics",
                "Barcode scanning integration",
                "Real-time stock updates"
            ],
            links: [
                {
                    name: "GitHub",
                    url: "https://github.com/yourusername/warehouse-iot",
                    icon: "fa-github"
                }
            ]
        }
    ],
    
    sensors: [
        {
            id: "iot-sensors-001",
            category: "sensors",
            title: "Weather Station",
            description: "Wireless weather station measuring temperature, humidity, pressure, rainfall, and wind conditions with web dashboard.",
            technologies: ["Arduino", "Sensors", "LoRa", "WiFi", "IoT"],
            images: [
                "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&auto=format&fit=crop"
            ],
            features: [
                "Temperature & humidity monitoring",
                "Barometric pressure measurement",
                "Rainfall detection and measurement",
                "Wind speed and direction tracking",
                "Web dashboard with historical data",
                "Mobile app notifications"
            ],
            links: [
                {
                    name: "GitHub",
                    url: "https://github.com/yourusername/iot-weather-station",
                    icon: "fa-github"
                }
            ]
        },
        {
            id: "iot-sensors-002",
            category: "sensors",
            title: "Soil Monitoring System",
            description: "Agriculture IoT system for monitoring soil conditions, automatic irrigation, and crop health management.",
            technologies: ["ESP32", "Sensors", "Automation", "Agriculture IoT", "Embedded"],
            images: [
                "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&auto=format&fit=crop"
            ],
            features: [
                "Soil moisture monitoring at multiple depths",
                "Automatic irrigation control",
                "Weather forecast integration",
                "Mobile notifications for farmers",
                "Water usage optimization",
                "Crop health monitoring"
            ],
            links: [
                {
                    name: "GitHub",
                    url: "https://github.com/yourusername/smart-agriculture",
                    icon: "fa-github"
                }
            ]
        }
    ]
};

console.log("📡 IoT projects data loaded successfully!");