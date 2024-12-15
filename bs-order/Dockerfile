# Base stage
FROM node:18-slim AS base
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Development stage
FROM base AS dev
ENV NODE_ENV=development
RUN npm install --only=dev
EXPOSE 5000
CMD ["npm", "run", "dev"]

# Production stage
FROM base AS production
ENV NODE_ENV=production
RUN npm ci --only=production
EXPOSE 5000
CMD ["npm", "start"] 