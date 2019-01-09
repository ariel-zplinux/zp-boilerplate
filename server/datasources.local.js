// Initialize dotenv package in order to use .env file
require('dotenv').config();

const port = process.env.DB_MONGO_PORT || 27017;
const host = process.env.DB_MONGO_HOST || 'localhost';
const user = process.env.DB_MONGO_USER || '';
const password = process.env.DB_MONGO_PASSWORD || '';
const database = process.env.DB_MONGO_DATABASE || 'messages';

const mongoDatasource = {};

if (process.env.DB_MONGO_HOST) {
  mongoDatasource.db = {
    host,
    port,
    url: `mongodb://${host}:${port}/${database}`,
    database,
    name: 'db',
    user,
    password,
    connector: "mongodb",
    useNewUrlParser: true
  };

  module.exports = mongoDatasource;
}
