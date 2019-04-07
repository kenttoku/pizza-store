const express = require('express');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const moment = require('moment');
const User = require('./js/user');
const Order = require('./js/order');
const Pizza = require('./js/pizza');
const { users, storeLocations } = require('./js/db');
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

app.post('/pizza', (req, res) => {
  const { crust, size, toppings } = req.body;
  const pizza = new Pizza(crust, size, toppings);
  return res.json({ pizza });
});

app.post('/order', (req, res) => {
  const { pizzas, user, storeLocation } = req.body;
  const order = new Order(pizzas);

  if (!user || !storeLocation) {
    return res.json({ message: 'invalid' });
  }

  const orderUser = users[user.toLowerCase()];
  const orderStoreLocation = storeLocations[storeLocation.toLowerCase()];


  if (!orderUser || !orderStoreLocation) {
    return res.json({ message: 'invalid' });
  }

  // user can only order after 2 hours passes
  for (let i = 0; i < orderUser.orders.length; i++) {
    if (orderUser.orders[i].createdAt.isAfter(moment().subtract(2, 'hours'))) {
      return res.json({ message: 'please wait at least 2 hours before you order again' });
    }
  }

  // user can only order

  orderUser.orders.push(order);
  orderStoreLocation.orders.push(order);

  // console.log(orderUser.orders);
  // console.log(orderStoreLocation.orders);
  const message = 'order placed';
  return res.json({ message });
});

// 404 Error for unsupported routes
app.use((req, res) => {
  const params = { page: '404' };
  return res.render('index.njk', params);
});

app.listen(PORT, () => console.log(`Server up on PORT ${PORT}`));