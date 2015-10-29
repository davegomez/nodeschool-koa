'use strict';

const session = require('koa-session');
const koa = require('koa');

const app = koa();

// to use signed cookie, we need to set app.keys
app.keys = ['secret', 'keys'];
app.use(session(app));

app.use(function *(){
  const view = ~~this.cookies.get('view', { signed: true }) + 1;
  this.cookies.set('view', view, { signed: true });
  this.body = `${view} views`;
});
// ~~ it is used as a faster substitute for Math.floor().

app.listen(process.argv[2]);