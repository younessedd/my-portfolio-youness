# Portfolio Website - Web Developer & IoT Maker

A modern, responsive portfolio website showcasing web development and IoT projects.

## 📋 Project Structure

## 🚀 Features

### Core Features
- **Responsive Design**: Works on all devices (mobile, tablet, desktop)
- **Dark/Light Theme**: Toggle between themes with localStorage persistence
- **Smooth Animations**: CSS animations and transitions
- **Modern UI**: Clean, professional design with gradients and shadows

### Interactive Components
- **Hero Swiper**: Automatic image slider with navigation
- **Skills Modal**: Interactive modal displaying skills by category
- **Project Galleries**: Swiper-based project showcases
- **Contact Form**: Validated form with EmailJS integration
- **Toast Notifications**: User feedback system

### Project Management
- **Organized Code**: Separate CSS/JS files for each section
- **Modular JavaScript**: Each component has its own manager
- **Data Separation**: Project data in separate files
- **Easy Maintenance**: Clear structure for updates and additions

## 🛠️ Technologies Used

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern CSS with variables, flexbox, grid
- **JavaScript (ES6+)**: Vanilla JS with modular architecture
- **Swiper.js**: Touch slider for hero and projects
- **Font Awesome**: Icon library

### Services
- **EmailJS**: Contact form email service
- **Unsplash**: Placeholder images

## 📧 Email Configuration

### Setup EmailJS
1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template
4. Update `email-config.js` with your credentials:
   ```javascript
   serviceID: 'your_service_id',
   templateID: 'your_template_id',
   publicKey: 'your_public_key'