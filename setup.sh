#!/bin/bash

set -e

echo "🚀 OpenCode Plugin Marketplace - Quick Start"
echo "=============================================="
echo ""

# Check if we're in the right directory
if [ ! -f "firebase.json" ]; then
    echo "❌ Error: Please run this script from the repository root"
    exit 1
fi

# Install validation dependencies
echo "📦 Installing validation dependencies..."
cd scripts
npm install
cd ..

# Install web dependencies
echo "📦 Installing web dependencies..."
cd web
npm install
cd ..

# Validate plugins
echo "✅ Validating plugin files..."
cd scripts
npm run validate
cd ..

# Build the app
echo "🔨 Building SolidJS app..."
cd web
npm run build
cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Set up Firebase: See FIREBASE_SETUP.md"
echo "2. Copy .firebaserc.example to .firebaserc and update project ID"
echo "3. Run 'firebase deploy' to deploy"
echo ""
echo "For local development:"
echo "  cd web && npm run dev"
echo ""
echo "To add a plugin:"
echo "  See CONTRIBUTING.md"
