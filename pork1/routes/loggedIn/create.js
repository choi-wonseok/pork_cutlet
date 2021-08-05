var express = require("express");
var router = express.Router();
var path = require("path");
const multer = require("multer");

const controllerPath = path.resolve(__dirname, "..", "..", "controllers");
const { bbs } = require(path.resolve(controllerPath, "postController"));

//imge
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, done) => {
      done(null, "./public/user_img/");
    },
    //지정
    // convert a file name
    filename: (req, file, done) => {
      const ext = path.extname(file.originalname);
      done(null, [1] + path.basename(file.originalname, ext) + ext);
      // cb(null, new Date().valueOf() + path.extname(file.originalname));
    },
  }),
});
/* GET users listing. */
router.get("/", function (req, res) {
  res.render("create", { title: "Welcome" });
});
router.post("/", upload.single("userfile"), bbs);

module.exports = router;

/* 
function (req, res, next) {
  var title = req.body.title;
  var description = req.body.description;
  fs.writeFile(`data/${title}`, description, "utf8", function (err) {
    res.writeHead(302, {
      Location: `/`,
    });
    res.end();
  });
});
*/
