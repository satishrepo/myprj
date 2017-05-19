var mongoose = require('mongoose');

var userSchema = new mongoose.Schema(
{
	email : 'String',
	name : 'String'
});

mongoose.model('users', userSchema);