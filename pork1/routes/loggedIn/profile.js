const { Console } = require("console");
const exp = require("constants");
var express = require("express");
var router = express.Router();
var mysql = require("mysql2");
var path = require("path");

const listPath = path.resolve(__dirname, "..", "..", "utils", "dbConnection");

const dbConnection = require(listPath);

router.get("/:login_id", async function (req, res) {
  var sql = `SELECT * FROM uni_login WHERE LOGIN_ID='${req.params.login_id}'`;
  await dbConnection.query(sql, function (err, result) {
    if (err) console.error("err : " + err);

    if (!result.length) {
      req.session.msg = "잘못된 접근입니다.";
      res.redirect("/index");
    } else {
      res.render("profile", { title: "정보", users: result[0] });
    }
  });
});

module.exports = router;
