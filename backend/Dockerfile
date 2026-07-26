# Deps stage: install production dependencies only.
FROM node:24-alpine AS deps

WORKDIR /app

# Install production dependencies using a reproducible clean install.
# Cache mount speeds up subsequent builds; bind mounts avoid copying the
# manifest/lockfile into this layer.
RUN --mount=type=cache,target=/root/.npm \
    --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    npm ci --omit=dev

# Runner stage: minimal runtime image with app source and production deps.
FROM node:24-alpine AS runner

ENV NODE_ENV=production

WORKDIR /app

# Bring in the production node_modules from the deps stage.
COPY --from=deps --chown=node:node /app/node_modules ./node_modules

# Copy the application source (see .dockerignore for exclusions).
COPY --chown=node:node . .

# Run as the non-root "node" user for better security.
USER node

# Expose the port the app listens on (server.js: process.env.PORT || 8000).
EXPOSE 8000

CMD ["node", "server.js"]
