const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
require('dotenv').config()
const {readdirSync} = require('fs')
const connectDB = require('./config/db')


const app = express()


// Route >> controllers >> models

// middlleware
app.use(morgan("dev")); // แสดงlog เวลาเชือมต่อ
app.use(bodyParser.json({limit:'20mb'})); // กำหนดข้อมูลในการเชือมต่อ
app.use(cors()); //จัดการดึงข้อมูล api


//connectDB
connectDB()



//Route
//http://localhost:3000/api
// 1
// app.use('/api', require('./routes/api'))
// 2
readdirSync('./routes' ).map((r)=> app.use('/api',require('./routes/'+r)))




const port = process.env.PORT
app.listen(port, ()=>{
    console.log('Server is runing on port '+port)
})