#!/bin/bash

# Make script exit on error
set -e

echo "🚀 Setting up development environment for KingCaleb.com..."

# Install project dependencies
echo "📦 Installing npm dependencies..."
npm install

# Create sample .env file if it doesn't exist
echo "🔧 Setting up environment variables..."
if [ ! -f .env ]; then
  echo "# Development environment variables" > .env
  echo "VITE_APP_TITLE=\"KingCaleb.com Development\"" >> .env
fi

# Final message
echo "✅ Development environment is ready!"
echo "🌐 Run 'npm run dev' to start the development server."