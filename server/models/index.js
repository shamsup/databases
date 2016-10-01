var db = require('../db');

module.exports = {
  messages: {
    get: function () {
      return new Promise(function(resolve, reject) {
        db.queryPromise(`
          select messages.*, users.username, rooms.roomname
          from messages
          inner join users
            on messages.user_id = users.id
          inner join rooms
            on messages.room_id = rooms.id
          order by messages.created desc;
        `)
        .then(function({result}) {
          resolve(result);
        })
        .catch(function(err) {
          reject(err);
        });
      });
    },
    post: function ({message, roomname, username}) {
      roomname = roomname || 'lobby';
      console.log('Message: ', message, ', roomname: ', roomname, ', username: ', username);
      return new Promise(function(resolve, reject) {
        db.queryPromise(`
          insert into messages (message, room_id, user_id) values (
            ?,
            (select id from rooms where roomname = ?),
            (select id from users where username = ?)
          )
        `, [message, roomname, username])
        .then(function({result}) {
          console.log('Result: ', result);
          resolve(result.insertId);
        }).catch(function(err) {
          console.log('error: ', err);
          reject(err);
        });
      });
    }
  },

  users: {
    // Ditto as above.
    get: function (username) {
      return new Promise(function(resolve, reject) {
        db.queryPromise(`
          select username, users.id
          from users
          where username = ?
        `, [username])
        .then(function({result}) {
          if (result.length) {
            resolve(result);
          } else {
            reject(new Error('user not found.'));
          }
        })
        .catch(function(err) {
          reject(err);
        });
      });
    },

    post: function (username) {
      return db.queryPromise(`
        insert into users (username) values (
          ?
        )
      `, [username])
      .then(function({result}) {
        return result.insertId;
      });
    }
  }
};
