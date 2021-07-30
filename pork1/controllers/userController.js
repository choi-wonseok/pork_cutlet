const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const mysql = require("mysql2");
var path = require("path");

const listPath = path.resolve(__dirname, "..", "utils", "dbConnection");

const dbConnection = require(listPath);

// Home Page
exports.homePage = async (req, res) => {
  const sql = mysql.format("SELECT * FROM `uni_login` WHERE `login_id`=?", [
    req.signedCookies.userID,
  ]);
  await dbConnection.execute(sql, async (err, result, fields) => {
    if (err) {
      return res.redirect("/account");
    } else {
      if (result.length !== 1) {
        return res.redirect("/account");
      }

      res.render("home", {
        user: result[0],
      });
    }
  });
};

// Register Page
// exports.registerPage = (req, res) => {
//   res.render("signup");
// };

// User Registration
exports.register = async (req, res) => {
  const { body } = req;
  const hashPass = await bcrypt.hash(body.password, 12);
  // CALL dongas.register(:p_id,:p_name,:p_password,:p_haksa,:p_email);
  let sql = mysql.format("CALL dongas.register(?, ?, ?, ?, ?);", [
    body.userid,
    body.fullname,
    hashPass,
    body.haksa,
    body.email,
  ]);

  await dbConnection.execute(sql, async (err, result, fields) => {
    if (err) {
      let errResult;
      let errMsg = err.sqlMessage.split("'");
      let errField = errMsg[errMsg.length - 2];

      if (errField == "uni_login.PRIMARY") {
        errResult = "이미 존재하는 ID입니다.";
      } else if (errField == "uni_login.EMAIL") {
        errResult = "이미 존재하는 EMAIL입니다.";
      } else if (errField == "uni_login.HAKSA_NUM") {
        errResult = "이미 존재하는 학번입니다.";
      } else errResult = err.sqlMessage;

      req.session.msg = errResult;
      res.redirect("back");
    } else {
      if (result) req.session.msg = "회원가입 완료.";
      res.redirect("account");
    }
  });
};

/*async (req, res, next) => {
    const errors = validationResult(req);
    const { body } = req;

    if (!errors.isEmpty()) {
        return res.render('signup', {
            error: errors.array()[0].msg
        });
    }

    try {

        const [row] = await dbConnection.execute(
            "SELECT * FROM `users` WHERE `email`=?",
            [body._email]
        );

        if (row.length >= 1) {
            return res.render('signup', {
                error: 'This email already in use.'
            });
        }

        const hashPass = await bcrypt.hash(body._password, 12);

        const [rows] = await dbConnection.execute(
            "INSERT INTO `users`(`name`,`email`,`password`) VALUES(?,?,?)",
            [body._name, body._email, hashPass]
        );

        if (rows.affectedRows !== 1) {
            return res.render('signup', {
                error: 'Your registration has failed.'
            });
        }

        res.render("signup", {
            msg: 'You have successfully registered.'
        });

    } catch (e) {
        next(e);
    }
};*/

// Login Page
// exports.loginPage = (req, res) => {
//   res.render("account");
// };

// var passport = require("passport"),
//   LocalStrategy = require("passport-local").Strategy;
// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: "userID",
//       passwordField: "password",
//     },
//     function (username, password, done) {
//       console.log("LocalStrategy", username, password);
//       /*User.findOne({ username: username }, function (err, user) {
//         if (err) { return done(err); }
//         if (!user) {
//           return done(null, false, { message: 'Incorrect username.' });
//         }
//         if (!user.validPassword(password)) {
//           return done(null, false, { message: 'Incorrect password.' });
//         }
//         return done(null, user);
//       });*/
//     }
//   )
// );

// Login User
exports.login = async (req, res) => {
  const errors = validationResult(req);
  const { body } = req;

  if (!errors.isEmpty()) {
    return res.render("account", {
      msg: errors.array()[0].msg,
    });
  }

  const sql = mysql.format("SELECT * FROM `uni_login` WHERE `login_id`=?", [
    body.userID,
  ]);

  await dbConnection.execute(sql, async (err, result, fields) => {
    if (err) {
      console.log(err);
      res.redirect("account", {
        title: "로그인",
        msg: "Internal Error.",
      });
    } else {
      if (result.length == 0) {
        return res.render("account", {
          title: "로그인",
          msg: "일치하는 정보가 없습니다.",
        });
      }

      const checkPass = await bcrypt.compare(body.password, result[0].PASSWORD);

      if (checkPass === true) {
        res.cookie("userID", result[0].LOGIN_ID, {
          maxAge: 3600 * 1000,
          httpOnly: true,
          signed: true,
        });
        return res.redirect("home");
      }

      res.render("account", {
        title: "로그인",
        msg: "비밀번호가 일치하지 않습니다",
      });
    }
  });
};
