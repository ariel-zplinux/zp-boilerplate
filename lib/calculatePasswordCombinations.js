const _ = require('lodash');

// TODO refactor to avoid side effect
const output = [];

// Depth First Search traversal of binary tree
const binaryTreeDFS = (node, currentPath = []) => {
  // left node
  if (node.l && node.l.x) {
    // to avoid messing with currentPath being a pointer
    // a new array is created at each call - [].concat(currentPath).concat([node.x]
    const path = [].concat(currentPath).concat([node.x]);

    binaryTreeDFS(node.l, path)
  }
  // right node
  if (node.r && node.r.x) {
    const path = [].concat(currentPath).concat([node.x]);

    binaryTreeDFS(node.r, [].concat(currentPath).concat([node.x]))
  }
  // leaf
  if (!node.l && !node.r && node.x) {
    const path = [].concat(currentPath).concat([node.x]).join('')

    output.push(path);
  }
}

// Calculate password combinations stored in a binary tree (by DFS)
// a password combination is a path from root to a leaf
const calculatePasswordCombinations = (tree) => {
  // clear output - TODO refactor
  output.length = 0;

  binaryTreeDFS(tree);

  return _.uniq(output);
}

// const tree = {
//   "x": 4,
//   "l": {
//     "x": 5,
//     "l": {
//       "x": 4,
//       "l": {
//         "x": 5,
//         "l": null,
//         "r": null
//       },
//       "r": null
//     },
//     "r": null
//   },
//   "r": {
//     "x": 6,
//     "l": {
//       "x": 1,
//       "l": null,
//       "r": null
//     },
//     "r": {
//       "x": 6,
//       "l": null,
//       "r": null
//     }
//   }
// }

module.exports = calculatePasswordCombinations;
