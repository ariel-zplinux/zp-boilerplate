'use strict';

module.exports = function(app) {
  const bodyParser = require('body-parser');

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.enableAuth();

  const User = app.models.user;

  app.post('/api/Users/login', function(req, res, next) {
    User.login({
      email: req.body.email,
      password: req.body.password
    }, 'user', function(err, token) {

      if (err) {
        if(err.details && err.code === 'LOGIN_FAILED_EMAIL_NOT_VERIFIED'){
          res.send({
            title: 'Login failed',
            content: err,
            redirectToEmail: '/api/users/'+ err.details.userId + '/verify',
            userId: err.details.userId
          });
        } else {
          res.send({
            title: 'Login failed. Wrong username or password',
            content: err,
          });
        }

        return next();
      }

      const output = {
        email: req.body.email,
        accessToken: token.id
      };

      res.send(output);
    });
  });

  //verified
  app.get('/verified', function(req, res) {
    res.send('verified');
  });


  //log a user out
  app.get('/api/Users/logout', function(req, res, next) {
    const token = (req.accessToken && req.accessToken.id) || req.query.access_token;

    if (!token) return res.sendStatus(401);
    User.logout(token, function(err) {
      if (err) return next(err);

      res.sendStatus(204)
    });
  });

  app.delete('/api/Users/:id', function(req, res, next) {
    const token = (req.accessToken && req.accessToken.id) || req.query.access_token;
    const id = req.params.id;

    if (!token) return res.sendStatus(401);
    User.destroyById(id, function(err) {
      if (err) return next(err);
      res.send("OK")
    });
  })

  // TODO
  //send an email with instructions to reset an existing user's password
  app.post('/request-password-reset', function(req, res, next) {
    User.resetPassword({
      email: req.body.email
    }, function(err) {
      if (err) return res.status(401).send(err);

      res.send({
        title: 'Password reset requested',
        content: 'Check your email for further instructions',
      });
    });
  });

  // TODO
  //show password reset form
  app.get('/reset-password', function(req, res, next) {
    if (!req.accessToken) return res.sendStatus(401);
    res.send({
      redirectUrl: '/api/users/reset-password?access_token='+
        req.accessToken.id
    });
  });
}
