var express = require('express');
var path = require('path');
// console.log(express);


var index = require('./routes/index');
var users = require('./routes/users');


var db = require('./model/db');
var users_model = require('./model/users');



var app = express();

app.use('/',index);
app.use('/users',users);



app.set('views', path.join(__dirname, 'views'));
app.set('view engine','jade');
app.listen(8080);