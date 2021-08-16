const exp = require("constants");
var express = require("express");
var router = express.Router();
var mysql = require("mysql2");
var path = require("path");
const listPath = path.resolve(__dirname, "..", "..", "utils", "dbConnection");

const dbConnection = require(listPath);
// 10, ${1 - 1}
router.get("/", async function (req, res) {
  var sql = `CALL dongas.post_select_by_id(3);`;
  var sql2 = `SELECT * FROM uni_login WHERE login_id='${req.signedCookies.userID}'`;
  await dbConnection.query(sql + sql2, async function (err, result) {
    if (err) console.error("err : " + err);
    // var isMine = false;
    // if (result[0][0].WRT_ID == req.signedCookies.userID) isMine = true;

    res.render("show", {
      title: "동아리게시판",
      contents: result[0],
      users: result[2][0],
      userID: req.signedCookies.userID,
    });
  });
});
module.exports = router;
