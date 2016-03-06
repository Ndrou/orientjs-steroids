# orientjs-steroids

OrientJS under steroids.

It's not an [OrientJS](https://github.com/orientechnologies/orientjs) replacement, it use OrientJS and add new features to the existing.

Features :

- Generate and execute queries from handlebars templates
- (...)

New ideas are welcome !

## Install

```
$ npm install orientjs-steroids
```

## Usage

```js
var OrientDB = require('orientjs-steroids');

var server = new OrientDB({
  host: 'localhost',
  port: 2424,
  username: 'root',
  password: 'yourpassword'
});

var db = server.use({
 name: 'GratefulDeadConcerts',
 username: 'admin',
 password: 'admin'
});

```

See [OrientJS Documentation](https://github.com/orientechnologies/orientjs) for more details...

### Create a template

#### Simple query

*simple-query.hbs*
```
SELECT
  @rid,
  {{#if firstname}}firstname,{{/if}}
  lastname
FROM
  V
WHERE
  lastname = :lastname
```

#### Batch query

*batch-query.hbs*
```
BEGIN;

let $t0 = select from V WHERE type = :type1;
let $t1 = select from V WHERE type = :type2;

return $t1;
```

### Load query templates

```js
db.loadTemplates({
  path: __dirname + '/templates' // your templates directory
});
```

### Execute a query from template

```js
// See template sample above (Chapter : Create a template)
db.queryTemplate('simple-query', {firstname: true}, {
    params: {
      type: 'song'
    }
  })
  .then(function (results) {
    // (...)
  })

// See template sample above (Chapter : Create a template)
db.batchQueryTemplate('batch-query', null, {
    params: {
      type1: 'song',
      type2: 'artist'
    }
  })
  .then(function (results) {
    // (...)
  })
```
