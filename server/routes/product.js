const express = require("express");
const router = express.Router();

// controllers
const { create, list, remove } = require("../controllers/product");

// middleware
const { auth, adminCheck } = require("../middleware/auth");

//endpoint http://localhost:5000/api/product
router.post("/product", auth, adminCheck, create);
router.get("/product/:count", list);
router.delete("/product/:id", auth, adminCheck, remove);

module.exports = router;
