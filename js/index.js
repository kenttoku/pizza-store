// 3 -> 4 -> 2 -> 1
// user -> store -> order -> pizza

const User = require('./user');
const express = require('express');
const nunjucks = require('nunjucks');
const app = express();
const PORT = 8080;

nunjucks.configure('.', {
  autoescape: true,
  express: app
});

app.use(express.static('./'));
app.get('/', function (req, res) {
  res.render('index.njk');
});

app.listen(PORT, () => console.log(`Server up on PORT ${PORT}`));


// function createUser (name, address) {
//   let u = new User();

//   u.id = name;
//   u.address = address;

//   console.log(u);
// }

// createUser('fred', 'ut arlington');
