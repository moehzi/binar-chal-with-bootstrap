const bodyParser = require("body-parser");
const express = require("express");
const app = express();

app.use("/assets", express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/game", (req, res) => {
  res.render("game-suit");
});
app.listen(5000);
