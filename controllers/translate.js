const translate = require('translate')
const fs = require('fs')
const config = require('../config')
const User = require('../models/users')


var translateFunc = function(req,res,next){
    // console.log(req.file)
    var sentence = req.file.buffer.toString()
    // console.log(req.user)
    User.findOne({username : req.user.username}).then((user) => {
        // console.log('user:'+ user)
        if(user.passcode == req.body.passcode ){
            return
        }
        res.status(403).send({
            message : "wrong passcode",
            success : false
        })
    }).catch((err) => {
        res.status(500).send({
            message : "something went wrong",
            success : false
        })
        // console.log('an error occurred with passcode!: ' + err)
    })
    // console.log(sentence) 
    translate(sentence,{to:'fr',engine: 'yandex',key : config.api_key }).then((text)=> {
        console.log(text)
        fs.writeFile('translation.txt',text,(err) => {
            if(err) {
                // console.log('could not write file:' + err)
                throw err
            }
            console.log('file has been saved')
            next();
        })
    }).catch((err) => {
        // console.log("an error occured while translating:" + err)
        res.status(500).send({
            message : "something went wrong",
            success: false
        })
    })
}



module.exports = translateFunc