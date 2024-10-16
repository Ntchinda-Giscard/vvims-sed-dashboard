FROM node:18-alpine as builder
WORKDIR /app
COPY package.json ./
RUN npm i --force
COPY . .
RUN npm run build
EXPOSE 3000
ENTRYPOINT ["npm", "run", "start"]