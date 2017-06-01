var express = require('express');
var router = express.Router();

// var loginAuth = require('../middleware/loginAuth');

var loginController = require('../controllers/loginController');

router.get('/', loginController.login);
router.post('/', loginController.login);




module.exports = router;
