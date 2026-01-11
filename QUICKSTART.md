# Quick Start Guide - Get Your Marketplace Live in 10 Minutes

This guide gets your OpenCode Plugin Marketplace from code to live website in ~10 minutes.

## Prerequisites Checklist

- [ ] Node.js 20+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Git installed (`git --version`)
- [ ] GitHub account created
- [ ] Google/Firebase account created

## Step 1: Initial Setup (2 minutes)

### 1.1 Run Setup Script

```bash
cd opencode-plugin-marketplace
./setup.sh
```

This installs dependencies, validates plugins, and builds the app.

**Expected output:**
```
✅ Setup complete!
```

### 1.2 Verify Build

Check that `web/dist/` directory exists:
```bash
ls web/dist/
# Should show: index.html, assets/
```

## Step 2: Initialize Git Repository (1 minute)

```bash
# Initialize git
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit: OpenCode Plugin Marketplace"
```

## Step 3: Create GitHub Repository (2 minutes)

### Option A: GitHub CLI (faster)
```bash
gh repo create opencode-plugin-marketplace --public --source=. --push
```

### Option B: Web Interface
1. Go to https://github.com/new
2. Name: `opencode-plugin-marketplace`
3. Visibility: **Public**
4. Don't initialize with README (we have one)
5. Click "Create repository"

```bash
# Add remote and push
git remote add origin https://github.com/YOUR_USERNAME/opencode-plugin-marketplace.git
git branch -M main
git push -u origin main
```

## Step 4: Setup Firebase (3 minutes)

### 4.1 Install Firebase CLI
```bash
npm install -g firebase-tools
```

### 4.2 Login to Firebase
```bash
firebase login
```

### 4.3 Create Firebase Project

**Via Web Console:**
1. Go to https://console.firebase.google.com/
2. Click "Add project"
3. Name: `opencode-plugin-marketplace` (or your choice)
4. Disable Google Analytics (optional)
5. Click "Create project"

**Via CLI:**
```bash
firebase projects:create opencode-plugin-marketplace
```

### 4.4 Configure Firebase

```bash
# Copy example config
cp .firebaserc.example .firebaserc

# Edit .firebaserc
nano .firebaserc
# Change "your-firebase-project-id" to your actual project ID
```

Or run:
```bash
firebase use --add
# Select your project from list
```

### 4.5 Enable Hosting

```bash
firebase init hosting
```

Answers:
- **Select project**: Choose the one you just created
- **Public directory**: `web/dist`
- **Single-page app**: `Yes`
- **GitHub deploys**: `No` (we'll set up manually)
- **Overwrite index.html**: `No`

## Step 5: First Deployment (1 minute)

```bash
# Deploy to Firebase
firebase deploy --only hosting
```

**Success output:**
```
✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/...
Hosting URL: https://your-project-id.web.app
```

🎉 **Your marketplace is now live!**

Visit the URL shown in the output.

## Step 6: Setup GitHub Actions (1 minute)

### 6.1 Generate Service Account

```bash
firebase init hosting:github
```

This will:
- Ask for GitHub repository (enter: `your-username/opencode-plugin-marketplace`)
- Create service account
- Add GitHub secrets automatically
- Generate workflow files (we already have them)

**Important:** Say **"No"** when asked to overwrite workflow files.

### 6.2 Verify Secrets

Go to your GitHub repository:
- Settings → Secrets and variables → Actions
- Verify these exist:
  - `FIREBASE_SERVICE_ACCOUNT`
  - `FIREBASE_PROJECT_ID`

If missing, add manually (see FIREBASE_SETUP.md).

## Step 7: Test Automatic Deployment (1 minute)

### 7.1 Make a Test Change

```bash
# Edit README
echo "\n\nLive at: https://your-project-id.web.app" >> README.md

# Commit and push
git add README.md
git commit -m "Add live URL to README"
git push origin main
```

### 7.2 Watch Deployment

1. Go to GitHub repository → Actions tab
2. See workflow "Deploy to Firebase Hosting" running
3. Wait for green checkmark (~1-2 minutes)
4. Refresh your live site - changes should appear!

## Step 8: Test Plugin Contribution (Optional)

### 8.1 Create Test Branch

```bash
git checkout -b test-plugin
```

### 8.2 Add a Test Plugin

```bash
# Copy example
cp plugins/example-plugin.plugin.json plugins/test-plugin.plugin.json

# Edit with your info
nano plugins/test-plugin.plugin.json
# Change name to "test-plugin" and update fields
```

### 8.3 Validate

```bash
cd scripts
npm run validate
cd ..
```

### 8.4 Create Pull Request

```bash
git add plugins/test-plugin.plugin.json
git commit -m "Add test plugin"
git push origin test-plugin
```

Go to GitHub and create PR. Watch validation run!

## Troubleshooting

### Build Fails
```bash
cd web
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Deployment Fails
```bash
# Check Firebase project
firebase projects:list

# Check current project
firebase use

# Try deploying again
firebase deploy --only hosting --debug
```

### Validation Fails
```bash
cd scripts
npm run validate
# Fix errors shown
```

### GitHub Actions Not Running

1. Check `.github/workflows/` files exist
2. Check GitHub Actions enabled: Settings → Actions → General
3. Check secrets configured correctly
4. Try re-running workflow manually

## Verification Checklist

After completing all steps, verify:

- [ ] Website loads at Firebase URL
- [ ] All 4 example plugins visible
- [ ] Category filtering works
- [ ] Expandable sections work
- [ ] GitHub Actions workflow runs on push
- [ ] Validation workflow runs on PR
- [ ] Mobile responsive (test on phone)

## Next Steps

1. **Customize**: Update repository URL in `web/src/App.tsx` footer
2. **Domain**: Add custom domain in Firebase Console
3. **Monitor**: Check Firebase Console for usage stats
4. **Community**: Share your marketplace URL
5. **Maintain**: Accept plugin contributions via PR

## Getting Help

- GitHub Issues: [Create an issue](https://github.com/your-org/opencode-plugin-marketplace/issues)
- Firebase Support: https://firebase.google.com/support
- SolidJS Docs: https://www.solidjs.com/docs

## Success Metrics

After 10 minutes, you should have:
- ✅ Live marketplace website
- ✅ Automated deployments
- ✅ Automated validation
- ✅ 4 example plugins
- ✅ Full documentation
- ✅ Ready for contributions

**Congratulations! Your plugin marketplace is live! 🚀**

---

**Time Breakdown:**
- Step 1: 2 min (setup)
- Step 2: 1 min (git init)
- Step 3: 2 min (GitHub)
- Step 4: 3 min (Firebase)
- Step 5: 1 min (deploy)
- Step 6: 1 min (GitHub Actions)
- Step 7: 1 min (test)
- **Total: ~10 minutes**
