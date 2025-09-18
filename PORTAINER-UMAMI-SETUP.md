# Portainer Deployment with Umami Analytics

## Quick Fix for "Umami Not Found" Error

The issue occurs because environment variables are not set in your Portainer deployment. Here are two ways to fix it:

## Method 1: Using Portainer Environment Variables (Recommended)

### In Portainer Web UI:

1. **Go to your OrbitX stack in Portainer**
2. **Click "Editor" or "Edit Stack"**
3. **Scroll down to "Environment variables" section**
4. **Add these variables:**

```
NEXT_PUBLIC_UMAMI_WEBSITE_ID=1bcbdb6f-8263-4ef0-8a49-340172b88292
NEXT_PUBLIC_UMAMI_SRC=https://umami.intellixlabs.co.za/script.js
```

5. **Click "Update the stack"**
6. **Wait for deployment to complete**

### Screenshot Guide:
```
Portainer → Stacks → orbitx → Editor → Environment variables
┌─────────────────────────────────────────────────────────┐
│ Name: NEXT_PUBLIC_UMAMI_WEBSITE_ID                      │
│ Value: 1bcbdb6f-8263-4ef0-8a49-340172b88292             │
├─────────────────────────────────────────────────────────┤
│ Name: NEXT_PUBLIC_UMAMI_SRC                             │
│ Value: https://umami.intellixlabs.co.za/script.js       │
└─────────────────────────────────────────────────────────┘
```

## Method 2: Using .env File on Server

### If you have server access:

1. **SSH into your server**
2. **Navigate to your OrbitX project directory**
3. **Create a .env file:**

```bash
nano .env
```

4. **Add the content:**
```bash
# Umami Analytics Configuration
NEXT_PUBLIC_UMAMI_WEBSITE_ID=1bcbdb6f-8263-4ef0-8a49-340172b88292
NEXT_PUBLIC_UMAMI_SRC=https://umami.intellixlabs.co.za/script.js

# Other environment variables (copy from .env.example)
ORBITX_PORT=3330
NODE_ENV=production
CONTAINER_NAME=orbitx-website
```

5. **Redeploy the stack in Portainer**

## Method 3: Direct Docker Compose Update

### If using docker-compose command line:

```bash
# Set environment variables and deploy
export NEXT_PUBLIC_UMAMI_WEBSITE_ID="1bcbdb6f-8263-4ef0-8a49-340172b88292"
export NEXT_PUBLIC_UMAMI_SRC="https://umami.intellixlabs.co.za/script.js"

docker-compose down
docker-compose up -d --build
```

## Verification Steps

After deployment, verify Umami is working:

### 1. Check Container Logs
```bash
docker logs orbitx-website
```
Look for any environment variable loading messages.

### 2. Check Website in Browser
1. Open your website
2. Press F12 (Developer Tools)
3. Go to Network tab
4. Refresh page
5. Look for successful request to `umami.intellixlabs.co.za/script.js`

### 3. Test in Browser Console
```javascript
console.log(typeof umami !== 'undefined' ? 'Umami loaded!' : 'Umami not found');
```

### 4. Check Umami Dashboard
Visit `https://umami.intellixlabs.co.za` and verify real-time visitors appear.

## Troubleshooting

### Still getting "Umami not found"?

1. **Check environment variables are set:**
   ```bash
   docker exec orbitx-website printenv | grep UMAMI
   ```

2. **Verify variables in Portainer:**
   - Go to Containers → orbitx-website → Inspect
   - Check Environment section

3. **Check if script loads:**
   - Browser dev tools → Network tab
   - Look for 404 errors on script.js

4. **Restart container:**
   ```bash
   docker restart orbitx-website
   ```

## Common Issues

### Issue: Environment variables not appearing
**Solution:** Make sure you clicked "Update the stack" in Portainer after adding variables.

### Issue: Script 404 error
**Solution:** Verify your Umami server URL is correct and accessible.

### Issue: CORS errors
**Solution:** Check Umami server configuration allows your domain.

### Issue: Variables show as undefined
**Solution:** Ensure variable names start with `NEXT_PUBLIC_` for client-side access.

## Final Notes

- Environment variables must start with `NEXT_PUBLIC_` to be available in the browser
- The docker-compose.yml file has been updated to include these variables
- Local development uses `.env.local` (not committed to Git)
- Production uses environment variables set in Portainer or server .env file

After following these steps, your Umami analytics should work perfectly in production! 🎉