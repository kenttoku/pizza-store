const StoreLocation = require('./store-location');

const users = {};
const storeLocations = {
  north: new StoreLocation('north'),
  south: new StoreLocation('south'),
  east: new StoreLocation('east'),
  west: new StoreLocation('west')
};

module.exports = { users, storeLocations };