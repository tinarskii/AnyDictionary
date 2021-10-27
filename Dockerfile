FROM node:16-alpine

WORKDIR /opt/app

ENV PORT=80

RUN echo 'crond' > /boot.sh

RUN apk --update add make python gcc g++

COPY package*.json ./

RUN npm install --production

# Bundle app source
COPY . .

CMD sh /boot.sh && npm start