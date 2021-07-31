const exp = require("constants");
var express = require("express");
var router = express.Router();
var mysql = require("mysql2");
var path = require("path");
const listPath = path.resolve(__dirname, "..", "..", "utils", "dbConnection");

const dbConnection = require(listPath);

router.get("/", async function (req, res) {
  var sql = `CALL dongas.post_by_myself('${req.signedCookies.userID}', 10, ${
    1 - 1
  });`;

  await dbConnection.query(sql, async function (err, result, isMine) {
    if (err) console.error("err : " + err);
    // var isMine = false;

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
