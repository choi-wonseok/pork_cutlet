var express = require("express");
var router = express.Router();
var path = require("path");

const controllerPath = path.resolve(__dirname, "..", "controllers");
const { login } = require(path.resolve(controllerPath, "userController"));

/* GET users listing. */
router.get("/", function (req, res) {
  res.render("account", { title: "로그인", msg: req.session.msg });
  delete res.session.msg;
});
router.post("/", login);

module.exports = router;
