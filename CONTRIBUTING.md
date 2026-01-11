# Contributing to OpenCode Plugin Marketplace

Thank you for your interest in contributing to the OpenCode Plugin Marketplace! This document explains how to add or update plugins.

## How to Contribute a Plugin

### 1. Fork the Repository

Fork this repository to your GitHub account and clone it locally.

```bash
git clone https://github.com/YOUR_USERNAME/opencode-plugin-marketplace.git
cd opencode-plugin-marketplace
```

### 2. Create a Plugin JSON File

Create a new file in the `plugins/` directory named `<your-plugin-name>.plugin.json`.

**Important naming rules:**
- Filename must match the `name` field in the JSON
- Use lowercase letters, numbers, and hyphens only
- Example: `my-awesome-plugin.plugin.json`

### 3. Fill Out Plugin Information

Use this template and fill in your plugin details:

```json
{
  "name": "your-plugin-name",
  "displayName": "Your Plugin Name",
  "description": "A clear, concise description of what your plugin does (10-500 characters).",
  "categories": ["Development", "Utilities"],
  "authors": [
    {
      "name": "Your Name",
      "url": "https://github.com/yourusername"
    }
  ],
  "license": "MIT",
  "links": {
    "repository": "https://github.com/yourusername/your-plugin",
    "homepage": "https://your-plugin-website.com",
    "documentation": "https://docs.your-plugin.com"
  },
  "opencode": {
    "minimumVersion": "1.0.0",
    "maximumVersion": "2.0.0"
  },
  "installation": {
    "summary": "Brief installation summary (10-200 characters)",
    "markdown": "## Installation\n\n1. Step one\n2. Step two\n3. Step three"
  },
  "usage": {
    "markdown": "## Usage\n\nHow to use your plugin..."
  },
  "maintained": true,
  "lastUpdated": "2026-01-10"
}
```

### 4. Available Categories

Choose one or more from:
- Development
- Productivity
- UI/UX
- Testing
- Debugging
- Documentation
- Integration
- Utilities
- AI/ML
- Other

### 5. Markdown Guidelines

You can use Markdown in `installation.markdown` and `usage.markdown` fields:

- Headings: `## Heading`, `### Subheading`
- Lists: `- Item` or `1. Item`
- Code blocks: ` ```language\ncode\n``` `
- Links: `[text](url)`
- **Bold** and *italic* text
- No raw HTML allowed (it will be sanitized)

### 6. Validate Your Plugin

Install dependencies and run validation:

```bash
cd scripts
npm install
npm run validate
```

Fix any errors reported by the validator.

### 7. Commit and Push

```bash
git add plugins/your-plugin-name.plugin.json
git commit -m "Add your-plugin-name to marketplace"
git push origin main
```

### 8. Create a Pull Request

1. Go to your fork on GitHub
2. Click "New Pull Request"
3. Provide a clear title: "Add [Plugin Name]"
4. Describe your plugin in the PR description
5. Submit the PR

### 9. Automated Checks

Our CI will automatically:
- Validate your JSON against the schema
- Check filename matches the plugin name
- Ensure no duplicate plugin names

If validation fails, fix the issues and push again.

### 10. Review and Merge

Maintainers will review your PR and may request changes. Once approved and merged, your plugin will automatically appear on the marketplace!

## Updating an Existing Plugin

To update a plugin:

1. Fork and clone the repository
2. Edit the existing plugin JSON file in `plugins/`
3. Update the `lastUpdated` field to today's date
4. Follow steps 6-10 above

## Plugin Schema

All plugins must validate against `schema/plugin.schema.json`. Required fields:

- `name` - Unique identifier (lowercase, alphanumeric, hyphens)
- `displayName` - Human-readable name
- `description` - 10-500 characters
- `categories` - At least one category
- `authors` - At least one author with name and URL
- `license` - SPDX license identifier
- `links.repository` - GitHub or Git repository URL
- `opencode.minimumVersion` - Minimum OpenCode version
- `installation.summary` and `installation.markdown`
- `maintained` - Boolean indicating active maintenance
- `lastUpdated` - Date in YYYY-MM-DD format

Optional fields:
- `links.homepage` - Plugin website
- `links.documentation` - Documentation URL
- `opencode.maximumVersion` - Maximum compatible version
- `usage.markdown` - Usage instructions

## Questions?

Open an issue on GitHub if you need help or have questions about contributing.

## Code of Conduct

Be respectful and constructive. We're all here to build great tools together.
