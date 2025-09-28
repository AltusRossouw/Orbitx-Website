# Portainer Deployment Instructions

## Quick Deployment in Portainer

### Step 1: Access Portainer
1. Log into your Portainer instance
2. Navigate to **Stacks**
3. Click **"Add stack"**

### Step 2: Configure Stac
1. **Name:** `orbitx-website`
2. **Build method:** Select **"Web editor"**
3. **Copy and paste** the configuration below:

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
        reservations:
          cpus: "0.5"
          memory: 512M
    labels:
      - "app=orbitx-website"
      - "environment=production"
      - "com.centurylinklabs.watchtower.enable=true"
```

### Step 3: Environment Variables (Alternative Method)
Instead of putting environment variables in the YAML, you can add them in Portainer's "Environment variables" section:

| Name | Value |
|------|-------|
| `NODE_ENV` | `production` |
| `NEXT_TELEMETRY_DISABLED` | `1` |
| `PORT` | `3000` |
| `HOSTNAME` | `0.0.0.0` |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | `1bcbdb6f-8263-4ef0-8a49-340172b88292` |
| `NEXT_PUBLIC_UMAMI_SRC` | `https://umami.intellixlabs.co.za/script.js` |

### Step 4: Deploy
1. Click **"Deploy the stack"**
2. Wait for deployment to complete
3. Check container logs for any issues

## Access Your Website

Once deployed, your website will be available at:
- **Local:** `http://localhost:3330`
- **Server:** `http://your-server-ip:3330`

## Updating the Website

To update with a new version:

### Method 1: Pull Latest Image
1. Go to **Images** in Portainer
2. Search for `altusrossouw/orbitx-website`
3. Click **"Pull image"** to get the latest version
4. Go back to your stack and click **"Update"**

### Method 2: Recreate Stack
1. Go to your stack
2. Click **"Editor"**
3. Click **"Update the stack"**
4. Select **"Re-pull image and redeploy"**

## Troubleshooting

### Container Won't Start
- Check container logs in Portainer
- Verify environment variables are set correctly
- Ensure port 3330 is not already in use

### Website Not Accessible
- Check if container is running and healthy
- Verify firewall settings allow port 3330
- Check server IP and port configuration

### Umami Not Working
- Verify environment variables are set correctly
- Check browser console for script loading errors
- Confirm Umami server is accessible

## Configuration Notes

- **Port:** Website runs on port 3330 externally
- **Resources:** Allocated 1GB RAM and 1 CPU core (adjust as needed)
- **Health Check:** Monitors `/api/health` endpoint
- **Auto-restart:** Container will restart if it crashes
- **Watchtower:** Enables automatic updates if Watchtower is running

## Security Considerations

- All environment variables are properly configured
- No sensitive data is exposed in logs
- Health checks ensure service availability
- Resource limits prevent resource exhaustion

---

**Ready to deploy!** 🚀 Your OrbitX website will be running from the Docker Hub image with Umami analytics enabled.