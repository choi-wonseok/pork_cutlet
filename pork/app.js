var createError = require("http-errors");
var express = require("express");
const session = require("express-session");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// 추가한 모듈
// var qs = require('querystring');
// var fs = require('fs');
var bodyParser = require("body-parser");
var compression = require("compression");
// var sanitizeHtml = require('sanitize-html');

var indexRouter = require("./routes/main");
var createRouter = require("./routes/create");
var accountRouter = require("./routes/account");
var signupRouter = require("./routes/signup");
var loginhomeRouter = require("./routes/loginhome");
var logoutRouter = require("./routes/logout");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    name: "session",
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

// 추가
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());

app.get("/", (req, res) => res.redirect("index"));
app.use("/create", createRouter);
app.use("/account", accountRouter);
app.use("/signup", signupRouter);
app.use("/index", indexRouter);
app.use("/home", loginhomeRouter);
app.use("/logout", logoutRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  if (err) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
  }
});

module.exports = app;
