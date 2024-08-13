FROM node:alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install -y

COPY . .

EXPOSE 8081




