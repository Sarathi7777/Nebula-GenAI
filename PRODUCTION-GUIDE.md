# 🚀 Production Run Guide

## Quick Start (3 Steps)

### Step 1: Set Up Environment Variables

**Frontend (.env.production):**
```bash
# Copy the template
cp env.production.example .env.production

# Edit with your actual values
nano .env.production
```

**Backend (server/.env):**
```bash
# Copy the template
cp server/env.production.example server/.env

# Edit with your actual values
nano server/.env
```

### Step 2: Deploy Backend

Choose one of these platforms:

#### Option A: Render (Recommended)
1. Go to [render.com](https://render.com)
2. Create new Web Service
3. Connect your GitHub repository
4. Configure:
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
5. Add environment variables from `server/.env`
6. Deploy

#### Option B: Railway
1. Go to [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Add environment variables
4. Deploy

#### Option C: Heroku
1. Install Heroku CLI
2. Create app: `heroku create your-app-name`
3. Set environment variables: `heroku config:set KEY=value`
4. Deploy: `git push heroku main`

### Step 3: Deploy Frontend

#### Option A: Vercel (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Add environment variables from `.env.production`
4. Deploy

#### Option B: Netlify
1. Go to [netlify.com](https://netlify.com)
2. Connect your GitHub repository
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variables
6. Deploy

## 🔧 Manual Production Setup

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (or other MongoDB provider)
- Git repository

### 1. Clone and Setup
```bash
# Clone your repository
git clone <your-repo-url>
cd Nebula GenAI

# Run production setup script
chmod +x scripts/setup-production.sh
./scripts/setup-production.sh
```

### 2. Configure Environment Variables

**Frontend (.env.production):**
```env
# Replace with your actual values
VITE_MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/Nebula GenAI
VITE_JWT_SECRET=your-actual-jwt-secret-key
VITE_API_URL=https://your-backend-domain.com
VITE_PROXY_SERVER_URL=https://your-backend-domain.com
VITE_HF_TOKEN=your_hugging_face_token
NODE_ENV=production
```

**Backend (server/.env):**
```env
# Replace with your actual values
PORT=3001
NODE_ENV=production
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/Nebula GenAI
JWT_SECRET=your-actual-jwt-secret-key
HF_TOKEN=your_hugging_face_token
ALLOWED_ORIGINS=http://localhost:8080,http://localhost:8082,http://localhost:3000,http://localhost:5173
ALLOWED_ORIGINS_PROD=https://your-frontend-domain.com,https://your-production-domain.com
```

### 3. Build Frontend
```bash
# Install dependencies
npm install

# Build for production
npm run build
```

### 4. Start Backend
```bash
# Install server dependencies
cd server
npm install

# Start production server
npm start
```

### 5. Serve Frontend
```bash
# Install a static server
npm install -g serve

# Serve the built frontend
serve -s dist -l 3000
```

## 🌐 Domain Configuration

### Custom Domain Setup

1. **Backend Domain:**
   - Point your backend domain to your hosting platform
   - Update `VITE_API_URL` and `VITE_PROXY_SERVER_URL` in frontend
   - Update `ALLOWED_ORIGINS_PROD` in backend

2. **Frontend Domain:**
   - Point your frontend domain to your hosting platform
   - Update `ALLOWED_ORIGINS_PROD` in backend

### SSL/HTTPS
- Most hosting platforms provide SSL automatically
- Ensure all URLs use `https://` in production

## 🔍 Testing Production

### Health Checks
```bash
# Test backend health
curl https://your-backend-domain.com/health

# Expected response:
# {"status":"OK","message":"Hugging Face Spaces API Proxy Server is running"}
```

### Functionality Tests
1. **Frontend**: Visit your frontend URL
2. **Authentication**: Test sign up/login
3. **Image Generation**: Test AI image generation
4. **Image Transformation**: Test image style transfer
5. **Database**: Verify images are saved to MongoDB

## 🛠️ Troubleshooting

### Common Issues

**CORS Errors:**
```bash
# Check if your frontend domain is in ALLOWED_ORIGINS_PROD
# Add your domain to the backend environment variable
```

**Database Connection:**
```bash
# Verify MongoDB connection string
# Check network access in MongoDB Atlas
# Ensure username/password are correct
```

**API Timeouts:**
```bash
# Check Hugging Face Spaces availability
# Verify HF_TOKEN if using one
# Check server logs for errors
```

**Build Errors:**
```bash
# Ensure all environment variables are set
# Check Node.js version (18+ required)
# Clear node_modules and reinstall
```

### Debug Commands
```bash
# Check environment variables
echo $NODE_ENV
echo $MONGODB_URI

# Test backend locally
cd server && npm start

# Test frontend build
npm run build

# Check server logs
# (Check your hosting platform's log viewer)
```

## 📊 Monitoring

### Performance Monitoring
- Set up logging for your backend
- Monitor API response times
- Track error rates
- Monitor database performance

### Health Monitoring
- Set up uptime monitoring
- Monitor Hugging Face Spaces availability
- Track user authentication success rates

## 🔄 Updates

### Deploying Updates
1. Push changes to your Git repository
2. Your hosting platform will automatically redeploy
3. Test functionality after deployment
4. Monitor for any issues

### Environment Variable Updates
1. Update environment variables in your hosting platform
2. Redeploy the application
3. Test affected functionality

## 🆘 Support

If you encounter issues:
1. Check the logs in your hosting platform
2. Verify all environment variables are set correctly
3. Test locally with production environment variables
4. Check the troubleshooting section above
5. Review the [DEPLOYMENT.md](./DEPLOYMENT.md) guide

## 🎯 Production Checklist

- [ ] Environment variables configured
- [ ] MongoDB Atlas set up and connected
- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] CORS configured correctly
- [ ] SSL/HTTPS enabled
- [ ] Health checks passing
- [ ] All functionality tested
- [ ] Monitoring set up
- [ ] Error logging configured 