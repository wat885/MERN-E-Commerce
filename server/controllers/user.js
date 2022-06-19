const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.listUser = async (req, res) => {
  try {
    //
    const user = await User.find({}).select("-password ").exec();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.readUser = async (req, res) => {
  try {
    //  req.params.id =  http://localhost:5000/api/users/62a4bfadc41533db51136a69
    const id = req.params.id;
    const user = await User.findOne({ _id: id }).select("-password ").exec();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.updateUser = async (req, res) => {
  try {
    //
    // console.log('updateuser', req.body.values.password)
    var {id, password} =  req.body.values

    // 1 gen salt
    const slat = await bcrypt.genSalt(10)
    // 2 encrypt
    var enPassword = await bcrypt.hash(password,slat)
    // console.log(enPassword)
    // 
    const user = await User.findOneAndUpdate(
      { _id: id },  // หา
      { password: enPassword }  // update
    );
    res.send(user);

  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.removeUser = async (req, res) => {
  try {
    //
    const id = req.params.id;
    const user = await User.findOneAndDelete({ _id: id });
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.changeStatus = async (req, res) => {
  try {
    //
    console.log(req.body);
    const user = await User.findOneAndUpdate(
      { _id: req.body.id },  // หา
      { enabled: req.body.enabled }  // update
    );
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.changeRole = async (req, res) => {
  try {
    //
    console.log(req.body);
    const user = await User.findOneAndUpdate(
      { _id: req.body.id },  // หา
      { role: req.body.role }  // update
    );
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};
