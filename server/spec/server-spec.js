/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var request = require('request'); // You might need to npm install the request module!
var expect = require('chai').expect;

describe('Persistent Node Chat Server', function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      user: 'root',
      password: '',
      database: 'chat_test'
    });
    dbConnection.connect();

    var tablenames = ['users', 'rooms', 'messages', 'following'];

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    var count = 0;
    tablenames.forEach(tablename =>
      dbConnection.query('truncate ' + tablename, function() {
        count += 1;
        if (count === tablenames.length) {
          dbConnection.query('insert into rooms (roomname) values (\'lobby\')', function() {
            done();
          });
        }
      })
    );
  });

  afterEach(function() {
    dbConnection.end();
  });

  it('Should insert posted messages to the DB', function(done) {
    // Post the user to the chat server.
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/users',
      json: { username: 'Valjean' }
    }, function () {
      // Post a message to the node chat server:
      request({
        method: 'POST',
        uri: 'http://127.0.0.1:3000/classes/messages',
        json: {
          username: 'Valjean',
          message: 'In mercy\'s name, three days is all I need.',
          roomname: 'lobby'
        }
      }, function () {
        // TODO: You might have to change this test to get all the data from
        // your message table, since this is schema-dependent.
        var queryString = 'SELECT * FROM messages';
        var queryArgs = [];

        dbConnection.query(queryString, queryArgs, function(err, results) {
          // Should have one result:
          expect(results.length).to.equal(1);
          expect(results[0].message).to.equal('In mercy\'s name, three days is all I need.');
          done();
        });
      });
    });
  });

  it('Should output all messages from the DB', function(done) {
    // Let's insert a message into the db
    var queryString = `
      insert into messages (message, room_id, user_id) values (
        ?,
        (select id from rooms where roomname = ?),
        (select id from users where username = ?)
      )
    `;
    var queryArgs = ['Men like you can never change!', 'lobby', 'Valjean'];
    // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */

    dbConnection.query(queryString, queryArgs, function(err) {
      if (err) { throw err; }

      // Now query the Node chat server and see if it returns
      // the message we just inserted:
      request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
        var messageLog = JSON.parse(body).results;
        expect(messageLog[0].message).to.equal('Men like you can never change!');
        expect(messageLog[0].roomname).to.equal('lobby');
        done();
      });
    });
  });
});
