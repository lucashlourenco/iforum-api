FROM node:alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install -y

COPY . .

COPY ./start.sh ./start.sh
RUN chmod +x ./start.sh

EXPOSE 8081

CMD ["./start.sh"]




