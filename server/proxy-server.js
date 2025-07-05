import express from 'express';
import cors from 'cors';
import { Client, handle_file } from '@gradio/client';

import fetch from 'node-fetch';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://sara:admin@clustersih.6sysl.mongodb.net/Nebula-GenAI';

console.log('🔗 Connecting to MongoDB:', MONGODB_URI);

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  name: String,
  avatar: String,
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

// Generated Image Schema
const generatedImageSchema = new mongoose.Schema({
  prompt: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

generatedImageSchema.index({ userId: 1, createdAt: -1 });

const GeneratedImage = mongoose.model('GeneratedImage', generatedImageSchema);

// Middleware
app.use(cors({
  origin: [
    'http://localhost:8080',
    'http://localhost:8082',
    'http://localhost:3000',
    'http://localhost:5173',
    // 'https://nebula-genai.vercel.app/',
    // 'https://nebula-genai.onrender.com'
  ],
  credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// JWT Middleware
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    req.user = {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      avatar: user.avatar
    };
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Hugging Face Spaces API Proxy Server is running' });
});

// Authentication endpoints
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Create new user
    const user = new User({ email, password, name });
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      },
      token,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      },
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Image management endpoints
app.post('/api/images/save', authenticateToken, async (req, res) => {
  try {
    const { prompt, imageUrl } = req.body;
    const userId = req.user.id;

    if (!prompt || !imageUrl) {
      return res.status(400).json({ error: 'Prompt and image URL are required' });
    }

    const image = new GeneratedImage({
      prompt,
      imageUrl,
      userId,
    });

    await image.save();

    res.json({
      success: true,
      image: {
        id: image._id.toString(),
        prompt: image.prompt,
        imageUrl: image.imageUrl,
        createdAt: image.createdAt,
        userId: image.userId.toString(),
      },
    });
  } catch (error) {
    console.error('Save image error:', error);
    res.status(500).json({ error: 'Failed to save image' });
  }
});

app.get('/api/images/user', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const images = await GeneratedImage.find({ userId })
      .sort({ createdAt: -1 })
      .exec();

    res.json({
      success: true,
      images: images.map(image => ({
        id: image._id.toString(),
        prompt: image.prompt,
        imageUrl: image.imageUrl,
        createdAt: image.createdAt,
        userId: image.userId.toString(),
      })),
    });
  } catch (error) {
    console.error('Get user images error:', error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

app.get('/api/images/recent', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const limit = parseInt(req.query.limit) || 3;
    
    const images = await GeneratedImage.find({ userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();

    res.json({
      success: true,
      images: images.map(image => ({
        id: image._id.toString(),
        prompt: image.prompt,
        imageUrl: image.imageUrl,
        createdAt: image.createdAt,
        userId: image.userId.toString(),
      })),
    });
  } catch (error) {
    console.error('Get recent images error:', error);
    res.status(500).json({ error: 'Failed to fetch recent images' });
  }
});

app.delete('/api/images/:imageId', authenticateToken, async (req, res) => {
  try {
    const { imageId } = req.params;
    const userId = req.user.id;

    const result = await GeneratedImage.deleteOne({
      _id: imageId,
      userId,
    });

    if (result.deletedCount > 0) {
      res.json({ success: true, message: 'Image deleted successfully' });
    } else {
      res.status(404).json({ error: 'Image not found' });
    }
  } catch (error) {
    console.error('Delete image error:', error);
    res.status(500).json({ error: 'Failed to delete image' });
  }
});

// Style reference images for different transformation styles
const STYLE_IMAGES = {
  'ghibli': 'https://raw.githubusercontent.com/pytorch/examples/main/fast_neural_style/images/style-images/mosaic.jpg',
  'vintage': 'https://raw.githubusercontent.com/pytorch/examples/main/fast_neural_style/images/style-images/starry_night.jpg',
  'watercolor': 'https://raw.githubusercontent.com/pytorch/examples/main/fast_neural_style/images/style-images/wave.jpg',
  'oil': 'https://raw.githubusercontent.com/pytorch/examples/main/fast_neural_style/images/style-images/starry_night.jpg',
  'cyberpunk': 'https://raw.githubusercontent.com/pytorch/examples/main/fast_neural_style/images/style-images/mosaic.jpg',
  'comic': 'https://raw.githubusercontent.com/pytorch/examples/main/fast_neural_style/images/style-images/candy.jpg',
  'action': 'https://raw.githubusercontent.com/pytorch/examples/main/fast_neural_style/images/style-images/udnie.jpg',
  'bw': 'https://raw.githubusercontent.com/pytorch/examples/main/fast_neural_style/images/style-images/starry_night.jpg',
  'default': 'https://raw.githubusercontent.com/pytorch/examples/main/fast_neural_style/images/style-images/starry_night.jpg'
};

// Proxy endpoint for AI Image Generation using Hugging Face Spaces (Free!)
app.post('/api/generate-image', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: 'Missing required field: prompt'
      });
    }

    console.log('🎨 Processing AI image generation request with Hugging Face Spaces:', prompt);
    console.log('🆓 Using free Hugging Face Spaces - no API key required!');

    // Use a free Hugging Face Space for image generation
    // Using a reliable free space: black-forest-labs/FLUX.1-schnell
    const client = await Client.connect("black-forest-labs/FLUX.1-schnell");

    const result = await client.predict("/infer", {
      prompt: prompt,
      seed: Math.floor(Math.random() * 1000000),
      randomize_seed: true,
      width: 1024,
      height: 1024,
      num_inference_steps: 4,
    });

    if (result && result.data && result.data[0]) {
      // Convert the result to base64 if needed
      const imageUrl = result.data[0].url || result.data[0];

      // Fetch the image and convert to base64
      const imageResponse = await fetch(imageUrl);
      const imageBuffer = await imageResponse.buffer();
      const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;

      res.json({
        success: true,
        imageUrl: base64Image,
        message: 'Image generated successfully with free Hugging Face Spaces!'
      });
    } else {
      throw new Error('No image data received from Hugging Face Spaces');
    }

  } catch (error) {
    console.error('❌ Error generating image:', error);

    // Check if it's a "starting up" error
    if (error.message.includes('starting up') || error.message.includes('loading') || error.message.includes('503') || error.message.includes('Space is starting')) {
      console.log('🚀 Hugging Face Space is starting up, sending 503 status');
      res.status(503).json({
        error: 'Hugging Face Space is starting up. Please wait a moment and try again.',
        details: error.message,
        suggestion: 'The AI model is waking up from sleep mode. This usually takes 30-60 seconds. Please wait and try again.',
        retryable: true
      });
    } else {
      res.status(500).json({
        error: 'Failed to generate image',
        details: error.message,
        suggestion: 'Please try again with a different prompt or check if the Hugging Face Space is available.',
        retryable: false
      });
    }
  }
});

