var express = require("express");
var router = express.Router();
var path = require("path");

const controllerPath = path.resolve(__dirname, "..", "controllers");
const { register } = require(path.resolve(controllerPath, "userController"));

/* GET users listing. */
router.get("/", function (req, res) {
  res.render("signup", { title: "회원 가입" });
});
router.post("/", register);

module.exports = router;
