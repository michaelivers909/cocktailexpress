const express = require("express";
const Pool = require("mysql2/typings/mysql/lib/Pool");
const router = express.Router();
const cocktails = require("../models/cocktail.model");

router.post("/add", (req, res)=>{
    return cocktails.add(res, req.body);
});

router.get("/delete/:id", (req, res)=>{
    return cocktails.remove(res, req.params.id);
});

