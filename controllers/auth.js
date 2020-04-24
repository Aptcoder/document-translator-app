const AuthToken = require('../models/authTokens')
const User = require('../models/users')


module.exports = function(req,res,next){
    var authToken = req.header('x-auth');
    if(!authToken){
        // console.log('error at 1')
        res.status(401).send({
            message : "login is required",
            status : 401
        })
    }
    //static method  for verifying token
    AuthToken.verifyToken(authToken).then((result) => {
        // console.log('user authenticated!') 
        User.findOne({_id : result.userId,username : result.decoded.username})
            .then((user) => {
                req.user = user;
                next();
            }).catch((err) => {
                // console.log('error at 3 : ' + err)
        res.status(401).send({
            message : "login is required",
            status : 401
        })
            })
    }).catch(err => {
        // console.log('error at 2 : ' + err)
        res.status(401).send({
            message : "login is required",
            status : 401
        })
    })
}