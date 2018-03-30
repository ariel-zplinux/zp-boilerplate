# nodejs 6.9
FROM node:alpine
LABEL MAINTAINER Ariel Biton (ariel@zplinux.com)

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY . /usr/src/app
RUN npm install

# Web server port
EXPOSE 4000

# run web server
CMD npm start