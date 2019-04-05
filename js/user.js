// let Address = require('./address');
// let Order = require('./order');
const StoreLocation = require('./store-location');

// let userCollection = [
//   new User(1),
//   new User(2),
//   new User(3),
//   new User(4)
// ];

function User (name, address) {
  this.id = name;
  this.address = address;
  this.orders = [];
}

module.exports = User;