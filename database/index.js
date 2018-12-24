const Sequelize = require('sequelize');
const pg = require('pg');
//// AWS database user and pw:
const dbUser = process.env.AmazonDBuser || require('../config.js').AmazonDBuser;
const dbpw = process.env.AmazonDBpw || require('../config.js').AmazonDBpw;
const host = process.env.AmazonHost || require('../config.js').AmazonHost;
//// Local database user and pw:
// const dbUser = require('../config.js').localDBUser;
// const dbpw = require('../config.js').localDBpw;
// const host = 'localhost';

const db = new Sequelize('neighborhood', dbUser, dbpw, 
  {
    host: host,
    port: 5432,
    dialect: 'postgres',
    operatorsAliases: false,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  } 
)

db.authenticate()
  .then(() => {
    console.log('PostgreSQL connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = db;