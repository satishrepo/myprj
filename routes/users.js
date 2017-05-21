var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.route('/')
.get(function(req, res, next)
{
	mongoose.model('users').find({},function(err,result)
	{
		if(err)
		{
			console.log(err);
			return;
		}
		res.format(
		{
			html:function()
			{
				return res.render('users', {users:result});
			},
			json:function()
			{
				return res.json({users:result});
			}
		})
	})
})
.post(function(req, res, next)
{
	var email = req.body.email;
	var name = req.body.name;

	mongoose.model('users').create(
	{
		email : email,
		name : name
	},
	function(err, result)
	{
		if(err)
		{
			console.log(err);
			return;
		}

		res.format(
		{
			html: function()
			{
				res.location('users');
				res.redirect('/users');
			}
		})
	})	
});

module.exports = router;