FROM node:current-alpine

WORKDIR /usr/app/

COPY package.json package-lock.json ./

RUN npm install

COPY  . . 

EXPOSE 8080
CMD ["npm", "run", "start:debug"]