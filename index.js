const express = require("express");
const app = express();

const loginData = {
  username: "moehzi",
  password: "moehzi123",
};
app.use(express.json());

app.use("/assets", express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/game", (req, res) => {
  res.render("game-suit");
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (
    loginData["username"] === username &&
    loginData["password"] === password
  ) {
    res.status(201).send({
      status: "201",
      message: "Login success",
    });
  } else {
    res.status(401).send({
      status: "401",
      msg: "Wrong username or password",
    });
  }
});

app.listen(5000);
