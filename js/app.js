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
    show('#logOutButton');
  }

  function showLoggedOut () {
    show('#signupSection');
    show('#loginSection');
    hide('#pizzaSection');
    hide('#cartSection');
    hide('#logOutButton');
  }

  function logOut () {
    window.localStorage.removeItem('user');
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

      // validate
      if (!name.value || !address.value) {
        const signupMessage = document.querySelector('#signupMessage');
        signupMessage.textContent = 'please enter both name and address';
        return;
      }

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

      // validate
      if (!name.value) {
        const signupMessage = document.querySelector('#loginMessage');
        signupMessage.textContent = 'please enter name';
        return;
      }

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
        const orderCart = document.querySelector('#orderCart');

        if (orderCart) {
          orderCart.innerHTML = '';
          pizzas.forEach(pizza => {
            const li = document.createElement('li');
            li.innerHTML = `${pizza.size.name} ${pizza.crust} ${pizza.toppings.length ? 'with' : ''} ${pizza.toppings} for $${pizza.size.price}`;
            orderCart.appendChild(li);
          });
        }
      };
      // };
      api.sendRequest('POST', '/pizza', body, success);
    });
  }

  // order pizza
  const placeOrderButton = document.querySelector('#placeOrderButton');

  if (placeOrderButton) {
    placeOrderButton.addEventListener('click', (e) => {
      e.preventDefault();
      const user = (window.localStorage.getItem('user'));
      const storeLocation = document.querySelector('select[name="location"]').value;

      if (!pizzas.length || !user || !storeLocation) {
        return;
      }

      const body = { pizzas, user, storeLocation };
      const success = function (e){
        const { message } = e.target.response;
        const cartMessage = document.querySelector('#cartMessage');

        cartMessage.textContent = message;
      };

      api.sendRequest('POST', '/order', body, success);
    });
  }

  // log out button
  const logOutButton = document.querySelector('#logOutButton');

  if (logOutButton) {
    logOutButton.addEventListener('click', (e) => {
      e.preventDefault();
      logOut();
      showLoggedOut();
    });
  }
})();