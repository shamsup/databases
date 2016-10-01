
var db = require('knex')({
  client: 'mysql',
  connection: {
    database: 'chatter',
    user: 'root'
  }
});

module.exports = db;
