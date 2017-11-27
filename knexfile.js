// Update with your config settings.
require('dotenv').config()
const {DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_DATABASE} = process.env;
module.exports = {

  // development: {
  //   client: 'sqlite3',
  //   connection: {
  //     filename: './dev.sqlite3'
  //   }
  // },

  development: {
    client: 'pg',
    connection: {
      host : DB_HOST,
      port : DB_PORT,
      user : DB_USER,
      password : DB_PASS,
      database : DB_DATABASE
    },
    // pool: {
    //   min: 2,
    //   max: 10
    // },
    // migrations: {
    //   directory: './migrations'
    //   tableName: 'knex_migrations'
    // }
  },

  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }

};
