# Umami Troubleshooting for Portainer Deployment

## 🔍 **Quick Diagnosis**

If Umami isn't working in Portainer, it's most likely an environment variable issue. Let's fix it step by step.

## 🚀 **Option 1: Portainer Environment Variables (Recommended)**

### Step 1: Use Portainer UI Environment Variables
Instead of putting environment variables in the YAML, set them directly in Portainer:

1. **Go to Portainer** → Stacks → orbitx-website → Editor
2. **Scroll down to "Environment variables"**
3. **Add these variables ONE BY ONE:**

| Variable Name | Variable Value |
|---------------|----------------|
| `NODE_ENV` | `production` |
| `NEXT_TELEMETRY_DISABLED` | `1` |
| `PORT` | `3000` |
| `HOSTNAME` | `0.0.0.0` |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | `1bcbdb6f-8263-4ef0-8a49-340172b88292` |
| `NEXT_PUBLIC_UMAMI_SRC` | `https://umami.intellixlabs.co.za/script.js` |

### Step 2: Use This Simplified YAML
```yaml
version: "3.8"

services:
  orbitx-website:
    image: altusrossouw/orbitx-website:latest
    container_name: orbitx-website
    ports:
      - "3330:3000"
    healthcheck:
      test: ["CMD-SHELL", "curl -fsS http://localhost:3000/api/health || exit 1"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 60s
    restart: unless-stopped
    deploy:
      resources:
        limits:
          cpus: "1.0"
          memory: 1G
        reservations:
          cpus: "0.5"
          memory: 512M
```

## 🚀 **Option 2: Explicit Environment in YAML**

Use this YAML with environment variables explicitly defined:

```yaml
version: "3.8"

services:
  orbitx-website:
    image: altusrossouw/orbitx-website:latest
    container_name: orbitx-website
    ports:
      - "3330:3000"
    environment:
      NODE_ENV: "production"
      NEXT_TELEMETRY_DISABLED: "1"
      PORT: "3000"
      HOSTNAME: "0.0.0.0"
      NEXT_PUBLIC_UMAMI_WEBSITE_ID: "1bcbdb6f-8263-4ef0-8a49-340172b88292"
      NEXT_PUBLIC_UMAMI_SRC: "https://umami.intellixlabs.co.za/script.js"
    healthcheck:
      test: ["CMD-SHELL", "curl -fsS http://localhost:3000/api/health || exit 1"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 60s
    restart: unless-stopped
    deploy:
      resources:
        limits:
          cpus: "1.0"
          memory: 1G
```

## 🔧 **Debugging Steps**

### Step 1: Check Container Environment
1. **In Portainer:** Go to Containers → orbitx-website → Console
2. **Run this command:**
   ```bash
   printenv | grep UMAMI
   ```
3. **You should see:**
   ```
   NEXT_PUBLIC_UMAMI_WEBSITE_ID=1bcbdb6f-8263-4ef0-8a49-340172b88292
   NEXT_PUBLIC_UMAMI_SRC=https://umami.intellixlabs.co.za/script.js
   ```

### Step 2: Check Browser Network Tab
1. **Open your website** in browser
2. **Press F12** → Network tab
3. **Refresh the page**
4. **Look for:** Request to `umami.intellixlabs.co.za/script.js`
5. **Status should be:** 200 (success)

### Step 3: Check Browser Console
1. **Press F12** → Console tab
2. **Type:**
   ```javascript
   console.log('UMAMI_ID:', process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID);
   console.log('UMAMI_SRC:', process.env.NEXT_PUBLIC_UMAMI_SRC);
   console.log('Umami loaded:', typeof umami !== 'undefined');
   ```

### Step 4: Check Container Logs
1. **In Portainer:** Containers → orbitx-website → Logs
2. **Look for errors** related to environment variables or Umami

## 🚨 **Common Issues & Fixes**

### Issue 1: Variables Not Set
**Symptoms:** Console shows `undefined` for environment variables
**Fix:** Use Option 1 above - set variables in Portainer UI

### Issue 2: Script 404 Error
**Symptoms:** Network tab shows 404 for script.js
**Fix:** Verify Umami server is running at `umami.intellixlabs.co.za`

### Issue 3: CORS Error
**Symptoms:** Console shows CORS policy error
**Fix:** Check Umami server allows your domain

### Issue 4: Variables as String Literals
**Symptoms:** Variables show as `"${VARIABLE_NAME}"` instead of actual values
**Fix:** Use explicit values instead of variable substitution

## 🧪 **Test Configuration**

Try this minimal test configuration to verify Umami works:

```yaml
version: "3.8"

services:
  orbitx-website:
    image: altusrossouw/orbitx-website:latest
    container_name: orbitx-website-test
    ports:
      - "3331:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_UMAMI_WEBSITE_ID=1bcbdb6f-8263-4ef0-8a49-340172b88292
      - NEXT_PUBLIC_UMAMI_SRC=https://umami.intellixlabs.co.za/script.js
    restart: unless-stopped
```

Deploy this as a test stack, then check if Umami works on port 3331.

## 📋 **Step-by-Step Fix**

1. **Stop current stack** in Portainer
2. **Use Option 1 configuration** above
3. **Set environment variables** in Portainer UI (not YAML)
4. **Deploy the stack**
5. **Test using debugging steps** above
6. **Check Umami dashboard** for real-time visitors

## ✅ **Success Indicators**

- ✅ Environment variables visible in container
- ✅ Umami script loads in Network tab (200 status)
- ✅ No console errors related to Umami
- ✅ Real-time visitors appear in Umami dashboard
- ✅ `typeof umami !== 'undefined'` returns true

If you're still having issues after trying these steps, please share:
1. Container environment variables output
2. Browser console output
3. Network tab screenshot showing script loading status