# Firebase Setup Guide

This guide walks you through setting up Firebase Hosting for the OpenCode Plugin Marketplace.

## Prerequisites

- Node.js 20+ installed
- A Google account
- Git and GitHub repository set up

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: `opencode-plugin-marketplace`
4. Disable Google Analytics (optional)
5. Click "Create project"

## Step 2: Install Firebase CLI

```bash
npm install -g firebase-tools
```

## Step 3: Login to Firebase

```bash
firebase login
```

This will open your browser for authentication.

## Step 4: Initialize Firebase Hosting

From the repository root:

```bash
firebase init hosting
```

Answer the prompts:
- **Select a Firebase project**: Choose the project you just created
- **What do you want to use as your public directory?**: `web/dist`
- **Configure as a single-page app?**: `Yes`
- **Set up automatic builds with GitHub?**: `No` (we'll use GitHub Actions)
- **Overwrite index.html?**: `No`

This creates:
- `.firebaserc` - Project configuration
- `firebase.json` - Hosting configuration (already exists)

## Step 5: Build and Deploy Manually

```bash
# Build the app
cd web
npm install
npm run build

# Return to root and deploy
cd ..
firebase deploy --only hosting
```

Your site will be live at: `https://your-project-id.web.app`

## Step 6: Set Up GitHub Actions Deployment

### Option A: Using Firebase CLI

```bash
firebase init hosting:github
```

This will:
1. Connect your GitHub repository
2. Create service account with deployment permissions
3. Add GitHub secrets automatically
4. Generate workflow files

### Option B: Manual Setup

1. **Generate Service Account Key**:
   - Go to Firebase Console > Project Settings > Service Accounts
   - Click "Generate New Private Key"
   - Save the JSON file securely

2. **Add GitHub Secrets**:
   - Go to your GitHub repository
   - Settings > Secrets and variables > Actions
   - Click "New repository secret"
   
   Add these secrets:
   - Name: `FIREBASE_SERVICE_ACCOUNT`
     Value: Paste entire JSON content from step 1
   
   - Name: `FIREBASE_PROJECT_ID`
     Value: Your Firebase project ID (e.g., `opencode-plugin-marketplace`)

3. **Verify Workflow Files Exist**:
   - `.github/workflows/deploy.yml` should already exist
   - `.github/workflows/validate.yml` should already exist

## Step 7: Test the Deployment

1. Make a change to a plugin JSON file
2. Commit and push to a branch
3. Create a Pull Request
4. GitHub Actions will validate the plugins
5. Merge the PR to `main`
6. GitHub Actions will build and deploy automatically

## Monitoring Deployments

### View Deployment History

```bash
firebase hosting:channel:list
```

### View Live Site

```bash
firebase open hosting:site
```

## Custom Domain (Optional)

1. Go to Firebase Console > Hosting
2. Click "Add custom domain"
3. Follow the DNS configuration steps
4. Wait for SSL certificate provisioning (automatic)

## Rollback a Deployment

```bash
# List recent deployments
firebase hosting:clone SOURCE_SITE_ID:SOURCE_CHANNEL_ID TARGET_SITE_ID:live

# Or redeploy a previous version
firebase hosting:channel:deploy preview
firebase hosting:channel:clone SITE_ID:preview SITE_ID:live
```

## Troubleshooting

### Build Fails

```bash
cd web
npm install
npm run build
```

Check for errors in the output.

### Deployment Fails

Verify your service account has the correct permissions:
- Firebase Hosting Admin
- Service Account User

### GitHub Actions Secrets

Ensure secrets are properly formatted:
- `FIREBASE_SERVICE_ACCOUNT`: Must be valid JSON
- `FIREBASE_PROJECT_ID`: Must match your Firebase project

### Local Preview

```bash
cd web
npm run build
cd ..
firebase serve
```

Visit `http://localhost:5000`

## Environment Variables

No environment variables needed for this static site. All data comes from JSON files in the repository.

## Security Rules

Since this is a static site with no database, no security rules are needed.

## Cost Estimation

Firebase Hosting free tier includes:
- 10 GB storage
- 360 MB/day bandwidth
- Custom domain & SSL included

This should be sufficient for most marketplace sites. Monitor usage in Firebase Console.

## Maintenance

### Regular Updates

```bash
# Update dependencies
cd web
npm update

# Test build
npm run build

# Deploy if successful
cd ..
firebase deploy
```

### Monitor Performance

- Firebase Console > Performance
- Check Core Web Vitals
- Monitor load times

## Support

- [Firebase Documentation](https://firebase.google.com/docs/hosting)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [SolidJS Documentation](https://www.solidjs.com/docs/latest)
