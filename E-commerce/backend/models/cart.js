const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  items: Array
});

module.exports = mongoose.model("Cart", cartSchema);