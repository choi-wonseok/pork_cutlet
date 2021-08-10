const { Console } = require("console");
const exp = require("constants");
var express = require("express");
var router = express.Router();
var mysql = require("mysql2");
var path = require("path");
const bcrypt = require("bcryptjs");
const multer = require("multer");

const listPath = path.resolve(__dirname, "..", "..", "utils", "dbConnection");

const dbConnection = require(listPath);
//img
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, done) => {
      done(null, "./public/profile_img/");
    },
    //지정
    // convert a file name
    filename: (req, file, done) => {
      const ext = path.extname(file.originalname);
      done(
        null,
        new Date().valueOf() + path.basename(file.originalname, ext) + ext
      );
      // cb(null, new Date().valueOf() + path.extname(file.originalname));
    },
  }),
});

router.get("/:login_id", async function (req, res) {
  var sql = `SELECT * FROM uni_login WHERE LOGIN_ID='${req.params.login_id}'`;
  await dbConnection.query(sql, function (err, result) {
    if (err) console.error("err : " + err);

    if (!result.length) {
      req.session.msg = "잘못된 접근입니다.";
      res.redirect("/index");
    } else {
      res.render("profile", {
        title: "정보",
        users: result[0],
        userID: req.signedCookies.userID,
      });
    }
  });
});
router.get("/edit/:id", async function (req, res) {
  var sql1 = `SELECT * FROM uni_login WHERE LOGIN_ID='${req.signedCookies.userID}'`;
  await dbConnection.query(sql1, function (err, result) {
    if (err) console.error("err : " + err);
    else {
      res.render("myinfo", {
        title: "정보",
        msg: req.session.msg,
        users: result[0],
      });
      if (req.session.msg) delete req.session.msg;
    }
  });
});
router.post("/edit/:id", upload.single("my_pic"), async function (req, res) {
  var sql2 = `SELECT * FROM uni_login WHERE LOGIN_ID='${req.signedCookies.userID}'`;
  await dbConnection.query(sql2, async (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      const checkPass = await bcrypt.compare(
        req.body.password,
        result[0].PASSWORD
      );
      if (checkPass == true) {
        var email = req.body.email;
        var haksa = req.body.haksa;
        var teams = req.body.teams;
        var about = req.body.about;
        var my_pic = (req.body.my_pic = req.file ? req.file.filename : null);
        var my_skill = req.body.my_skill;
        var sql3 = `CALL dongas.user_update('${req.signedCookies.userID}','${email}','${haksa}','${teams}','${about}','${my_pic}','${my_skill}')`;
        dbConnection.query(sql3, function (err, result) {
          if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
          } else {
            return res.redirect("/index");
          }
        });
      } else {
        res.render("myinfo", {
          title: "정보수정",
          msg: "비밀번호가 일치하지 않습니다.",
          users: result[0],
        });
      }
    }
  });
});

module.exports = router;
