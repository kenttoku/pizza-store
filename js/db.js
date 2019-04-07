const StoreLocation = require('./store-location');

const users = {};
const storeLocations = {
  north: new StoreLocation('North Arlington'),
  south: new StoreLocation('South Arlington'),
  east: new StoreLocation('East Arlington'),
  west: new StoreLocation('West Arlington')
};

module.exports = { users, storeLocations };