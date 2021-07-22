const exp = require("constants");
var express = require("express");
var router = express.Router();
var mysql = require("mysql2");
var path = require("path");

const listPath = path.resolve(__dirname, "..", "utils", "dbConnection");

const dbConnection = require(listPath);

router.get("/", async function (req, res, next) {
  var sql =
    "SELECT POST_NO, POST_TITLE, CONTENTS, date_format(WRT_DTT,'%Y-%m-%d %H:%i:%s') WRT_DTT FROM post";
  await dbConnection.query(sql, function (err, rows) {
    if (err) console.error("err : " + err);
    res.render("show", { title: "게시글", rows: 0 });
  });
});
module.exports = router;
