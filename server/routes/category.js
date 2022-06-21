const express = require("express");
const router = express.Router();

// controllers
const {
  create,
  list,
  read,
  update,
  remove,
} = require("../controllers/category");

// middleware
const { auth, adminCheck } = require("../middleware/auth");

//endpoint http://localhost:5000/api/category
router.get("/category", list);
router.post("/category", create);
router.get("/category/:id", read);
router.put("/category/:id", update);
router.delete("/category/:id", remove);

module.exports = router;
