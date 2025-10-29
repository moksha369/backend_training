const express = require('express');
const auth = require("../middlewares/auth");
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json("API está ON!");
});

module.exports = router;
