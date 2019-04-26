# Notepad

```shell

# combinations with auth
curl -X GET --header 'Authorization: NVdzoQiJnrO1Ju4rPC71mvOWbVlsLzJBTyUDwOQHx2tgWBRqKuzHahJKGgFY7Gpc' --header 'Accept: application/json' 'http://localhost:4000/api/Gestionnaires/combinations'

{"result":["4545","461","466"]}


# clients with pagination and params
curl -X GET --header 'Authorization: NVdzoQiJnrO1Ju4rPC71mvOWbVlsLzJBTyUDwOQHx2tgWBRqKuzHahJKGgFY7Gpc'  --header 'Accept: application/json' 'http://localhost:4000/api/Clients?pagination=true&limit=10&params=%7B%22name%22:%22john%22,%22email%22:%22john@foncia.com%22,%22quantity%22:%225%22%7D'


curl -X GET --header 'Authorization: NVdzoQiJnrO1Ju4rPC71mvOWbVlsLzJBTyUDwOQHx2tgWBRqKuzHahJKGgFY7Gpc'  --header 'Accept: application/json' 'http://localhost:4000/api/Clients?pagination=true&limit=10&skip=0&params=%7B%22email%22:%22Audra.Rosenbaum27@gmail.com%22,%22name%22:%22Howell%22%7D'

```

# work plan

## 2.Authentication

a. Access to application

John l: john p: myfonciapassword

=> allow user to signup and login with username instead of email


- User story - user signup then log in then log out (see server/models/user.test.js and server/models/gestionnaire.test.js)

b. access to agency

- -pick a gestionnaire (from 'gestionnaires' collection)- NOT ASKED
=> PICK FIRST ONE IF NO AVAILABLE?

- -associate a user to a gestionnaire- NOT ASKED?
=> same email

- -enter password (password must be a path from root to leaf in binary tree stored in 'numeros' field of gestionnaire logged)- NOT ASKED

c. API call authenticated only

- https://github.com/strongloop/loopback-example-access-control

- done by adding these ACLs to model.json (ie: server/models/client.json)
```javascript
  "acls": [
    {
      "accessType": "*",
      "principalType": "ROLE",
      "principalId": "$everyone",
      "permission": "DENY"
    },
    {
      "accessType": "READ",
      "principalType": "ROLE",
      "principalId": "$authenticated",
      "permission": "ALLOW",
      "property": "find"
    },
    {
      "accessType": "READ",
      "principalType": "ROLE",
      "principalId": "$authenticated",
      "permission": "ALLOW",
      "property": "combinations"
    }
  ],
```

d. E2E tests

## 2.Pagination

a. Filter and paginate clients by name, email and number of appartments.

- https://loopback.io/doc/en/lb3/Skip-filter.html

- params API CALL

-- pagination: (true|false) - pagination activated - default: false

-- limit: (integer) - set limit of entries per page - default: 0

-- params: {name, email, quantity} - filters - default: {}

- on hook access of models Client, adapt request to filter

- route '/clients/' filtered by name, email, number of appartements

- number of appartements calculated by request to '/lots/' OR cache OR collections clients with field 'quantity'

b. E2E tests

4. Algorithm

a. -calculate combinations a gestionnaire can enter- DONE (lib/calculatePasswordCombinations.js and lib/calculatePasswordCombinations.test.js)

Passwords associated to a gestionnaire are extracted and calculated from a binary tree stored in 'numeros' field.

Combination of paths from root to leaves are the passwords.

Return unique passwords only ( => _.uniq )

b. -route '/combinaisons/'- DONE (server/models/gestionnaire.js and server/models/gestionnaire.json  )

c. -E2E tests- DONE (server/models/gestionnaire.test.js and lib/testing/API/gestionnaire.js)
