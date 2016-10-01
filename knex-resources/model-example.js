var db = require('./db-example');


var User = module.exports;

User.all = function () {
  return db('users').select('*');
};

User.find = function (id) {
  return db('users').select('*').where({ id: id })
    .then( rows => rows[0] );
  //               ^^^^^^^
  //               Return the first row, since we're querying for a single record
};

User.findByName = function (name) {
  return db('users').select('*').where({ name: name })
    .then( rows => rows[0] );
};

User.create = function (attrs) {
  return db('users').insert(attrs)
    .then(function (newIds) {
      return Object.assign({}, attrs, { id: newIds[0] });
    });
};

//
// Usage Example #1
//

/* Knex.js comes with built in support for promises
 * making it easy to chain asynchronous operations together */

User.create({ name: 'Anon', hobby: 'hacking' })
  .then(function (newUser) {
    console.log('Created user:', newUser);
  });


//
// Usage Example #2
//
var usersToInsert = [
  { name: 'Alice', hobby: 'programming' },
  { name: 'Bob', hobby: 'gaming' },
  { name: 'Carly', hobby: 'crafting' },
];

var createPromises = usersToInsert.map( User.create );

Promise.all(createPromises)
  .then(function (newUsers) {
    console.log('Created', newUsers.length, 'new users:', newUsers);
  });
