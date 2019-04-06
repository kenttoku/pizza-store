// let Address = require('./address');
// let Order = require('./order');

function User (name, address) {
  this.id = name;
  this.address = address;
  this.orders = [];
}

module.exports = User;