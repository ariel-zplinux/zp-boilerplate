// Initialize dotenv package in order to use .env file
require('dotenv').config();

const port = process.env.DB_MONGO_PORT || 27017;
const host = process.env.DB_MONGO_HOST || 'localhost';
const user = process.env.DB_MONGO_USER || '';
const password = process.env.DB_MONGO_PASSWORD || '';
const database = process.env.DB_MONGO_DATABASE || 'messages';

const datasource = {
  db: {
    name: "db",
    connector: "memory"
  }
};

if (process.env.DB_MONGO_HOST) {
  datasource.db = {
    host,
    port,
    url: `mongodb://${host}:${port}/${database}`,
    database,
    name: "db",
    user,
    password,
    connector: "mongodb",
    useNewUrlParser: true
  };
}

if (process.env.MAIL_SMTP_GMAIL_ENABLED && process.env.MAIL_SMTP_GMAIL_LOGIN && process.env.MAIL_SMTP_GMAIL_PASSWORD) {
  console.log('=-- PASS')
  datasource.emailDs = {
    name: "emailDs",
    connector: "mail",
    transports: [
      {
        type: "smtp",
        host: "smtp.gmail.com",
        secure: true,
        port: 465,
        tls: {
          rejectUnauthorized: false
        },
        auth: {
          user: `${process.env.MAIL_SMTP_GMAIL_LOGIN}`,
          pass: `${process.env.MAIL_SMTP_GMAIL_PASSWORD}`
        }
      }
    ]
  }
}

module.exports = datasource;
