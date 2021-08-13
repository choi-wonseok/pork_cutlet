const exp = require("constants");
var express = require("express");
var router = express.Router();
var mysql = require("mysql2");
var path = require("path");

const listPath = path.resolve(__dirname, "..", "..", "utils", "dbConnection");
const controllerPath = path.resolve(__dirname, "..", "..", "controllers");
const { homePage } = require(path.resolve(controllerPath, "userController"));
const dbConnection = require(listPath);

router.get("/", async function (req, res) {
  var sql = `CALL dongas.post_by_myself('${req.signedCookies.userID}');`;
  var sql2 = `SELECT * FROM uni_login WHERE login_id='${req.signedCookies.userID}'`;
  await dbConnection.query(sql + sql2, async function (err, result) {
    if (err) console.error("err : " + err);
    // var isMine = false;
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

// var express = require("express");
// var path = require("path");
// var fs = require("fs");
// var router = express.Router();
// // const utilPath = path.resolve(__dirname, "..", "controllers", "utils");
// // var util = require(utilPath);
// const controllerPath = path.resolve(__dirname, "..", "..", "controllers");
// const listPath = path.resolve(__dirname, "..", "..", "data");
// const { homePage } = require(path.resolve(controllerPath, "userController"));

// /* GET home page. */
// router.get("/", (req, res) => {
//   let fileList;
//   fs.readdir(listPath, (err, files) => {
//     fileList = files;
//     console.log(listPath);
//     res.render("main", {
//       title: "Welcome",
//       description: "Hello, Node.js",
//       list: fileList,
//     });
//   });
// });

// module.exports = router;
