FROM node:18-slim AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# set port to 5001
ENV PORT=5001

EXPOSE 5001

FROM builder as dev
CMD ["npm", "run", "dev"]

FROM builder as prod
CMD ["node", "src/index.js"]
