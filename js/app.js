const app = (function () {
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
      };
      api.sendRequest('POST', '/login', body, success);
    });

  }
})();