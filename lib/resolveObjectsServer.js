const _ = require('lodash');

const resolveObjects = (input) => {
  if (typeof input === 'object') {
    const output = {};

    // return value of map not used
    Object.keys(input).map((key) => {
      const keyExploded = key.split('.');

      // handle regular key (ie: 'a')
      if (keyExploded.length === 1) {
        output[key] = input[key]

        return true;
      }

      // handle "stringified" key (ie: 'a.b.d')

      // keep value
      const value = input[key]

      // start from leaf
      // => {d: 'y'}
      let tempNode = { [keyExploded[keyExploded.length - 1]]: value}

      // explore branch upside until root of tree
      for (let i=keyExploded.length - 2; i >= 0; i--) {
        // assign current node to parent
        tempNode = {
          // key interpolation
          [keyExploded[i]]: tempNode
        };
      }

      // no deep merge
      // output = { ...output, ...temp, };

      // no deep merge
      // Object.assign(output, temp)

      // thank you lodash
      _.merge(output, tempNode)

      return true;
    });

    return output;
  }

  return null;
};

module.exports = resolveObjects;
