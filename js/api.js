const api = (function () {
  const signupButton = document.querySelector('#signupButton');

  if (signupButton) {
    signupButton.addEventListener('click', (e) => {
      const req = new XMLHttpRequest();
      const body = { test: 'body' };
      req.open('POST', '/signup');
      req.setRequestHeader('Content-Type', 'application/json');
      req.send(JSON.stringify(body));
    });
  }
})();