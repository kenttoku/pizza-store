const api = (function () {
  function sendRequest (method, path, body) {
    const req = new XMLHttpRequest();
    req.open(method, path);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(body));
  }

  // sign up
  const signupButton = document.querySelector('#signupButton');

  if (signupButton) {
    signupButton.addEventListener('click', (e) => {
      e.preventDefault();
      const name = document.querySelector('#signupForm #name').value;
      const address = document.querySelector('#signupForm #address').value;
      const body = { name, address };
      console.log(name, address);
      sendRequest('POST', '/signup', body);
    });
  }
})();