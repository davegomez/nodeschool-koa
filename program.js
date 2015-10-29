const fs = require('fs');
const koa = require('koa');
const parse = require('co-body');

const app = koa();

app.use(function *(next) {
  if (this.path !== '/') return yield next;

  this.body = this.request.is('application/json') ? {message: 'hi!'} : 'ok';
});

app.listen(process.argv[2]);