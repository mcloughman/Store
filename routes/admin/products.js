const express = require("express");

const router = express.Router();

router.get("/admin/products", async (req, res) => {
  res.send("Products");
});

router.get("/admin/products/new", (req, res) => {
  res.send("Form");
});

module.exports = router;
