/**
 * Web Projects Data Structure
 *
 * All projects organized by application type.
 * Each project contains metadata used to render cards in the portfolio.
 *
 * Categories:
 * business_apps
 * food_apps
 * entertainment_apps
 * tools_apps
 * blog_apps
 * ecommerce_apps
 * productivity_apps
 * api_services
 */

window.webProjectsData = {

  /* ===============================
     BUSINESS WEBSITES
  =============================== */

  business_apps: [

    {
      id: "web-business-001",
      category: "business_apps",
      type: "frontend",

      title: "Workly Space",

      description:
        "Modern coworking space platform presenting services, booking options and workspace information.",

      technologies: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "Bootstrap",
        "Tailwind",
        "EmailJS",
        "Google Maps API",
        "Vercel"
      ],

      images: ["images/web/workly.webp"],

      features: [
        "Workspace presentation",
        "Booking features",
        "Interactive UI",
        "Google Maps integration",
        "Responsive layout"
      ],

      links: [
        {
          name: "GitHub",
          url: "https://github.com/younessedd/kow_worker_Simplon.git",
          icon: "fa-brands fa-github"
        },
        {
          name: "Live Demo",
          url: "https://kow-worker-simplon-main.vercel.app/",
          icon: "fa-solid fa-play-circle"
        }
      ]
    },

    {
      id: "web-business-002",
      category: "business_apps",
      type: "frontend",

      title: "PowerGrid Solutions",

      description:
        "Corporate website presenting electrical services, company projects and solutions.",

      technologies: ["HTML5", "CSS3", "JavaScript"],

      images: ["images/web/powergride.webp"],

      features: [
        "Company services",
        "Project showcase",
        "Contact section",
        "Responsive design"
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
          icon: "fa-solid fa-play-circle"
        }
      ]
    },

    {
      id: "web-business-003",
      category: "business_apps",
      type: "frontend",

      title: "CoWork Hub",

      description:
        "Coworking company website with workspace presentation and service details.",

      technologies: ["HTML5", "CSS3", "JavaScript"],

      images: ["images/web/CoWork-Hub.webp"],

      features: [
        "Workspace showcase",
        "Service information",
        "Interactive sections",
        "Responsive design"
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
          icon: "fa-solid fa-play-circle"
        }
      ]
    }
  ],

  /* ===============================
     FOOD & RESTAURANT APPS
  =============================== */

  food_apps: [

    {
      id: "web-food-001",
      category: "food_apps",
      type: "frontend",

      title: "Bella Vista",

      description:
        "Restaurant website presenting menu, dining experience and services.",

      technologies: ["HTML5", "CSS3", "JavaScript"],

      images: ["images/web/Bella-Vista.webp"],

      features: [
        "Restaurant menu",
        "Gallery section",
        "Customer experience",
        "Responsive layout"
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
          icon: "fa-solid fa-play-circle"
        }
      ]
    },

    {
      id: "web-food-002",
      category: "food_apps",
      type: "frontend",

      title: "GourmetDelight",

      description:
        "Modern food company website showcasing menu and restaurant services.",

      technologies: ["HTML5", "CSS3", "JavaScript"],

      images: ["images/web/GourmetDelight.webp"],

      links: [
        {
          name: "GitHub",
          url: "https://github.com/younessedd/GourmetDelight-Food_company.git",
          icon: "fa-brands fa-github"
        },
        {
          name: "Live Demo",
          url: "https://younessedd.github.io/GourmetDelight-Food_company/",
          icon: "fa-solid fa-play-circle"
        }
      ]
    },

    {
      id: "web-food-003",
      category: "food_apps",
      type: "frontend",

      title: "Foodie Foodie",

      description:
        "Food discovery platform using TheMealDB API for exploring recipes and cuisines.",

      technologies: ["React", "JavaScript", "API Integration"],

      images: ["images/web/foody.webp"],

      links: [
        {
          name: "GitHub",
          url: "https://github.com/younessedd/Foodie_Simplon.git",
          icon: "fa-brands fa-github"
        },
        {
          name: "Live Demo",
          url: "https://foodie-simplon-main.vercel.app/",
          icon: "fa-solid fa-play-circle"
        }
      ]
    }
  ],

  /* ===============================
     ENTERTAINMENT APPS
  =============================== */

  entertainment_apps: [

    {
      id: "web-entertainment-001",
      category: "entertainment_apps",
      type: "frontend",

      title: "Space Radio",

      description:
        "Global radio streaming app integrating weather data and interactive world map.",

      technologies: [
        "HTML",
        "CSS",
        "JavaScript",
        "Leaflet",
        "OpenWeather API"
      ],

      images: ["images/web/space-radio.webp"],

      links: [
        {
          name: "GitHub",
          url: "https://github.com/younessedd/Space-Radio-world.git",
          icon: "fa-brands fa-github"
        },
        {
          name: "Live Demo",
          url: "https://space-radio-plum.vercel.app/",
          icon: "fa-solid fa-play-circle"
        }
      ]
    },

    {
      id: "web-entertainment-002",
      category: "entertainment_apps",
      type: "frontend",

      title: "Movies Scope",

      description:
        "Movie discovery application with search functionality and movie information.",

      technologies: ["HTML", "CSS", "JavaScript", "API"],

      images: ["images/web/movis-scoop.webp"],

      links: [
        {
          name: "GitHub",
          url: "https://github.com/younessedd/movies-scope-simplon.git",
          icon: "fa-brands fa-github"
        },
        {
          name: "Live Demo",
          url: "https://movies-scope-simplon-main.vercel.app/",
          icon: "fa-solid fa-play-circle"
        }
      ]
    }
  ],

  /* ===============================
     TOOLS
  =============================== */

  tools_apps: [

    {
      id: "web-tools-001",
      category: "tools_apps",
      type: "frontend",

      title: "Weather App",

      description:
        "Weather application displaying real-time conditions using external API.",

      technologies: ["HTML", "CSS", "JavaScript", "Weather API"],

      images: ["images/web/weather.webp"],

      links: [
        {
          name: "GitHub",
          url: "https://github.com/younessedd/Weather-api_Simplon.git",
          icon: "fa-brands fa-github"
        },
        {
          name: "Live Demo",
          url: "https://weather-api-simplon-main.vercel.app/",
          icon: "fa-solid fa-play-circle"
        }
      ]
    }
  ],

  /* ===============================
     BLOG
  =============================== */

  blog_apps: [

    {
      id: "web-blog-001",
      category: "blog_apps",
      type: "frontend",

      title: "Blog API Frontend",

      description:
        "React frontend connected to backend API for blog content management.",

      technologies: ["React", "JavaScript", "API"],

      images: ["images/web/bloger.webp"],

      links: [
        {
          name: "GitHub",
          url: "https://github.com/younessedd/Blog-Api_Simplon.git",
          icon: "fa-brands fa-github"
        }
      ]
    }
  ],

  /* ===============================
     API SERVICES
  =============================== */

  api_services: [

    {
      id: "web-api-001",
      category: "api_services",
      type: "backend",

      title: "Job API",

      description:
        "Backend API for managing job listings and employment data.",

      technologies: ["Node.js", "Express", "MongoDB", "REST API"],

      images: ["images/web/swagger.webp"],

      links: [
        {
          name: "GitHub",
          url: "https://github.com/younessedd/Job-Api_Simplon.git",
          icon: "fa-brands fa-github"
        }
      ]
    },

    {
      id: "web-api-002",
      category: "api_services",
      type: "backend",

      title: "Music Box API",

      description:
        "Backend API for managing music tracks and playlists.",

      technologies: ["Node.js", "Express", "REST API"],

      images: ["images/web/swager1.webp"],

      links: [
        {
          name: "GitHub",
          url: "https://github.com/younessedd/Music-Box-Api_Simplon.git",
          icon: "fa-brands fa-github"
        }
      ]
    }
  ]

};

console.log("🌐 Web projects data loaded successfully!");