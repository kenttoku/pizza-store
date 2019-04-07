const moment = require('moment');

function Order (pizzas, storeLocation) {
  this.id = null;
  this.storeLocation = storeLocation;
  this.createdAt = moment();
  this.pizzas = pizzas;
  this.cost = function getCost () {
    let sum = this.pizzas.reduce((s, pi) => {
      return s + pi.size.price;
    }, 0);

    return sum;
  };
}

module.exports = Order;