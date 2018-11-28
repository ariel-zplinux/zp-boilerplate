## Zp Boilerplate

The purpose of this boilerplate is to start new projects using a Node/React stack.

An immediate target is my home page.

## Stack

### Current

- ReactJs

- NextJs

- NodeJs

- ExpressJs

- Loopback

- Helmet

- SocketIo

- SemanticUI-React

- Redux

- Redux-saga

- Jest

- Enzyme

- Docker

- Editorconfig

### TODO

- Firebase

- Mongo (through Loopback)

- React Native

- End to end Testing

## Instructions

```shell
git clone https://github.com/ariel-zplinux/zp-boilerplate.git
cd zp-boilerplate
npm install
```

### In Developement mode

```shell
npm start
```

### In Production mode

```shell
npm run build
npm run prod
```

### With Docker in local

```shell
git clone https://github.com/ariel-zplinux/zp-boilerplate.git
cd zp-boilerplate
# build dev mode
docker build -t "zp-boilerplate" .
# build prod mode
# docker build -t "zp-boilerplate:prod" -f Dockerfile.prod .
docker run -p 4000:4000 "zp-boilerplate"
```

### With Docker from Docker Hub in production mode 

Docker Hub not updated continuously.

```shell
docker pull zplinuxoss/zp-boilerplate:prod
docker run -p 4000:4000 zplinuxoss/zp-boilerplate:prod
```

## Screenshot

### Desktop

![alt text](https://github.com/ariel-zplinux/zp-boilerplate/raw/master/static/assets/images/screenshot/Desktop.png "zp-boilerplate on desktop")

### Mobile

![alt text](https://github.com/ariel-zplinux/zp-boilerplate/raw/master/static/assets/images/screenshot/Mobile.png "zp-boilerplate on mobile")

## Resources

- https://medium.com/@markcolling/integrating-socket-io-with-next-js-33c4c435065e

- https://learnnextjs.com/

- https://www.udemy.com/react-the-complete-guide-incl-redux/learn/v4/overview

- https://react.semantic-ui.com/layouts/homepage

- https://expressjs.com/en/advanced/best-practice-security.html

- https://medium.com/front-end-hacking/next-js-redux-integration-3ab1a9ca5e1d

- https://github.com/zeit/next.js/tree/canary/examples/with-jest
