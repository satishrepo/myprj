var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride 	= require('method-override');
// console.log(express);


var db = require('./models/db');
var users_model = require('./models/users');


var index = require('./routes/index');
var users = require('./routes/users');


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
{
	extended:true
}));
app.use(methodOverride(function(req, res)
{
	if(req.body && typeof req.body == 'object' && '_method' in req.body)
	{
		var method = req.body._method;
		delete req.body._method;
		return method;
	}
}));

app.use('/',index);
app.use('/users',users);
app.use('/user',users);



app.set('views', path.join(__dirname, 'views'));
app.set('view engine','pug');
app.listen(8080);