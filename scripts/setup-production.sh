#!/bin/bash

# Production Setup Script for Nebula GenAI
echo "🚀 Setting up Nebula GenAI for production..."

# Check if .env.production exists
if [ ! -f ".env.production" ]; then
    echo "📝 Creating .env.production from template..."
    cp env.production.example .env.production
    echo "⚠️  Please edit .env.production with your actual production values!"
fi

# Check if server/.env exists
if [ ! -f "server/.env" ]; then
    echo "📝 Creating server/.env from template..."
    cp server/env.production.example server/.env
    echo "⚠️  Please edit server/.env with your actual production values!"
fi

# Install dependencies
echo "📦 Installing frontend dependencies..."
npm install

echo "📦 Installing backend dependencies..."
cd server && npm install && cd ..

# Build frontend for production
echo "🔨 Building frontend for production..."
npm run build

echo "✅ Production setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Edit .env.production with your production URLs and credentials"
echo "2. Edit server/.env with your production settings"
echo "3. Deploy backend to your hosting platform (Render, Railway, etc.)"
echo "4. Deploy frontend to your hosting platform (Vercel, Netlify, etc.)"
echo ""
echo "📖 See DEPLOYMENT.md for detailed deployment instructions" 