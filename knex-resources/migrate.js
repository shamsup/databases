var db = require('./db-example');
//
// This file is intended to be run directly from the command line.
// DO NOT WRITE LIKE THIS IN THE FUTURE!
// This is only for demonstration. In real projects, you need to use migrations.
//
// Example use:
//
//    $ node knex-resources/migrate.js create
//    $ node knex-resources/migrate.js drop
//

var command = process.argv[2]; // process.argv is an array of all command line arguments

if ( command === 'create' ) {
  createTables();
} else if ( command === 'drop' ) {
  dropTables();
} else {
  console.error('Unknown command:', command);
  process.exit(1);
}


function createTables () {
  return Promise.all([
    db.schema.createTableIfNotExists('users', function (table) {
      table.increments();
      table.string('name');
      table.string('hobby');
    }),

    // Example second table; not used in model-example.js
    db.schema.createTableIfNotExists('comments', function (table) {
      table.increments();
      table.integer('user_id');
      table.string('content');
    })
  ])
    .then(function () {
      console.log('Tables created!');
      process.exit(0);
    });
}

function dropTables () {
  return db.schema.dropTableIfExists('comments')
    .then(function () {
      return db.schema.dropTableIfExists('users');
    })
    .then(function () {
      console.log('Tables dropped.');
      process.exit(0);
    });
}
