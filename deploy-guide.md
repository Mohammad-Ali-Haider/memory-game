# 🚀 Memory Game Deployment Guide

## Quick Netlify Deployment (5 minutes)

### Step 1: Build the App
```bash
npm run build
```
This creates a `build` folder with your production app.

### Step 2: Deploy to Netlify
1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub/Google (free)
3. Drag the `build` folder to the deploy area
4. Get your live URL (e.g., `https://memory-game-abc123.netlify.app`)

### Step 3: Configure AdSense
1. Go to [adsense.google.com](https://adsense.google.com)
2. Add your new Netlify URL to "Sites"
3. Wait for approval (24-48 hours)
4. Real ads will appear!

## Custom Domain (Optional)
1. Buy domain from Namecheap/GoDaddy
2. In Netlify: Settings → Domain management → Add custom domain
3. Update DNS settings as instructed
4. Add custom domain to AdSense

## Environment Variables (If needed)
Create `netlify.toml` in project root:
```toml
[build]
  command = "npm run build"
  publish = "build"

[build.environment]
  NODE_VERSION = "18"
```

## Troubleshooting
- **Build fails**: Check Node.js version compatibility
- **Ads don't show**: Ensure HTTPS and domain approval
- **404 errors**: Add `_redirects` file with `/* /index.html 200`

## Alternative: Vercel
```bash
npm install -g vercel
vercel
```
Follow prompts for instant deployment.
