// Update with your config settings.
require('dotenv').config()
const {DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_DATABASE} = process.env;
module.exports = {

  development: {
    client: 'pg',
    connection: {
      host : DB_HOST,
      port : DB_PORT,
      user : DB_USER,
      password : DB_PASS,
      database : DB_DATABASE
    },
  },
};
