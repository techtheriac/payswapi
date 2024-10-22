FROM node:lts-alpine

ENV SWAPI_BASE=https://swapi.dev/api

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install && mv node_modules ../

COPY . .

RUN npm run build

EXPOSE 3001

RUN chown -R node /usr/src/app

USER node

CMD ["npm", "start"]