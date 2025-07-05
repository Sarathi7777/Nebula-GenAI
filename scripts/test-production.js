// Production Configuration Test Script
// Run this in your browser console on your Vercel site

console.log('🔍 Nebula GenAI Production Configuration Test');
console.log('=============================================');

// Test 1: Environment Variables
console.log('\n📋 Environment Variables Check:');
console.log('API URL:', import.meta.env.VITE_API_URL || '❌ NOT SET');
console.log('Proxy Server URL:', import.meta.env.VITE_PROXY_SERVER_URL || '❌ NOT SET');
console.log('MongoDB URI:', import.meta.env.VITE_MONGODB_URI ? '✅ SET' : '❌ NOT SET');
console.log('JWT Secret:', import.meta.env.VITE_JWT_SECRET ? '✅ SET' : '❌ NOT SET');
console.log('HF Token:', import.meta.env.VITE_HF_TOKEN ? '✅ SET' : '❌ NOT SET');
console.log('Is Production:', import.meta.env.PROD);
console.log('Is Development:', import.meta.env.DEV);

// Test 2: Backend Health Check
console.log('\n🏥 Backend Health Check:');
const backendUrl = import.meta.env.VITE_API_URL || 'https://nebula-genai.onrender.com';
fetch(`${backendUrl}/health`)
  .then(response => {
    console.log('Status:', response.status);
    return response.json();
  })
  .then(data => {
    console.log('Response:', data);
    console.log('✅ Backend is running');
  })
  .catch(error => {
    console.error('❌ Backend connection failed:', error);
  });

// Test 3: API Endpoints Test
console.log('\n🔗 API Endpoints Test:');
const testEndpoints = [
  '/api/auth/register',
  '/api/auth/login',
  '/api/generate-image',
  '/api/transform-image'
];

testEndpoints.forEach(endpoint => {
  const fullUrl = `${backendUrl}${endpoint}`;
  console.log(`Testing ${endpoint}: ${fullUrl}`);
});

// Test 4: Configuration Object Test
console.log('\n⚙️ Configuration Object Test:');
try {
  // This will test if the config module loads correctly
  const configTest = {
    apiUrl: import.meta.env.VITE_API_URL,
    proxyServerUrl: import.meta.env.VITE_PROXY_SERVER_URL,
    isProduction: import.meta.env.PROD,
    isDevelopment: import.meta.env.DEV
  };
  console.log('Config Test:', configTest);
  console.log('✅ Configuration object created successfully');
} catch (error) {
  console.error('❌ Configuration object error:', error);
}

// Test 5: Local Storage Test
console.log('\n💾 Local Storage Test:');
const authToken = localStorage.getItem('authToken');
console.log('Auth Token:', authToken ? '✅ Present' : '❌ Not found');

// Test 6: Network Connectivity
console.log('\n🌐 Network Connectivity Test:');
console.log('Current URL:', window.location.href);
console.log('Protocol:', window.location.protocol);
console.log('Host:', window.location.host);

console.log('\n✅ Test completed! Check the results above.');
console.log('\n📖 If you see ❌ errors, follow the VERCEL-PRODUCTION-CHECKLIST.md guide'); 