var express = require("express");
var router = express.Router();
var path = require("path");

const controllerPath = path.resolve(__dirname, "..", "..", "controllers");
const { bbs } = require(path.resolve(controllerPath, "postController"));

/* GET users listing. */
router.get("/", function (req, res) {
  res.render("create", { title: "Welcome" });
});
router.post("/", bbs);

module.exports = router;

/* 
function (req, res, next) {
  var title = req.body.title;
  var description = req.body.description;
  fs.writeFile(`data/${title}`, description, "utf8", function (err) {
    res.writeHead(302, {
      Location: `/`,
    });
    res.end();
  });
});
*/
