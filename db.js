const config = require('./knexfile.js');
const knex = require('knex')(config['development'])
knex.migrate.latest([config]); 

module.exports = knex;
