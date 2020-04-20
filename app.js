
//third party module imports
const mongoose = require('mongoose');

//personal module imports 
var User = require('./models/user')

const dataBaseName = "DocTrans"
mongoose.Promise = global.Promise;

//declare the url for the database
const url = `mongodb://localhost:27017/${dataBaseName}`

//create a mongoose connection
mongoose.connect(url,{useNewUrlParser : true,useUnifiedTopology: true})
    .catch(err => console.log("Error connecting to db :" + err))


var newUser = new User({
    username : "samuel",
    password : "samuel"
})

newUser.save().then((user) => {
    console.log(user)
}).catch((err) => {
    console.log('could not create users')
})