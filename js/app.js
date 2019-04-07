const app = (function () {
  function hide (selector) {
    const element = document.querySelector(selector);
    if (element) {
      element.classList.add('d-none');
    }
  }

  function show (selector) {
    const element = document.querySelector(selector);
    if (element) {
      element.classList.remove('d-none');
    }
  }

  function showLoggedIn (){
    hide('#signupSection');
    hide('#loginSection');
    show('#pizzaSection');
    show('#cartSection');
  }

  function showLoggedOut () {
    show('#signupSection');
    show('#loginSection');
    hide('#pizzaSection');
    hide('#cartSection');

  }
  if (window.localStorage.getItem('user')) {
    showLoggedIn();
  } else {
    showLoggedOut();
  }

  // sign up
  const signupButton = document.querySelector('#signupButton');

  if (signupButton) {
    signupButton.addEventListener('click', (e) => {
      e.preventDefault();
      const name = document.querySelector('#signupForm #name');
      const address = document.querySelector('#signupForm #address');
      const body = {
        name: name.value,
        address: address.value
      };

      const success = function (e) {
        const { message, id } = e.target.response;

        if (message) {
          const signupMessage = document.querySelector('#signupMessage');
          signupMessage.textContent = message;
          return;
        }

        window.localStorage.setItem('user', id);
        showLoggedIn();
      };
      api.sendRequest('POST', '/signup', body, success);
    });
  }

  // log in
  const loginButton = document.querySelector('#loginButton');

  if (loginButton) {
    loginButton.addEventListener('click', (e) => {
      e.preventDefault();
      const name = document.querySelector('#loginForm #name');
      const body = { name: name.value };

      const success = function (e) {
        const { message, id } = e.target.response;

        if (message) {
          const loginMessage = document.querySelector('#loginMessage');
          loginMessage.textContent = message;
          return;
        }

        window.localStorage.setItem('user', id);
        showLoggedIn();
      };
      api.sendRequest('POST', '/login', body, success);
    });

  }

  // add pizza to order
  const addPizzaButton = document.querySelector('#addPizzaButton');
  const pizzas = [];

  if (addPizzaButton) {
    addPizzaButton.addEventListener('click', (e) => {
      e.preventDefault();
      const crust = document.querySelector('select[name="crust"]');
      const size = document.querySelector('#addPizzaForm input[name="size"]:checked');
      const toppingCollection = document.querySelectorAll('#addPizzaForm input[name="toppings"]:checked');
      const toppings = [];

      if (!crust || !size) {
        return;
      }

      toppingCollection.forEach(topping => toppings.push(topping.value));
      const body = {
        crust: crust.value,
        size: size.value,
        toppings
      };

      const success = function (e) {
        const { message, pizza } = e.target.response;

        if (message) {
          const loginMessage = document.querySelector('#loginMessage');
          loginMessage.textContent = message;
          return;
        }

        if (pizza) {
          pizzas.push(pizza);
        }
        console.log(pizzas);
        const orderCart = document.querySelector('#orderCart');

        if (orderCart) {
          orderCart.innerHTML = '';
          pizzas.forEach(pizza => {
            const li = document.createElement('li');
            li.innerHTML = `${pizza.size.name} ${pizza.crust} with ${pizza.toppings} for $${pizza.size.price}`;
            orderCart.appendChild(li);
          });
        }
      };
      // };
      api.sendRequest('POST', '/pizza', body, success);
    });

  }
})();