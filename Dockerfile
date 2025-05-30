FROM node:20-alpine

ARG APP_NAME

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build -- ${APP_NAME}

CMD [ "sh", "-c", "node dist/apps/$APP_NAME/main.js" ]
