var express = require("express");
var router = express.Router();
var path = require("path");

const controllerPath = path.resolve(__dirname, "..", "..", "controllers");
const { comments } = require(path.resolve(controllerPath, "postController"));
const listPath = path.resolve(__dirname, "..", "..", "utils", "dbConnection");

const dbConnection = require(listPath);

/* GET users listing. */
// router.get("/:post_no", function (req, res) {
//   res.render("comment", { title: "Welcome" });
// });
router.get("/:post_no", function (req, res) {
  var sql = `SELECT COMMENT, WRT_ID, date_format(WRT_DTT,'%Y-%m-%d %H:%i:%s') WRT_DTT FROM reply WHERE POST_NO=${req.params.post_no}`;
  dbConnection.query(sql, function (err, result) {
    res.render("comment", { contents: result });
  });
});
router.post("/:post_no", comments);

module.exports = router;
