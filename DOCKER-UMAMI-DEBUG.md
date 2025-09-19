# Docker Umami Analytics Debugging Guide

## Problem Description
Umami analytics works perfectly in local development (`npm run dev`) but fails when deployed through Docker/Portainer.

## Potential Causes & Solutions

### 1. Network Connectivity Issues
The Docker container might not be able to reach `umami.intellixlabs.co.za`.

**Debug Steps:**
1. **Test network connectivity from container:**
   ```bash
   # In Portainer, go to Containers > Your Container > Console
   # Run these commands:
   curl -I https://umami.intellixlabs.co.za/script.js
   nslookup umami.intellixlabs.co.za
   ping umami.intellixlabs.co.za
   ```

2. **Check if the script loads in browser:**
   - Open your deployed website
   - Open browser dev tools (F12)
   - Go to Network tab
   - Look for requests to `umami.intellixlabs.co.za/script.js`
   - Check if it returns 200 OK or fails

### 2. Environment Variables Not Available at Runtime
Even though we baked them into the Docker image, Next.js might not be seeing them.

**Debug Steps:**
1. **Check environment variables in container:**
   ```bash
   # In Portainer console:
   env | grep UMAMI
   echo $NEXT_PUBLIC_UMAMI_WEBSITE_ID
   echo $NEXT_PUBLIC_UMAMI_SRC
   ```

2. **Check if Next.js can access the variables:**
   ```bash
   # In container:
   cat .env.production
   ```

### 3. Browser Console Errors
The script might be loading but failing silently.

**Debug Steps:**
1. **Check browser console:**
   - Open deployed website
   - Open dev tools (F12) > Console tab
   - Look for any JavaScript errors
   - Look for Umami-related messages

2. **Check if Umami object exists:**
   ```javascript
   // In browser console:
   console.log(window.umami);
   console.log(typeof umami);
   ```

### 4. CORS or Security Policy Issues
Your Portainer deployment might have different security policies.

**Debug Steps:**
1. **Check for CORS errors:**
   - Look in browser dev tools > Console
   - Look for "blocked by CORS policy" messages

2. **Check Content Security Policy:**
   - Look for CSP violations in console
   - Check if script-src allows umami.intellixlabs.co.za

### 5. Docker Build Context Issues
The environment variables might not be properly embedded.

**Debug Steps:**
1. **Verify the Docker image contains the env file:**
   ```bash
   # In Portainer console:
   ls -la /app/
   cat /app/.env.production
   ```

## Quick Verification Commands

Run these in your Portainer container console:

```bash
# 1. Check environment
env | grep UMAMI
echo "Website ID: $NEXT_PUBLIC_UMAMI_WEBSITE_ID"
echo "Script SRC: $NEXT_PUBLIC_UMAMI_SRC"

# 2. Test network connectivity
curl -I https://umami.intellixlabs.co.za/script.js

# 3. Check if files exist
ls -la /app/.env*
cat /app/.env.production

# 4. Check Next.js build output
ls -la /app/.next/

# 5. Test DNS resolution
nslookup umami.intellixlabs.co.za
```

## Browser Testing Checklist

1. **Open deployed website in browser**
2. **Open Developer Tools (F12)**
3. **Network Tab:**
   - Reload page
   - Look for request to `umami.intellixlabs.co.za/script.js`
   - Check status code (should be 200)
4. **Console Tab:**
   - Look for any JavaScript errors
   - Type: `console.log(window.umami)` 
   - Should show umami object if loaded correctly
5. **Elements Tab:**
   - Search for "umami" or "data-website-id"
   - Verify the script tag is present with correct attributes

## Common Solutions

### Solution 1: Force Environment Variables in Dockerfile
If env vars aren't working, modify Dockerfile:

```dockerfile
# Add these lines before the final CMD
ENV NEXT_PUBLIC_UMAMI_WEBSITE_ID=1bcbdb6f-8263-4ef0-8a49-340172b88292
ENV NEXT_PUBLIC_UMAMI_SRC=https://umami.intellixlabs.co.za/script.js
```

### Solution 2: Network Configuration
If connectivity fails, check Portainer network settings:
- Ensure container has internet access
- Check firewall rules
- Verify DNS resolution

### Solution 3: Manual Script Injection
As last resort, add script directly to layout.tsx:

```tsx
// In layout.tsx, add this in the <head>:
<script
  async
  src="https://umami.intellixlabs.co.za/script.js"
  data-website-id="1bcbdb6f-8263-4ef0-8a49-340172b88292"
/>
```

## Next Steps
1. Run the verification commands above
2. Check browser dev tools for errors
3. Report findings for targeted troubleshooting