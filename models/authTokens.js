const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./users')
const config = require('../config')

var authTokenSchema = mongoose.Schema({
    userId : {
        type : mongoose.Types.ObjectId,
        required : true
    },
    authToken : {
        type : String,
        required : true
    }
})


authTokenSchema.statics.verifyToken = function(authToken){
    var Tokens = this
    let decoded;

    try{
        decoded = jwt.verify(authToken,config.secrete_key)
    }
    catch(err){
        console.log("Error occurred when verifying token")
        return Promise.reject(err);
    }
    return Tokens.findOne({authToken:authToken}).then((token)=>{
        return {
            userId : token.userId,decoded
        }
    })
}
module.exports = mongoose.model('AuthToken',authTokenSchema)