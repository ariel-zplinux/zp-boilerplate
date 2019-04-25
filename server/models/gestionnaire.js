'use strict';

const calculatePasswordCombinations = require('../../lib/calculatePasswordCombinations.js');

module.exports = function(Gestionnaire) {
  Gestionnaire.combinations = function(req, callback) {
    // TODO - Retrieve Gestionnaire authenticated (from token?)
    // console.log(req.accessToken)
    // User email field can be retrieved from token, Gestionnaire can be found from email

    // const binaryTree = gestionnaire.numeros;
    const binaryTreeSample = {
      "x": 4,
      "l": {
        "x": 5,
        "l": {
          "x": 4,
          "l": {
            "x": 5,
            "l": null,
            "r": null
          },
          "r": null
        },
        "r": null
      },
      "r": {
        "x": 6,
        "l": {
          "x": 1,
          "l": null,
          "r": null
        },
        "r": {
          "x": 6,
          "l": null,
          "r": null
        }
      }
    };

    const result = calculatePasswordCombinations(binaryTreeSample);

    callback(null, result);
  }

  Gestionnaire.remoteMethod('combinations', {
    description: 'Calculate combinations of password from a binary tree',
    http: {
      verb: 'get'
    },
    returns: {
      arg: 'result',
      type: 'string'
    },
    accepts: [{
      arg: 'req',
      type: 'object',
      http: {source: 'req'}
    }]
  });
};
