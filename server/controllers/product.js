const Product = require("../models/Product");

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    // ส่งมาแบบ json จากหน้าบ้าน req.body
    // const { name } = req.body;
    const product = await new Product(req.body).save();
    res.send(product);
  } catch (err) {
    res.status(500).send("Create Product Error");
  }
};

exports.list = async (req, res) => {
  try {
    // มาจากพารามิเตอร์ url
    const count = parseInt(req.params.count);
    // console.log(count);

    const product = await Product.find()
      .limit(count)
      .populate("category")
      .sort([["createdAt", "desc"]]); // sport ข้อมูลล่าสุด ให้เป็นข้อมูลแรก

    res.send(product);
  } catch (err) {
    res.status(500).send("Create Product Error");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndRemove({
      _id: req.params.id,
    }).exec();

    res.send(deleted);
  } catch (err) {
    res.status(500).send("Remove Product Error");
  }
};
