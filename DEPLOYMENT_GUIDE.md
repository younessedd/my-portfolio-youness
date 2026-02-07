# Deployment Guide for Youness Eddanguir Portfolio

## Manual Deployment to Vercel

Your updated portfolio is ready for deployment to https://younesseddanguir.vercel.app/

### Files Ready for Deployment:
✅ **index.html** - Main portfolio file with all updates  
✅ **css/** folder - All styling files including CV section updates  
✅ **js/** folder - JavaScript files with CV card click fixes  
✅ **images/** folder - All portfolio images  
✅ **doc/cv/** folder - CV PDF files (WEB EN CV.pdf, WEB FR CV.pdf, etc.)  
✅ **netlify.toml** - Deployment configuration  
✅ **.gitignore** - Git ignore file for clean deployment  

### Deployment Options:

#### Option 1: Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to project directory
cd c:\Users\dell\Desktop\my-portfolio-youness-main-git

# Deploy to existing project
vercel --prod

# Follow prompts:
# - Link to existing project: Yes
# - Project name: younessedd/Blog-Api_Simplon (or your existing project)
# - Override settings: No
```

#### Option 2: Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Find your existing project: `younesseddanguir`
3. Click "Deployments" tab
4. Click "Deploy" button
5. Upload your project folder or connect via Git

#### Option 3: Git Deployment
1. Initialize Git repository:
```bash
git init
git add .
git commit -m "Update portfolio with CV improvements"
```

2. Connect to existing Vercel project via Git integration

### Changes Included in This Deployment:
✅ **CV Section Updates**: English/French CV buttons with proper file links  
✅ **Name Updates**: "Youness Eddanguir" throughout the site  
✅ **Footer Improvements**: Consistent height footer columns  
✅ **Click Functionality**: Removed card clicks, kept button clicks  
✅ **Animations**: All reveal animations working properly  

### Post-Deployment Verification:
After deployment, verify these features work:
- CV buttons open correct PDF files
- Footer columns have consistent height
- Name displays as "Youness Eddanguir" in header/footer
- CV cards are no longer clickable (only buttons)
- All animations and hover effects function properly

Your updated portfolio will be live at: https://younesseddanguir.vercel.app/
