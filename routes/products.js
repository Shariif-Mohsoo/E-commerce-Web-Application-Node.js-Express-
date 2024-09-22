import express from "express";
import productsCardTemplate from "../views/products/index.js";
import productsRepo from "../repositories/products.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const products = await productsRepo.getAll();
  res.send(productsCardTemplate({ products }));
});

export default router;
