FROM node:24-alpine3.21 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:24-alpine3.21
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["npm", "start"]