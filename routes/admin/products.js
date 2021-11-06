const express = require("express");
const { validationResult } = require("express-validator");
const multer = require("multer");

const productsRepo = require("../../repositories/products");
const productsNewTemplate = require("../../views/admin/products/new");
const { requireTitle, requirePrice } = require("./validators");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/admin/products", async (req, res) => {
  res.send("Products");
});

router.get("/admin/products/new", (req, res) => {
  res.send(productsNewTemplate({}));
});

router.post(
  "/admin/products/new",
  [requireTitle, requirePrice],
  upload.single("image"),
  async (req, res) => {
    const errors = validationResult(req);
    const image = req.file.buffer.toString("base64");
    const { title, price } = req.body;
    res.send("Submitted");
    await productsRepo.create({ title, price, image });
  }
);

module.exports = router;
