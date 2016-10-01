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
        .then(function({rows}) {
          resolve(rows);
        })
        .catch(function(err) {
          reject(err);
        });
      });
    },
    post: function ({content, roomname, username}) {
      roomname = roomname || 'lobby';
      db.queryPromise(`
        insert into messages (content, room_id, user_id) values (
          ?,
          (select id from rooms where roomname = ?),
          (select id from users where username = ?)
        )
      `, [content, roomname, username])
      .then(function(messageId) {

      });
    }
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};
