const express = require("express");
const router = express.Router();

// controllers
const { create,list } = require("../controllers/product");


// middleware
const { auth, adminCheck } = require("../middleware/auth");

//endpoint http://localhost:5000/api/product
router.post("/product", create);
router.get("/product", list);


module.exports = router;
