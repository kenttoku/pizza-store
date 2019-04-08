let Address = require('./address');
// let Order = require('./order');

function User (name, street) {
  this.id = name;
  this.address = new Address(street);
  this.orders = [];
}

module.exports = User;