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

exports.read = async (req, res) => {
  try {
    // ส่งมากับ url จากหน้าบ้าน  req.params.id
    const product = await Product.findOne({ _id: req.params.id })
      .populate("category")
      .exec();
    res.send(product);
  } catch (err) {
    res.status(500).send("read product error!!");
  }
};
exports.update = async (req, res) => {
  try {
    // const { name } = req.body; //ข้อมูลใหม่
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    ).exec();
    res.send(product);
  } catch (err) {
    res.status(500).send("update product error!!");
  }
};
