var express = require('express');
const controller = require('../controllers/users')
const multer = require('multer')
var router = express.Router();


var uploads = multer();
router.post('/newuser',uploads.none(),controller.createUser)

router.post('/login',uploads.none(),controller.userLogin)

router.get('/login',(req,res) => {
    res.render('login',{});
})
module.exports = router