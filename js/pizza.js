const { pizzaSizes } = require('./size');

function Pizza (crust, size, toppings) {
  this.id = null;
  this.crust = crust;
  this.size = getSize(size);
  this.toppings = toppings; 
}

function getSize (size) {
  return pizzaSizes[size];
}

module.exports = Pizza;