// Helper function to warm up the Hugging Face Space
async function warmUpSpace() {
  try {
    console.log('🔥 Attempting to warm up Hugging Face Space...');
    const { Client } = await import("@gradio/client");
    const client = await Client.connect("Hexii/Neural-Style-Transfer");

    console.log('✅ Hugging Face Space warmed up successfully');
    return true;
  } catch (error) {
    console.log('⚠️ Space warm-up failed (this is normal for cold starts):', error.message);
    return false;
  }
}

// Proxy endpoint for Hugging Face Spaces API
app.post('/api/transform-image', async (req, res) => {
  try {
    const { imageDataUrl, prompt } = req.body;

    if (!imageDataUrl || !prompt) {
      return res.status(400).json({
        error: 'Missing required fields: imageDataUrl and prompt'
      });
    }

    console.log('🤖 Processing AI transformation request with Hugging Face Spaces:', prompt);

    // Try to warm up the space first
    await warmUpSpace();

    // Convert data URL to blob for Hugging Face Spaces API
    const base64Data = imageDataUrl.split(',')[1];
    const imageBuffer = Buffer.from(base64Data, 'base64');
    const imageBlob = new Blob([imageBuffer], { type: 'image/png' });

    // Connect to the Hugging Face Space
    const app_client = await Client.connect("Hexii/Neural-Style-Transfer");

    // Get style image URL based on prompt
    const styleImageUrl = getStyleImageForPrompt(prompt);

    // Fetch the style image
    const styleResponse = await fetch(styleImageUrl);
    const styleBuffer = await styleResponse.arrayBuffer();
    const styleBlob = new Blob([styleBuffer], { type: 'image/jpeg' });

    // Make the prediction with proper parameters
    const result = await app_client.predict("/predict", {
      content_img: handle_file(imageBlob),
      style_image: handle_file(styleBlob),
    });

    console.log('✅ Hugging Face Spaces transformation completed');

    if (result.data && result.data[0]) {
      // Extract the URL from the Gradio response
      const transformedImageData = result.data[0];
      let imageUrl;

      if (typeof transformedImageData === 'string') {
        imageUrl = transformedImageData;
      } else if (transformedImageData.url) {
        imageUrl = transformedImageData.url;
      } else if (transformedImageData.path) {
        // Construct the full URL from the path
        imageUrl = `https://hexii-neural-style-transfer.hf.space/file=${transformedImageData.path}`;
      } else {
        console.error('❌ Could not extract image URL from result:', transformedImageData);
        return res.status(500).json({
          error: 'Could not extract image URL from transformation result',
          details: transformedImageData
        });
      }

      return res.json({
        success: true,
        imageUrl: imageUrl
      });
    } else {
      console.error('❌ Unexpected result from Hugging Face Spaces:', result);
      return res.status(500).json({
        error: 'Unexpected result from Hugging Face Spaces service',
        details: result
      });
    }

  } catch (error) {
    console.error('Server error:', error);

    // Safely get error message
    const errorMessage = error?.message || error?.toString() || 'Unknown error occurred';

    // Handle specific Hugging Face errors
    if (errorMessage.includes('Space is not running') ||
        errorMessage.includes('not running') ||
        errorMessage.includes('starting up') ||
        errorMessage.includes('loading') ||
        errorMessage.includes('503') ||
        errorMessage.includes('Service Unavailable') ||
        errorMessage.includes('Space is starting')) {
      return res.status(503).json({
        error: 'Hugging Face Space is starting up. Please wait a moment and try again.',
        message: 'The AI transformation service is currently starting up. This usually takes 60-90 seconds.',
        details: errorMessage,
        retryable: true
      });
    }

    if (errorMessage.includes('timeout') || errorMessage.includes('time')) {
      return res.status(504).json({
        error: 'Request timeout',
        message: 'The AI transformation is taking longer than expected. Please try again.',
        details: errorMessage
      });
    }

    // Handle Gradio-specific errors
    if (error?.type === 'status' && error?.stage === 'error') {
      return res.status(503).json({
        error: 'Hugging Face Space is starting up. Please wait a moment and try again.',
        message: 'The AI transformation service encountered an error. Please try again.',
        details: 'Space processing error - this is usually temporary',
        retryable: true
      });
    }

    res.status(500).json({
      error: 'Internal server error: ' + errorMessage
    });
  }
});

