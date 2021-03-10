const express = require("express");
const router = express.Router();
const user = require("../models/users.model");
const passport = require("passport");

router.get("/authenticate", (req, res) => {
  if (!req.user) {
    return res.send({ success: false, data: null, error: null });
  }
  return res.send({
    success: true,
    data: { username: req.user.username },
    error: null,
  });
});

router.post("/signup", (req, res) => {
  return user.signUp(res, req.body.username, req.body.password);
});

router.post("/login", (req, res) => {
  // userFunctions.login(res, req.body.username, req.body.password);
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.send({ success: false, data: null, error: err });
    }
    if (!user) {
      return res.send({ success: false, data: null, error: info });
    }
    req.logIn(user, (err) => {
      return res.send({
        success: true,
        data: { username: user.username },
        error: null,
      });
    });
  })(req, res);
});

module.exports = router;
