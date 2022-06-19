const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
  try {
    // check user
    const {username, password} = req.body;
    var user = await User.findOne({username}) // มี userนี้แล้วไหม
    if(user) {
      return res.status(400).send("User Already exists") 
    }
    const slat = await bcrypt.genSalt(10)
    user = new User({
      username,
      password
    })
    // Encrypt //เข้ารหัส
    user.password = await bcrypt.hash(password,slat)
    await user.save()
    res.send("Register Success");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.login = async (req, res) => {
  try {
    const {username, password} = req.body;
    var user = await User.findOneAndUpdate({username},{new:true})
    if(user && user.enabled ){
      //Check Password   enabled true ไหม มี userไหม
      const isMatch = await bcrypt.compare(password, user.password)
                                          //postman   //ในmongodb
      if(!isMatch){
        return res.status(400).send('Password Invalid!!')
      }
      //Payload
      const payload ={
        user:{
          username: user.username, //
          role: user.role
        }
      }
      // Gennerate Token แล้วส่งไปหน้าบ้าน  เวลาtoken
      jwt.sign(payload, 'jwtSecret', {expiresIn: 3600} , 
      (err,token)=>{
        if(err) throw err
        res.json({token,payload})
        // 
      })
    }else{
      return res.status(400).send('User Not Found!!')
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};


exports.currentUser = async (req, res) => {
  try{
    // console.log('controller', req.user)
    const user = await User.findOne({username: req.user.username})
    .select('-password').exec()
    //.select('-password') ไม่ต้องส่ง password มาด้วย
    // console.log('user',user)
    res.send(user) // ส่งไปหน้าบ้าน

  }catch(err){
    console.log(err);
    res.status(500).send("Server Error!");
  }

};

exports.listUser = async (req, res) => {
  try {
    res.send("list Get User");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};



exports.editUser = async (req, res) => {
  try {
    res.send("editUser");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.deleteUser = async (req, res) => {
  try {
    res.send("deleteUser");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};