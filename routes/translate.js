const express = require('express');
var controller = require('../controllers/translate')
var router = express.Router();


router.post('/',controller)

module.exports = router