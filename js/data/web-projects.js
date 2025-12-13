/**
 * Web Projects Data - Complete Version
 * Easy to edit - Add/remove/modify web projects easily
 * Supports: frontend, fullstack, responsive categories
 */

const webProjectsData = {
    // File metadata
    fileId: "web-projects-data-001",
    fileType: "web-projects",
    created: "2024-12-17",
    lastUpdated: "2024-12-17",
    
    // Frontend Projects Category
    frontend: [
        {
            id: "web-frontend-001",
            title: "React E-Commerce Store",
            description: "A modern e-commerce website built with React.js, featuring product filtering, shopping cart, and user authentication.",
            technologies: ["React", "Redux", "CSS3", "Firebase", "Responsive Design"],
            images: ["images/web-projects/ecommerce-react.jpg"],
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
            ],
            features: [
                "Product catalog with advanced filtering",
                "Shopping cart with real-time updates",
                "User authentication with Firebase",
                "Responsive design for all devices",
                "Payment gateway integration"
            ]
        },
        {
            id: "web-frontend-002",
            title: "Weather Dashboard",
            description: "Real-time weather application with location detection, 5-day forecast, and interactive charts.",
            technologies: ["JavaScript", "OpenWeather API", "Bootstrap", "Chart.js", "API"],
            images: ["images/web-projects/weather-dashboard.jpg"],
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
            ],
            features: [
                "Current weather display with icons",
                "5-day detailed forecast",
                "Location-based weather detection",
                "Interactive temperature charts",
                "Save favorite locations"
            ]
        },
        {
            id: "web-frontend-003",
            title: "Task Management App",
            description: "Drag-and-drop task manager with project organization, deadline tracking, and team collaboration.",
            technologies: ["HTML5", "CSS3", "JavaScript", "LocalStorage", "UI/UX"],
            images: ["images/web-projects/task-manager.jpg"],
            links: [
                {
                    name: "Live Demo",
                    url: "https://your-task-manager.netlify.app",
                    icon: "fa-external-link-alt"
                },
                {
                    name: "GitHub",
                    url: "https://github.com/yourusername/task-manager",
                    icon: "fa-github"
                }
            ],
            features: [
                "Drag & drop task organization",
                "Project categorization",
                "Deadline reminders and notifications",
                "Data persistence with LocalStorage",
                "Team collaboration features"
            ]
        },
        {
            id: "web-frontend-004",
            title: "Fitness Tracker Dashboard",
            description: "Interactive fitness tracking dashboard with workout planning and progress visualization.",
            technologies: ["React", "D3.js", "Chart.js", "REST API", "Responsive Design"],
            images: ["images/web-projects/fitness-tracker.jpg"],
            links: [
                {
                    name: "Live Demo",
                    url: "https://fitness-tracker-demo.netlify.app",
                    icon: "fa-external-link-alt"
                },
                {
                    name: "GitHub",
                    url: "https://github.com/yourusername/fitness-tracker",
                    icon: "fa-github"
                }
            ],
            features: [
                "Workout planning and scheduling",
                "Progress tracking with charts",
                "Calorie and nutrition tracking",
                "Goal setting and achievement",
                "Mobile-responsive design"
            ]
        }
        // ADD MORE FRONTEND PROJECTS HERE
    ],
    
    // Fullstack Projects Category
    fullstack: [
        {
            id: "web-fullstack-001",
            title: "Social Media Platform",
            description: "Full-stack social media application with real-time messaging, post sharing, and user interactions.",
            technologies: ["MERN Stack", "Socket.io", "JWT", "AWS S3", "REST API"],
            images: ["images/web-projects/social-media.jpg"],
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
            ],
            features: [
                "User profiles with custom avatars",
                "Real-time chat with Socket.io",
                "Image and video upload to AWS S3",
                "Friend system and notifications",
                "Like, comment, and share posts"
            ]
        },
        {
            id: "web-fullstack-002",
            title: "E-Learning Platform",
            description: "Online learning platform with video courses, quizzes, progress tracking, and payment integration.",
            technologies: ["Laravel", "MySQL", "Vue.js", "Stripe", "API"],
            images: ["images/web-projects/elearning.jpg"],
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
            ],
            features: [
                "Course management system",
                "Video streaming with progress tracking",
                "Payment integration with Stripe",
                "Student progress dashboard",
                "Certificate generation"
            ]
        },
        {
            id: "web-fullstack-003",
            title: "Hospital Management System",
            description: "Complete hospital management system for patient records, appointments, and billing.",
            technologies: ["PHP", "MySQL", "JavaScript", "Bootstrap", "REST API"],
            images: ["images/web-projects/hospital-system.jpg"],
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
            ],
            features: [
                "Patient record management",
                "Appointment scheduling system",
                "Billing and invoice generation",
                "Doctor and staff management",
                "Reports and analytics dashboard"
            ]
        }
        // ADD MORE FULLSTACK PROJECTS HERE
    ],
    
    // Responsive Websites Category
    responsive: [
        {
            id: "web-responsive-001",
            title: "Restaurant Website",
            description: "Responsive restaurant website with online ordering, table reservation, and menu display.",
            technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "Responsive Design"],
            images: ["images/web-projects/restaurant.jpg"],
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
            ],
            features: [
                "Mobile-first responsive design",
                "Online food ordering system",
                "Table reservation with calendar",
                "Interactive menu with images",
                "Contact form with Google Maps"
            ]
        },
        {
            id: "web-responsive-002",
            title: "Portfolio Template",
            description: "Modern portfolio template with dark/light mode, smooth animations, and contact form.",
            technologies: ["HTML5", "CSS3", "JavaScript", "GSAP", "UI/UX"],
            images: ["images/web-projects/portfolio-template.jpg"],
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
            ],
            features: [
                "Dark/light mode toggle",
                "Smooth scroll animations with GSAP",
                "Fully responsive layout",
                "Contact form with validation",
                "Project showcase with filtering"
            ]
        },
        {
            id: "web-responsive-003",
            title: "Travel Agency Website",
            description: "Beautiful travel agency website with booking system, destination showcase, and reviews.",
            technologies: ["Bootstrap", "JavaScript", "PHP", "MySQL", "Responsive Design"],
            images: ["images/web-projects/travel-agency.jpg"],
            links: [
                {
                    name: "Live Demo",
                    url: "https://travel-agency-demo.000webhostapp.com",
                    icon: "fa-external-link-alt"
                },
                {
                    name: "GitHub",
                    url: "https://github.com/yourusername/travel-agency",
                    icon: "fa-github"
                }
            ],
            features: [
                "Destination showcase with filters",
                "Tour booking system",
                "Customer reviews and ratings",
                "Gallery with lightbox",
                "Responsive design for all devices"
            ]
        },
        {
            id: "web-responsive-004",
            title: "Real Estate Website",
            description: "Property listing website with search filters, virtual tours, and agent contact.",
            technologies: ["Tailwind CSS", "JavaScript", "PHP", "MySQL", "API"],
            images: ["images/web-projects/real-estate.jpg"],
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
            ],
            features: [
                "Property search with advanced filters",
                "Image galleries and virtual tours",
                "Mortgage calculator",
                "Agent contact system",
                "Google Maps integration"
            ]
        }
        // ADD MORE RESPONSIVE WEBSITES HERE
    ]
};

