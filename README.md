Please find here my solution to your test tasks.

# TASK 1

## STACK

- Node
- Express
- React
- Next
- Redux
- Redux Saga
- Semantic UI
- Lodash
- Jest


## INSTRUCTION

```shell
git clone https://github.com/ariel-zplinux/zp-boilerplate.git
cd zp-boilerplate
git checkout HUBSIDE-WORK
npm install
npm start
```

To launch test

```shell
npm test
```

# TASK 2

```javascript
let express = require('express');

let bodyParser = require('body­parser');

let app = express();

app.use(bodyParser.json());

let todos = [{ id: 'jkhsdjkf', content: 'review this code' }];

app.post('/todos', (req, res) => {
  todos.push({
    ...req.body,
    id: Math.random().toString(32).slice(2)
  });
  res.sendStatus(201);
});

app.put('/todos/:id', (req, res) => {
  todos[Number(req.params.id)] = req.body;
  res.sendStatus(200);
});

app.get('/todos/:id', (req, res) => {
  res.send(todos[id]);
});

app.get('/todos/all', (req, res) => {
  res.send(todos);
});

app.get('/', (req, res) => {
  res.send('OK');
});

app.listen(8080, () => {
  console.log('Listening on port 8080...');
});

```

1. [WARNING] Everywhere here, const is more adapted than let.

2. [WARNING] Grammar of REST not respected,  in "app.get('/todos/all', ..." , "app.get('/todos', ...)" is more "RESTful" here

3. [ERROR] 'id' in todo object has no relation with 'id' used to acces 'todos' array, in 'app.get' and 'app.put' on ':id', it won't work as expected.

this could do the trick for app.get on :id

```
todos.filter((todo) => todo.id === idToGet)
```

For app.put on :id, this is heavy but would work, with an external update function

```
todosUpdated = todos.map((todo) => ( (todo.id === updatedId) ? update(todo) : todo) )
```

3. [WARNING] in 'app.listen', error is not handled.

4. [WARNING] 'res.send' should take a string as a parameter, I think, not sure, can't be bad anyway.

5. [WARNING] in app.put, http status code for PUT is 204 when no content is returned.

6. [WARNING] to use directly req.body in resource used is "bad".

7. [WARNING] storage is volatile,

8. [EHANCEMENT] A Data Abstraction Layer (DAL) like Loopback can allow us to use same code on volatile and persistent storage.

You can see my boilerplate on master branch for ehancement in that way.

# CODE

### TEST
```javascript
import resolveObjects from './resolveObjects.js';

describe('resolveObjects', () => {
  it('Should generate correct output', () => {
    const tests = [
      {
        input: {
          a: {
            b: {
              c: 'z'
            }
          },
          'a.b.d': 'y'
        },
        output: {
          a: {
            b: {
              c: 'z',
              d: 'y'
            }
          }
        }
      }
    ]

    tests.forEach((test) => {
      expect(resolveObjects(test.input)).toEqual(test.output);
    })
  })
});
```

### FUNCTION
```javascript
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

export default resolveObjects;
```

## REM

- For simplicity, I've used lodash package do perform deep merge.
