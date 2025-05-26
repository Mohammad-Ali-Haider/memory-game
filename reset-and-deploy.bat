@echo off
echo 🔄 Complete Reset and Fresh Deployment
echo =====================================
echo.

echo 🧹 Cleaning up previous Git configuration...
if exist .git (
    rmdir /s /q .git
    echo ✅ Removed .git folder
) else (
    echo ℹ️ No .git folder found
)

echo.
echo 🧹 Cleaning up build files...
if exist build (
    rmdir /s /q build
    echo ✅ Removed build folder
) else (
    echo ℹ️ No build folder found
)

echo.
echo 🧹 Cleaning up node_modules...
if exist node_modules (
    rmdir /s /q node_modules
    echo ✅ Removed node_modules folder
) else (
    echo ℹ️ No node_modules folder found
)

echo.
echo 📦 Installing fresh dependencies...
call npm install

echo.
echo 🔧 Initializing fresh Git repository...
git init

echo.
echo 📋 Ready for fresh deployment!
echo.
echo Next steps:
echo 1. Update your GitHub username in package.json
echo 2. Create a new GitHub repository
echo 3. Run the deployment script
echo.
pause
