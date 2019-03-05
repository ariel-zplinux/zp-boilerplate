'use strict';

module.exports = function(app) {
  const bodyParser = require('body-parser');

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.enableAuth();

  const User = app.models.User;

  app.post('/api/Users/login', function(req, res, next) {
    User.login({
      email: req.body.email,
      password: req.body.password
    }, 'user', function(err, token) {
      console.log({token})
      if (err) {
        return next();
      }

      const output = {
        email: req.body.email,
        accessToken: token.id
      };

      res.send(output);
    });
  });
}
