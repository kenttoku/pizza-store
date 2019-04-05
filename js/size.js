function Size (name, price) {
  this.id = null;
  this.name = name;
  this.price = price;
}

let pizzaSizes = {
  small: new Size('small', 5),
  medium: new Size('medium', 10),
  large: new Size('large', 15)
};

module.exports = { Size, pizzaSizes };