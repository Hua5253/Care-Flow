FROM node:18 AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:noTsc
RUN ls -l /usr/src/app/dist

FROM nginx:1.21
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]