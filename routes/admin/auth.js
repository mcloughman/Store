const express = require("express");
const usersRepo = require("../../repositories/users");
const signupTemplate = require("../../views/admin/auth/signup");
const signinTemplate = require("../../views/admin/auth/signin");

const router = express.Router();

router.get("/signup", (req, res) => {
  res.send(signupTemplate({ req }));
});

router.post("/signup", async (req, res) => {
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
router.get("/signout", async (req, res) => {
  req.session = null;
  res.send("You are logged out");
});

router.get("/signin", (req, res) => {
  res.send(signinTemplate());
});

router.post("/signin", async (req, res) => {
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

module.exports = router;
