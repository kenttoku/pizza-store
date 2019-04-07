const Address = require('./address');
const Order = require('./order');

function StoreLocation (name) {
  this.id = null;
  this.name = name;
  this.address = new Address();
  this.orders = [];
}

module.exports = StoreLocation;