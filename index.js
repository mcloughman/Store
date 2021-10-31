const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
  <form method="POST">
    <input type="email" placeholder="email" name="email"/>
    <input type="password" placeholder="password" name="password"/>
    <input type="password" placeholder="password confirmation" name="passwordConfirmation"/>
    <button>Submit</button>
  </form>`);
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("POST Route");
});

app.listen(3000, () => {
  console.log("Listening on 3000!!");
});
