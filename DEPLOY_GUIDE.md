# 🚀 Step-by-Step: Deploy to Your External Portainer Server

## ✅ **Step 1: Create GitHub Repository**

1. **Go to [GitHub.com](https://github.com) and sign in**
2. **Click the "+" icon → "New repository"**
3. **Repository details:**
   - **Name:** `orbitx-website` (or your preferred name)
   - **Description:** `Modern OrbitX LED lighting website with Docker support`
   - **Visibility:** Public or Private (your choice)
   - **DON'T** initialize with README, .gitignore, or license (we already have these)

4. **Click "Create repository"**

## ✅ **Step 2: Push Your Code to GitHub**

After creating the repository, GitHub will show you commands. Run these in your terminal:

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/orbitx-website.git

# Push the code to GitHub
git branch -M main
git push -u origin main
```

## ✅ **Step 3: Deploy in Portainer**

1. **Access your Portainer dashboard:** `https://your-server-ip:9000`

2. **Navigate to:** Stacks → Add Stack

3. **Fill in the details:**
   - **Name:** `orbitx-website`
   - **Build method:** Select **"Repository"**
   - **Repository URL:** `https://github.com/YOUR_USERNAME/orbitx-website`
   - **Repository reference:** `refs/heads/main`
   - **Compose path:** `docker-compose.yml`
   - **Auto-updates:** Enable (optional, for automatic updates when you push changes)

4. **Environment variables (optional):**
   ```
   NODE_ENV=production
   NEXT_TELEMETRY_DISABLED=1
   ```

5. **Click "Deploy the stack"**

## ✅ **Step 4: Access Your Website**

Once deployed successfully:
- **Website URL:** `http://your-server-ip:3000`
- **Check status:** Portainer → Stacks → orbitx-website → containers

## 🔄 **For Production (Port 80):**

If you want your website on port 80 (standard web port):

1. **In Portainer, when creating the stack:**
   - **Compose path:** `docker-compose.prod.yml` (instead of docker-compose.yml)
   - **Access:** `http://your-server-ip` (no port needed)

## 🆘 **Troubleshooting:**

**If deployment fails:**
1. Check Portainer logs: Stacks → orbitx-website → Editor → View logs
2. Ensure your server has internet access to clone from GitHub
3. Verify Docker is running on your server
4. Check firewall allows port 3000

**If you can't access the website:**
1. Verify container is running: Portainer → Containers → orbitx-website
2. Check server firewall allows port 3000
3. Try accessing from server directly: `curl http://localhost:3000`

---

## 📋 **Quick Checklist:**

- ✅ Repository created on GitHub
- ✅ Code pushed to GitHub 
- ✅ Portainer stack created
- ✅ Stack deployed successfully
- ✅ Firewall allows port 3000
- ✅ Website accessible at your-server-ip:3000

**Your modern OrbitX website with all assets will be live! 🎉**
