var createError = require("http-errors");
var express = require("express");
const session = require("express-session");
const { v1: uuidv1, v4: uuidv4 } = require("uuid");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// 추가한 모듈
// var qs = require('querystring');
// var fs = require('fs');
var bodyParser = require("body-parser");
var compression = require("compression");
// var passport = require("passport");
// var flash = require("connect-flash");
// var sanitizeHtml = require("sanitize-html");

var indexRouter = require("./routes/account");
var loggedInRouter = require("./routes/loggedIn");
var signupRouter = require("./routes/signup");

// var authRouter = require("./routes/auth");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    genid: (req) => {
      return uuidv4();
    },
    name: "sess",
    secret: "my_secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 3600 * 1000, // 1hr
    },
  })
);

app.use(cookieParser("secret"));
app.use(express.static(path.join(__dirname, "public")));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());

// 추가
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
// app.use(sanitizeHtml);

const isLoggedMiddleware = (req, res, next) => {
  if (!req.signedCookies.userID) res.redirect("account");
  else next();
};

app.use("/account", indexRouter);
app.use("/signup", signupRouter);
app.use("/", isLoggedMiddleware, loggedInRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  if (err) {
    // render the error page
    res.status(err.status || 500);
    res.render("error", { error: err });
  }
});

module.exports = app;
