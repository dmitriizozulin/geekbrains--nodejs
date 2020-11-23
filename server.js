const express = require('express');

const db = require('./models/db');

const session = require('express-session');
const sessionStore = new (require('express-mysql-session')(session))({}, db);
const cookieParser = require('cookie-parser');

const app = express();

const routs = require('./routes');

app.use(express.static(__dirname + '/public'));

app.use(
  session({
    store: sessionStore,
    secret: 'Big secret',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: { maxAge: 600000 },
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');

app.use(routs);

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
