const express = require("express");
const router = express.Router();
const validateToken = require("../controllers/auth.controller");

router.post("/", validateToken);

module.exports = router;
