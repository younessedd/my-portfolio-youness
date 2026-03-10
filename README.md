# Youness Eddanguir - Portfolio

A modern, responsive developer portfolio showcasing web development, mobile apps, IoT projects, and technical skills.

## 🚀 Features

- **Modern Design**: Glassmorphism effects with smooth animations
- **Fully Responsive**: Mobile-first design with optimized breakpoints
- **Interactive Popups**: Swiper-based project galleries
- **Smooth Scrolling**: Advanced scroll management system
- **Performance Optimized**: Image preloading and lazy loading
- **SEO Friendly**: Semantic HTML5 and meta tags
- **Accessibility**: ARIA labels and keyboard navigation

## 🛠️ Technologies

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Animations**: CSS3 Transitions, Swiper.js
- **Performance**: Image optimization, lazy loading
- **Deployment**: Vercel static hosting

## 📁 Project Structure

```
my-portfolio-youness-new/
├── index.html              # Main HTML file
├── css/                    # Stylesheets
│   ├── style.css          # Main styles
│   ├── header.css         # Header/navigation
│   ├── hero.css           # Hero section
│   ├── about.css          # About section
│   ├── skills.css         # Skills section
│   ├── web-apps.css       # Web projects
│   ├── mobile-apps.css    # Mobile projects
│   ├── iot-projects.css   # IoT projects
│   ├── cv.css             # CV section
│   ├── contact.css        # Contact form
│   ├── footer.css         # Footer
│   ├── responsive.css     # Media queries
│   └── *.css              # Popup and animation styles
├── js/                     # JavaScript files
│   ├── main.js            # Main application logic
│   ├── scroll-manager.js  # Scroll management
│   ├── *-projects.js      # Project managers
│   ├── *-modal.js         # Modal handlers
│   └── *.js               # Utility scripts
├── images/                 # Images and assets
│   ├── hero/              # Hero section images
│   ├── web/               # Web project images
│   ├── mob/               # Mobile project images
│   └── iot/               # IoT project images
└── data/                  # Project data
    └── *.js               # JSON data files
```

## 🎨 Design System

### Colors
- **Primary**: #0f172a (Dark Navy)
- **Secondary**: #1e293b
- **Accent Blue**: #38bdf8
- **IoT Green**: #22c55e
- **Text**: #f1f5f9
- **Muted Text**: #94a3b8

### Typography
- **Font Family**: Segoe UI (system font stack)
- **Headings**: Bold weights with proper hierarchy
- **Body**: Regular weight for readability

### Breakpoints
- **Mobile**: 320px - 768px
- **Tablet**: 769px - 1024px
- **Desktop**: 1025px - 1440px
- **Large Desktop**: 1441px+

## 🚀 Deployment

### Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

### Automatic Deployment

The site is configured for automatic deployment to Vercel when you push to your GitHub repository.

## 🔧 Development

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/younessedd/portfolio.git
   cd portfolio
   ```

2. **Start local server**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

### Project Management

- **Web Projects**: Managed by `WebProjectsManager` in `js/web-projects.js`
- **Mobile Projects**: Managed by `MobileProjectsManager` in `js/mobile-projects.js`
- **IoT Projects**: Managed by `IoTProjectsManager` in `js/iot-projects.js`
- **Skills**: Managed by `SkillsManager` in `js/skills-modal.js`

### Adding New Projects

1. **Update data files** in `js/data/` directory
2. **Add images** to appropriate `images/` subfolder
3. **Update project categories** in respective manager files

## 📱 Features

### Interactive Elements
- **Hero Swiper**: Auto-rotating hero section
- **Project Popups**: Detailed project galleries
- **Skills Modal**: Categorized skill display
- **Contact Form**: Functional contact with EmailJS
- **CV Download**: Trackable CV downloads

### Performance
- **Image Preloading**: Critical images preloaded
- **Lazy Loading**: Non-critical images loaded on demand
- **Optimized Animations**: Hardware-accelerated CSS
- **Minified Assets**: Production-ready optimization

### Accessibility
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: ARIA labels and semantic HTML
- **High Contrast**: Support for high contrast mode
- **Reduced Motion**: Respect user preferences

## 🔍 SEO Optimization

- **Meta Tags**: Comprehensive meta information
- **Open Graph**: Social media sharing optimization
- **Structured Data**: JSON-LD for search engines
- **Semantic HTML**: Proper heading hierarchy
- **Image Alt Text**: Descriptive alt attributes

## 🛡️ Security

- **Content Security Policy**: Prevent XSS attacks
- **HTTPS Only**: Secure connection required
- **Input Validation**: Form input sanitization
- **Secure Headers**: Security-focused HTTP headers

## 📊 Analytics

The site includes:
- **Performance Monitoring**: Core Web Vitals tracking
- **User Analytics**: Page view and interaction tracking
- **Error Tracking**: JavaScript error monitoring

## 🔄 Updates

### Regular Updates
- **Content**: Project descriptions and images
- **Skills**: Add new technologies and tools
- **Blog**: Latest articles and tutorials

### Maintenance
- **Dependencies**: Update third-party libraries
- **Performance**: Optimize loading times
- **Security**: Apply security patches

## 📞 Contact

- **Email**: eddanguiryouness@gmail.com
- **Phone**: +212 6 6483 7281
- **LinkedIn**: [Youness Eddanguir](https://www.linkedin.com/in/youness-eddanguir-723166398/)
- **WhatsApp**: [Chat on WhatsApp](https://wa.me/212664837281)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Font Awesome**: Icon library
- **Swiper.js**: Carousel/slider library
- **EmailJS**: Email service integration
- **Google Fonts**: Typography (if used)

---

**Built with ❤️ by Youness Eddanguir**
