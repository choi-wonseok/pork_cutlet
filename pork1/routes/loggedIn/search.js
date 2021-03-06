const exp = require("constants");
var express = require("express");
var router = express.Router();
var mysql = require("mysql2");
var path = require("path");

const listPath = path.resolve(__dirname, "..", "..", "utils", "dbConnection");

const dbConnection = require(listPath);

router.get("/", async function (req, res) {
  // { CALL dongas.search_posts(:p_contents) }
  var query = req.query.query;
  var id = req.signedCookies.userID;
  var sql = `CALL dongas.search_posts('${query}',2);`;
  var sql2 = `SELECT * FROM uni_login WHERE login_id='${id}'`;

  await dbConnection.query(sql + sql2, async function (err, result) {
    if (err) console.error("err : " + err);
    res.render("show", {
      title: "게시판 리스트",
      contents: result[0],
      users: result[2][0],
      userID: req.signedCookies.userID,
    });
  });
});

module.exports = router;
