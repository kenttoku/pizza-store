const api = (function () {
  function sendRequest (method, path, body, success) {
    const req = new XMLHttpRequest();
    req.onload = success;
    req.open(method, path);
    req.responseType = 'json';
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(body));
  }

  return { sendRequest };
})();