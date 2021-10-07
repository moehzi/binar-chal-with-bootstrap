const { response } = require("express");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;

const jwt = require("jsonwebtoken");
const verifyToken = require("./middlewares/auth.js");
const errorHandling = require("./middlewares/errorHandling.js");

const user = {
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
  if (username === user.username && password === user.password) {
    jwt.sign({ username, password }, "secretkey", (err, token) => {
      res.status(201).json({
        username,
        password,
        token,
      });
    });
  } else {
    res.status(401).json({
      status: "Unauthorized",
      message: "Cannot access",
    });
  }
});

app.post("/api/me", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.status(401).json({
        status: "Unauthorized",
        message: "Sorry, your request could not be processed",
      });
    } else {
      res.status(201).json({
        authData,
      });
    }
  });
});

app.get("/error", (req, res) => {
  throw new Error("Something went wrong");
});

app.all("*", (req, res) => {
  res.status(404).send({
    status: "FAIL",
    message: "not found",
  });
});

app.use(errorHandling);

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
