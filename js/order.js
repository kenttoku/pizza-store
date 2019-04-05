// import { Pizza } from './pizza.js';
// import { StoreLocation } from './store-location.js';
// import { User } from './user.js';
const Pizza = require('./pizza');

function Order () {
  this.id = null;
  this.pizzas = [];
  this.cost = function getCost () {
    let sum = this.pizzas.reduce(function (s, pi) {
      return s + pi.size.price;
    }, 0);

    return sum;
  };
}

module.exports = Order;