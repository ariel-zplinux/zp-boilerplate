const config = require('../../server/config.json');

//Replace this address with your actual address
const senderAddress = 'contact@zplinux.com';

module.exports = function(User) {

  // Disable email verifaction when registering if mail not configured
  if (!process.env.MAIL_SMTP_ENABLED) {
    // configured as true by default
    User.settings.emailVerificationRequired = false;
  }
  // send verification email after registration
  User.afterRemote('create', function(context, user, next) {
    const options = {
      type: 'email',
      to: user.email,
      from: 'senderAddress@zplinux.com',
      subject: 'Toda for registering.',
      redirect: '/verified',
      user: user
    };

    // Use verification by mail only if mail configured
    if (process.env.MAIL_SMTP_ENABLED) {
      user.verify(options, function(err, response) {
        if (err) {
          User.deleteById(user.id);
          return next(err);
        }
        context.res.send({
          title: 'Signed up successfully',
          content: 'Please check your email and click on the verification link ' +
              'before logging in.',
        });
      });
    }
    else
      next();

  });

  // Method to render
  User.afterRemote('prototype.verify', function(context, user, next) {
    context.res.send({
      title: 'A Link to reverify your identity has been sent '+
        'to your email successfully',
      content: 'Please check your email and click on the verification link '+
        'before logging in',
    });
  });

  //send password reset link when requested
  User.on('resetPasswordRequest', function(info) {
    const url = `http://${config.host}:${config.port}/reset-password`;
    const html = `Click <a href="${url}?access_token=${info.accessToken.id}">here</a> to reset your password`;

    User.app.models.Email.send({
      to: info.email,
      from: senderAddress,
      subject: 'Password reset',
      html
    }, function(err) {
      if (err) return console.log('> error sending password reset email');
      console.log('> sending password reset email to:', info.email);
    });
  });

  //render UI page after password change
  User.afterRemote('changePassword', function(context, user, next) {
    context.res.send({
      title: 'Password changed successfully',
      content: 'Please login again with new password',
    });
  });

  //render UI page after password reset
  User.afterRemote('setPassword', function(context, user, next) {
    context.res.send({
      title: 'Password reset success',
      content: 'Your password has been reset successfully',
    });
  });
};
