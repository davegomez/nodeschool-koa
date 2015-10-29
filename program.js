'use strict';

const views = require('co-views');
const koa = require('koa');

const app = koa();

const user = {
  name: {
    first: 'Tobi',
    last: 'Holowaychuk'
  },
  species: 'ferret',
  age: 3
};

const render = views(__dirname + '/views', {
  ext: 'ejs'
});

app.use(function *() {
  this.body = yield render('user', {user: user});
});

app.listen(process.argv[2]);