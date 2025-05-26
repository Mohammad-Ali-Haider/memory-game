@echo off
echo 🚀 GitHub Pages Deployment Script
echo ================================
echo.

echo 📋 Before running this script, make sure you have:
echo 1. Created a GitHub repository
echo 2. Updated the homepage URL in package.json
echo 3. Have Git installed and configured
echo.
pause

echo 📦 Installing dependencies...
call npm install

echo 🔧 Installing gh-pages...
call npm install --save-dev gh-pages

echo 🔨 Building the project...
call npm run build

echo 📤 Deploying to GitHub Pages...
call npm run deploy

echo.
echo ✅ Deployment complete!
echo.
echo 🌐 Your site should be available at:
echo https://Mohammad-Ali-Haider.github.io/memory-game
echo.
echo 📋 Next steps:
echo 1. Go to your GitHub repository
echo 2. Settings → Pages
echo 3. Enable GitHub Pages from gh-pages branch
echo 4. Add your live URL to AdSense
echo.
echo 💡 To update your site later, just run:
echo npm run deploy
echo.
pause
