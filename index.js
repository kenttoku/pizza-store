// 3 -> 4 -> 2 -> 1
// user -> store -> order -> pizza

const express = require('express');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const User = require('./js/user');
const { users } = require('./js/db');
const app = express();
const PORT = 8080;

// configure logger
app.use(morgan('dev'));

// parse request body
app.use(express.json());

// nunjucks configuration
nunjucks.configure('views', {
  autoescape: true,
  express: app
});

// set up static assets
app.use(express.static('.'));

// makeshift router
// TODO: Make it work with /:page/something else
app.get('/:page?', (req, res) => {
  const { params } = req;

  // convert to string for .toLowerCase() on index.njk
  if (typeof params.page !== 'string') {
    params.page = '';
  }

  console.log(params);
  return res.render('index.njk', params);
});

app.post('/signup', (req, res) => {
  const { name, address } = req.body;
  const lowerName = name.toLowerCase();

  if (users[lowerName]) {
    return res.json({ message: 'name taken' });
  } else {
    users[lowerName] = new User(name, address);
    return res.json(users[lowerName]);
  }
});

app.post('/login', (req, res) => {
  const { name } = req.body;
  const lowerName = name.toLowerCase();

  if (users[lowerName]) {
    return res.json(users[lowerName]);
  } else {
    return res.json({ message: 'user not found' });
  }
});

// 404 Error for unsupported routes
app.use((req, res) => {
  const params = { page: '404' };
  return res.render('index.njk', params);
});

app.listen(PORT, () => console.log(`Server up on PORT ${PORT}`));