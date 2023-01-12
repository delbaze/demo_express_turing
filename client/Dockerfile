FROM node:lts

RUN mkdir app
RUN npm install -g npm
WORKDIR /app

COPY public public
COPY package.json ./
# COPY package-lock.json ./
COPY tsconfig.json ./
COPY setup.js ./

RUN npm config set legacy-peer-deps true
# RUN npm install --save-dev webpack
RUN npm install 

COPY src src

CMD npm start