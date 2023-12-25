const express = require("express");
const app = express();

app.use(express.json());

app.get('/done', (req, res) => {
    res.status(200).send("Hello World")
})

app.get("/promise", (req, res) => {
  res.status(200).send("Hello World");
});

app.get("/async", (req, res) => {
  res.status(200).send("Hello World");
});

app.get("/supertest", (req, res) => {
  res.status(200).send("Hello World");
});

app.post("/users", async (req, res) => {
  const { password, username } = req.body;
  if (!password || !username) {
    res.sendStatus(400);
    return;
  }

  res.send({ userId: 0 });
});

module.exports = app;