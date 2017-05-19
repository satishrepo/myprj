var express = require('express');
var path = require('path');
// console.log(express);


var index = require('./routes/index');


var db = require('./model/db');
var users = require('./model/users');



var app = express();

app.use('/',index);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','jade');
app.listen(8080);