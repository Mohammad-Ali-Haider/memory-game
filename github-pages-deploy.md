# 🚀 GitHub Pages Deployment Guide

## Prerequisites
- GitHub account (free)
- Git installed on your computer
- Your memory game project ready

## Step-by-Step Deployment

### 1. Create GitHub Repository
1. Go to [github.com](https://github.com)
2. Click "New repository" (green button)
3. Repository name: `memory-game` (or any name you prefer)
4. Make it **Public** (required for free GitHub Pages)
5. Don't initialize with README (we have existing code)
6. Click "Create repository"

### 2. Connect Local Project to GitHub
Open terminal/command prompt in your project folder and run:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit - Memory Game with AdSense"

# Add GitHub repository as remote (replace with your actual repository URL)
git remote add origin https://github.com/YOURUSERNAME/memory-game.git

# Push to GitHub
git push -u origin main
```

### 3. Update Homepage URL
In `package.json`, replace `yourusername` with your actual GitHub username:
```json
"homepage": "https://YOURUSERNAME.github.io/memory-game"
```

### 4. Deploy to GitHub Pages
```bash
npm run deploy
```

### 5. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" section
4. Source: "Deploy from a branch"
5. Branch: "gh-pages"
6. Folder: "/ (root)"
7. Click "Save"

### 6. Access Your Live Site
Your site will be available at:
`https://YOURUSERNAME.github.io/memory-game`

## Important Notes

### AdSense Configuration
1. Copy your live GitHub Pages URL
2. Go to [adsense.google.com](https://adsense.google.com)
3. Add your GitHub Pages URL to "Sites"
4. Wait for approval (24-48 hours)
5. Real ads will appear after approval

### Custom Domain (Optional)
1. Buy a domain (e.g., memorygame.com)
2. In repository settings → Pages → Custom domain
3. Add your domain and enable HTTPS
4. Update AdSense with your custom domain

### Updating Your Site
After making changes:
```bash
git add .
git commit -m "Update game"
git push origin main
npm run deploy
```

## Troubleshooting

### Common Issues:
- **404 Error**: Check repository is public and Pages is enabled
- **Blank Page**: Check homepage URL in package.json
- **Routing Issues**: GitHub Pages handles React routing automatically
- **Ads Not Showing**: Ensure HTTPS and domain approval in AdSense

### Build Errors:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run deploy
```

## Success Checklist
- ✅ Repository created and public
- ✅ Code pushed to GitHub
- ✅ GitHub Pages enabled
- ✅ Site accessible via GitHub Pages URL
- ✅ Domain added to AdSense
- ✅ Waiting for AdSense approval
