@echo off
echo 🚀 Fresh GitHub Pages Deployment
echo ================================
echo.

echo 📋 Before we start, make sure you have:
echo 1. ✅ Updated package.json with your GitHub username
echo 2. ✅ Created a NEW GitHub repository (delete the old one if needed)
echo 3. ✅ Repository is PUBLIC
echo.

set /p username="Enter your EXACT GitHub username: "
set /p reponame="Enter repository name (default: memory-game): "
if "%reponame%"=="" set reponame=memory-game

echo.
echo 🔧 Updating package.json with your username...
powershell -Command "(Get-Content package.json) -replace 'YOUR-GITHUB-USERNAME', '%username%' | Set-Content package.json"

echo.
echo 📦 Installing dependencies...
call npm install

echo.
echo 🔨 Building the project...
call npm run build

echo.
echo 🔧 Setting up Git...
git add .
git commit -m "Initial commit - Memory Game with AdSense"
git branch -M main

echo.
echo 🔗 Adding GitHub repository...
git remote add origin https://github.com/%username%/%reponame%.git

echo.
echo 📤 Pushing to GitHub...
git push -u origin main

echo.
echo 🚀 Deploying to GitHub Pages...
call npm run deploy

echo.
echo ✅ Deployment complete!
echo.
echo 🌐 Your site should be available at:
echo https://%username%.github.io/%reponame%
echo.
echo 📋 Final steps:
echo 1. Go to https://github.com/%username%/%reponame%/settings/pages
echo 2. Make sure Source is set to "gh-pages" branch
echo 3. Wait 2-3 minutes for the site to be live
echo.
pause
