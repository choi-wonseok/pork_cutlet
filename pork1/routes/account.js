var express = require("express");
var router = express.Router();
var path = require("path");
var fs = require("fs");
var passport = require("passport");

const controllerPath = path.resolve(__dirname, "..", "controllers");
const { login } = require(path.resolve(controllerPath, "userController"));

/* GET users listing. */
router.get("/", function (req, res) {
  res.render("account", { title: "로그인", msg: req.session.msg });
  if (req.session.msg) delete req.session.msg;
});
router.post("/", login);

module.exports = router;
