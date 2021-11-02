const express = require("express");
const fs = require("fs");
const cookieSession = require("cookie-session");
const { create } = require("./repositories/users");
const usersRepo = require("./repositories/users");
const users = require("./repositories/users");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ["gibberish"],
  })
);

app.get("/signup", (req, res) => {
  res.send(`
  <div>
  Your id is: ${req.session.userId}
  <form method="POST">
    <input type="email" placeholder="email" name="email"/>
    <input type="password" placeholder="password" name="password"/>
    <input type="password" placeholder="password confirmation" name="passwordConfirmation"/>
    <button>Submit</button>
  </form>
  </div>`);
});

app.post("/signup", async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;
  const existingUser = await usersRepo.getOneBy({ email });
  if (existingUser) {
    return res.send("A user with that email already exists!");
  }
  if (password !== passwordConfirmation) {
    return res.send("<h2>Password Confirmation did not Match Password</h2>");
  }
  const user = await usersRepo.create({ email, password });

  //Store the id of the user inside the users cookie
  req.session.userId = user.id;
  res.send("<h1>Account Created!</h1>");
});
app.get("/signout", async (req, res) => {
  req.session = null;
  res.send("You are logged out");
});

app.get("/signin", (req, res) => {
  res.send(`
  <form method="POST">
    <input type="email" name="email" placeholder="Email" />
    <input type="password" name="password" placeholder="Password" />
    <button>Sign In</button>
  </form>
 `);
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await usersRepo.getOneBy({ email });
  if (!user) {
    return res.send("Email not found");
  }
  const validPassword = await usersRepo.comparePasswords(
    user.password,
    password
  );
  if (!validPassword) {
    return res.send("Invalid Password!");
  }
  req.session.userId = user.id;
  return res.send("Signed In!");
});

app.listen(3000, () => {
  console.log("Listening on 3000!!");
});
