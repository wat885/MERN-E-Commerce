const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.auth = (req, res, next) => {
  try {
    // เข้าถึง header               ชือที่ส่งมา
    const token = req.headers["authtoken"];

    if (!token) {
      return res.status(401).send("no tokenn authoriztion denied");
    }
    //decode token
    const decoded = jwt.verify(token, "jwtSecret");

    // เมือlogin แล้วเก็บ user ไว้ที่ req. user
    console.log("midleware", decoded);
    req.user = decoded.user 


    //ไปทำ controllerต่อ
    next()


  } catch (err) {
    console.log(err);
    res.status(401).send("Token Invalid!!");
  }
};

exports.adminCheck = async (req, res, next) => {
  try {
    const {username} = req.user 

    const adminUser = await User.findOne({username}).exec()
    if(adminUser.role !== 'admin'){
      res.status(403).send(err, 'Admin Access deniend')
    }else{
      next()
    }

  } catch (err) {
    console.log(err);
    res.status(401).send("Admin Access deniend");
  }
};


