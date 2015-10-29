const koa = require('koa');
const app = koa();
const parse = require('co-body');

app.use(function* (next) {
  if (this.path !== '/') return yield next;
  const body = yield parse(this);
  this.body = body.name.toUpperCase();
});

app.use(function* (next) {
  if (this.path !== '/404') return yield next;
  this.body = 'page not found';
});

app.use(function* (next) {
  if (this.path !== '/500') return yield next;
  this.body = 'internal server error';
});

app.use(function* (next) {
  if (this.path !== '/test') return yield next;
  this.body = JSON.stringify({ name: 'Dave' });
});

app.listen(process.argv[2]);