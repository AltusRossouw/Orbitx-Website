# Git Repository Setup Instructions

## Push to Git Repository

1. **Initialize Git repository (if not already done):**
```bash
git init
git add .
git commit -m "Initial commit: OrbitX website with Docker support"
```

2. **Add remote repository:**
```bash
# Replace with your actual repository URL
git remote add origin https://github.com/yourusername/orbitx-website.git
git branch -M main
git push -u origin main
```

3. **Make sure these files are in your repository:**
- Dockerfile
- docker-compose.yml
- docker-compose.prod.yml
- package.json
- All source files and assets
- nginx.conf (for production deployment)
