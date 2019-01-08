(async function(){


const net = require('net');

function *generator() {
  console.log('GENERATOR')

  yield new Promise((resolve) => {
    const socket = new net.Socket();
    const port = process.env.DB_PORT || 27017;
    const host = process.env.DB_HOST || 'localhost';

    let mongoDatasource = {};

    // mongoDatasource.db = {
    //   "host": "localhost",
    //   "port": 27017,
    //   "url": "mongodb://localhost:27017/messages",
    //   "useNewUrlParser":"true",
    //   "database": "messages",
    //   "password": "",
    //   "name": "db",
    //   "user": "",
    //   "connector": "mongodb"
    // };

    // module.exports = mongoDatasource;
    // console.log({module})
    console.log({host,port})
    socket.setTimeout(2000, () => {
      console.log('TIMEOUT')
      socket.destroy()
    });

    socket.connect(port, host, () => {
      console.log('INSIDE')

      mongoDatasource.db = {
        "host": "localhost",
        "port": 27017,
        "url": "mongodb://localhost:27017/messages",
        "useNewUrlParser":"true",
        "database": "messages",
        "password": "",
        "name": "mongo",
        "user": "",
        "connector": "mongodb"
      };

      // console.log({module})
      // process.exit(0)
      // return cb(mongoDatasource)
      // return mongoDatasource;
    });

    socket.on('close', () => {
      console.log('CLOSE');
      resolve(mongoDatasource);
      // if (mongoDatasource.db)  module.exports = mongoDatasource;
      // console.log({module})
      // process.exit(0)
      // return cb(mongoDatasource)
      // return mongoDatasource;
    })

  } )
}

async function exportF() {
  const gen = generator();
  console.log({gen})

  // const exportFunction = (cb) => {
  //   const gen = generator();
  //   console.log({gen})
  //   return gen.next().value;

  // }

  const v = await gen.next().value
  console.log({v})
  return v;
}
module.exports = exportF();

// socket.on('data', () => {
//   console.log('DATA')
// })

// socket.on('error', () => {

//   console.log('ERROR')
// })
})()
