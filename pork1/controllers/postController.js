const { validationResult } = require("express-validator");
const mysql = require("mysql2");
var path = require("path");

const listPath = path.resolve(__dirname, "..", "utils", "dbConnection");

const dbConnection = require(listPath);

exports.bbs = async (req, res) => {
  const { body } = req;
  // CALL dongas.bbs(:p_bbs_no,:p_post_title,:p_contents);
  let sql = mysql.format("CALL dongas.bbs(?, ?, ?,?);", [
    body.bbs_no,
    body.post_title,
    req.signedCookies.userID,
    body.contents,
  ]);

  await dbConnection.execute(sql, async (err, result, fields) => {
    if (err) {
      let errResult;
      let errMsg = err.sqlMessage.split("'");
      let errField = errMsg[errMsg.length - 2];
      if (errField == "post_contents.PRIMARY") {
        errResult = "입력된 값이 없습니다";
      } else if (errField == "post.contents.POST_NO") {
        errResult = "이미 존재하는 EMAIL입니다.";
      } else if (errField == "post.contents.CONTENTS") {
        errResult = "값이 없컨텐츠습니다";
      } else errResult = err.sqlMessage;
      console.log(err);
      req.session.msg = errResult;
    } else {
      if (result) req.session.msg = "작성완료.";
      console.log(result);
    }
    res.redirect("index");
  });
};

exports.comments = async (req, res) => {
  const { body } = req;
  // CALL dongas.comments({ CALL dongas.comments(:r_post_no,:r_comment,:r_wrt_id) });
  let sql = mysql.format("CALL dongas.comments(?,?,?) ", [
    req.params.post_no,
    req.body.comment,
    req.signedCookies.userID,
  ]);

  await dbConnection.execute(sql, async (err, result, fields) => {
    if (err) {
      let errResult;
      let errMsg = err.sqlMessage.split("'");
      let errField = errMsg[errMsg.length - 2];
      if (errField == "post_contents.PRIMARY") {
        errResult = "입력된 값이 없습니다";
      } else if (errField == "post.contents.POST_NO") {
        errResult = "이미 존재하는 EMAIL입니다.";
      } else if (errField == "post.contents.CONTENTS") {
        errResult = "값이 없컨텐츠습니다";
      } else errResult = err.sqlMessage;
      console.log(err);
      req.session.msg = errResult;
    } else {
      if (result) req.session.msg = "작성완료.";
      console.log(result);
    }
    res.redirect(`/comment/${req.params.post_no}`);
  });
};
