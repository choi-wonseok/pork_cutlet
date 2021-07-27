var express = require("express");
var router = express.Router();

var createRouter = require("./loggedIn/create");
var accountRouter = require("./loggedIn/main");
var signupRouter = require("./loggedIn/signup");
var loginhomeRouter = require("./loggedIn/loginhome");
var logoutRouter = require("./loggedIn/logout");
var listRouter = require("./loggedIn/list");
var showRouter = require("./loggedIn/show");
var editRouter = require("./loggedIn/edit");
var deleteRouter = require("./loggedIn/delete");
var searchRouter = require("./loggedIn/search");

router.get("/", (req, res) => res.redirect("account"));
router.use("/create", createRouter);
router.use("/index", accountRouter);
router.use("/signup", signupRouter);
router.use("/home", loginhomeRouter);
router.use("/logout", logoutRouter);
router.use("/list", listRouter);
router.use("/show", showRouter);
router.use("/edit", editRouter);
router.use("/delete", deleteRouter);
router.use("/search", searchRouter);

module.exports = router;