// 📝 HOW TO ADD NEW WEB PROJECTS:
// ===============================
// 1. Choose a category: 'frontend', 'fullstack', or 'responsive'
// 2. Create a new project object
// 3. Give it a unique ID (increment the last number)
// 4. Add it to the array

// Example for adding a new frontend project:
/*
const newFrontendProject = {
    id: "web-frontend-005",
    title: "Recipe Finder App",
    description: "Find recipes by ingredients with step-by-step instructions and nutritional info.",
    technologies: ["React", "Recipe API", "CSS3", "LocalStorage", "UI/UX"],
    images: ["images/web-projects/recipe-finder.jpg"],
    links: [
        {
            name: "Live Demo",
            url: "https://recipe-finder-demo.netlify.app",
            icon: "fa-external-link-alt"
        },
        {
            name: "GitHub",
            url: "https://github.com/yourusername/recipe-finder",
            icon: "fa-github"
        }
    ],
    features: [
        "Search recipes by ingredients",
        "Step-by-step cooking instructions",
        "Nutritional information display",
        "Save favorite recipes",
        "Shopping list generator"
    ]
};

// Add to frontend category:
webProjectsData.frontend.push(newFrontendProject);
*/

// Example for adding a new fullstack project:
/*
const newFullstackProject = {
    id: "web-fullstack-004",
    title: "Job Portal",
    description: "Job search platform with employer and job seeker profiles, applications, and notifications.",
    technologies: ["Node.js", "Express", "MongoDB", "React", "REST API"],
    images: ["images/web-projects/job-portal.jpg"],
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
    ],
    features: [
        "Job seeker and employer profiles",
        "Job search with filters",
        "Application tracking system",
        "Email notifications",
        "Admin dashboard"
    ]
};

// Add to fullstack category:
webProjectsData.fullstack.push(newFullstackProject);
*/

// Example for adding a new responsive website:
/*
const newResponsiveProject = {
    id: "web-responsive-005",
    title: "Coffee Shop Website",
    description: "Modern coffee shop website with online ordering, loyalty program, and store locator.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Google Maps API", "Responsive Design"],
    images: ["images/web-projects/coffee-shop.jpg"],
    links: [
        {
            name: "Live Demo",
            url: "https://coffee-shop-demo.netlify.app",
            icon: "fa-external-link-alt"
        },
        {
            name: "GitHub",
            url: "https://github.com/yourusername/coffee-shop",
            icon: "fa-github"
        }
    ],
    features: [
        "Online coffee ordering",
        "Loyalty program integration",
        "Store locator with Google Maps",
        "Menu with customizations",
        "Mobile-responsive design"
    ]
};

// Add to responsive category:
webProjectsData.responsive.push(newResponsiveProject);
*/

// 📌 IMPORTANT NOTES:
// 1. Keep IDs unique across all categories
// 2. Add actual image files to images/web-projects/ folder
// 3. Update demo URLs and GitHub links with your actual projects
// 4. Technologies array matches techClassMap in your web-projects.js manager
// 5. Each project should have at least one image

console.log("🌐 Web projects data loaded successfully!");
console.log(`📊 Total projects: ${webProjectsData.frontend.length + webProjectsData.fullstack.length + webProjectsData.responsive.length}`);
console.log(`📱 Frontend: ${webProjectsData.frontend.length}, Fullstack: ${webProjectsData.fullstack.length}, Responsive: ${webProjectsData.responsive.length}`);