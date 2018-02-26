/*
* @Author: x
* @Date:   2018-02-03 12:52:00
* @Last Modified by:   ChencongDiu
* @Last Modified time: 2018-02-25 22:04:51
*/
const path = require('path');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const routes = require('./routes');
const config = require('config-lite')(__dirname);
const formidable = require('express-formidable');
const bodyParser = require('body-parser');
const fs = require('fs');
const readline = require('readline');
//var userId = require('userId');

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded();
const app = express();

var loadedQuestions;

// html pattern path
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// static path
app.use(express.static(path.join(__dirname, 'public')));



// session to record user
app.use(session({
  name: config.session.key,
  secret: config.session.secret,
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: config.session.maxAge
  },
  store: new MongoStore({
    url: config.mongodb
  })
}));

app.use(flash());
// submit form
app.use(formidable({
  uploadDir: path.join(__dirname, 'public/img'),
  keepExtensions: true
}));

app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  res.locals.success = req.flash('success').toString();
  res.locals.error = req.flash('error').toString();
  next();
});

routes(app);

// start app
app.listen(config.port, () => {
  console.log(`listening on port ${config.port}`);
});
