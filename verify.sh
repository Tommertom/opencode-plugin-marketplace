#!/bin/bash

# Verification script for OpenCode Plugin Marketplace
# Runs all checks to ensure the project is properly set up

set -e

echo "🔍 OpenCode Plugin Marketplace - Verification Script"
echo "====================================================="
echo ""

ERRORS=0

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

function error() {
    echo -e "${RED}❌ $1${NC}"
    ERRORS=$((ERRORS + 1))
}

function success() {
    echo -e "${GREEN}✅ $1${NC}"
}

function warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Check Node.js
echo "Checking Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    success "Node.js installed: $NODE_VERSION"
else
    error "Node.js not found. Please install Node.js 20+"
fi
echo ""

# Check npm
echo "Checking npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    success "npm installed: $NPM_VERSION"
else
    error "npm not found"
fi
echo ""

# Check directory structure
echo "Checking directory structure..."
REQUIRED_DIRS=("web/src" "plugins" "schema" "scripts" ".github/workflows")
for dir in "${REQUIRED_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        success "Directory exists: $dir"
    else
        error "Missing directory: $dir"
    fi
done
echo ""

# Check required files
echo "Checking required files..."
REQUIRED_FILES=(
    "README.md"
    "CONTRIBUTING.md"
    "LICENSE"
    "firebase.json"
    "setup.sh"
    "web/package.json"
    "web/vite.config.ts"
    "web/index.html"
    "schema/plugin.schema.json"
    "scripts/validate-plugins.js"
    ".github/workflows/validate.yml"
    ".github/workflows/deploy.yml"
)
for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        success "File exists: $file"
    else
        error "Missing file: $file"
    fi
done
echo ""

# Check plugin files
echo "Checking plugin files..."
PLUGIN_COUNT=$(ls plugins/*.plugin.json 2>/dev/null | wc -l)
if [ "$PLUGIN_COUNT" -gt 0 ]; then
    success "Found $PLUGIN_COUNT plugin(s)"
else
    error "No plugin files found in plugins/"
fi
echo ""

# Check dependencies
echo "Checking dependencies..."
if [ -d "web/node_modules" ]; then
    success "Web dependencies installed"
else
    warning "Web dependencies not installed. Run: cd web && npm install"
fi

if [ -d "scripts/node_modules" ]; then
    success "Script dependencies installed"
else
    warning "Script dependencies not installed. Run: cd scripts && npm install"
fi
echo ""

# Validate plugins if dependencies are installed
if [ -d "scripts/node_modules" ]; then
    echo "Validating plugins..."
    cd scripts
    if npm run validate --silent 2>/dev/null; then
        success "All plugins are valid"
    else
        error "Plugin validation failed. Run: cd scripts && npm run validate"
    fi
    cd ..
    echo ""
fi

# Check build if dependencies are installed
if [ -d "web/node_modules" ]; then
    echo "Testing build..."
    cd web
    if npm run build --silent 2>/dev/null; then
        success "Build successful"
        if [ -d "dist" ]; then
            DIST_SIZE=$(du -sh dist | cut -f1)
            success "Build output: $DIST_SIZE"
        fi
    else
        error "Build failed. Run: cd web && npm run build"
    fi
    cd ..
    echo ""
fi

# Check Firebase CLI
echo "Checking Firebase CLI..."
if command -v firebase &> /dev/null; then
    FIREBASE_VERSION=$(firebase --version)
    success "Firebase CLI installed: $FIREBASE_VERSION"
else
    warning "Firebase CLI not installed. Run: npm install -g firebase-tools"
fi
echo ""

# Check Git
echo "Checking Git..."
if command -v git &> /dev/null; then
    success "Git installed: $(git --version)"
    if [ -d ".git" ]; then
        success "Git repository initialized"
    else
        warning "Not a git repository. Run: git init"
    fi
else
    warning "Git not found"
fi
echo ""

# Check Firebase config
echo "Checking Firebase configuration..."
if [ -f ".firebaserc" ]; then
    success "Firebase config exists"
else
    warning "Firebase not configured. Copy .firebaserc.example to .firebaserc"
fi
echo ""

# Summary
echo "====================================================="
echo "Verification Summary"
echo "====================================================="
if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✅ All checks passed! Your marketplace is ready.${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Initialize git: git init"
    echo "2. Configure Firebase: cp .firebaserc.example .firebaserc"
    echo "3. Deploy: firebase deploy"
    echo ""
    echo "Or follow QUICKSTART.md for detailed instructions."
    exit 0
else
    echo -e "${RED}❌ $ERRORS error(s) found. Please fix them before proceeding.${NC}"
    exit 1
fi
