const express = require("express");

const router = express.Router();

// receive post request to add an item to a cart
router.post("/cart/products", (req, res) => {
  console.log(req.body.productId);
  res.send("Product Added to Cart");
});

// receive get request to show the items in the cart

// receive post request to delete an item

module.exports = router;
