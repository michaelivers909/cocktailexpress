const express = require("express");
const isAuth = require("../middleware/isAuth");
const router = express.Router();
const cocktails = require("../models/cocktail.model");

router.post("/add", isAuth, (req, res) => {
  return cocktails.add(res, req.body, req.user.id);
});

router.get("/delete/:id", isAuth, (req, res) => {
  return cocktails.remove(res, req.params.id, req.user.id);
});

router.get("/user", isAuth, (req, res) => {
  return cocktails.byUser_id(res, req.params.id);
});

// router.get("/user/", (req, res) => {
// if (!req.user) {
// return res.status(401).send({
// success: false,
// data: null,
// error: "Must log in.",
// });
// }

module.exports = router;
