var express = require("express");
var router = express.Router();
var path = require("path");
// var crypto = require("crypto");
// var key_one = crypto.randomBytes(256).toString("hex").substr(100, 5);
// var key_two = crypto.randomBytes(256).toString("base64").substr(50, 5);
// var key_for_verify = key_one + key_two;

const controllerPath = path.resolve(__dirname, "..", "controllers");
// var handle_email = require(path.resolve(controllerPath, "handle_email"));
const { register } = require(path.resolve(controllerPath, "userController"));
const listPath = path.resolve(__dirname, "..", "utils", "dbConnection");

const dbConnection = require(listPath);
/* GET users listing. */
router.get("/", function (req, res) {
  res.render("signup", { title: "회원 가입", msg: req.session.msg });
  if (req.session.msg) delete req.session.msg;
});
router.post("/", register);

// router.post("/verify", function (req, res) {
//   var userinfo = req.body;
//   console.log(userinfo);
//   handle_email.EmailVerification("email", key_for_verify);
//   userinfo["key_for_verify"] = key_for_verify;
//   var sql = "INSERT INTO verify set key=?";
//   dbConnection.query(sql, [userinfo], function (err, result) {
//     if (err) {
//       console.error(err);
//       throw err;
//     }
//     console.log("userinfor inserted");
//     res.end();
//   });
// });
module.exports = router;
