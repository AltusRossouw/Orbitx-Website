# Umami Analytics Integration Guide

This guide explains how to integrate your Umami analytics server with the OrbitX website.

## Prerequisites

- Umami server running on your Portainer instance
- Access to your Umami dashboard
- OrbitX website deployment

## Step 1: Get Your Umami Configuration

1. Access your Umami dashboard (e.g., `https://your-umami-domain.com`)
2. Log in with your admin credentials
3. Go to **Settings** → **Websites**
4. Add a new website or select the existing OrbitX website entry
5. Copy the **Website ID** (it looks like: `01234567-89ab-cdef-0123-456789abcdef`)
6. Note your Umami server's script URL (usually: `https://your-umami-domain.com/script.js`)

## Step 2: Configure Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Umami Analytics Configuration
NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-website-id-from-step-1
NEXT_PUBLIC_UMAMI_SRC=https://your-umami-domain.com/script.js
```

**Example:**
```bash
NEXT_PUBLIC_UMAMI_WEBSITE_ID=01234567-89ab-cdef-0123-456789abcdef
NEXT_PUBLIC_UMAMI_SRC=https://analytics.yourdomain.com/script.js
```

## Step 3: For Docker/Portainer Deployment

If you're deploying via Docker/Portainer, add these environment variables to your container:

1. In Portainer, go to your OrbitX stack
2. Edit the stack configuration
3. Add the environment variables to your `docker-compose.yml`:

```yaml
services:
  orbitx-website:
    environment:
      - NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-website-id-here
      - NEXT_PUBLIC_UMAMI_SRC=https://your-umami-domain.com/script.js
      # ... other environment variables
```

Or add them in the Portainer UI under "Environment variables" when deploying.

## Step 4: Restart Your Application

After adding the environment variables:

1. **For local development**: Restart your dev server (`npm run dev`)
2. **For Docker deployment**: Restart your container or redeploy the stack

## Step 5: Verify Integration

1. Visit your website
2. Check your Umami dashboard - you should see real-time visitors
3. Open browser developer tools and check that the Umami script is loading:
   - Go to Network tab
   - Look for a request to `script.js` from your Umami domain
   - Check for any console errors

## Dual Analytics System

Your OrbitX website now runs **both** analytics systems:

### 🔹 **Umami Analytics** (Primary)
- Professional analytics platform
- Real-time dashboard
- Privacy-focused
- Self-hosted on your infrastructure
- Access via your Umami dashboard

### 🔹 **Custom Analytics** (Backup/Detailed)
- Built-in tracking system
- Stores data locally and on your server
- Detailed visitor information with geolocation
- Access via `/analytics` page (password: `orbitx2025`)

## Troubleshooting

### Umami Script Not Loading
- Verify the `NEXT_PUBLIC_UMAMI_SRC` URL is correct and accessible
- Check if your Umami server is running and accessible from the internet
- Ensure there are no CORS issues

### Website ID Issues
- Double-check the Website ID in your Umami dashboard
- Ensure the ID is exactly copied (no extra spaces or characters)

### Environment Variables Not Working
- Ensure variables start with `NEXT_PUBLIC_` (required for client-side access)
- Restart your application after adding variables
- Check that variables are properly set in your deployment environment

### Still Not Working?
1. Check browser console for JavaScript errors
2. Verify Umami server is accessible from your website's domain
3. Test the Umami script URL directly in your browser
4. Check Umami server logs for any errors

## Security Notes

- Umami is privacy-focused and GDPR compliant
- No personal data is collected by default
- Both analytics systems can run simultaneously without conflicts
- Custom analytics system stores minimal data and respects user privacy

## Support

For Umami-specific issues, refer to:
- [Umami Documentation](https://umami.is/docs)
- [Umami GitHub Repository](https://github.com/umami-software/umami)

For OrbitX website issues, check the project documentation or contact your development team.