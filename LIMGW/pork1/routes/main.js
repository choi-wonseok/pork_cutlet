var express = require("express");
var path = require("path");
var fs = require("fs");
var router = express.Router();

const listPath = path.resolve(__dirname, "..", "data");

/* GET home page. */
router.get("/", (req, res, next) => {
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
