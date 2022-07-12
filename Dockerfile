FROM node:16-alpine

WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm install express-generator -g

COPY . /usr/src/app

CMD npm start

EXPOSE 3000