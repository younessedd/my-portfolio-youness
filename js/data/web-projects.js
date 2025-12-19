/**
 * web-projects-data.js - Web Projects JSON Data
 * UPDATED: Single image per card
 */

window.webProjectsData = {
    "othersweb": [
        {
            "id": "other-web-1",
            "title": "Community Forum",
            "category": "othersweb",
            "description": "A full-featured community forum for discussions and knowledge sharing.",
            "images": [
                "https://placehold.co/600x400/374151/ffffff?text=Forum+View"
            ],
            "technologies": ["PHP", "MySQL", "Vanilla JS"],
            "features": [
                "User authentication and profiles",
                "Threaded discussions",
                "Admin moderation tools"
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
    frontend: [
        {
            id: "web-frontend-001",
            category: "frontend",
            title: "React E-Commerce Store",
            description: "A modern e-commerce website built with React.js, featuring product filtering, shopping cart, and user authentication. Built with a focus on performance and user experience.",
            technologies: ["HTML5", "CSS3", "JavaScript", "React.js", "Redux", "Firebase"],
            images: [
                "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop"
            ],
            features: [
                "Product catalog with advanced filtering and search",
                "Shopping cart with real-time updates",
                "User authentication with Firebase",
                "Responsive design for all devices",
                "Payment gateway integration",
                "Order tracking system"
            ],
            links: [
                {
                    name: "Live Demo",
                    url: "https://demo-react-ecommerce.netlify.app",
                    icon: "fa-external-link-alt"
                },
                {
                    name: "GitHub",
                    url: "https://github.com/yourusername/react-ecommerce",
                    icon: "fa-github"
                }
            ]
        },
        {
            id: "web-frontend-002",
            category: "frontend",
            title: "Weather Dashboard",
            description: "Real-time weather application with location detection, 5-day forecast, and interactive charts. Uses multiple weather APIs for accurate data.",
            technologies: ["HTML5", "CSS3", "JavaScript", "Chart.js", "OpenWeather API", "Bootstrap"],
            images: [
                "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&auto=format&fit=crop"
            ],
            features: [
                "Current weather display with dynamic icons",
                "5-day detailed forecast with charts",
                "Location-based weather detection",
                "Save favorite locations",
                "Dark/Light mode toggle"
            ],
            links: [
                {
                    name: "Live Demo",
                    url: "https://your-weather-app.netlify.app",
                    icon: "fa-external-link-alt"
                },
                {
                    name: "GitHub",
                    url: "https://github.com/yourusername/weather-dashboard",
                    icon: "fa-github"
                }
            ]
        }
    ],
    
    fullstack: [
        {
            id: "web-fullstack-001",
            category: "fullstack",
            title: "Social Media Platform",
            description: "Full-stack social media application with real-time messaging, post sharing, and user interactions. Built with MERN stack and real-time features.",
            technologies: ["MERN Stack", "React.js", "Node.js", "Express", "MongoDB", "Socket.io"],
            images: [
                "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&auto=format&fit=crop"
            ],
            features: [
                "User profiles with custom avatars",
                "Real-time chat with Socket.io",
                "Image and video upload to AWS S3",
                "Friend system and notifications",
                "Like, comment, and share posts"
            ],
            links: [
                {
                    name: "Live Demo",
                    url: "https://social-app-demo.herokuapp.com",
                    icon: "fa-external-link-alt"
                },
                {
                    name: "GitHub",
                    url: "https://github.com/yourusername/social-media-app",
                    icon: "fa-github"
                }
            ]
        },
        {
            id: "web-fullstack-002",
            category: "fullstack",
            title: "E-Learning Platform",
            description: "Online learning platform with video courses, quizzes, progress tracking, and payment integration for premium content.",
            technologies: ["PHP", "Laravel", "MySQL", "Vue.js", "Stripe", "AWS"],
            images: [
                "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop"
            ],
            features: [
                "Course management system",
                "Video streaming with progress tracking",
                "Payment integration with Stripe",
                "Student progress dashboard",
                "Certificate generation"
            ],
            links: [
                {
                    name: "Live Demo",
                    url: "https://learn-with-us.com",
                    icon: "fa-external-link-alt"
                },
                {
                    name: "GitHub",
                    url: "https://github.com/yourusername/e-learning-platform",
                    icon: "fa-github"
                }
            ]
        }
    ],
    
    responsive: [
        {
            id: "web-responsive-001",
            category: "responsive",
            title: "Restaurant Website",
            description: "Responsive restaurant website with online ordering, table reservation, and menu display. Mobile-first design approach.",
            technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "Bootstrap", "Google Maps API"],
            images: [
                "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop"
            ],
            features: [
                "Mobile-first responsive design",
                "Online food ordering system",
                "Table reservation with calendar",
                "Interactive menu with images",
                "Contact form with Google Maps"
            ],
            links: [
                {
                    name: "Live Demo",
                    url: "https://restaurant-demo.netlify.app",
                    icon: "fa-external-link-alt"
                },
                {
                    name: "GitHub",
                    url: "https://github.com/yourusername/restaurant-website",
                    icon: "fa-github"
                }
            ]
        },
        {
            id: "web-responsive-002",
            category: "responsive",
            title: "Portfolio Template",
            description: "Modern portfolio template with dark/light mode, smooth animations, and contact form. Fully responsive with modern design patterns.",
            technologies: ["HTML5", "CSS3", "JavaScript", "GSAP", "UI/UX", "CSS Grid", "Flexbox"],
            images: [
                "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop"
            ],
            features: [
                "Dark/light mode toggle",
                "Smooth scroll animations with GSAP",
                "Fully responsive layout",
                "Contact form with validation",
                "Project showcase with filtering"
            ],
            links: [
                {
                    name: "Live Demo",
                    url: "https://portfolio-template-demo.netlify.app",
                    icon: "fa-external-link-alt"
                },
                {
                    name: "GitHub",
                    url: "https://github.com/yourusername/portfolio-template",
                    icon: "fa-github"
                }
            ]
        }
    ]
};

console.log("🌐 Web projects data loaded successfully!");