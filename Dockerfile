FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN apk add --no-cache openssl1.1-compat

RUN npm run build

CMD ["npm", "run", "start:prod"]
