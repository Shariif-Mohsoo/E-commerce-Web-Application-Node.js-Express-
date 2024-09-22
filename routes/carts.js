import express from "express";
import cartsRepo from "../repositories/carts.js";
import productsRepo from "../repositories/products.js";
import cartShowTemplate from "../views/carts/show.js";
const router = express.Router();

// Receive a post request to add an item to cart
router.post("/cart/products", async (req, res) => {
  //FIGURE OUT THE CART!
  let cart;
  if (!req.session.cartId) {
    //WE DON'T HAVE A CART, WE NEED TO CREATE ONE
    // AND STORE THE CART ID ON THE req.session.cartId property.
    cart = await cartsRepo.create({ items: [] });
    req.session.cartId = cart.id;
  } else {
    //we have a cart lets get it from the repository.
    cart = await cartsRepo.getOne(req.session.cartId);
  }
  //   console.log(cart);
  const existingItem = cart.items.find(
    (item) => item.id === req.body.productId
  );
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.items.push({ id: req.body.productId, quantity: 1 });
  }
  await cartsRepo.update(cart.id, { items: cart.items });
  //EITHER INCREMENT QUANTITY FOR EXISTING PRODUCT
  //OR ADD NEW PRODUCT TO ITEMS ARRAY.
  res.redirect("/cart");
});
// Receive a get request to show all items in cart
router.get("/cart", async (req, res) => {
  if (!req.session.cartId) return res.redirect("/");
  const cart = await cartsRepo.getOne(req.session.cartId);
  for (let item of cart.items) {
    const product = await productsRepo.getOne(item.id);
    item.product = product;
  }
  res.send(cartShowTemplate({ items: cart.items }));
});

//Receive a post request to delete an item from cart list
router.post("/cart/products/delete", async (req, res) => {
  const { itemId } = req.body;
  const cart = await cartsRepo.getOne(req.session.cartId);
  const items = cart.items.filter((item) => {
    if (item.id === itemId) {
      if (item.quantity > 1) {
        item.quantity -= 1;
        return item;
      }
    } else return item;
  });

  await cartsRepo.update(req.session.cartId, { items });
  res.redirect("/cart");
});
export default router;
