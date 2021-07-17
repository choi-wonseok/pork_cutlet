var express = require("express");
var fs = require("fs");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("create", { title: "Welcome" });
});
router.post("/", function (req, res, next) {
  var title = req.body.title;
  var description = req.body.description;
  fs.writeFile(`data/${title}`, description, "utf8", function (err) {
    res.writeHead(302, {
      Location: `/`,
    });
    res.end();
  });
});

module.exports = router;
