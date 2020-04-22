const translate = require('translate')
const fs = require('fs')
const config = require('../config')


var translateFunc = function(req,res,next){
    console.log(req.file)
    var sentence = req.file.buffer.toString()
    console.log(sentence)
    translate(sentence,{to:'fr',engine: 'yandex',key : config.api_key }).then((text)=> {
        console.log(text)
        fs.writeFile('translation.txt',text,(err) => {
            if(err) {
                console.log('could not write file:' + err)
                throw err
            }
            console.log('file has been saved')
            next();
        })
    }).catch((err) => {
        console.log("an error occured while translating:" + err)
        res.status(501).send({
            message : "could not complete translation",
            status : 501
        })
    })
}



module.exports = translateFunc