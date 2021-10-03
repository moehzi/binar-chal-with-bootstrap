const { response } = require("express");
const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");

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
    jwt.sign(
      { username, password },
      "secretkey",
      { expiresIn: "30s" },
      (err, token) => {
        res.json({
          token,
        });
      }
    );
  } else {
    res.sendStatus(401);
  }
});

app.post("/api/me", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(401);
    } else {
      res.json({
        authData,
      });
      res.status(201);
    }
  });
});

// Format of Token
// Authorization : Bearer <acess_token>
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    // Get Token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(401);
  }
}

app.listen(5000);
