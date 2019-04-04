'use strict';

module.exports = function(app) {
  // Create Email model using 'emailDs'
  // console.log({boot: app.datasources.emailDs })
  if (app.datasources.emailDs) {
// create a model
    const Email = app.registry.createModel({
      name: 'Email'
    });

    const emailModel = app.model(Email, { dataSource: 'emailDs'})
    console.log({emailModel})
    console.log({Email : !!Email})
   }
}
