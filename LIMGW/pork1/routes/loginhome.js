var express = require("express");
var router = express.Router();
var path = require("path");

const controllerPath = path.resolve(__dirname, "..", "controllers");
const { homePage } = require(path.resolve(controllerPath, "userController"));

router.get("/", homePage);

module.exports = router;
