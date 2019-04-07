function Order (pizzas) {
  this.id = null;
  this.pizzas = pizzas;
  this.cost = function getCost () {
    let sum = this.pizzas.reduce((s, pi) => {
      return s + pi.size.price;
    }, 0);

    return sum;
  };
}

module.exports = Order;