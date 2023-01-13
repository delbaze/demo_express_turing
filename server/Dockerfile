FROM node:lts

RUN mkdir app

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./

RUN npm install

# COPY wildersdb.sqlite ./

COPY src src

CMD npm start