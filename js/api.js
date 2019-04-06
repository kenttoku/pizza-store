const api = (function () {
  function sendRequest (method, path, body, success) {
    const req = new XMLHttpRequest();
    req.onload = success;
    req.open(method, path);
    req.responseType = 'json';
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(body));
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
        const { message } = e.target.response;

        if (message) {
          const signupMessage = document.querySelector('#signupMessage');
          signupMessage.textContent = message;
        }
      };

      sendRequest('POST', '/signup', body, success);
    });
  }
})();