# KOA JSend
Simple and structured application level JSON responses for your API.
Based on JSend specification ([http://labs.omniti.com/labs/jsend](http://labs.omniti.com/labs/jsend)).

## Installation

```
npm install --save koa-jsend
```

In your [koa](http://koajs.com) app.

```javascript
var Koa = require('koa')
  , jsend = require('koa-jsend')
  ;

var app = new Koa();

app.use(jsend());
```

## API

Instead of using `ctx.body=` to send JSON responses, use one of the functions in `ctx`.

### `ctx.success(data)`

* __data__: _Optional_ response data.

```javascript
app.use(async function (ctx, next){
  ctx.success({
    name: 'Samora',
    sex: 'Male',
    nationality: 'Ghanaian'
  });
});

// JSON response
// {
//  "status": "success",
//  "data": {
//     "name": "Samora",
//     "sex": "Male",
//     "nationality": "Ghanaian"
//   }
// }
```

### `ctx.fail(errors)`

* __errors__: _Required_ error(s) data.

```javascript
app.use(async function (ctx, next){
  ctx.fail({
    name: 'Name is required.'
  });
});

// JSON response
// {
//  "status": "fail",
//  "data": {
//     "name": "Name is required."
//   }
// }
```

### `ctx.error(message, data, code)`

* __message__: _Required_ error message or `Error` object.
* __data__: _Optional_ error data.
* __code__: _Optional_ error code.

```javascript
app.use(async function (ctx, next){
  ctx.error('Something went wrong.', null, 8);
});

// JSON response
// {
//  "status": "error",
//  "message": "Something went wrong.",
//  "code": 8
// }
```

### `ctx.jsend(err, data, code)`

Sends a `ctx.success` response if no `err` is passed.
Sends a `ctx.error` response if `err` is passed.

* __err__: Error object or message string or null.
* __data__: _Optional_
* __code__: _Optional_

```javascript
app.use(async function (ctx, next){
  ctx.jsend(null, {
    name: 'Samora',
    sex: 'Male',
    nationality: 'Ghanaian'
  });
});

// JSON response
// {
//   "status": "success",
//   "data": {
//     "name": "Samora",
//     "sex": "Male",
//     "nationality": "Ghanaian"
//   }
// }
```


```javascript
app.use(async function (ctx, next){
  ctx.jsend(Error('Something went wrong.'));
});

// JSON response
// {
//   "status": "error",
//   "message": "Something went wrong.",
// }
```


# License

MIT