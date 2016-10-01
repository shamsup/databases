var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

var connection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'chat'
});

connection.queryPromise = function queryPromise (query, replacements) {
  return new Promise(function (resolve, reject) {
    connection.query(query, function (err, rows, fields) {
      if (err) { return reject(err); }
      resolve({ fields: fields, rows: rows });
    });
  });
};

connection.connect();

module.exports = connection;
