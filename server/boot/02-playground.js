'use strict';

module.exports = function(server) {
  // const net = require('net');

  // const socket = new net.Socket();
  // const port = process.env.DB_PORT || 27017;
  // const host = process.env.DB_HOST || 'localhost';

  // let mongoDatasource = {};

  // socket.setTimeout(1000, () => {
  //   console.log('TIMEOUT')
  //   socket.destroy()
  //   process.exit(0)

  // });

  // socket.connect(port, host, () => {
  //   console.log('INSIDE')
  //   mongoDatasource.db = {
  //     "host": "localhost",
  //     "port": 27017,
  //     "url": "mongodb://localhost:27017/messages",
  //     "useNewUrlParser":"true",
  //     "database": "messages",
  //     "password": "",
  //     "name": "mongo",
  //     "user": "",
  //     "connector": "mongodb"
  //   };
  // });


  // socket.on('error', function(e) {
  //     // silently catch all errors - assume the port is closed
  //     console.log('EIN')
  //     socket.destroy();
  // });

  // if (mongoDatasource.db) {
  //   console.log('YESH')
  //   // module.exports = {
  //   //   db: {
  //   //     connector: 'mongodb',
  //   //     hostname: process.env.DB_HOST || 'localhost',
  //   //     port: process.env.DB_PORT || 27017,
  //   //     user: process.env.DB_USER,
  //   //     password: process.env.DB_PASSWORD,
  //   //     database: 'todo-example',
  //   //   }
  //   // };

  // }
}
