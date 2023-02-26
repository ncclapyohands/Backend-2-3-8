const express = require('express');
const mongodb = require('./db');
const routes = require('./routes');
const bodyParser = require('body-parser');
const { auth } = require('express-openid-connect');

const port = process.env.PORT || 8080;
const app = express();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:2665',
  clientID: '1tpbWAnoLpSq1YyCOu8gWPaFfbSrNEMb',
  issuerBaseURL: 'https://dev-7h7o4fiu50eyp8xu.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(
    req.oidc.isAuthenticated()
      ? 'Logged in <a class="login" href="http://localhost:2665/logout">Log Out</a>'
      : 'Logged out <a class="login" href="http://localhost:2665/login">Log in</a>'
  );
});

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
  .use('/', routes);

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
