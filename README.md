# Nebula GenAI ✨

<div align="center">

![Nebula GenAI Logo](public/logo.svg)

**AI-Powered Image Generation & Transformation Platform**

[![React](https://img.shields.io/badge/React-18.3.1-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0.1-646CFF?logo=vite)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)](https://nodejs.org/)
[![Hugging Face](https://img.shields.io/badge/🤗%20Hugging%20Face-Spaces-yellow)](https://huggingface.co/spaces)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

[Live Demo](https://image-magic-olive.vercel.app/) • [Documentation](#documentation) • [Contributing](#contributing)

</div>

---

## 🎯 Project Overview

Nebula GenAI is a cutting-edge web application that harnesses the power of artificial intelligence to revolutionize image creation and transformation. Built with modern web technologies, it provides users with professional-quality AI tools for generating stunning images from text prompts and transforming existing images into various artistic styles.

### 🌟 What Makes Nebula GenAI Special

- **100% Free AI Processing**: Leverages Hugging Face Spaces for completely free AI image generation and transformations
- **No API Keys Required**: No billing setup or payment information needed
- **Professional Quality**: State-of-the-art diffusion models and neural style transfer
- **Modern UI/UX**: Clean, intuitive interface built with React and Tailwind CSS
- **Real-time Processing**: Fast AI transformations with live progress feedback

---

## 🚀 Key Features

### 🎨 AI Image Generation
- **Text-to-Image**: Generate photorealistic images from natural language descriptions
- **Style Control**: Create images in various styles (photorealistic, artistic, etc.)
- **Prompt Enhancement**: Automatic prompt optimization for better results
- **High Quality Output**: Professional-grade image generation

### 🖼️ AI-Powered Image Transformations
Transform your images into stunning artistic styles:

- **🎌 Ghibli Anime Style**: Convert photos to Studio Ghibli-inspired artwork
- **📸 Vintage Photography**: Apply classic vintage photo effects
- **🎨 Watercolor Painting**: Transform images into watercolor masterpieces
- **🖌️ Oil Painting**: Create oil painting-style artwork
- **🌆 Cyberpunk**: Apply futuristic cyberpunk aesthetics
- **📚 Comic Book**: Convert to comic book illustration style
- **🦸 Action Hero**: Apply dynamic action hero styling
- **⚫ Black & White**: Artistic monochrome transformations

### 🔧 Additional Features
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **MongoDB Database**: Secure user accounts and session management
- **Image Gallery**: View and manage your generated and transformed images
- **Download Support**: Save your creations in high quality
- **Real-time Preview**: See transformations as they happen

---

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1**: Modern React with hooks and functional components
- **TypeScript 5.6.2**: Type-safe development with full IntelliSense
- **Vite 6.0.1**: Lightning-fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **shadcn/ui**: High-quality, accessible UI component library

### Backend & AI Integration
- **Node.js/Express**: Proxy server for handling AI API requests
- **Hugging Face Spaces**: Free AI model hosting and inference
- **Neural Style Transfer**: Advanced AI models for image transformation
- **CORS Handling**: Secure cross-origin request management

### Development Tools
- **ESLint**: Code linting and quality assurance
- **PostCSS**: CSS processing and optimization
- **MongoDB**: Authentication and user management
- **React Router**: Client-side routing and navigation

---

## 📦 Installation & Setup

### Prerequisites
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** for cloning the repository
- **MongoDB** (v5.0 or higher) - [Download here](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/atlas) for cloud hosting

### 🔧 Quick Start

1. **Clone the Repository**
   ```bash
   git clone https://github.com/midlaj-muhammed/Nebula-GenAI.git
   cd Nebula-GenAI
   ```

2. **Install Frontend Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install Server Dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Environment Setup**
   ```bash
   # Copy environment template
   cp env.example .env
   cp server/env.example server/.env

   # Edit .env files with your configuration
   # Make sure to set up MongoDB connection string and JWT secret
   ```

5. **MongoDB Setup**
   ```bash
   # Start MongoDB locally (if using local installation)
   mongod

   # Or use MongoDB Atlas (cloud) - update connection string in .env files
   ```

6. **Start the Development Servers**

   **Terminal 1 - Proxy Server:**
   ```bash
   cd server
   npm start
   ```

   **Terminal 2 - React App:**
   ```bash
   npm run dev
   ```

7. **Open Your Browser**
   - Frontend: http://localhost:8082
   - Proxy Server: http://localhost:3001

### 🔑 Environment Variables (Optional)

Create `.env` files for enhanced functionality:

**Frontend (.env):**
```env
# MongoDB Configuration
VITE_MONGODB_URI=mongodb://localhost:27017/Nebula GenAI
VITE_MONGODB_URI_PROD=mongodb+srv://username:password@cluster.mongodb.net/Nebula GenAI

# JWT Secret for Authentication
VITE_JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# API Configuration
VITE_API_URL=http://localhost:3001

# Hugging Face Token (optional - for faster processing)
VITE_HF_TOKEN=your_hugging_face_token
```

**Server (server/.env):**
```env
# Server Configuration
PORT=3001
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/Nebula GenAI
MONGODB_URI_PROD=mongodb+srv://username:password@cluster.mongodb.net/Nebula GenAI

# JWT Secret for Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Hugging Face Configuration (optional)
HF_TOKEN=your_hugging_face_token
```

---

## 📖 Usage Guide

### 🎨 AI Image Generation

1. **Navigate to Generate Page**: Click "Generate" in the navigation
2. **Enter Your Prompt**: Describe the image you want to create
   - Example: "A serene mountain landscape at sunset with a lake"
3. **Click Generate**: Wait for the AI to create your image
4. **Download & Save**: Save your generated masterpiece

### 🖼️ Image Transformation

1. **Go to Image Editing Section**: Find it on the Generate page
2. **Upload Your Image**: Click to upload or drag & drop
3. **Enter Transformation Prompt**: Describe the style you want
   - Example: "convert to Ghibli anime style"
   - Example: "make it look like a vintage photograph"
4. **Transform**: Click the transform button and watch the magic happen
5. **Download Result**: Save your transformed artwork

### 💡 Pro Tips

- **Be Descriptive**: More detailed prompts often yield better results
- **Experiment**: Try different styles and combinations
- **High Quality Images**: Upload clear, well-lit images for best transformation results
- **Patience**: AI processing may take 30-60 seconds depending on complexity

---

## 🤖 AI Integration

### Hugging Face Spaces Integration

Nebula GenAI leverages **Hugging Face Spaces** for completely free AI processing:

- **Image Generation**: `black-forest-labs/FLUX.1-schnell` space for AI image creation
- **Image Transformation**: `Hexii/Neural-Style-Transfer` space for style transfer
- **Technology**: Advanced neural networks and diffusion models
- **Cost**: 100% free - no API keys or billing required
- **Quality**: Professional-grade AI generation and transformations
- **Reliability**: Backed by Hugging Face's robust infrastructure

### How It Works

1. **Image Upload**: Your image is securely processed through our proxy server
2. **AI Processing**: Hugging Face Spaces applies neural style transfer
3. **Style Transfer**: Advanced AI models transform your image
4. **Result Delivery**: Transformed image is returned and displayed
5. **Download**: Save your creation in high quality

### Supported Transformations

The AI can handle various artistic styles through natural language prompts:
- Artistic styles (anime, watercolor, oil painting)
- Photography effects (vintage, black & white)
- Genre transformations (cyberpunk, comic book)
- Custom style descriptions

---

## 📁 Project Structure

```
Nebula GenAI/
├── public/                 # Static assets
│   ├── logo.svg           # Nebula GenAI logo
│   ├── favicon.svg        # Favicon
│   └── images/            # Demo images and assets
├── src/                   # Source code
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── Navbar.tsx    # Navigation component
│   │   ├── Features.tsx  # Features showcase
│   │   └── ...           # Other components
│   ├── pages/            # Page components
│   │   ├── Index.tsx     # Home page
│   │   ├── Generate.tsx  # AI generation page
│   │   └── ...           # Other pages
│   ├── contexts/         # React contexts
│   │   └── AuthContext.tsx
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility libraries
│   │   └── utils.ts      # Helper functions
│   └── index.css         # Global styles
├── server/               # Express proxy server
│   ├── server.js         # Main server file
│   ├── package.json      # Server dependencies
│   └── .env.example      # Server environment template
├── package.json          # Frontend dependencies
├── tailwind.config.ts    # Tailwind CSS configuration
├── vite.config.ts        # Vite configuration
└── README.md             # This file
```

### Key Files & Directories

- **`src/components/`**: Reusable React components with TypeScript
- **`src/pages/`**: Main application pages and routing
- **`server/`**: Express.js proxy server for AI API integration
- **`public/`**: Static assets including logos and demo images
- **`tailwind.config.ts`**: Custom Tailwind CSS configuration with Nebula GenAI brand colors

---

## 🧪 Development

### Available Scripts

**Frontend:**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

**Server:**
```bash
cd server
npm start            # Start proxy server
npm run dev          # Start with nodemon (auto-restart)
```

### Code Quality

- **TypeScript**: Full type safety across the application
- **ESLint**: Automated code linting and formatting
- **Component Architecture**: Modular, reusable components
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Testing

```bash
# Run tests (when implemented)
npm test

# Run tests in watch mode
npm run test:watch
```

---

## 🤝 Contributing

We welcome contributions to Nebula GenAI! Here's how you can help:

### Getting Started

1. **Fork the Repository**
   ```bash
   git fork https://github.com/your-username/Nebula-GenAI.git
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Your Changes**
   - Follow the existing code style
   - Add TypeScript types for new features
   - Update documentation as needed

4. **Test Your Changes**
   ```bash
   npm run dev    # Test frontend
   cd server && npm start  # Test server
   ```

5. **Commit Your Changes**
   ```bash
   git commit -m "Add amazing feature"
   ```

6. **Push to Your Fork**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Open a Pull Request**
   - Describe your changes clearly
   - Include screenshots for UI changes
   - Reference any related issues

### Contribution Guidelines

- **Code Style**: Follow the existing TypeScript and React patterns
- **Commits**: Use clear, descriptive commit messages
- **Documentation**: Update README and code comments as needed
- **Testing**: Ensure your changes don't break existing functionality

### Areas for Contribution

- 🎨 **UI/UX Improvements**: Enhance the user interface and experience
- 🤖 **AI Integration**: Add new AI models or improve existing ones
- 🔧 **Performance**: Optimize loading times and responsiveness
- 📱 **Mobile**: Improve mobile experience and touch interactions
- 🧪 **Testing**: Add unit tests and integration tests
- 📚 **Documentation**: Improve guides and API documentation

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### MIT License Summary

- ✅ **Commercial Use**: Use Nebula GenAI in commercial projects
- ✅ **Modification**: Modify and adapt the code
- ✅ **Distribution**: Share and distribute the software
- ✅ **Private Use**: Use for personal projects
- ❗ **Liability**: No warranty or liability provided
- ❗ **Attribution**: Include original license and copyright notice

---

## 🙏 Acknowledgments

- **[Hugging Face](https://huggingface.co/)**: For providing free AI model hosting and inference
- **[Hexii/Neural-Style-Transfer](https://huggingface.co/spaces/Hexii/Neural-Style-Transfer)**: For the neural style transfer model
- **[shadcn/ui](https://ui.shadcn.com/)**: For the beautiful UI component library
- **[Tailwind CSS](https://tailwindcss.com/)**: For the utility-first CSS framework
- **[React](https://reactjs.org/)**: For the powerful frontend framework
- **[Vite](https://vitejs.dev/)**: For the lightning-fast build tool

---

## 📞 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/your-username/ImageMagic/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/ImageMagic/discussions)
- **Email**: support@imagemagic.dev (if applicable)

---

<div align="center">

**Made with ❤️ and ✨ AI Magic**

[⭐ Star this repo](https://github.com/your-username/ImageMagic) • [🐛 Report Bug](https://github.com/your-username/ImageMagic/issues) • [💡 Request Feature](https://github.com/your-username/ImageMagic/issues)

</div>
