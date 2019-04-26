# Foncia test with Node

This project was bootstrapped with my Node/React boilerplate. (https://github.com/ariel-zplinux/zp-boilerplate)

Stack
-----

- Node
- Express
- Loopback
- Docker
- Mongo

Quick Start
-----------

Restore DB dump.

```shell
docker create --name foncia-test-db --expose 27017 mongo
docker start foncia-test-db

mongorestore -d myFonciaDB myFonciaBdd/ --host 127.0.0.1 --port 27017
```

Install application.

```shell
git clone https://github.com/ariel-zplinux/zp-boilerplate.git
cd zp-boilerplate
git checkout FONCIA-TEST
npm install
cp .env.template .env
npm start
```

Launch tests (with server already started)

```shell
npm test
```

API endpoint
-------------

|HTTP Method|Url|Parameters|Description|
|---|---|---|---|
|GET|/api/Clients|pagination, limit, skip, params|Search clients|
|GET|/api/Gestionnaire/combinations||Retrieve password combination from authenticated gestionnaire|
|POST|/api/Users|email, password|Sign up user|
|POST|/api/Users/login|email, password|Log in user|
|GET|/api/Users/logout||Log out (token to pass in header)|

# TODO

- associate User with Gestionnaire

- search clients with POST method instead of GET, to hide params for url

- add field quantity to Client (explanation in Entities/Gestionnaire part)

- refactor calculatePasswordCombinations function to have no side effect

- disable routes not expected

- authentication on gestionnaire password

# Implementation


## Authentication

This implementation rely on Loopback.

API access are restricted to authenticated user by ACLs on models.

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
    }
```

Authentication is here based on (username/password) step only.

Restriction on Gestionnaire's "numeros", a combination of passwords, is to be defined and done.

## Entities

### User

Internal application (and Loopback) User model.
It's designed to accept a username as login key.
When request is received username is translated to `${username}@foncia.com` to keep it simple in Loopback.

It could be improved

### Gestionnaire

Must be associated with User, email can be a common key.

### Clients

Find action is filtered by pagination/params.

Params are name, email and quantity

Quantity can be calculated by counting related Lot for each clients, it can be done with Loopback.
It's heavy by design to do it this way (1 useless DB access), I propose to add a 'quantity' field to Client model.
This field would be incremented by 1 on each create action on related Lot, afer creation of Lot.

There are other options also to prevent this DB call, like access to a cache.

### Lots

Should increase Client.quantity on create action.


## Testing

To launch

```shell
npm test
```

Jest was used before for unit testing, I've tested my binaryTreeDFS function with it. (lib/calculatePasswordCombinations.test.js)

I've also used Jest with success to tests API calls (server/models/user.test.js, server/models/gestionnaire.test.js and  server/models/client.test.js)

Tests are performed in '.test.js' files in '/lib/' and '/server/models/' folders.

## Configuration

### Environment variables

Credentials are supposed to be stored in environment variables.

Sample in `.env.template`, actual environment variables in `.env`.

`.env` is git-ignored by default.

### Mongo connector

If `DB_MONGO_HOST` environment variable is set, default datasource (named 'db') will be persistent and using a MongoDb server, instead of default volatile in-memory datasource.

Configuration of datasource is done in `server/datasources.local.js` that overwrite `server/datasources.json`.

## Resources

- https://medium.com/@markcolling/integrating-socket-io-with-next-js-33c4c435065e

- https://learnnextjs.com/

- https://www.udemy.com/react-the-complete-guide-incl-redux/learn/v4/overview

- https://react.semantic-ui.com/layouts/homepage

- https://expressjs.com/en/advanced/best-practice-security.html

- https://medium.com/front-end-hacking/next-js-redux-integration-3ab1a9ca5e1d

- https://github.com/zeit/next.js/tree/canary/examples/with-jest

- https://loopback.io/doc/en/lb3/User-management-example.html

- https://github.com/strongloop/loopback-example-access-control

- https://loopback.io/doc/en/lb3/Skip-filter.html

- https://github.com/ariel-zplinux/zp-boilerplate
