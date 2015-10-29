const fs = require('fs');
const koa = require('koa');
const parse = require('co-body');

const app = koa();

app.use(function *(next) {
  // only accept POST request
  if (this.method !== 'POST') return yield next;

  // max body size limit to `1kb`
  const body = yield parse(this, { limit: '1kb' });

  // if body.name not exist, respond `400`
  if (!body.name) this.throw(400, '.name required');

  this.body = body.name.toUpperCase();
});

app.use(function *(next) {
  if (this.path !== '/json') return yield next;

  this.body = { foo: 'bar' };
});

app.use(function *(next) {
  if (this.path !== '/stream') return yield next;

  this.body = fs.createReadStream(process.argv[3]);
});

app.listen(process.argv[2]);