FROM node:18-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# set port to 5001
ENV PORT=5001

EXPOSE 5001

CMD ["node", "src/index.js"]
