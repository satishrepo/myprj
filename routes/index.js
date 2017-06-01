var express = require('express');
var router = express.Router();

router.get('/', function(req, res)
{
	res.render('index',{content:'This is dynamic content for index', title:'Demo Project'});
});

router.get('/unauthorized', function(req, res)
{
	res.render('unauthorized',{content:'Permission Denied, Please Login!', title:'Demo Project'});
});

module.exports = router;