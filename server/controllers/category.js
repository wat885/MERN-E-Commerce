const Category = require("../models/Category");

exports.list = async (req, res) => {
  try {
    const category = await Category.find({}).exec();
    res.send(category);
  } catch (err) {
    res.status(500).send("server error!!");
  }
};

exports.create = async (req, res) => {
  try {
    // ส่งมาแบบ json จากหน้าบ้าน req.body
    const { name } = req.body;
    const category = await new Category({ name }).save();
    res.send(category);
  } catch (err) {
    res.status(500).send("server error!!");
  }
};
exports.read = async (req, res) => {
  try {
    // ส่งมากับ url จากหน้าบ้าน  req.params.id
    const id = req.params.id;
    const category = await Category.findOne({ _id: id });
    res.send(category);
  } catch (err) {
    res.status(500).send("server error!!");
  }
};
exports.update = async (req, res) => {
  try {
    const id = req.params.id; // id ที่จะupdate
    const { name } = req.body; //ข้อมูลใหม่
    const category = await Category.findOneAndUpdate(
      { _id: id },
      { name: name }
    );
    res.send(category);
  } catch (err) {
    res.status(500).send("server error!!");
  }
};
exports.remove = async (req, res) => {
  try {
    const id = req.params.id; // id ที่จะremove
    const category = await Category.findOneAndDelete({ _id: id });
    res.send(category);
  } catch (err) {
    res.status(500).send("server error!!");
  }
};
