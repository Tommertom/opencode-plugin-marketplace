# 🚀 Deployment Checklist

Use this checklist to ensure proper deployment of your OpenCode Plugin Marketplace.

## Pre-Deployment Checks

### Local Environment
- [ ] Node.js 20+ installed
- [ ] npm installed
- [ ] Firebase CLI installed (`npm install -g firebase-tools`)
- [ ] Git installed
- [ ] GitHub account ready
- [ ] Google/Firebase account ready

### Project Setup
- [ ] Dependencies installed (run `./setup.sh`)
- [ ] Plugins validated (run `cd scripts && npm run validate`)
- [ ] Build successful (run `cd web && npm run build`)
- [ ] Verification passed (run `./verify.sh`)

## GitHub Setup

- [ ] GitHub repository created (public)
- [ ] Local git initialized (`git init`)
- [ ] Remote added (`git remote add origin ...`)
- [ ] Code pushed to main branch
- [ ] Repository is public (required for free GitHub Actions)

## Firebase Setup

### Project Creation
- [ ] Firebase project created
- [ ] Project ID noted (e.g., `opencode-plugin-marketplace`)
- [ ] Hosting enabled

### Local Configuration
- [ ] Firebase CLI logged in (`firebase login`)
- [ ] Project selected (`firebase use --add`)
- [ ] `.firebaserc` configured with project ID
- [ ] Test deployment works (`firebase deploy`)

### Service Account
- [ ] Service account created
- [ ] JSON key downloaded
- [ ] Appropriate permissions granted:
  - [ ] Firebase Hosting Admin
  - [ ] Service Account User

## GitHub Actions Setup

### Secrets Configuration
Go to: Repository Settings → Secrets and variables → Actions

- [ ] `FIREBASE_SERVICE_ACCOUNT` added
  - Value: Complete service account JSON
  - Test: JSON is valid
  
- [ ] `FIREBASE_PROJECT_ID` added
  - Value: Your Firebase project ID
  - Test: Matches Firebase Console

### Workflow Verification
- [ ] `.github/workflows/validate.yml` exists
- [ ] `.github/workflows/deploy.yml` exists
- [ ] GitHub Actions enabled in repository settings
- [ ] Test: Create PR with test plugin (validation should run)
- [ ] Test: Merge to main (deployment should run)

## First Deployment

### Manual Deployment
```bash
# 1. Build
cd web && npm run build && cd ..

# 2. Deploy
firebase deploy --only hosting

# 3. Verify
# Visit the URL shown in output
```

- [ ] Manual deployment successful
- [ ] Site loads correctly
- [ ] All plugins visible
- [ ] Categories work
- [ ] No console errors

### Automatic Deployment Test
```bash
# 1. Make a change
echo "\nTest change" >> README.md

# 2. Commit and push
git add README.md
git commit -m "Test deployment"
git push origin main
```

- [ ] GitHub Action triggered
- [ ] Workflow completed successfully
- [ ] Site updated automatically
- [ ] Changes visible on live site

## Post-Deployment Verification

### Website Functionality
- [ ] Homepage loads
- [ ] All plugins display correctly
- [ ] Category filtering works
- [ ] Plugin expansion works
- [ ] Markdown renders correctly
- [ ] Code blocks formatted
- [ ] Links work (repository, homepage, docs)
- [ ] Footer links correct
- [ ] Mobile responsive

### Performance
- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3.5s
- [ ] No JavaScript errors
- [ ] No console warnings

### CI/CD Pipeline
- [ ] Validation runs on PR
- [ ] Deployment runs on merge
- [ ] Both workflows complete successfully
- [ ] Notifications working (if configured)

## Security Checks

- [ ] No secrets in code
- [ ] No service account JSON in repository
- [ ] `.gitignore` includes sensitive files
- [ ] HTTPS enforced (automatic with Firebase)
- [ ] No exposed API keys
- [ ] Links use `rel="noopener noreferrer"`

## Documentation Updates

- [ ] README.md has correct live URL
- [ ] CONTRIBUTING.md mentions repository
- [ ] Footer in App.tsx has correct repository link
- [ ] QUICKSTART.md references correct project

## Monitoring Setup

### Firebase Console
- [ ] Hosting dashboard reviewed
- [ ] Usage metrics enabled
- [ ] Alerts configured (optional)
- [ ] Custom domain configured (if applicable)

### GitHub
- [ ] Watch repository for notifications
- [ ] PR templates working
- [ ] Issue templates created (optional)
- [ ] Branch protection rules set (optional)

## Community Setup

- [ ] Repository description added
- [ ] Topics/tags added to GitHub repo
- [ ] README badges added (optional)
- [ ] Social preview image set (optional)
- [ ] CONTRIBUTING.md reviewed
- [ ] Code of conduct added (optional)

## Final Verification

Run through this user flow:
1. [ ] Visit live site
2. [ ] Browse all plugins
3. [ ] Filter by category
4. [ ] Expand a plugin
5. [ ] Click repository link
6. [ ] View installation instructions
7. [ ] Test on mobile device
8. [ ] Share URL with others

## Rollback Plan

If something goes wrong:

### Rollback Deployment
```bash
# List deployments
firebase hosting:releases:list

# Clone previous to live
firebase hosting:clone SOURCE_SITE_ID:SOURCE_CHANNEL_ID TARGET_SITE_ID:live
```

### Rollback Code
```bash
# Revert last commit
git revert HEAD
git push origin main

# Or reset to specific commit
git reset --hard <commit-hash>
git push origin main --force
```

## Success Criteria

Your deployment is successful when:
- ✅ Live site accessible via Firebase URL
- ✅ All plugins render correctly
- ✅ No console errors
- ✅ Automated deployments working
- ✅ PR validation working
- ✅ Documentation complete
- ✅ Mobile responsive
- ✅ Performance score > 90
- ✅ Ready to accept contributions

## Maintenance Schedule

### Daily
- [ ] Check for new PRs
- [ ] Review pending contributions

### Weekly
- [ ] Review GitHub Actions usage
- [ ] Check Firebase usage metrics
- [ ] Update dependencies if needed

### Monthly
- [ ] Review and update plugins
- [ ] Check for outdated packages
- [ ] Update documentation if needed

## Getting Help

If stuck:
1. Check `DOCS_INDEX.md` for relevant guide
2. Run `./verify.sh` to diagnose issues
3. Review GitHub Actions logs
4. Check Firebase Console for errors
5. Search GitHub Issues
6. Create new issue with details

---

**Completion Date**: __________

**Deployed By**: __________

**Live URL**: https://___________.web.app

**Status**: ⬜ Not Started | ⬜ In Progress | ⬜ Complete
