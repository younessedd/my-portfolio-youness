/**
 * web-projects.js - Web Projects Data
 * Contains all web project data organized by categories
 */

const webProjectsData = {
    // Frontend Projects (5 projects)
    frontend: [
        {
            id: 1,
            title: "Coworker",
            description: "A modern responsive coworking space website project, showcasing design and front-end development skills.",
            category: "frontend",
            images: [
                "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "Responsive layout for desktop and mobile",
                "Interactive sections with animations",
                "Hero, About, Projects, and Contact sections",
                "Clean modern design"
            ],
            technologies: ["HTML5", "CSS3", "JavaScript"],
            links: [
                { name: "Live Demo", url: "https://younessedd.github.io/coworker-youness/", icon: "fa-external-link-alt" },
                { name: "GitHub", url: "https://github.com/younessedd/coworker-youness", icon: "fa-code-branch" }
            ]
        },
        {
            id: 2,
            title: "Restaurant",
            description: "A modern responsive restaurant website project, featuring menu display, reservation form, and interactive UI elements.",
            category: "frontend",
            images: [
                "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "Responsive layout for desktop and mobile",
                "Menu display with categories",
                "Reservation/contact form",
                "Smooth animations and modern design"
            ],
            technologies: ["HTML5", "CSS3", "JavaScript"],
            links: [
                { name: "Live Demo", url: "https://younessedd.github.io/restarent-youness/", icon: "fa-external-link-alt" },
                { name: "GitHub", url: "https://github.com/younessedd/restarent-youness", icon: "fa-code-branch" }
            ]
        },
        {
            id: 3,
            title: "Travel Agency",
            description: "A responsive travel agency website with destination showcases, booking system, and user reviews.",
            category: "frontend",
            images: [
                "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "Responsive design with mobile-first approach",
                "Destination gallery with filters",
                "Booking form with validation",
                "User review system"
            ],
            technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
            links: [
                { name: "Live Demo", url: "#", icon: "fa-external-link-alt" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        },
        {
            id: 4,
            title: "Fitness Tracker",
            description: "A fitness tracking dashboard with workout plans, progress charts, and calorie counter.",
            category: "frontend",
            images: [
                "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "Interactive progress charts",
                "Workout plan customization",
                "Calorie tracking calculator",
                "Responsive dashboard"
            ],
            technologies: ["HTML5", "CSS3", "JavaScript", "Chart.js"],
            links: [
                { name: "Live Demo", url: "#", icon: "fa-external-link-alt" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        },
        {
            id: 5,
            title: "E-commerce Product Page",
            description: "Modern e-commerce product page with image gallery, reviews, and shopping cart functionality.",
            category: "frontend",
            images: [
                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "Product image gallery with zoom",
                "Product reviews and ratings",
                "Add to cart functionality",
                "Responsive product details"
            ],
            technologies: ["HTML5", "CSS3", "JavaScript", "UI/UX"],
            links: [
                { name: "Live Demo", url: "#", icon: "fa-external-link-alt" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        }
    ],
    
    // Fullstack Projects (5 projects)
    fullstack: [
        {
            id: 6,
            title: "Task Management System",
            description: "A full-featured task management application with user authentication, team collaboration, and real-time updates.",
            category: "fullstack",
            images: [
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "User authentication & authorization",
                "Real-time task updates",
                "Team collaboration features",
                "Task categorization and filtering"
            ],
            technologies: ["React.js", "Node.js", "Express", "MongoDB", "REST API"],
            links: [
                { name: "Live Demo", url: "#", icon: "fa-external-link-alt" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        },
        {
            id: 7,
            title: "Blog Platform",
            description: "A blogging platform with rich text editor, user profiles, comments, and likes system.",
            category: "fullstack",
            images: [
                "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "Rich text editor for posts",
                "User profiles and follow system",
                "Comment and like functionality",
                "Admin dashboard"
            ],
            technologies: ["Laravel", "PHP", "MySQL", "JavaScript", "Bootstrap"],
            links: [
                { name: "Live Demo", url: "#", icon: "fa-external-link-alt" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        },
        {
            id: 8,
            title: "Inventory Management",
            description: "Inventory management system for small businesses with stock tracking, reporting, and supplier management.",
            category: "fullstack",
            images: [
                "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "Real-time stock tracking",
                "Sales and purchase reports",
                "Supplier management",
                "Low stock alerts"
            ],
            technologies: ["React.js", "Node.js", "Express", "PostgreSQL", "REST API"],
            links: [
                { name: "Live Demo", url: "#", icon: "fa-external-link-alt" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        },
        {
            id: 9,
            title: "E-learning Platform",
            description: "Online learning platform with course management, video lessons, quizzes, and progress tracking.",
            category: "fullstack",
            images: [
                "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "Course creation and management",
                "Video streaming and playback",
                "Interactive quizzes",
                "Student progress tracking"
            ],
            technologies: ["Laravel", "PHP", "MySQL", "JavaScript", "Video.js"],
            links: [
                { name: "Live Demo", url: "#", icon: "fa-external-link-alt" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        },
        {
            id: 10,
            title: "Real Estate Listing",
            description: "Real estate listing platform with property search, agent profiles, and appointment scheduling.",
            category: "fullstack",
            images: [
                "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "Advanced property search filters",
                "Agent profiles and ratings",
                "Appointment scheduling system",
                "Property comparison tool"
            ],
            technologies: ["React.js", "Node.js", "MongoDB", "Google Maps API", "REST API"],
            links: [
                { name: "Live Demo", url: "#", icon: "fa-external-link-alt" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        }
    ],
    
    // Responsive Projects (5 projects)
    responsive: [
        {
            id: 11,
            title: "Portfolio Template",
            description: "A fully responsive portfolio template with modern design, smooth animations, and mobile optimization.",
            category: "responsive",
            images: [
                "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "Mobile-first responsive design",
                "Smooth scroll animations",
                "Cross-browser compatibility",
                "SEO optimized structure"
            ],
            technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
            links: [
                { name: "Live Demo", url: "#", icon: "fa-external-link-alt" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        },
        {
            id: 12,
            title: "News Magazine",
            description: "Responsive news magazine website with article layouts, category filters, and social sharing.",
            category: "responsive",
            images: [
                "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "Responsive article layouts",
                "Category and tag filtering",
                "Social media integration",
                "Newsletter subscription"
            ],
            technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Responsive"],
            links: [
                { name: "Live Demo", url: "#", icon: "fa-external-link-alt" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        },
        {
            id: 13,
            title: "Event Landing Page",
            description: "Responsive landing page for events with countdown timer, registration form, and speaker profiles.",
            category: "responsive",
            images: [
                "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "Responsive event schedule",
                "Countdown timer",
                "Speaker profile cards",
                "Registration form with validation"
            ],
            technologies: ["HTML5", "CSS3", "JavaScript", "Responsive", "UI/UX"],
            links: [
                { name: "Live Demo", url: "#", icon: "fa-external-link-alt" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        },
        {
            id: 14,
            title: "SaaS Product Page",
            description: "Responsive SaaS product landing page with feature highlights, pricing tables, and testimonials.",
            category: "responsive",
            images: [
                "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "Responsive pricing tables",
                "Feature comparison grid",
                "Customer testimonial slider",
                "Call-to-action optimization"
            ],
            technologies: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS", "Responsive"],
            links: [
                { name: "Live Demo", url: "#", icon: "fa-external-link-alt" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        },
        {
            id: 15,
            title: "Charity Donation Site",
            description: "Responsive charity donation website with campaign progress tracking, donor recognition, and payment integration.",
            category: "responsive",
            images: [
                "https://images.unsplash.com/photo-1551836026-d5c2c2e66a19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            ],
            features: [
                "Responsive donation forms",
                "Campaign progress tracking",
                "Donor wall and recognition",
                "Secure payment integration"
            ],
            technologies: ["HTML5", "CSS3", "JavaScript", "Responsive", "Payment API"],
            links: [
                { name: "Live Demo", url: "#", icon: "fa-external-link-alt" },
                { name: "GitHub", url: "#", icon: "fa-code-branch" }
            ]
        }
    ]
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = webProjectsData;
}