const exp = require("constants");
var express = require("express");
var router = express.Router();
var mysql = require("mysql2");
var path = require("path");

const listPath = path.resolve(__dirname, "..", "..", "utils", "dbConnection");

const dbConnection = require(listPath);

router.post("/:id", async function (req, res) {
  var sql = `DELETE FROM post WHERE POST_NO=${req.params.id}`;
  await dbConnection.query(sql, function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.redirect("/list");
    }
  });
});

module.exports = router;
