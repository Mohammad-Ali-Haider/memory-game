@echo off
echo 🚀 Manual GitHub Pages Deployment
echo =================================
echo.

echo 📦 Building the project...
call npm run build

echo.
echo 📁 Build completed. Files are in the 'build' folder.
echo.
echo 🔧 Manual deployment steps:
echo 1. Go to your GitHub repository
echo 2. Create a new branch called 'gh-pages'
echo 3. Upload all files from the 'build' folder to the gh-pages branch
echo 4. Enable GitHub Pages from the gh-pages branch
echo.
echo 💡 Alternative: Try automatic deployment again:
echo npm run deploy
echo.
pause
