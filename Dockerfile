FROM node:lts-alpine
 

 WORKDIR /app
 

 COPY ./package.json ./package.lock /app/
 

 RUN npm install
 

 COPY . /app
 

 RUN npm build
 

 EXPOSE 3000
 

 CMD npm start