
//third party module imports
const mongoose = require('mongoose');
require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars')

//personal module imports 
var User = require('./models/users')
// console.log(process.env.NODE_ENV) 
var environment = process.env.NODE_ENV || 'development'

const stage = require('./config')[environment]; 

//routers 
var userRouter = require('./routes/user')
var translateRouter = require('./routes/translate')
// create express server
var app = express();

//change mongoose promise library to global promise library 
mongoose.Promise = global.Promise;
//create a mongoose connection
mongoose.connect(stage.db,{useNewUrlParser : true,useUnifiedTopology: true})
    .catch(err => console.log("Error connecting to db :" + err))

//use body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.set('view engine','hbs')

app.engine('hbs',hbs({
    extname : 'hbs',
    layoutsDir : __dirname + '/views/layouts',
    defaultLayout : 'main'
}))
app.use(express.static('public'));


var handleError = function(err,req,res,next){
    if(typeof err == 'string'){
        res.send("Oops,something went wrong")
    }
    res.status(500).send("something is wrong from our side,try login again")
}
//error handler middleware
app.use(handleError)
//user routes handler
app.use('/users',userRouter)

//translate router
app.use('/translate',translateRouter)

app.get('/',(req,res) => {
    res.render('index',{})
})
app.listen(stage.port,()=>{
    console.log(`node listening in port ${stage.port}`)
})

module.exports.app = app;