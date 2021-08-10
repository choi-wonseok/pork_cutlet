var express = require("express");
var router = express.Router();
var mysql = require("mysql2");
var path = require("path");

const listPath = path.resolve(__dirname, "..", "..", "utils", "dbConnection");

const dbConnection = require(listPath);

router.get("/", function (req, res) {
  var query = req.query.query;
  var sql = `SELECT BBS_NO, POST_NO, POST_TITLE, WRT_ID, date_format(WRT_DTT,'%Y-%m-%d %H:%i:%s') WRT_DTT FROM post WHERE POST_TITLE LIKE '%${query}%'`;
  dbConnection.query(sql, function (err, rows) {
    res.render("search", { title: "게시판 리스트", rows: rows });
  });
});

module.exports = router;
