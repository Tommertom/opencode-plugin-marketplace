# GitHub Actions Workflows

This directory contains CI/CD workflows for the OpenCode Plugin Marketplace.

## Workflows

### 1. validate.yml - Plugin Validation

**Triggers:** Pull requests that modify plugin JSON files or schema

**Purpose:** Validates all plugin submissions before merging

**Steps:**
1. Checkout repository
2. Setup Node.js 20
3. Install validation dependencies
4. Run JSON Schema validation

**What it checks:**
- JSON syntax validity
- Schema compliance (all required fields)
- Filename matches plugin name
- No duplicate plugin names
- SPDX license format
- Valid URLs
- Date formats
- Semver version strings

**On Success:** Green checkmark on PR
**On Failure:** Red X with error details

### 2. deploy.yml - Automatic Deployment

**Triggers:** Push to `main` branch

**Purpose:** Builds and deploys the marketplace to Firebase Hosting

**Steps:**
1. Checkout repository
2. Setup Node.js 20
3. Install web dependencies
4. Build SolidJS application
5. Deploy to Firebase Hosting

**Requirements:**
- `FIREBASE_SERVICE_ACCOUNT` secret configured
- `FIREBASE_PROJECT_ID` secret configured
- Firebase project initialized

**Output:** Live site updates at `https://your-project-id.web.app`

## Setup GitHub Secrets

Go to repository Settings → Secrets and variables → Actions

Add these secrets:

### FIREBASE_SERVICE_ACCOUNT
```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "...",
  "private_key": "...",
  "client_email": "...",
  ...
}
```

Get this from:
1. Firebase Console → Project Settings → Service Accounts
2. Click "Generate New Private Key"
3. Copy entire JSON content

### FIREBASE_PROJECT_ID
Your Firebase project ID (e.g., `opencode-plugin-marketplace`)

## Testing Locally

### Test Validation
```bash
cd scripts
npm install
npm run validate
```

### Test Build
```bash
cd web
npm install
npm run build
```

### Test Deployment
```bash
firebase deploy --only hosting
```

## Workflow Status

View workflow runs:
- Go to repository → Actions tab
- See all past runs and their status
- Click any run to see detailed logs

## Debugging Failed Workflows

### Validation Failure
1. Check workflow logs for specific errors
2. Fix plugin JSON files
3. Run validation locally
4. Push fixes

### Deployment Failure
Common issues:
- Invalid Firebase service account
- Missing secrets
- Build errors (check Node.js version)
- Firebase project permissions

### Re-running Workflows
- Go to failed workflow run
- Click "Re-run all jobs"

## Customization

### Change Node.js Version
Edit both workflow files:
```yaml
- uses: actions/setup-node@v4
  with:
    node-version: '20'  # Change this
```

### Add More Validation
Edit `scripts/validate-plugins.js`

### Add Pre-deployment Tests
Add steps before deploy in `deploy.yml`:
```yaml
- name: Run tests
  run: npm test
```

## Security Notes

- Secrets are encrypted by GitHub
- Never commit service account JSON
- Use read-only tokens when possible
- Rotate secrets periodically
- Limit service account permissions

## Cost

GitHub Actions free tier:
- 2000 minutes/month for private repos
- Unlimited for public repos

This marketplace uses ~1-2 minutes per deployment.
