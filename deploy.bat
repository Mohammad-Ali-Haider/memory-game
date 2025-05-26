@echo off
echo 🚀 Building Memory Game for deployment...
echo.

echo 📦 Installing dependencies...
call npm install

echo 🔨 Building production version...
call npm run build

echo ✅ Build complete! 
echo.
echo 📁 Your production files are in the 'build' folder
echo.
echo 🌐 Next steps:
echo 1. Go to https://netlify.com
echo 2. Sign up for free account
echo 3. Drag the 'build' folder to deploy
echo 4. Get your live URL!
echo.
echo 💡 Or use Vercel:
echo 1. Run: npm install -g vercel
echo 2. Run: vercel
echo 3. Follow the prompts
echo.
pause
