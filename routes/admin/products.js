const express = require("express");
const multer = require("multer");

const { handleErrors, requireAuth } = require("./middlewares");
const productsRepo = require("../../repositories/products");
const productsNewTemplate = require("../../views/admin/products/new");
const productsIndexTemplate = require("../../views/admin/products/index");
const productsEditTemplate = require("../../views/admin/products/edit");
const { requireTitle, requirePrice } = require("./validators");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/admin/products", requireAuth, async (req, res) => {
  const products = await productsRepo.getAll();
  res.send(productsIndexTemplate({ products: products }));
});

router.get("/admin/products/new", requireAuth, (req, res) => {
  res.send(productsNewTemplate({}));
});

router.post(
  "/admin/products/new",
  requireAuth,
  upload.single("image"),
  [requireTitle, requirePrice],
  handleErrors(productsNewTemplate),
  async (req, res) => {
    const image = req.file.buffer.toString("base64");
    const { title, price } = req.body;

    await productsRepo.create({ title, price, image });
    res.redirect("/admin/products");
  }
);

router.get("/admin/products/:id/edit", requireAuth, async (req, res) => {
  const productToChange = await productsRepo.getOne(req.params.id);

  if (!productToChange) {
    return res.send("Product Not Found!");
  }
  res.send(productsEditTemplate({ product: productToChange }));
});

router.post(
  "/admin/products/:id/edit",
  requireAuth,
  upload.single("image"),
  [requireTitle, requirePrice],
  handleErrors(productsEditTemplate, async (req) => {
    const productToChange = await productsRepo.getOne(req.params.id);
    return { product: productToChange };
  }),
  async (req, res) => {
    const changes = req.body;
    if (req.file) {
      changes.image = req.file.buffer.toString("base64");
    }
    try {
      await productsRepo.update(req.params.id, changes);
    } catch (err) {
      return res.send("Could Not Find Item!");
    }
    res.redirect("/admin/products");
  }
);

router.post("/admin/products/:id/delete", requireAuth, async (req, res) => {
  await productsRepo.delete(req.params.id);
  res.redirect("/admin/products");
});

module.exports = router;
