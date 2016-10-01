var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

var connection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'chat_test'
});

connection.queryPromise = function queryPromise (query, replacements) {
  return new Promise(function (resolve, reject) {
    if (replacements) {
      connection.query(query, replacements, function (err, rows, fields) {
        if (err) { return reject(err); }
        resolve({ fields: fields, result: rows });
      });
    } else {
      connection.query(query, function (err, rows, fields) {
        if (err) { return reject(err); }
        resolve({ fields: fields, result: rows });
      });
    }
  });
};

connection.connect();

module.exports = connection;
