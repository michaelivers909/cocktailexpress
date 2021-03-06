require("dotenv").config();
const express = require("express");
const app = express();
const userRoutes = require("./routes/users.routes");
const cocktailRoutes = require("./routes/cocktails.routes");

const PORT = process.env.Port || 3000
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use("/users", userRoutes);
app.use("/cocktails", cocktailRoutes);

app.get("/", (req,res) => res.send("server this is"));
app.get("*", (req,res) => res.redirect("/"));
app.listen(PORT, () => console.log(`open doors on port there are: ${PORT}`));

