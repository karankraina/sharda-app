// importing modules
const express = require("express");
const exphbs = require("express-handlebars");
const forceSSL = require("express-force-ssl");
const path = require("path");
const morgan = require("morgan");
const moment = require("moment")
const bodyParser = require("body-parser");
const compression = require("compression");
// const favicon = require('serve-favicon');
const helmet = require("helmet");

// Importing the express module under the `app` variable
const app = express();

global.appServer = app;

/*  If the user is local development import the .env file, else do not load the
    .env file. Also if production is set start newrelic for monitoring */
if (app.get("env") === "development") {
  /* eslint-disable global-require */
  require("dotenv").config();
} else if (app.get("env") === "production") {
  // Import the NewRelic Module.
  require("newrelic");
  // Force https protocol for any connection
  app.use(forceSSL);
  /* Ensure that the XFPHeader is trusted, otherwise can cause redirect loop */
  app.set("forceSSLOptions", {
    trustXFPHeader: true,
    sslRequireMessage: "SSL Required."
  });
} else {
  console.log(
    "Please set your NODE_ENV to either `development` or `production`"
  );
}

// Importing the favicon, remove if you do not have one.
// app.use(favicon(`${__dirname}/lib/public/img/favicon.ico`));

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
    maxAge: 5184000
  })
);

// helpers
const hbs = exphbs.create({
  defaultLayout: 'main',
  // Specify helpers which are only registered on this instance.
  helpers: {
    formatdate(date, format) {
      if (date === '' || date === undefined || date === 'undefined' || date === null) {
        return '';
      }
      const mD = moment(new Date(date)).format(format.toString());
      return (mD);
    },
    ifEquals(arg1, arg2, options) {
      return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
    },
    ifArrIncludes(arg1, arg2, options) {
      if (arg1 != null && arg1.length > 0 && arg2 != null) {
        return (arg1.includes(arg2.toString())) ? options.fn(this) : options.inverse(this);
      } else {
        return options.inverse(this);
      }
    }
  },
});

// view engine setup and public static directory
app.set("views", path.join(__dirname, "views"));
app.engine("handlebars", hbs.engine);

app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, "lib/public")));

// Configure the express app
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// Importing all unauthorized routes to the server
const notAuthorizedRoutes = require("./lib/routes/not-authorized-routes");

// Importing all authorized routes to the server
const authenticatedRoutes = require("./lib/routes/authenticated-routes");

// compress all routes
app.use(compression());

// Load authenticated routes
// app.use("/", notAuthorizedRoutes);



// Load authenticated routes
app.use("/", authenticatedRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404);
  res.render("error");
});

// development error handler will print stack trace
// To run in development mode set config var NODE_ENV to 'development'
if (app.get("env") === "development") {
  app.use((err, req, res) => {
    console.log("ERROR IN DEV SERVER ", err);
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err
    });
  });
}

// production error handler. No stacktraces leaked to user
app.use((err, req, res) => {
  console.log("ERROR IN DEV SERVER ", err);
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
});

module.exports = app;
