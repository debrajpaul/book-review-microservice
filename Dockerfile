FROM node:20-alpine
WORKDIR /project
COPY . .
RUN corepack enable && pnpm install --frozen-lockfile
WORKDIR /project/projects/graphql
CMD ["pnpm", "run", "dev"]
