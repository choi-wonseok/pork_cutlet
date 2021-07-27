var express = require("express");
var path = require("path");
var fs = require("fs");
var router = express.Router();
// const utilPath = path.resolve(__dirname, "..", "controllers", "utils");
// var util = require(utilPath);
const controllerPath = path.resolve(__dirname, "..", "..", "controllers");
const listPath = path.resolve(__dirname, "..", "..", "data");
const { homePage } = require(path.resolve(controllerPath, "userController"));

/* GET home page. */
router.get("/", (req, res) => {
  let fileList;
  fs.readdir(listPath, (err, files) => {
    fileList = files;
    console.log(listPath);
    res.render("main", {
      title: "Welcome",
      description: "Hello, Node.js",
      list: fileList,
    });
  });
});

module.exports = router;
