# URGENT FIX: Umami "Not Found" Error

## 🚨 **Immediate Action Required**

If you're getting "umami not found", the environment variables aren't reaching the container. Let's fix this NOW.

## 🔧 **Step 1: Verify Current Container Environment**

First, let's check what's actually in your container:

1. **In Portainer:** Go to **Containers** → **orbitx-website** → **Console**
2. **Click "Connect"** 
3. **Run this command:**
   ```bash
   env | grep -i umami
   ```
4. **Expected output:**
   ```
   NEXT_PUBLIC_UMAMI_WEBSITE_ID=1bcbdb6f-8263-4ef0-8a49-340172b88292
   NEXT_PUBLIC_UMAMI_SRC=https://umami.intellixlabs.co.za/script.js
   ```

**If you see NOTHING** → Environment variables aren't set correctly.

## 🚀 **Step 2: Use This BULLETPROOF Configuration**

**Delete your current stack** and create a new one with this exact configuration:

### Portainer Stack Configuration:
1. **Stack name:** `orbitx-website-fixed`
2. **Copy this EXACT YAML:**

```yaml
version: "3.8"

services:
  orbitx-website:
    image: altusrossouw/orbitx-website:latest
    container_name: orbitx-website-fixed
    ports:
      - "3330:3000"
    environment:
      - NODE_ENV=production
      - NEXT_TELEMETRY_DISABLED=1
      - PORT=3000
      - HOSTNAME=0.0.0.0
      - NEXT_PUBLIC_UMAMI_WEBSITE_ID=1bcbdb6f-8263-4ef0-8a49-340172b88292
      - NEXT_PUBLIC_UMAMI_SRC=https://umami.intellixlabs.co.za/script.js
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "curl -fsS http://localhost:3000/api/health || exit 1"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 60s
```

3. **Deploy the stack**

## 🔧 **Step 3: Alternative Method - Portainer UI Variables**

If the YAML method still doesn't work, try this:

1. **Use this minimal YAML:**
```yaml
version: "3.8"

services:
  orbitx-website:
    image: altusrossouw/orbitx-website:latest
    container_name: orbitx-website-ui-vars
    ports:
      - "3330:3000"
    restart: unless-stopped
```

2. **In Portainer Stack Editor, scroll down to "Environment variables"**
3. **Add these variables ONE BY ONE:**

**Click "Add environment variable" for each:**

| Name | Value |
|------|-------|
| `NODE_ENV` | `production` |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | `1bcbdb6f-8263-4ef0-8a49-340172b88292` |
| `NEXT_PUBLIC_UMAMI_SRC` | `https://umami.intellixlabs.co.za/script.js` |

4. **Deploy the stack**

## 🔍 **Step 4: Verify the Fix**

After deployment:

1. **Check container environment again:**
   ```bash
   env | grep -i umami
   ```

2. **Check in browser console:**
   ```javascript
   console.log('Website ID:', window.location.search);
   console.log('Umami loaded:', typeof umami !== 'undefined');
   ```

3. **Check Network tab:**
   - Look for request to `umami.intellixlabs.co.za/script.js`
   - Should return 200 (not 404)

## 🚨 **If STILL Not Working:**

### Option A: Manual Container Test
Run this test container manually:

```bash
docker run -d \
  --name orbitx-test \
  -p 3331:3000 \
  -e NEXT_PUBLIC_UMAMI_WEBSITE_ID=1bcbdb6f-8263-4ef0-8a49-340172b88292 \
  -e NEXT_PUBLIC_UMAMI_SRC=https://umami.intellixlabs.co.za/script.js \
  altusrossouw/orbitx-website:latest
```

Then test on port 3331.

### Option B: Check Umami Server
Test if your Umami server is accessible:

```bash
curl -I https://umami.intellixlabs.co.za/script.js
```

Should return `200 OK`.

## 📱 **Quick Mobile Test**

1. **Open your website** on phone/tablet
2. **Check if Umami dashboard** shows mobile visitor
3. **If NO visitors** → Environment variables still not working

## ✅ **Success Checklist**

- [ ] Container environment shows Umami variables
- [ ] Browser console shows `Umami loaded: true`
- [ ] Network tab shows successful script.js request
- [ ] Umami dashboard shows real-time visitors
- [ ] No "umami not found" errors

## 🆘 **Last Resort Fix**

If nothing works, let's rebuild the image with hardcoded values temporarily:

1. **Create a `.env.production` file** with:
   ```
   NEXT_PUBLIC_UMAMI_WEBSITE_ID=1bcbdb6f-8263-4ef0-8a49-340172b88292
   NEXT_PUBLIC_UMAMI_SRC=https://umami.intellixlabs.co.za/script.js
   ```

2. **Rebuild and push** the Docker image
3. **Deploy again**

---

**Try Step 2 first** - the bulletproof configuration should work. If not, proceed through the steps systematically.