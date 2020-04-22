const express = require('express');
var controller = require('../controllers/translate')
const auth = require('../controllers/auth')

var router = express.Router();
const multer = require('multer')
var uploads = multer();


router.post('/',auth,uploads.single('upload'),controller,(req,res,next) => {
    console.log('complete')
    res.status(200).send({
        message : "authentification sucessful" ,
        usermame : req.user.username
    })
})

module.exports = router