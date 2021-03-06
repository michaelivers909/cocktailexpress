const express = require("express");
const router = express.Router();
const userFunctions = require("../models/users.model");

router.post("/signup", (req, res) => {
    return userFunctions.signUp(res, req.body.username, req.body.password);
});

router.post("/login", (req, res) => {
    userFunctions.login(res, req.body.username, req.body.password);
});

module.exports = router;