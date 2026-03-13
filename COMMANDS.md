# GitHub & Vercel Commands

## GitHub Commands

### Initialize and Push to GitHub
```bash
# Initialize git
git init

# Add all files
git add .

# Commit changes
git commit -m "Your commit message"

# Create main branch
git branch -M main

# Add remote repository (replace with your GitHub repo URL)
git remote add origin https://github.com/yourusername/your-repo.git

# Push to GitHub
git push -u origin main
```

### Update and Push Changes
```bash
# Add all changes
git add .

# Commit with message
git commit -m "Your update message"

# Push to GitHub
git push
```

### Common Git Commands
```bash
# Check status
git status

# Check differences
git diff

# View commit history
git log

# Create new branch
git checkout -b branch-name

# Switch branches
git checkout branch-name

# Merge branch
git merge branch-name
```

---

## Vercel Commands

### Install Vercel CLI
```bash
# Install globally
npm i -g vercel
```

### Deploy to Vercel
```bash
# Login to Vercel
vercel login

# Deploy (run in project folder)
vercel

# Deploy to production
vercel --prod
```

### Vercel with GitHub Integration
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure settings:
   - Framework Preset: Other
   - Build Command: (leave empty or custom)
   - Output Directory: (your build folder)
5. Click "Deploy"

### Update Deployment
```bash
# After pushing to GitHub, Vercel auto-deploys
git add .
git commit -m "Update"
git push

# Or manually deploy
vercel --prod
```

---

## Quick Deploy Script
```bash
#!/bin/bash
echo "Deploying to GitHub and Vercel..."
git add .
git commit -m "Deploy update"
git push
vercel --prod --yes
```
