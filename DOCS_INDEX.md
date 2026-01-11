# 📚 Documentation Index

Quick navigation to all documentation in the OpenCode Plugin Marketplace.

## 🚀 Getting Started

| Document | Purpose | For |
|----------|---------|-----|
| **[QUICKSTART.md](QUICKSTART.md)** | Get live in 10 minutes | New users |
| **[README.md](README.md)** | Project overview & features | Everyone |
| **[setup.sh](setup.sh)** | Automated setup script | Developers |

## 👥 Contributing

| Document | Purpose | For |
|----------|---------|-----|
| **[CONTRIBUTING.md](CONTRIBUTING.md)** | How to add plugins | Contributors |
| **Example Plugin** → `plugins/example-plugin.plugin.json` | Template | Contributors |

## 🔧 Technical Documentation

| Document | Purpose | For |
|----------|---------|-----|
| **[FIREBASE_SETUP.md](FIREBASE_SETUP.md)** | Deployment guide | Maintainers |
| **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** | Complete technical overview | Developers |
| **[.github/workflows/README.md](.github/workflows/README.md)** | CI/CD explanation | DevOps |

## 📝 Configuration Files

| File | Purpose |
|------|---------|
| `firebase.json` | Firebase Hosting config |
| `.firebaserc.example` | Firebase project template |
| `.gitignore` | Git ignore rules |
| `schema/plugin.schema.json` | JSON Schema validator |

## 📦 Package Files

| Directory | File | Purpose |
|-----------|------|---------|
| `web/` | `package.json` | Frontend dependencies |
| `web/` | `tsconfig.json` | TypeScript config |
| `web/` | `vite.config.ts` | Vite build config |
| `scripts/` | `package.json` | Validation deps |

## 🔍 Source Code

### Frontend Application (`web/src/`)

| File | Purpose | Lines |
|------|---------|-------|
| `App.tsx` | Main application | ~50 |
| `App.css` | Global styles | ~350 |
| `index.tsx` | Entry point | ~10 |
| `components/PluginCard.tsx` | Plugin display | ~100 |
| `data/types.ts` | TypeScript types | ~20 |
| `data/plugins.ts` | Data loader | ~10 |

### Validation (`scripts/`)

| File | Purpose | Lines |
|------|---------|-------|
| `validate-plugins.js` | JSON Schema validation | ~90 |

### CI/CD (`.github/workflows/`)

| File | Purpose | Lines |
|------|---------|-------|
| `validate.yml` | PR validation | ~25 |
| `deploy.yml` | Auto-deployment | ~30 |

## 🎨 Sample Plugins (`plugins/`)

| Plugin | Categories | Features |
|--------|-----------|----------|
| `example-plugin` | Development, Utilities | Basic template |
| `ai-assistant-plugin` | Development, AI/ML | Advanced example |
| `theme-studio` | UI/UX | Custom themes |
| `test-runner-pro` | Testing, Debugging | Comprehensive docs |

## 📊 Project Statistics

- **Total Files**: 30 source files
- **Lines of Code**: ~623 lines
- **Documentation**: 5 markdown files
- **Sample Plugins**: 4 validated examples
- **CI/CD Workflows**: 2 GitHub Actions
- **Build Size**: ~47 KB (gzipped)

## 🎯 Quick Reference

### For Users
1. Start here: **[README.md](README.md)**
2. See it work: Visit live demo (after deployment)

### For Contributors
1. Read: **[CONTRIBUTING.md](CONTRIBUTING.md)**
2. Copy: `plugins/example-plugin.plugin.json`
3. Validate: `cd scripts && npm run validate`

### For Maintainers
1. Setup: **[QUICKSTART.md](QUICKSTART.md)** (10 minutes)
2. Deploy: **[FIREBASE_SETUP.md](FIREBASE_SETUP.md)**
3. Monitor: Firebase Console

### For Developers
1. Overview: **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)**
2. Install: `./setup.sh`
3. Develop: `cd web && npm run dev`

## 🔗 External Resources

- [SolidJS Documentation](https://www.solidjs.com/docs/latest)
- [Vite Documentation](https://vitejs.dev/)
- [Firebase Hosting](https://firebase.google.com/docs/hosting)
- [JSON Schema](https://json-schema.org/)
- [GitHub Actions](https://docs.github.com/en/actions)

## 🆘 Support

### Common Tasks

| Task | Command |
|------|---------|
| Install dependencies | `./setup.sh` |
| Validate plugins | `cd scripts && npm run validate` |
| Build frontend | `cd web && npm run build` |
| Run dev server | `cd web && npm run dev` |
| Deploy manually | `firebase deploy` |

### Troubleshooting

See specific guides:
- Build issues → **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** § Troubleshooting
- Deployment issues → **[FIREBASE_SETUP.md](FIREBASE_SETUP.md)** § Troubleshooting
- GitHub Actions → **[.github/workflows/README.md](.github/workflows/README.md)** § Debugging

### Getting Help

1. Check relevant documentation above
2. Search [GitHub Issues](https://github.com/your-org/opencode-plugin-marketplace/issues)
3. Create new issue with details

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file.

---

**Last Updated**: 2026-01-10  
**Version**: 1.0.0  
**Status**: Production Ready ✅
