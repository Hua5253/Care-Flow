FROM node:18 AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist ./dist
COPY package*.json ./
RUN npm install
EXPOSE 4000
CMD ["node","dist/index.js"]