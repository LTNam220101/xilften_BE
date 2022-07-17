// const express = require("express");
const router = express.Router();

// import UserController from './controller';

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Express" });
});

module.exports = router;
