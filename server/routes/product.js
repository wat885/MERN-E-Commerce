const express = require("express");
const router = express.Router();

// controllers
const { create } = require("../controllers/product");


// middleware
const { auth, adminCheck } = require("../middleware/auth");

//endpoint http://localhost:5000/api/product
router.post("/product", create);


module.exports = router;
