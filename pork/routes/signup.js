var express = require("express");
var router = express.Router();
var path = require("path");

const listPath = path.resolve(__dirname, "..", "public");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("signup", { title: "Welcome" });
});
router.post("/", function (req, res, next) {});

module.exports = router;
