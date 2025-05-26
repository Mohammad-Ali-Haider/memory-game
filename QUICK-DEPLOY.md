# 🚀 Quick GitHub Pages Deployment

## 1. Create GitHub Repository (2 minutes)
1. Go to [github.com](https://github.com) → "New repository"
2. Name: `memory-game` (or your choice)
3. Make it **Public** (required for free GitHub Pages)
4. Don't initialize with README
5. Click "Create repository"

## 2. Update Your Username (30 seconds)
Edit `package.json` line 5:
```json
"homepage": "https://YOURUSERNAME.github.io/memory-game"
```
Replace `YOURUSERNAME` with your actual GitHub username.

## 3. Deploy (One Command)

### Windows:
Double-click `deploy-github.bat` or run:
```bash
npm run deploy
```

### Mac/Linux:
```bash
chmod +x deploy-github.sh
./deploy-github.sh
```

Or simply:
```bash
npm run deploy
```

## 4. Enable GitHub Pages (1 minute)
1. Go to your repository on GitHub
2. Settings → Pages
3. Source: "Deploy from a branch"
4. Branch: "gh-pages"
5. Click "Save"

## 5. Get Your Live URL
Your site will be at: `https://YOURUSERNAME.github.io/memory-game`

## 6. Configure AdSense
1. Copy your live URL
2. Go to [adsense.google.com](https://adsense.google.com)
3. Add your URL to "Sites"
4. Wait for approval (24-48 hours)
5. Real ads will appear!

## Updates
To update your site after changes:
```bash
npm run deploy
```

## Troubleshooting
- **Repository not found**: Check you created it and it's public
- **Permission denied**: Make sure you're logged into Git
- **Build fails**: Run `npm install` first
- **404 error**: Enable GitHub Pages in repository settings

## Success!
✅ Your memory game will be live in 5 minutes!
✅ Real AdSense ads will show after domain approval!
