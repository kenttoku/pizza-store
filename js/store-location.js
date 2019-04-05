const Address = require('./address');
const Order = require('./order');

// let storeLocationCollection = {
//   east: new StoreLocation('EastArlington'),
//   west: new StoreLocation('WestArlington'),
//   north: new StoreLocation('NorthArlington'),
//   south: new StoreLocation('SouthArlington'),
// };

function StoreLocation (n) {
  this.id = null;
  this.name = n;
  this.address = new Address();
  this.orders = [];
}

module.exports = StoreLocation;