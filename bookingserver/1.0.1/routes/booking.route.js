const express = require("express");
const router = express.Router();
const multer = require("multer");
const Path = require("path");

const BookingCtrl = require("../controllers/booking.controller");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/dish/");
  },
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + Date.now() + Path.extname(file.originalname)
    );
  }
});

const upload = multer({
  storage: storage,
  filFilter: function(req, file, callback) {
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
  }
});

const book = new BookingCtrl();

router.post("/", upload.single("image"), book.create);
router.put("/:id", book.update);
router.delete("/:id", book.delete);
router.get("/", book.getAll);

module.exports = router;
