# ---- Base image ----
FROM node:20-alpine

# Enable corepack for pnpm
RUN corepack enable

# Set workdir at the project root
WORKDIR /app

# Copy only lock files & workspace config first (for caching)
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./

# Copy project folders
COPY projects ./projects

# Install dependencies across the monorepo
RUN pnpm install --frozen-lockfile

# Default command is no-op (overridden in docker-compose)
CMD ["sh"]
