FROM node:22-slim AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000

# dev mode
FROM builder AS dev
CMD ["npm", "run", "dev"]

# production mode
FROM builder AS prod

ENV NODE_ENV=production
RUN npm run build
CMD ["npm", "run", "start"]