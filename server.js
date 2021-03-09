require("dotenv").config();
const passport = require("./config/passport.config");
const express = require("express");
const app = express();
const userRoutes = require("./routes/users.routes");
const cocktailRoutes = require("./routes/cocktails.routes");
const session = require("express-session");

const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(session({ secret: process.env.SECRET_KEY }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/users", userRoutes);
app.use("/cocktails", cocktailRoutes);

app.get("/", (req, res) => res.send("server this is"));
app.get("*", (req, res) => res.redirect("/"));
app.listen(PORT, () => console.log(`open doors on port there are: ${PORT}`));
