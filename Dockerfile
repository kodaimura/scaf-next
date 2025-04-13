FROM node:23.11-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Uncomment the line below for production builds
#RUN npm run build