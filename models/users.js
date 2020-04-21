var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const shortid = require('shortid')
const AuthToken = require('./authTokens')
var config = require('../config')
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        trim : true,
        unique : true
    },
    password : {
        type: String,
        required : true
    },
    passcode : {
        type : String,
        default : shortid.generate()
    }
})


userSchema.pre('save',function(next){
    var user = this;
    if (!user.isNew){
        next();
    }
    bcrypt.hash(user.password,config.hashRounds)
        .then((hash) => {
            console.log('successfully hashed password');
            user.password = hash
            next()
        })
        .catch((err) => {
            console.log('could not hash password');
            next(err)
        })
})

userSchema.methods.generateToken = function (){
    var user = this;
    var options = {expiresIn : "1d"}
    var token = jwt.sign({username : user.username},config.secrete_key,options)
    var newToken = new AuthToken({
        userId : user._id,
        authToken : token
    })
    return newToken.save().then((token) => {
        return token;
    })
}

module.exports = mongoose.model('User',userSchema)
