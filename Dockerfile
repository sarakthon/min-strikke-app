FROM --platform=arm64 node:24-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./
RUN npm ci --include=dev

COPY . .

RUN npm run build

CMD ["npm", "start"]

EXPOSE 3000
