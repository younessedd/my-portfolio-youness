/**
 * Web Projects Data Structure
 *
 * This file contains all web development projects data organized by categories.
 * Each project includes metadata, technologies, features, and links.
 *
 * Categories:
 * - frontend: Frontend-focused projects with HTML, CSS, JavaScript
 * - backend: Backend API services and server-side applications
 * - fullstack: Full-stack applications combining frontend and backend
 * - others: Placeholder projects for future development
 */

// Global object containing all web projects data
window.webProjectsData = {

    // Frontend Category - Projects focused on client-side development
    frontend: [
        {
            // Unique project identifier
            id: "web-frontend-001",
            // Project category for filtering and organization
            category: "frontend",
            // Display title of the project
            title: "Workly Space",
            // Detailed project description
            description: "A modern web application for managing co-working spaces, showcasing services, booking options, and interactive features.",
            // Technologies used in the project
            technologies: ["HTML5", "CSS3", "JavaScript", "GitHub Pages", "Vercel"],
            // Project images array (only first image used for cards)
            images: [
                "images/web/workly.webp"
            ],
            // Key features of the project
            features: [
                "Co-working space showcase",
                "Booking and service features",
                "Interactive dashboards",
                "Responsive design for all devices",
                "Hosted on GitHub Pages",
                "Deployed on Vercel"
            ],
            // Links to live demo and source code
            links: [
                {
                    name: "GitHub",
                    url: "https://github.com/younessedd/kow_worker_Simplon.git",
                    icon: "fa-brands fa-github"
                },
                {
                    name: "Live Demo",
                    url: "https://kow-worker-simplon-main.vercel.app/",
                    icon: "fa-external-link-alt"
                }
            ]
        },
        {
            // Second frontend project
            id: "web-frontend-002",
            category: "frontend",
            title: "Weather App",
            description: "A modern web application displaying weather data using API integration with interactive UI and responsive design.",
            technologies: ["HTML5", "CSS3", "JavaScript", "API Integration", "GitHub Pages", "Vercel"],
            images: [
                "images/web/weather.webp"
            ],
            features: [
                "Real-time weather information",
                "Responsive design",
                "Multiple location support",
                "Interactive UI elements",
                "Hosted on GitHub Pages",
                "Deployed on Vercel"
            ],
            links: [
                {
                    name: "GitHub",
                    url: "https://github.com/younessedd/Weather-api_Simplon.git",
                    icon: "fa-brands fa-github"
                },
                {
                    name: "Live Demo",
                    url: "https://weather-api-simplon-main.vercel.app/",
                    icon: "fa-external-link-alt"
                }
            ]
        },
        {
            // Third frontend project
            id: "web-frontend-004",
            category: "frontend",
            title: "Movies Scope",
            description: "A movie discovery application with search functionality, movie details, and filtering options.",
            technologies: ["HTML5", "CSS3", "JavaScript", "API Integration", "Vercel"],
            images: [
                "images/web/movis-scoop.webp"
            ],
            features: [
                "Movie search and discovery",
                "Detailed movie information",
                "Filtering and sorting options",
                "Responsive design",
                "API integration for real-time data",
                "Deployed on Vercel"
            ],
            links: [
                {
                    name: "GitHub",
                    url: "https://github.com/younessedd/movies-scope-simplon.git",
                    icon: "fa-brands fa-github"
                },
                {
                    name: "Live Demo",
                    url: "https://movies-scope-simplon-main.vercel.app/",
                    icon: "fa-external-link-alt"
                }
            ]
        },
        {
            // Fourth frontend project
            id: "web-frontend-004",
            category: "frontend",
            title: "PowerGrid Solutions",
            description: "A professional web application for PowerGrid Solutions company, showcasing services, solutions, and projects.",
            technologies: ["HTML5", "CSS3", "JavaScript", "GitHub Pages"],
            images: [
                "images/web/powergride.webp"
            ],
            features: [
                "Company services and solutions",
                "Project showcase",
                "Interactive design elements",
                "Responsive layout",
                "Hosted on GitHub Pages"
            ],
            links: [
                {
                    name: "GitHub",
                    url: "https://github.com/younessedd/PowerGrid-Solutions_Company.git",
                    icon: "fa-brands fa-github"
                },
                {
                    name: "Live Demo",
                    url: "https://younessedd.github.io/PowerGrid-Solutions_Company/",
                    icon: "fa-external-link-alt"
                }
            ]
        },
        {
            // Fifth frontend project
            id: "web-frontend-005",
            category: "frontend",
            title: "CoWork Hub",
            description: "A website for CoWork Hub company displaying services, workspace options, and interactive booking features.",
            technologies: ["HTML5", "CSS3", "JavaScript", "GitHub Pages"],
            images: [
                "images/web/CoWork-Hub.webp"
            ],
            features: [
                "Workspace showcase",
                "Booking and services",
                "Interactive UI elements",
                "Responsive design",
                "Hosted on GitHub Pages"
            ],
            links: [
                {
                    name: "GitHub",
                    url: "https://github.com/younessedd/CoWork-Hub_company.git",
                    icon: "fa-brands fa-github"
                },
                {
                    name: "Live Demo",
                    url: "https://younessedd.github.io/CoWork-Hub_company/",
                    icon: "fa-external-link-alt"
                }
            ]
        },
        {
            // Sixth frontend project
            id: "web-frontend-006",
            category: "frontend",
            title: "Bella Vista",
            description: "A modern web application for Bella Vista Food company showcasing menus, services, and interactive features.",
            technologies: ["HTML5", "CSS3", "JavaScript", "GitHub Pages"],
            images: [
                "images/web/Bella-Vista.webp"
            ],
            features: [
                "Food company showcase",
                "Menu and services display",
                "Interactive elements",
                "Responsive design",
                "Hosted on GitHub Pages"
            ],
            links: [
                {
                    name: "GitHub",
                    url: "https://github.com/younessedd/Bella-Vista-Food_company.git",
                    icon: "fa-brands fa-github"
                },
                {
                    name: "Live Demo",
                    url: "https://younessedd.github.io/Bella-Vista-Food_company/",
                    icon: "fa-external-link-alt"
                }
            ]
        },
        {
            // Seventh frontend project
            id: "web-frontend-007",
            category: "frontend",
            title: "GourmetDelight",
            description: "A modern web application for a gourmet food company, showcasing menus, services, and interactive customer features with responsive design.",
            technologies: ["HTML5", "CSS3", "JavaScript", "GitHub Pages"],
            images: [
                "images/web/GourmetDelight.webp"
            ],
            features: [
                "Gourmet food company showcase",
                "Menu display and ordering interface",
                "Interactive dashboards",
                "Responsive design for all devices",
                "Hosted on GitHub Pages"
            ],
            links: [
                {
                    name: "GitHub",
                    url: "https://github.com/younessedd/GourmetDelight-Food_company.git",
                    icon: "fa-brands fa-github"
                },
                {
                    name: "Live Demo",
                    url: "https://younessedd.github.io/GourmetDelight-Food_company/",
                    icon: "fa-external-link-alt"
                }
            ]
        },
        {
            // Eighth frontend project
            id: "web-frontend-008",
            category: "frontend",
            title: "Foodie Foodie",
            description: "A modern food discovery web application showcasing recipes, restaurants, and culinary experiences with interactive features using TheMealDB API.",
            technologies: ["React.js", "CSS3", "API Integration", "Vercel", "JavaScript ES6+"],
            images: [
                "images/web/foody.webp"
            ],
            features: [
                "Food and recipe discovery via TheMealDB API",
                "Restaurant and cuisine showcase",
                "Interactive food browsing with search functionality",
                "Recipe details and instructions",
                "Responsive design for all devices",
                "Real-time data fetching from external APIs",
                "Deployed on Vercel for live demo"
            ],
            links: [
                {
                    name: "GitHub",
                    url: "https://github.com/younessedd/Foodie_Simplon.git",
                    icon: "fa-brands fa-github"
                },
                {
                    name: "Live Demo",
                    url: "https://foodie-simplon-main.vercel.app/",
                    icon: "fa-external-link-alt"
                }
            ]
        },
        {
            // Ninth frontend project
            id: "web-frontend-009",
            category: "frontend",
            title: "Blog API Frontend",
            description: "A React-based frontend application for a blog system that connects to a backend API to display, create, and manage blog content.",
            technologies: ["React.js", "CSS3", "JavaScript", "API Integration"],
            images: [
                "images/web/bloger.webp"
            ],
            features: [
                "Blog post display and management",
                "API integration for CRUD operations",
                "Responsive blog interface",
                "User-friendly content creation",
                "Modern React components"
            ],
            links: [
                {
                    name: "GitHub",
                    url: "https://github.com/younessedd/Blog-Api_Simplon.git",
                    icon: "fa-brands fa-github"
                }
            ]
        }
    ],

    // Backend Category - Server-side applications and API services
    backend: [
        {
            // First backend project
            id: "web-backend-001",
            category: "backend",
            title: "Job API",
            description: "A backend API service for job listings and employment opportunities with data management capabilities.",
            technologies: ["Node.js", "Express.js", "MongoDB", "REST API"],
            images: [
                "images/web/swagger.webp"
            ],
            features: [
                "Job listing management",
                "RESTful API endpoints",
                "Data persistence",
                "CRUD operations",
                "Backend service architecture"
            ],
            links: [
                {
                    name: "GitHub",
                    url: "https://github.com/younessedd/Job-Api_Simplon.git",
                    icon: "fa-brands fa-github"
                }
            ]
        },
        {
            // Second backend project
            id: "web-backend-002",
            category: "backend",
            title: "Music Box API",
            description: "A backend API service for managing music data, including tracks, artists, playlists, and music metadata.",
            technologies: ["Node.js", "Express.js", "Database", "REST API", "Music Data Management"],
            images: [
                "images/web/swager1.webp"
            ],
            features: [
                "Music track management",
                "Artist and album data",
                "Playlist creation and organization",
                "RESTful API endpoints",
                "Music metadata handling"
            ],
            links: [
                {
                    name: "GitHub",
                    url: "https://github.com/younessedd/Music-Box-Api_Simplon.git",
                    icon: "fa-brands fa-github"
                }
            ]
        }
    ],

    // Full Stack Category - Complete applications with both frontend and backend
    fullstack: [
        {
            // First full-stack project
            id: "web-fullstack-001",
            category: "fullstack",
            title: "Eventify",
            description: "A full-stack event management application for creating, organizing, and managing events with interactive features.",
            technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "REST API", "Authentication"],
            images: [
                "images/web/eventy.webp"
            ],
            features: [
                "Event creation and management",
                "User authentication and authorization",
                "Real-time updates",
                "Responsive frontend interface",
                "Database persistence"
            ],
            links: [
                {
                    name: "GitHub",
                    url: "https://github.com/younessedd/Eventify_Simplon.git",
                    icon: "fa-brands fa-github"
                }
            ]
        },
        {
            // Second full-stack project
            id: "web-fullstack-002",
            category: "fullstack",
            title: "Task Flow Project",
            description: "A full-stack task management and workflow application for organizing, tracking, and optimizing task completion processes.",
            technologies: ["React.js", "Node.js", "Express.js", "Database", "Task Management", "Workflow Engine"],
            images: [
                "images/web/task-flow.webp"
            ],
            features: [
                "Task organization and categorization",
                "Workflow automation",
                "Progress tracking and analytics",
                "User collaboration features",
                "Responsive task management interface"
            ],
            links: [
                {
                    name: "GitHub",
                    url: "https://github.com/younessedd/Task-Flow-Project_Simplon.git",
                    icon: "fa-brands fa-github"
                }
            ]
        },
        {
            // Third full-stack project
            id: "web-fullstack-003",
            category: "fullstack",
            title: "E-Commerce",
            description: "A comprehensive full-stack e-commerce platform with product management, shopping cart, user authentication, and payment processing.",
            technologies: ["React.js", "Node.js", "Express.js", "Database", "Payment Integration", "Authentication"],
            images: [
                "images/web/e-comerce.webp"
            ],
            features: [
                "Product catalog and management",
                "Shopping cart functionality",
                "User authentication and accounts",
                "Payment processing integration",
                "Order management system"
            ],
            links: [
                {
                    name: "GitHub",
                    url: "https://github.com/younessedd/E-Commecres-Fil-Rouge_Simplon.git",
                    icon: "fa-brands fa-github"
                }
            ]
        },
        {
            // Fourth full-stack project
            id: "web-fullstack-004",
            category: "fullstack",
            title: "User Manager",
            description: "A full-stack user management system with authentication, user profiles, and administrative controls.",
            technologies: ["React.js", "Node.js", "CSS3", "API Integration", "Express.js", "Authentication"],
            images: [
                "images/web/user-manger.webp"
            ],
            features: [
                "User authentication and registration",
                "Profile management and editing",
                "Administrative user controls",
                "API-based user data management",
                "Responsive admin interface"
            ],
            links: [
                {
                    name: "GitHub",
                    url: "https://github.com/younessedd/User-Manager_Simplon.git",
                    icon: "fa-brands fa-github"
                }
            ]
        }
    ],

    // Others Category - Placeholder projects for future development
    others: [
        {
            // First placeholder project
            id: "web-others-001",
            category: "others",
            title: "E-Learning Platform",
            description: "A comprehensive online learning management system with video streaming, quizzes, and progress tracking.",
            technologies: ["React", "Node.js", "MongoDB", "AWS", "Socket.io"],
            images: [
                "images/web/elearning.webp"
            ],
            features: [
                "Video streaming with adaptive quality",
                "Interactive quizzes and assessments",
                "Progress tracking and certificates",
                "Real-time chat with instructors",
                "Discussion forums"
            ],
            links: [
                {
                    name: "GitHub",
                    url: "#",
                    icon: "fa-brands fa-github"
                },
                {
                    name: "Live Demo",
                    url: "#",
                    icon: "fa-external-link-alt"
                }
            ]
        },
        {
            // Second placeholder project
            id: "web-others-002",
            category: "others",
            title: "Healthcare Dashboard",
            description: "A medical dashboard for patient management, appointment scheduling, and health analytics.",
            technologies: ["Vue.js", "Python", "PostgreSQL", "Docker", "TensorFlow"],
            images: [
                "images/web/healthcare.webp"
            ],
            features: [
                "Patient records management",
                "Appointment scheduling system",
                "Health analytics and reports",
                "Doctor availability calendar",
                "Prescription management"
            ],
            links: [
                {
                    name: "GitHub",
                    url: "#",
                    icon: "fa-brands fa-github"
                },
                {
                    name: "Live Demo",
                    url: "#",
                    icon: "fa-external-link-alt"
                }
            ]
        },
        {
            // Third placeholder project
            id: "web-others-003",
            category: "others",
            title: "Real Estate Marketplace",
            description: "A property listing platform with virtual tours, advanced search, and agent management.",
            technologies: ["Angular", "Spring Boot", "MySQL", "Three.js", "Google Maps API"],
            images: [
                "images/web/realestate.webp"
            ],
            features: [
                "Virtual property tours",
                "Advanced property search filters",
                "Agent profiles and ratings",
                "Mortgage calculator",
                "Favorites and notifications"
            ],
            links: [
                {
                    name: "GitHub",
                    url: "#",
                    icon: "fa-brands fa-github"
                },
                {
                    name: "Live Demo",
                    url: "#",
                    icon: "fa-external-link-alt"
                }
            ]
        }
    ]
};

// Console log to confirm data loading
console.log("🌐 Web projects data loaded successfully!");