FROM node:alpine

WORKDIR /usr/src/app

COPY package.json ./

COPY . .

RUN npm install --only-prod

EXPOSE 3004 3003

CMD npm run start:prod

