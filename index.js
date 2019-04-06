// 3 -> 4 -> 2 -> 1
// user -> store -> order -> pizza

const express = require('express');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
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
  console.log('working');
  const { body } = req;

  console.log(body);
});

// 404 Error for unsupported routes
app.use((req, res) => {
  const params = { page: '404' };
  return res.render('index.njk', params);
});

// Custom Error Handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.status) {
    const errBody = Object.assign({}, err, { message: err.message });
    res.status(err.status).json(errBody);
  } else {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(PORT, () => console.log(`Server up on PORT ${PORT}`));