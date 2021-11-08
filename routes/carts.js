const express = require("express");
const cartsRepo = require("../repositories/carts");

const router = express.Router();

// receive post request to add an item to a cart
router.post("/cart/products", async (req, res) => {
  console.log(req.body.productId);
  // Either increment quantity or add new product to items array
  let cart;
  if (!req.session.cartId) {
    // We don't have a cart and need to create one
    // and store the id on the req.session.cartId
    // property
    cart = await cartsRepo.create({ items: [] });
    req.session.cartId = cart.id;
  } else {
    // we have a cart. Need to get it from the repository
    cart = await cartsRepo.getOne(req.session.cartId);
  }
  const existingItem = cart.items.find(
    (item) => item.id === req.body.productId
  );
  if (existingItem) {
    // increment quantity
    existingItem.quantity++;
  } else {
    cart.items.push({ id: req.body.productId, quantity: 1 });
  }
  await cartsRepo.update(cart.id, {
    items: cart.items,
  });
  res.send("Product Added to Cart");
});

// receive get request to show the items in the cart

// receive post request to delete an item

module.exports = router;
