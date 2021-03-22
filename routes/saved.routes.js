const express = require("express");
const isAuth = require("../middleware/isAuth");
const router = express.Router();
const saved = require("../models/saved.model");

router.post("/add", isAuth, (req, res) => {
  return saved.add(res, req.body, req.user.id);
});

router.get("/delete/:id", isAuth, (req, res) => {
  return saved.remove(res, req.params.id, req.user.id);
});

router.get("/user", isAuth, (req, res) => {
  return saved.byUser_id(res, req.params.id);
});

router.get("/saved", isAuth, (req, res) => {
  return saved.all(res);
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
