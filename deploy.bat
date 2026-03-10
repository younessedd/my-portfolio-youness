@echo off
REM 🚀 Vercel Deployment Script for Youness Portfolio (Windows)
REM This script helps deploy your portfolio to Vercel

echo 🚀 Starting Vercel Deployment for Youness Portfolio...
echo ==================================================

REM Check if Vercel CLI is installed
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Vercel CLI not found. Installing...
    npm i -g vercel
    echo ✅ Vercel CLI installed successfully
)

REM Check if we're in the right directory
if not exist "index.html" (
    echo ❌ Error: index.html not found. Please run this script from the project root.
    pause
    exit /b 1
)

echo ✅ Project directory verified

REM Check git status
if not exist ".git" (
    echo 📁 Initializing Git repository...
    git init
    git add .
    git commit -m "Initial commit - Portfolio ready for Vercel deployment"
    echo ✅ Git repository initialized
) else (
    echo 📁 Git repository exists
)

echo.
echo 🎯 Choose deployment method:
echo 1) Deploy directly to Vercel (Quick)
echo 2) Setup with GitHub integration (Recommended)
echo 3) Just build and prepare files
echo.
set /p choice="Enter your choice (1-3): "

if "%choice%"=="1" (
    echo 🚀 Deploying directly to Vercel...
    vercel --prod
    echo ✅ Deployment complete!
) else if "%choice%"=="2" (
    echo 🔗 Setting up GitHub integration...
    echo Please follow these steps:
    echo 1. Create a new repository on GitHub: https://github.com/new
    echo 2. Name it: youness-portfolio
    echo 3. Don't initialize with README
    echo 4. Copy the repository URL
    echo.
    set /p github_url="Enter your GitHub repository URL: "
    
    if not "%github_url%"=="" (
        git remote add origin %github_url%
        git branch -M main
        git push -u origin main
        echo ✅ Code pushed to GitHub
        echo 🌐 Now go to https://vercel.com/new to import your repository
    ) else (
        echo ❌ No GitHub URL provided. Skipping push.
    )
) else if "%choice%"=="3" (
    echo 📦 Preparing files for deployment...
    echo ✅ Files are ready for manual deployment
    echo 📁 Upload these files to Vercel or your hosting provider:
    echo    - index.html
    echo    - css/ folder
    echo    - js/ folder
    echo    - images/ folder
    echo    - data/ folder
) else (
    echo ❌ Invalid choice. Exiting.
    pause
    exit /b 1
)

echo.
echo 🎉 Deployment process completed!
echo 📊 Next steps:
echo 1. Test your live site
echo 2. Check all links and features
echo 3. Monitor performance with Vercel Analytics
echo 4. Share your portfolio URL
echo.
echo 📞 For support, check VERCEL_DEPLOYMENT.md
echo ==================================================
pause
