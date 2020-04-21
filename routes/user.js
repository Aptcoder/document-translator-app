var express = require('express');
const controller = require('../controllers/users')

var router = express.Router();

router.post('/newuser',controller.createUser)

router.post('/login',controller.userLogin)

module.exports = router