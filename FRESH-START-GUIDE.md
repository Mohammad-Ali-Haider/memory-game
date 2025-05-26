# 🔄 Fresh Start Deployment Guide

## Step 1: Clean Slate (2 minutes)

### Delete Old Repository (if exists)
1. Go to https://github.com/YOUR-USERNAME/memory-game
2. Settings → Scroll down → Delete this repository
3. Type repository name to confirm

### Reset Local Project
Double-click `reset-and-deploy.bat` or run:
```bash
# Remove old git
rm -rf .git

# Remove build files
rm -rf build node_modules

# Fresh install
npm install

# Initialize new git
git init
```

## Step 2: Create New Repository (2 minutes)

1. Go to https://github.com
2. Click "New repository" (green button)
3. **Repository name:** `memory-game`
4. **Visibility:** PUBLIC (required for free GitHub Pages)
5. **Don't** initialize with README, .gitignore, or license
6. Click "Create repository"

## Step 3: Update Your Username (30 seconds)

Edit `package.json` line 5:
```json
"homepage": "https://YOUR-ACTUAL-USERNAME.github.io/memory-game"
```

Replace `YOUR-ACTUAL-USERNAME` with your exact GitHub username.

## Step 4: Deploy Everything (5 minutes)

### Option A: Use the Script
Double-click `fresh-deploy.bat` and follow prompts.

### Option B: Manual Commands
```bash
# Update package.json first, then:
git add .
git commit -m "Initial commit - Memory Game with AdSense"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/memory-game.git
git push -u origin main
npm run deploy
```

## Step 5: Enable GitHub Pages (1 minute)

1. Go to your repository on GitHub
2. Settings → Pages (left sidebar)
3. **Source:** "Deploy from a branch"
4. **Branch:** "gh-pages"
5. **Folder:** "/ (root)"
6. Click "Save"

## Step 6: Access Your Site

Your site will be at: `https://YOUR-USERNAME.github.io/memory-game`

Wait 2-3 minutes after deployment before visiting.

## Success Checklist

- ✅ Old repository deleted
- ✅ New repository created and PUBLIC
- ✅ Package.json updated with correct username
- ✅ Code pushed to main branch
- ✅ Deployed to gh-pages branch
- ✅ GitHub Pages enabled
- ✅ Site accessible at the URL

## Troubleshooting

### If deployment fails:
```bash
npm install
npm run build
npm run deploy
```

### If 404 error:
- Check repository is PUBLIC
- Check GitHub Pages is enabled from gh-pages branch
- Wait 5 minutes and try again

### If permission denied:
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Expected Result

✅ Live memory game at your GitHub Pages URL
✅ All features working (game, settings, high scores)
✅ AdSense containers ready for real ads
✅ HTTPS enabled automatically
