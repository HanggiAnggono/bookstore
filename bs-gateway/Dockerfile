FROM node:18-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
EXPOSE 9876

CMD ["node", "server.js"]
