const exp = require("constants");
var express = require("express");
var router = express.Router();
var mysql = require("mysql2");
var path = require("path");
const listPath = path.resolve(__dirname, "..", "..", "utils", "dbConnection");

const dbConnection = require(listPath);

router.get("/:bbs_no", async function (req, res) {
  var sql = `CALL dongas.post_select_by_id(${req.params.bbs_no}, 10, ${
    1 - 1
  });`;

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
