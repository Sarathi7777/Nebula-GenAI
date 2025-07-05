# 🚀 Vercel Production Deployment Checklist

## 🔍 Issue Analysis: Login/Account Creation Not Working

Based on your description, the frontend works locally but login/account creation fails on Vercel. This is typically caused by **missing or incorrect environment variables**.

## 📋 Required Environment Variables for Vercel

### **Critical Variables (Must Set)**

1. **API URL Configuration:**
   ```env
   VITE_API_URL=https://nebula-genai.onrender.com
   VITE_PROXY_SERVER_URL=https://nebula-genai.onrender.com
   ```

2. **MongoDB Configuration:**
   ```env
   VITE_MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/Nebula GenAI
   ```

3. **JWT Secret:**
   ```env
   VITE_JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   ```

4. **Optional Hugging Face Token:**
   ```env
   VITE_HF_TOKEN=your_hugging_face_token
   ```

## 🔧 How to Fix Vercel Deployment

### **Step 1: Set Environment Variables in Vercel**

1. **Go to your Vercel Dashboard**
2. **Select your project**
3. **Go to Settings → Environment Variables**
4. **Add each variable:**

   | Variable Name | Value | Environment |
   |---------------|-------|-------------|
   | `VITE_API_URL` | `https://nebula-genai.onrender.com` | Production |
   | `VITE_PROXY_SERVER_URL` | `https://nebula-genai.onrender.com` | Production |
   | `VITE_MONGODB_URI` | `mongodb+srv://username:password@cluster.mongodb.net/Nebula GenAI` | Production |
   | `VITE_JWT_SECRET` | `your-actual-jwt-secret` | Production |
   | `VITE_HF_TOKEN` | `your_hugging_face_token` | Production |

### **Step 2: Redeploy After Setting Variables**

1. **Go to Deployments tab**
2. **Click "Redeploy" on your latest deployment**
3. **Or push a new commit to trigger auto-deploy**

### **Step 3: Verify Configuration**

After redeployment, check if the environment variables are loaded:

1. **Open browser console** on your Vercel site
2. **Run this command:**
   ```javascript
   console.log('API URL:', import.meta.env.VITE_API_URL);
   console.log('Proxy URL:', import.meta.env.VITE_PROXY_SERVER_URL);
   console.log('MongoDB URI:', import.meta.env.VITE_MONGODB_URI ? 'Set' : 'Not Set');
   console.log('JWT Secret:', import.meta.env.VITE_JWT_SECRET ? 'Set' : 'Not Set');
   ```

## 🐛 Common Issues & Solutions

### **Issue 1: Environment Variables Not Loading**
**Symptoms:** `undefined` values in console
**Solution:** 
- Ensure variables are set for "Production" environment
- Redeploy after setting variables
- Check variable names (must start with `VITE_`)

### **Issue 2: CORS Errors**
**Symptoms:** Network errors in browser console
**Solution:**
- Verify `VITE_API_URL` points to your Render server
- Check that your frontend domain is in `ALLOWED_ORIGINS_PROD` on backend

### **Issue 3: MongoDB Connection Issues**
**Symptoms:** Database errors in backend logs
**Solution:**
- Verify MongoDB Atlas connection string
- Check network access settings in MongoDB Atlas
- Ensure username/password are correct

### **Issue 4: JWT Token Issues**
**Symptoms:** Authentication failures
**Solution:**
- Ensure `VITE_JWT_SECRET` matches `JWT_SECRET` on backend
- Use a strong, unique secret key

## 🔍 Debugging Steps

### **1. Check Browser Console**
```javascript
// Run this in browser console on your Vercel site
console.log('Environment Check:');
console.log('API URL:', import.meta.env.VITE_API_URL);
console.log('Proxy URL:', import.meta.env.VITE_PROXY_SERVER_URL);
console.log('Is Production:', import.meta.env.PROD);
console.log('Is Development:', import.meta.env.DEV);
```

### **2. Test API Connection**
```javascript
// Test if your backend is reachable
fetch('https://nebula-genai.onrender.com/health')
  .then(response => response.json())
  .then(data => console.log('Backend Health:', data))
  .catch(error => console.error('Backend Error:', error));
```

### **3. Check Network Tab**
1. Open browser DevTools
2. Go to Network tab
3. Try to login/signup
4. Look for failed requests to your API

## 📱 Vercel-Specific Configuration

### **Build Settings**
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### **Environment Variables Priority**
1. **Production:** Used for production deployments
2. **Preview:** Used for preview deployments
3. **Development:** Used for local development

## ✅ Success Checklist

After setting environment variables, verify:

- [ ] Environment variables are set in Vercel dashboard
- [ ] Variables show correct values in browser console
- [ ] Backend health check passes
- [ ] Login form submits without console errors
- [ ] Signup form submits without console errors
- [ ] Authentication tokens are stored in localStorage
- [ ] User can access protected pages after login

## 🚨 Emergency Fix

If you need to deploy immediately:

1. **Set these minimal variables in Vercel:**
   ```env
   VITE_API_URL=https://nebula-genai.onrender.com
   VITE_PROXY_SERVER_URL=https://nebula-genai.onrender.com
   ```

2. **Redeploy immediately**
3. **Add other variables later**

## 📞 Support

If issues persist:
1. Check Vercel deployment logs
2. Verify backend is running (https://nebula-genai.onrender.com/health)
3. Test API endpoints directly
4. Check browser console for specific error messages 