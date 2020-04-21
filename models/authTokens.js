const mongoose = require('mongoose');

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

module.exports = mongoose.model('AuthToken',authTokenSchema)