var userService = require('../services/userService');

var user = {
	getUsers : function(req, res)
	{
		userService.getAllUsers(function(response)
		{	
			res.format(
			{ 	
				html:function()
				{
					if(response.statusCode !== 200)
					{
						return res.render('error', {error:response.data});
					}
					return res.render('./user/users', {users:response.data});
				},
				json:function()
				{
					return res.json(response);
				}
			});
		});
	},
	getUserDetail : function(req, res)
	{
		var username = req.params.username;

		userService.getUserDetail(username, function(response)
		{
			res.format(
			{ 	
				html:function()
				{
					if(response.statusCode !== 200)
					{
						return res.render('error', {error:response.data});
					}
					return res.render('./user/detail', {detail:response.data});
				},
				json:function()
				{
					return res.json(response);
				}
			});
		});
	},
	saveUser : function(req, res)
	{
		var user = {
			username : req.body.username,
			email : req.body.email,
		};

		var detail = {
			phone : req.body.phone,
			sex : req.body.sex
		};

		userService.saveUser(user, detail, function(response)
		{
			res.format(
			{
				html:function()
				{
					if(response.statusCode !== 200)
					{
						return res.render('error', {error:response.data});
					}
					res.redirect('/users');
				},
				json:function()
				{
					return res.json(response);
				}
			});
		});
	},
	updateUserInfo : function(req, res)
	{
		var user = {
			user : req.body.userid,
			phone : req.body.phone,
			sex : req.body.sex,
		};

		userService.saveUser(user, function(response)
		{
			res.format(
			{
				html:function()
				{
					if(response.statusCode !== 200)
					{
						return res.render('error', {error:response.data});
					}
					res.redirect('/users');
				},
				json:function()
				{
					return res.json(response);
				}
			});
		});
	},
	removeUser : function(req, res)
	{
		var email = req.body.email;

		userService.removeUser(email, function(response)
		{
			res.format(
			{
				html:function()
				{
					if(response.statusCode !== 200)
					{
						return res.render('error', {error:response.data});
					}
					res.redirect('/users');
				},
				json:function()
				{
					return res.json(response);
				}
			});
		});
	},

};

module.exports = user;