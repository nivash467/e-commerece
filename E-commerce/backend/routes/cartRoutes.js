const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const Cart = require("../models/cart");

// SAVE CART
router.post("/", auth, async (req, res) => {
  const cart = await Cart.findOneAndUpdate(
    { userId: req.user.id },
    { items: req.body },
    { upsert: true, new: true }
  );
  res.json(cart);
});

// GET CART
router.get("/", auth, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id });
  res.json(cart || { items: [] });
});

module.exports = router;