import { Order } from './order.js';
import { Pizza } from './pizza.js';
import { storeLocationCollection } from './store-location.js';
import { userCollection } from './user.js';

function attachLocation (storeLocation, order) {
  let store = storeLocationCollection[storeLocation];
  store.orders.push(order);
}

function attachUser (userId, order) {
  let selectedUser = userCollection.find(user => user.id == userId);
  selectedUser.orders.push(order);
}

function getSize () {
  let sizes = Array.from(document.querySelectorAll('input[name="size"]'));
  return sizes.find(size => size.checked).value;
}

function getToppings () {
  let toppings = Array.from(document.querySelectorAll('input[name="toppings"]'));
  return toppings.filter(topping => topping.checked).map(topping => topping.value);
}

function getCrust () {
  let crustCollection = document.querySelector('select[name="crust"]');
  return crustCollection.value;
}

function validatePizza () {
  let size = getSize();
  let toppings = getToppings();
  let crust = getCrust();

  if (!size || toppings.length === 0 || !crust) return;

  pizzas.push(new Pizza(crust, size, toppings));
  addToOrderCart(pizzas);
}

function addToOrderCart (pizzas) {
  let orderCart = document.querySelector('#orderCart');

  orderCart.innerHTML = '';

  pizzas.forEach(pizza => {
    let li = document.createElement('li');
    li.innerHTML = `${pizza.size.name} ${pizza.crust} with ${pizza.toppings} for $${pizza.size.price}`;
    orderCart.appendChild(li);
  });
}

function createOrder () {
  let order = new Order();
  order.pizzas = pizzas;
  let location = document.querySelector('select[name="location"]');
  let user = document.querySelector('select[name="user"]');

  attachUser(user.value, order);
  attachLocation(location.value, order);

  console.log(order.cost());
  console.log(userCollection);
  console.log(storeLocationCollection);

  return order;
}

let pizzas = [];
let addPizza = document.querySelector('#addPizza');
let placeOrder = document.querySelector('#placeOrder');

if (addPizza) {
  addPizza.addEventListener('click', validatePizza);
}

if (placeOrder) {
  placeOrder.addEventListener('click', createOrder);
}

console.log(pizzas);