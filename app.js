
//third party module imports
const mongoose = require('mongoose');
require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');

//personal module imports 
var User = require('./models/users')
var environment = process.env.NODE_ENV
//TODO : make sure there is a defualt for environment 
const stage = require('./config')[environment];

//routers 
var userRouter = require('./routes/user')
var translateRouter = require('./routes/translate')
// create express server
var app = express();

//change mongoose promise library to global promise library 
mongoose.Promise = global.Promise;
//create a mongoose connection
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser : true,useUnifiedTopology: true})
    .catch(err => console.log("Error connecting to db :" + err))

//use body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// var newUser = new User({
//     username : "samuel",
//     password : "samuel"
// })

// newUser.save().then((user) => {
//     console.log(user)
// }).catch((err) => {
//     console.log('could not create users')
// })

//user routes handler
app.use('/users',userRouter)

//translate router
app.use('/translate',translateRouter)

app.get('/',(req,res) => {
    res.send('website is being built')
})
app.listen(stage.port,()=>{
    console.log(`node listening in port ${stage.port}`)
})