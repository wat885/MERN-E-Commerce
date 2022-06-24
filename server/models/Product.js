const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    desciption: {
      type: String,
    },
    price: {
      type: Number,
    },
    quatity: Number,
    images: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = Product = mongoose.model("product", ProductSchema);
