const express = require("express");
const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  try {
    // Add your product logic here
    res.json({ message: "Products endpoint" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;