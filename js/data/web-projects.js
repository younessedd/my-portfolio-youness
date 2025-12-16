/**
 * web-projects-data.js - Web Projects JSON Data
 */

window.webProjectsData = {
    frontend: [
        {
            id: "web-frontend-001",
            category: "frontend",
            title: "React E-Commerce Store",
            description: "A modern e-commerce website built with React.js, featuring product filtering, shopping cart, and user authentication. Built with a focus on performance and user experience.",
            technologies: ["HTML5", "CSS3", "JavaScript", "React.js", "Redux", "Firebase", "API", "Responsive Design"],
            images: [
                "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop"
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
            technologies: ["HTML5", "CSS3", "JavaScript", "Chart.js", "OpenWeather API", "Bootstrap", "Responsive Design"],
            images: [
                "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&auto=format&fit=crop"
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
        },
        {
            id: "web-frontend-003",
            category: "frontend",
            title: "Task Management App",
            description: "Drag-and-drop task manager with project organization, deadline tracking, and team collaboration features.",
            technologies: ["HTML5", "CSS3", "JavaScript", "LocalStorage", "UI/UX Design", "Responsive Design"],
            images: [
                "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&auto=format&fit=crop"
            ],
            features: [
                "Drag & drop task organization",
                "Project categorization system",
                "Deadline reminders and notifications",
                "Data persistence with LocalStorage",
                "Team collaboration features"
            ],
            links: [
                {
                    name: "Live Demo",
                    url: "https://task-manager-demo.netlify.app",
                    icon: "fa-external-link-alt"
                },
                {
                    name: "GitHub",
                    url: "https://github.com/yourusername/task-manager",
                    icon: "fa-github"
                }
            ]
        },
        {
            id: "web-frontend-004",
            category: "frontend",
            title: "Crypto Dashboard",
            description: "Cryptocurrency tracking dashboard with real-time prices, portfolio management, and market analysis tools.",
            technologies: ["HTML5", "CSS3", "JavaScript", "Vue.js", "Vuex", "Chart.js", "API", "Axios"],
            images: [
                "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1620336655055-bd87c5d1d73f?w=800&auto=format&fit=crop"
            ],
            features: [
                "Real-time cryptocurrency prices",
                "Portfolio tracking with profit/loss",
                "Interactive charts and graphs",
                "Market news and updates",
                "Dark mode support"
            ],
            links: [
                {
                    name: "Live Demo",
                    url: "https://crypto-dashboard-demo.netlify.app",
                    icon: "fa-external-link-alt"
                },
                {
                    name: "GitHub",
                    url: "https://github.com/yourusername/crypto-dashboard",
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
            technologies: ["MERN Stack", "React.js", "Node.js", "Express", "MongoDB", "Socket.io", "JWT", "AWS S3"],
            images: [
                "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&auto=format&fit=crop"
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
            technologies: ["PHP", "Laravel", "MySQL", "Vue.js", "Stripe", "API", "AWS"],
            images: [
                "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&auto=format&fit=crop"
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
        },
        {
            id: "web-fullstack-003",
            category: "fullstack",
            title: "Hospital Management System",
            description: "Complete hospital management system for patient records, appointments, billing, and staff management with secure access control.",
            technologies: ["PHP", "MySQL", "JavaScript", "Bootstrap", "REST API", "JWT"],
            images: [
                "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop"
            ],
            features: [
                "Patient record management",
                "Appointment scheduling system",
                "Billing and invoice generation",
                "Doctor and staff management",
                "Reports and analytics dashboard"
            ],
            links: [
                {
                    name: "Live Demo",
                    url: "https://hospital-management-demo.000webhostapp.com",
                    icon: "fa-external-link-alt"
                },
                {
                    name: "GitHub",
                    url: "https://github.com/yourusername/hospital-management",
                    icon: "fa-github"
                }
            ]
        },
        {
            id: "web-fullstack-004",
            category: "fullstack",
            title: "Job Portal Platform",
            description: "Complete job portal with company profiles, job listings, application tracking, and resume builder.",
            technologies: ["Python", "Django", "PostgreSQL", "React", "AWS", "Docker", "REST API"],
            images: [
                "https://images.unsplash.com/photo-1586282391129-76a6df230234?w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop"
            ],
            features: [
                "Job search with advanced filters",
                "Company profile pages",
                "Application tracking system",
                "Resume builder tool",
                "Email notifications"
            ],
            links: [
                {
                    name: "Live Demo",
                    url: "https://job-portal-demo.herokuapp.com",
                    icon: "fa-external-link-alt"
                },
                {
                    name: "GitHub",
                    url: "https://github.com/yourusername/job-portal",
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
            technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "Responsive Design", "Bootstrap", "Google Maps API"],
            images: [
                "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop"
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
            technologies: ["HTML5", "CSS3", "JavaScript", "GSAP", "UI/UX", "Responsive Design", "CSS Grid", "Flexbox"],
            images: [
                "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&auto=format&fit=crop"
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
        },
        {
            id: "web-responsive-003",
            category: "responsive",
            title: "Real Estate Website",
            description: "Property listing website with search filters, virtual tours, agent contact, and mortgage calculator. Optimized for real estate businesses.",
            technologies: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS", "PHP", "MySQL", "Google Maps API"],
            images: [
                "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop"
            ],
            features: [
                "Property search with advanced filters",
                "Image galleries and virtual tours",
                "Mortgage calculator",
                "Agent contact system",
                "Google Maps integration"
            ],
            links: [
                {
                    name: "Live Demo",
                    url: "https://real-estate-demo.netlify.app",
                    icon: "fa-external-link-alt"
                },
                {
                    name: "GitHub",
                    url: "https://github.com/yourusername/real-estate-website",
                    icon: "fa-github"
                }
            ]
        },
        {
            id: "web-responsive-004",
            category: "responsive",
            title: "Travel Agency Website",
            description: "Modern travel booking website with destination guides, booking system, and travel packages. Fully responsive with animations.",
            technologies: ["HTML5", "CSS3", "JavaScript", "Swiper.js", "Responsive Design", "Bootstrap", "jQuery"],
            images: [
                "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&auto=format&fit=crop"
            ],
            features: [
                "Destination gallery with filtering",
                "Booking system with calendar",
                "Travel package comparisons",
                "Customer reviews section",
                "Contact and inquiry forms"
            ],
            links: [
                {
                    name: "Live Demo",
                    url: "https://travel-agency-demo.netlify.app",
                    icon: "fa-external-link-alt"
                },
                {
                    name: "GitHub",
                    url: "https://github.com/yourusername/travel-website",
                    icon: "fa-github"
                }
            ]
        }
    ]
};

console.log("🌐 Web projects data loaded successfully!");