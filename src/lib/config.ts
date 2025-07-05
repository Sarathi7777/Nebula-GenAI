// Environment-based configuration utility
export const config = {
  // API Configuration
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  proxyServerUrl: import.meta.env.VITE_PROXY_SERVER_URL || 'http://localhost:3001',
  
  // MongoDB Configuration
  mongodbUri: import.meta.env.VITE_MONGODB_URI || 'mongodb://localhost:27017/Nebula GenAI',
  
  // JWT Configuration
  jwtSecret: import.meta.env.VITE_JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production',
  
  // Hugging Face Configuration
  hfToken: import.meta.env.VITE_HF_TOKEN,
  
  // Environment
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  
  // API Endpoints
  endpoints: {
    generateImage: '/api/generate-image',
    transformImage: '/api/transform-image',
    auth: {
      register: '/api/auth/register',
      login: '/api/auth/login',
    },
    images: {
      save: '/api/images/save',
      user: '/api/images/user',
      recent: '/api/images/recent',
    }
  }
};

// Helper function to get full API URL
export const getApiUrl = (endpoint: string): string => {
  return `${config.apiUrl}${endpoint}`;
};

// Helper function to get full proxy server URL
export const getProxyServerUrl = (endpoint: string): string => {
  return `${config.proxyServerUrl}${endpoint}`;
};

// Helper function to get the appropriate API URL based on environment
export const getEnvironmentApiUrl = (endpoint: string): string => {
  if (config.isProduction) {
    // In production, use the proxy server URL if available, otherwise fall back to API URL
    return config.proxyServerUrl ? getProxyServerUrl(endpoint) : getApiUrl(endpoint);
  }
  
  // In development, prefer proxy server URL, fall back to API URL
  return config.proxyServerUrl ? getProxyServerUrl(endpoint) : getApiUrl(endpoint);
}; 