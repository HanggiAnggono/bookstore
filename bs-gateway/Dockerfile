FROM node:18-slim AS base

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
EXPOSE 9876

FROM base AS dev
ENV LOG_LEVEL=info
CMD ["npm", "start"]

FROM base AS prod
CMD ["npm", "start"]
