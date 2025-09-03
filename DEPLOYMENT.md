# Railway Deployment Guide

This guide explains how to deploy the eSIM website to Railway.

## Prerequisites

- Node.js 20+
- Railway account
- GitHub repository connected to Railway

## Deployment Configuration

The project includes several configuration files for Railway deployment:

### 1. `nixpacks.toml`
Configures the Nixpacks build process:
- Uses Node.js 20 and npm
- Installs dependencies with `npm ci --legacy-peer-deps --no-optional`
- Builds the project with `npm run build:railway`
- Starts the server with `npm start`

### 2. `railway.json`
Railway-specific deployment configuration:
- Specifies Nixpacks as the builder
- Sets health check parameters
- Configures environment variables

### 3. `package.json` Scripts
Key scripts for deployment:
- `build:railway`: Builds both client and server bundles
- `start`: Starts the production server
- `verify-deployment`: Checks deployment readiness

## Deployment Steps

### 1. Prepare Repository
Ensure all source files are committed to git:
```bash
git add .
git commit -m "Update deployment configuration"
git push origin main
```

### 2. Connect to Railway
1. Go to [Railway](https://railway.app)
2. Create new project from GitHub repository
3. Select your repository
4. Railway will automatically detect the configuration

### 3. Environment Variables
Set these environment variables in Railway dashboard:
- `NODE_ENV=production`
- `PORT=3000` (Railway will override this)

### 4. Deploy
Railway will automatically deploy when you push to main branch.

## Troubleshooting

### Build Fails with "Nixpacks was unable to generate a build plan"

This usually means essential files are missing. Run locally:
```bash
npm run verify-deployment
```

Check that these files exist:
- `package.json`
- `vite.config.ts`
- `nixpacks.toml`
- `railway.json`
- `src/entry-server.js`

### Build Succeeds but App Crashes

1. Check Railway logs for errors
2. Verify the build output:
```bash
npm run build:railway
ls -la dist/client/
ls -la dist/server/
```

3. Test locally:
```bash
npm start
```

### Dependencies Issues

If you get dependency errors:
1. Delete `node_modules` and `package-lock.json`
2. Run `npm install --legacy-peer-deps`
3. Commit the updated `package-lock.json`

## Build Process

The deployment process:
1. **Setup**: Install Node.js 20 and npm
2. **Install**: Run `npm ci --legacy-peer-deps --no-optional`
3. **Build**: Run `npm run build:railway`
   - Builds client bundle to `dist/client/`
   - Builds server bundle to `dist/server/`
   - Copies static assets and translations
4. **Start**: Run `npm start` (starts `server-production.js`)

## File Structure After Build

```
dist/
├── client/           # Client-side assets
│   ├── index.html
│   ├── assets/
│   ├── locales/
│   └── plans.json
└── server/           # Server-side bundles
    ├── entry-server.js
    └── chunks/
```

## Local Testing

Before deploying, always test locally:
```bash
# Install dependencies
npm install --legacy-peer-deps

# Build the project
npm run build:railway

# Start production server
npm start

# Verify deployment readiness
npm run verify-deployment
```

## Common Issues

1. **Module not found errors**: Usually missing dependencies in package.json
2. **Build timeouts**: Large bundle sizes, consider code splitting
3. **Runtime errors**: Check server logs and ensure all assets are copied correctly

For more help, check Railway documentation or the project's GitHub issues. 