// Helper function to get style image URL based on prompt
function getStyleImageForPrompt(prompt) {
  const lowerPrompt = prompt.toLowerCase();

  if (lowerPrompt.includes('ghibli') || lowerPrompt.includes('anime')) {
    return STYLE_IMAGES.ghibli;
  } else if (lowerPrompt.includes('vintage') || lowerPrompt.includes('old')) {
    return STYLE_IMAGES.vintage;
  } else if (lowerPrompt.includes('watercolor')) {
    return STYLE_IMAGES.watercolor;
  } else if (lowerPrompt.includes('oil')) {
    return STYLE_IMAGES.oil;
  } else if (lowerPrompt.includes('cyberpunk')) {
    return STYLE_IMAGES.cyberpunk;
  } else if (lowerPrompt.includes('comic')) {
    return STYLE_IMAGES.comic;
  } else if (lowerPrompt.includes('action')) {
    return STYLE_IMAGES.action;
  } else if (lowerPrompt.includes('black') || lowerPrompt.includes('white')) {
    return STYLE_IMAGES.bw;
  } else {
    // Default to a general artistic style
    return STYLE_IMAGES.default;
  }
}

app.listen(PORT, () => {
  console.log(`🚀 Hugging Face Spaces API Proxy Server running on http://localhost:${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/health`);
  console.log(`🎨 Generate endpoint: POST http://localhost:${PORT}/api/generate-image`);
  console.log(`🎨 Transform endpoint: POST http://localhost:${PORT}/api/transform-image`);
  console.log(`🤗 Using Hugging Face Spaces: black-forest-labs/FLUX.1-schnell & Hexii/Neural-Style-Transfer`);
  console.log(`🆓 Completely free - no API keys or billing required!`);
});
