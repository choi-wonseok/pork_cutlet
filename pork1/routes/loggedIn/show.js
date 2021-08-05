const exp = require("constants");
var express = require("express");
var router = express.Router();
var mysql = require("mysql2");
var path = require("path");
const listPath = path.resolve(__dirname, "..", "..", "utils", "dbConnection");

const dbConnection = require(listPath);

router.get("/", async function (req, res) {
  var sql = `CALL dongas.post_select_by_id(1, 10, ${1 - 1});`;
  var sql2 = `SELECT * FROM uni_login WHERE login_id='${req.signedCookies.userID}'`;
  await dbConnection.query(sql + sql2, async function (err, result) {
    if (err) console.error("err : " + err);
    // var isMine = false;
    // console.log(result[0][0]);
    // if (result[0][0].WRT_ID == req.signedCookies.userID) isMine = true;

    res.render("show", {
      title: "게시글",
      contents: result[0],
      users: result[2][0],
      userID: req.signedCookies.userID,
    });
  });
});
module.exports = router;
