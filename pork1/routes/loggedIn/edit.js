const exp = require("constants");
var express = require("express");
var router = express.Router();
var mysql = require("mysql2");
var path = require("path");

const listPath = path.resolve(__dirname, "..", "..", "utils", "dbConnection");

const dbConnection = require(listPath);

router.get("/:id", async function (req, res, next) {
  var sql = `SELECT POST_NO, POST_TITLE,CONTENTS, date_format(WRT_DTT,'%Y-%m-%d %H:%i:%s') WRT_DTT FROM post WHERE POST_NO=${req.params.id} AND WRT_ID='${req.signedCookies.userID}'`;
  await dbConnection.query(sql, function (err, result) {
    if (err) console.error("err : " + err);

    if (!result.length) {
      req.session.msg = "잘못된 접근입니다.";
      res.redirect("/list");
    } else {
      res.render("edit", { title: "게시글", data: result[0] });
    }
  });
});

// router.post("/:id", async function (req, res, next) {
//   var sql = `SELECT POST_NO, POST_TITLE,CONTENTS, date_format(WRT_DTT,'%Y-%m-%d %H:%i:%s') WRT_DTT FROM post WHERE POST_NO=${req.params.id}`;
//   await dbConnection.query(sql, function (err, result) {
//     if (err) console.error("err : " + err);
//     res.render("/show/:id", { title: "게시글", contents: result });
//   });
// });

router.post("/:id", function (req, res) {
  var post_title = req.body.title;
  var contents = req.body.contents;
  var sql = `UPDATE post SET POST_TITLE=?, CONTENTS=? WHERE POST_NO=${req.params.id}`;
  dbConnection.query(sql, [post_title, contents], function (err, result) {
    console.log(result);
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.redirect(`/show/${req.params.id}`);
    }
  });
});

module.exports = router;
