const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    category: {
      type: ObjectId,
      ref: "category",
    },
    price: {
      type: Number,
    },
    quantity: Number,
    images: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = Product = mongoose.model("product", ProductSchema);
