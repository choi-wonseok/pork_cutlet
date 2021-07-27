// var express = require("express");
// var router = express.Router();
// var path = require("path");
// var passport = require("passport");

// // const controllerPath = path.resolve(__dirname, "..", "controllers");
// // const { login } = require(path.resolve(controllerPath, "userController"));

// // /* GET users listing. */
// // router.get("/", function (req, res) {
// //   res.render("account", { title: "로그인", msg: req.session.msg });
// //   if (req.session.msg) delete req.session.msg;
// // });
// // router.post("/", login);

// // auth login
// router.get("/account", function (req, res, next) {
//   var userId = "";
//   if (req.cookies["loginId"] !== undefined) {
//     console.log(req.cookies["loginId"]);
//     userId = req.cookies["rememberId"];
//   }
//   res.render("login", { userId: userId });
// });

// router.get("/home", function (req, res, next) {
//   res.render("home", { user_id: req.user.ID });
// });

// router.post(
//   "/",
//   passport.authenticate("local", {
//     successRedirect: "/index",
//     failureRedirect: "/account",
//     failureFlash: true,
//   })
// );

// module.exports = router;
