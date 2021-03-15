// Update with your config settings.
require('dotenv').config({path: '.env.local'});

module.exports = {
  development: {
    client: process.env.DB_CLIENT,
    connection: {
      host : process.env.DB_HOST,
      user : process.env.DB_USERNAME,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_NAME
    }
  },
};
