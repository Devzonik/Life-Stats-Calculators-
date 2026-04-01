# Deployment Guide for Hostinger

This project is configured for automatic deployment from GitHub to Hostinger. If the automatic deployment is not working, follow these steps to diagnose and fix it.

## 1. GitHub Actions Setup (Recommended)

We have added a GitHub Actions workflow in `.github/workflows/deploy.yml`. To use it, you need to add the following secrets to your GitHub repository:

1.  **HOSTINGER_HOST**: Your Hostinger server IP or domain.
2.  **HOSTINGER_USERNAME**: Your SSH username (usually the one provided in Hostinger's SSH access panel).
3.  **HOSTINGER_SSH_KEY**: Your private SSH key. (Make sure the corresponding public key is added to `~/.ssh/authorized_keys` on your Hostinger server).
4.  **HOSTINGER_PROJECT_PATH**: The absolute path to your project on the server (e.g., `/home/u123456789/public_html`).
5.  **HOSTINGER_PORT**: (Optional) Your SSH port, defaults to 22.

### How to generate SSH keys:
On your local machine:
```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```
- Copy the content of `~/.ssh/id_rsa.pub` to Hostinger's "SSH Access" -> "Add SSH Key".
- Copy the content of `~/.ssh/id_rsa` to GitHub "Settings" -> "Secrets and variables" -> "Actions" -> "New repository secret" as `HOSTINGER_SSH_KEY`.

## 2. Manual Deployment & Debugging

If you have SSH access to your Hostinger server, you can use the provided `deploy.sh` script to manually update your site:

1.  **Connect to your server via SSH**:
    ```bash
    ssh your_username@your_host
    ```
2.  **Navigate to your project directory**:
    ```bash
    cd /path/to/your/project
    ```
3.  **Run the deployment script**:
    ```bash
    chmod +x deploy.sh
    ./deploy.sh
    ```

## 3. Common Issues & Fixes

### Build Command
The correct build command for this project is `npm run build`. This generates the `dist/` directory.

### Publish Directory
Hostinger should be configured to serve the `dist/` directory for static files, but since this is a full-stack app, the server (`server.ts`) handles the serving. Ensure Hostinger is running `npm start`.

### Node.js Version
This project requires Node.js 22 or higher for native TypeScript support. You can check your version on Hostinger with:
```bash
node -v
```
If it's lower, you may need to use `nvm` to install a newer version or use `tsx` to run the server.

### Environment Variables
Ensure your `.env` file exists on the server or set the environment variables in Hostinger's panel.

### CORS & API Endpoints
The server is configured with `cors` to allow cross-origin requests. If you encounter CORS issues, ensure your frontend URL is allowed in the `server.ts` configuration.
- Health Check: `/api/health`
- Blog Posts API: `/api/posts`

### Clearing Build Cache
If your changes are not reflecting, try clearing the `dist` directory and the npm cache:
```bash
rm -rf dist
npm cache clean --force
npm install
npm run build
```

### PM2 (Process Manager)
We recommend using PM2 to keep your app running:
```bash
npm install -g pm2
pm2 start server.ts --name lifestats --interpreter tsx
pm2 save
pm2 startup
```

## 4. Deployment Checklist
- [ ] Push code to `main` branch.
- [ ] GitHub Action triggers and completes successfully.
- [ ] `dist/` directory is updated on the server.
- [ ] Server is restarted (check logs with `pm2 logs lifestats`).
- [ ] Live URL reflects the latest changes.
