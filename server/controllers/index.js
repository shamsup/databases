var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get()
      .then(function(messages) {
        res.status(200).json({ results: messages });
      })
      .catch(function() {
        res.status(500).end();
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages.post(req.body.message)
      .then(function(messageId) {
        res.status(201).json({ id: messageId });
      })
      .catch(function() {
        res.status(500).end();
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    // get: function (req, res) {
    //   models.users.get()
    //   .then(function(users) {
    //
    //   })
    //   .catch();
    //
    // },
    post: function (req, res) {
      var username = req.body.username;
      models.users.get(username)
      .then(function(user) {
        res.status(200).json(user);
      })
      .catch(function(err) {
        models.users.post(username)
        .then(function(user) {
          if (user) {
            res.status(201).json(user);
          }
        })
        .catch(function(err) {
          res.status(500).end();
        });
      });
    }
  }
};
