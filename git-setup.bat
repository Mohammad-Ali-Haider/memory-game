@echo off
echo 🔧 Git Setup and Push Script
echo ============================
echo.

echo 📋 Make sure you have:
echo 1. Created a GitHub repository
echo 2. Updated package.json with your username
echo.
set /p username="Enter your GitHub username: "
set /p reponame="Enter your repository name (default: memory-game): "
if "%reponame%"=="" set reponame=memory-game

echo.
echo 🔍 Checking Git status...
git status

echo.
echo 📦 Adding all files...
git add .

echo.
echo 💾 Making initial commit...
git commit -m "Initial commit - Memory Game with AdSense"

echo.
echo 🌿 Setting branch to main...
git branch -M main

echo.
echo 🔗 Adding remote repository...
git remote add origin https://github.com/%username%/%reponame%.git

echo.
echo 📤 Pushing to GitHub...
git push -u origin main

echo.
echo ✅ Git setup complete!
echo.
echo 🌐 Your repository: https://github.com/%username%/%reponame%
echo.
echo 📋 Next steps:
echo 1. Go to your GitHub repository
echo 2. Enable GitHub Pages in Settings
echo 3. Run: npm run deploy
echo.
pause
