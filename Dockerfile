# Production-Ready Dockerfile for OrbitX Website
FROM node:18-alpine AS base

# Install dependencies needed for the platform
RUN apk add --no-cache libc6-compat curl

WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci --only=production --omit=dev

# Copy all source code
COPY . .

# Install dev dependencies temporarily for build
RUN npm ci

# Build the application
RUN npm run build

# Remove dev dependencies after build
RUN npm prune --production

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set the correct permission for prerender cache
RUN chown nextjs:nodejs .next

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the application
CMD ["npm", "start"]
