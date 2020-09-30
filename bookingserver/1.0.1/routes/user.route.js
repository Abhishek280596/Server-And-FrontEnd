const express = require("express");
const router = express.Router();
const multer = require("multer");
const Path = require("path");
const UserCtrl = require("../controllers/user.controller");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/dish/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + Date.now() + Path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
  filFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (
      ext !== ".png" &&
      ext !== ".jpg" &&
      ext !== ".gif " &&
      ext !== ".jpeg"
    ) {
      return callback(new Error("only images are allowed"));
    }
    callback(null, true);
  },
});

const user = new UserCtrl();

router.post("/", upload.single("image"), user.create);
router.put("/:id", user.update);
router.delete("/:id", user.delete);
router.post("/auth", user.authenticate);
router.get("/", user.getAll);
router.get("/:id", user.getById);
router.get("/single/:email", user.getByEmail);

module.exports = router;
