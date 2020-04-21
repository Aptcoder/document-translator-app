const express = require('express');
var controller = require('../controllers/translate')
const auth = require('../controllers/auth')
var router = express.Router();


router.post('/',auth,(req,res,next) => {
    console.log('complete')
    res.status(200).send({
        message : "authentification sucessful"
    })
})

module.exports = router