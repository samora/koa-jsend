# KOA JSend
Simple and structured application level JSON responses for your API.
Based on JSend specification ([http://labs.omniti.com/labs/jsend](http://labs.omniti.com/labs/jsend)).

## Installation

```
npm install koa-jsend
```

In your [koa](http://koajs.com) app.
```javascript
var koa = require('koa')
  , jsend = require('koa-jsend')
  ;

var app = koa();

app.use(jsend());
```

## API
Instead of using `this.body=` to send JSON responses, use one of the functions in `this.jsend`.

### `success`

`jsend.success(data)`

* __data__: _Optional_ response data.

```javascript
app.use(function *(){
  this.jsend.success({
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

### `fail`

`jsend.fail(errors)`

* __errors__: _Required_ error(s) data.

```javascript
app.use(function *(){
  this.jsend.fail({
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

### `error`

`jsend.error(message, data, code)`

* __message__: _Required_ error message.
* __data__: _Optional_ error data.
* __code__: _Optional_ error code.

```javascript
app.use(function *(){
  this.jsend.error('Something went wrong.', null, 8);
});

// JSON response
// {
//  "status": "errror",
//  "message": "Something went wrong.",
//  "code": 8
// }
```