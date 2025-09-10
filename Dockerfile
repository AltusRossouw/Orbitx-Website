############################################################
# OrbitX Website - Production Dockerfile (multi-stage)
############################################################

# 1) Base image
FROM node:18-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat

# 2) Dependencies (install all deps once, using lockfile)
FROM base AS deps
COPY package.json package-lock.json* ./
# npm ci installs prod+dev per lockfile; needed to build Next.js
RUN npm ci

# 3) Builder (compile Next.js)
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 4) Runner (smallest runtime image)
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Install curl for healthcheck support
RUN apk add --no-cache curl

# Create non-root user
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

# Copy public assets and standalone output
COPY --from=builder /app/public ./public
# Next.js standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

# Start the server produced by standalone output
CMD ["node", "server.js"]
