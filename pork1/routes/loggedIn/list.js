const exp = require("constants");
var express = require("express");
var router = express.Router();
var mysql = require("mysql2");
var path = require("path");
const listPath = path.resolve(__dirname, "..", "..", "utils", "dbConnection");

const dbConnection = require(listPath);

router.get("/", async function (req, res) {
  var sql = `CALL dongas.post_select_by_subject('${
    req.signedCookies.userID
  }', 10, ${1 - 1});`;

  await dbConnection.query(sql, async function (err, result) {
    if (err) console.error("err : " + err);
    var isMine = [];

    // if (result[0][0].WRT_ID == req.signedCookies.userID) isMine = true;

    res.render("show", {
      title: "게시글",
      contents: result[0],
      // isMine: isMine,
    });
  });
});
module.exports = router;

// var express = require("express");
// var router = express.Router();
// var mysql = require("mysql2");
// var path = require("path");

// const listPath = path.resolve(__dirname, "..", "..", "utils", "dbConnection");

// const dbConnection = require(listPath);

// router.get("/", function (req, res) {
//   var sql =
//     "SELECT BBS_NO, POST_NO, POST_TITLE, WRT_ID, date_format(WRT_DTT,'%Y-%m-%d %H:%i:%s') WRT_DTT, VIEW_CNT FROM post";

//   dbConnection.query(sql, function (err, rows) {
//     res.render("list", {
//       title: "게시판 리스트",
//       rows: rows,
//       msg: req.session.msg,
//     });
//     if (req.session.msg) delete req.session.msg;
//   });
// });

// module.exports = router;
