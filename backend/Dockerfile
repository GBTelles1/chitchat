FROM node:22.11.0-alpine3.19

WORKDIR /usr/app

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 8000

CMD ["yarn", "start:dev"]