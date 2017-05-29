var mongoose = require('mongoose');

var userSchema = new mongoose.Schema(
{
	username : { type: String, unique: true, lowercase: true },
	email : { type: String, unique: true, lowercase: true },
});

var user_detailSchema = new mongoose.Schema(
{
	phone : Number,
	sex : String,
	user : [{type: mongoose.Schema.Types.ObjectId, ref: 'userSchema'}]
});

mongoose.model('users', userSchema);
mongoose.model('users_detail', user_detailSchema);