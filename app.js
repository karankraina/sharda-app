// importing modules
require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const compression = require('compression');
const favicon = require('serve-favicon');
const helmet = require('helmet');
const cors = require('cors');
const { auth } = require('./lib/server-controllers/authentication-module');


// Importing the express module under the `app` variable
const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, 'lib/public')));


global.appServer = app;


// Importing the favicon, remove if you do not have one.
app.use(favicon(`${__dirname}/lib/public/img/favicon.ico`));

// Added further layer of security
app.use(helmet());

/*
  Once a brwoser receives the HSTS header (Strict Transport Security Header)
  that browser will prevent any communications from being sent over HTTP and will
  instead send all communications over HTTPS for a specificied amount of time.

  The 'maxAge' parameter specified how many seconds after the first comm to use
  HTTPS in seconds, therefore 5184000s represents 60 days.
*/
app.use(
  helmet.hsts({
    maxAge: 5184000,
  }),
);

// helpers
const hbs = exphbs.create({
  defaultLayout: 'main',
  // Specify helpers which are only registered on this instance.
  helpers: {
    ifEquals(arg1, arg2, options) {
      return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
    },
  },
});

// view engine setup and public static directory
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', hbs.engine);

app.set('view engine', 'handlebars');


// Configure the express app
// app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);


// compress all routes
app.use(compression());

// Importing all authorized routes to the server
const authenticatedRoutes = require('./lib/routes/authenticated-routes');
const publicRoutes = require('./lib/routes/public-routes');
const apiRoutes = require('./lib/routes/api-routes');

app.get('/vendor/*', (req, res, next) => {
  next(404);
});
app.use('/', publicRoutes);
app.use('/api', apiRoutes);
auth(app);
app.use('/', authenticatedRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  console.log('STATUS 404....');
  res.status(404);
  res.render('error');
});

// development error handler will print stack trace
// To run in development mode set config var NODE_ENV to 'development'
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    console.log('ERROR IN DEV SERVER ', err);
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler. No stacktraces leaked to user
app.use((err, req, res) => {
  console.log('ERROR IN PROD SERVER ', err);
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

module.exports = app;
