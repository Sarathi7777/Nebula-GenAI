# Production Deployment Guide

## Overview
This guide helps you deploy Nebula GenAI to production environments, replacing localhost URLs with proper production URLs.

## Environment Configuration

### 1. Frontend Environment Variables

Create a `.env.production` file in the root directory:

```env
# MongoDB Configuration (Production)
VITE_MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/Nebula GenAI

# JWT Secret for Authentication (Change this!)
VITE_JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# API Configuration (Production)
VITE_API_URL=https://your-backend-domain.com
VITE_PROXY_SERVER_URL=https://your-backend-domain.com

# Hugging Face Token (optional)
VITE_HF_TOKEN=your_hugging_face_token

# Environment
NODE_ENV=production
```

### 2. Backend Environment Variables

Create a `.env` file in the `server` directory:

```env
# Server Configuration
PORT=3001
NODE_ENV=production

# MongoDB Configuration (Production)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/Nebula GenAI

# JWT Secret for Authentication (Change this!)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Hugging Face Configuration (optional)
HF_TOKEN=your_hugging_face_token

# CORS Configuration (Production)
ALLOWED_ORIGINS=http://localhost:8080,http://localhost:8082,http://localhost:3000,http://localhost:5173
ALLOWED_ORIGINS_PROD=https://your-frontend-domain.com,https://your-production-domain.com
```

## Deployment Platforms

### Vercel (Frontend)

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard:
   - `VITE_MONGODB_URI`
   - `VITE_JWT_SECRET`
   - `VITE_API_URL`
   - `VITE_PROXY_SERVER_URL`
   - `VITE_HF_TOKEN`

3. **Deploy** - Vercel will automatically build and deploy your frontend

### Render (Backend)

1. **Create a new Web Service** on Render
2. **Connect your repository**
3. **Configure the service**:
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Root Directory**: Leave empty (deploy from root)

4. **Set environment variables** in Render dashboard:
   - `PORT`
   - `NODE_ENV`
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `HF_TOKEN`
   - `ALLOWED_ORIGINS`
   - `ALLOWED_ORIGINS_PROD`

5. **Deploy** - Render will build and deploy your backend

### Railway (Alternative Backend)

1. **Connect your repository** to Railway
2. **Set environment variables** in Railway dashboard
3. **Deploy** - Railway will automatically detect and deploy your Node.js app

## Database Setup

### MongoDB Atlas (Recommended)

1. **Create a MongoDB Atlas cluster**
2. **Get your connection string**:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/Nebula GenAI
   ```
3. **Replace placeholders**:
   - `username`: Your MongoDB username
   - `password`: Your MongoDB password
   - `cluster`: Your cluster name
   - `Nebula GenAI`: Your database name

4. **Set the connection string** in both frontend and backend environment variables

## Security Checklist

- [ ] **Change JWT secrets** from default values
- [ ] **Use HTTPS** in production URLs
- [ ] **Set up proper CORS** origins
- [ ] **Use environment variables** for all sensitive data
- [ ] **Enable MongoDB authentication**
- [ ] **Set up proper firewall rules** if using VPS

## Testing Production Deployment

1. **Test frontend** at your production URL
2. **Test backend** health check: `https://your-backend-domain.com/health`
3. **Test image generation** functionality
4. **Test user authentication** (sign up/login)
5. **Test image transformation** functionality

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure `ALLOWED_ORIGINS_PROD` includes your frontend domain
2. **Database Connection**: Verify MongoDB connection string and network access
3. **API Timeouts**: Check Hugging Face Spaces availability
4. **Build Errors**: Ensure all environment variables are set

### Debug Commands

```bash
# Check environment variables
echo $NODE_ENV
echo $MONGODB_URI

# Test backend health
curl https://your-backend-domain.com/health

# Check frontend build
npm run build
```

## Monitoring

- **Set up logging** for your backend
- **Monitor API response times**
- **Track error rates**
- **Monitor database performance**

## Updates

When updating your application:

1. **Update environment variables** if needed
2. **Redeploy both frontend and backend**
3. **Test all functionality** after deployment
4. **Monitor for any issues**

## Support

If you encounter issues:
1. Check the logs in your deployment platform
2. Verify all environment variables are set correctly
3. Test locally with production environment variables
4. Check the troubleshooting section above 