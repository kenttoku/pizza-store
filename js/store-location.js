const Address = require('./address');

function StoreLocation (name, street) {
  this.id = null;
  this.name = name;
  this.address = new Address(street);
  this.orders = [];
}

module.exports = StoreLocation;