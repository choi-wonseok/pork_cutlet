// var nodemailer = require("nodemailer");
// var smtpTransporter = require("nodemailer-smtp-transport");

// var smtpTransport = nodemailer.createTransport(
//   smtpTransporter({
//     service: "Gmail",
//     host: "smtp.gmail.com",
//     auth: {
//       user: ", //보내는 분의 메일계정
//       pass: "",
//     },
//     tls: {
//         rejectUnauthorized : false
//     }
//   })
// );

// module.exports = {
//   EmailVerification(email) {
//     var mailOption = {
//       from: '"pork katsu"<itporkcutlet@gmail.com>', // 보내는 분의 메일계정
//       to: email, // 받는 분의 메일계정 (여러 개 가능)
//       subject: "Hello",
//       text: "Hello world?",
//       html: "<b>Hello world?</b>",
//     };

//     smtpTransport.sendMail(mailOption, (err, res) => {
//       // 메일을 보내는 코드
//       if (err) {
//         console.log(err);
//         throw err;
//       }
//       console.log("mail sent!");
//     });
//   },
// };
