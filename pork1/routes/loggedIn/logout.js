var express = require("express");
var router = express.Router();
var path = require("path");

const controllerPath = path.resolve(__dirname, "..", "..", "controllers");

/* GET users listing. */
router.get("/", function (req, res) {
  res.clearCookie("userID");
  res.redirect("/");
});

module.exports = router;
