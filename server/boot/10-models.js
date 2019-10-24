'use strict';

module.exports = function(app) {
  // Attach model Email to datasource emailDs if emailDs defined
  if (app.dataSources.emailDs) {
    const models = app.models();
    models.forEach(function(Model) {
      if (Model.modelName === "Email")
        Model.attachTo(app.dataSources.emailDs)
    });
   }
}
