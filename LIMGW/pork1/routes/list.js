var express = require("express");
var router = express.Router();
var mysql = require("mysql2");
var path = require("path");

const listPath = path.resolve(__dirname, "..", "utils", "dbConnection");

const dbConnection = require(listPath);

router.get("/", function (req, res, next) {
  var sql =
    "SELECT BBS_NO, POST_NO, POST_TITLE, date_format(WRT_DTT,'%Y-%m-%d %H:%i:%s') WRT_DTT FROM post";
  dbConnection.query(sql, function (err, rows) {
    if (err) console.error("err : " + err);
    res.render("list", { title: "게시판 리스트", rows: rows });
  });
});

module.exports = router;
