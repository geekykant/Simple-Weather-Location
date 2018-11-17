var express = require('express');
var ejs = require('ejs');
var path = require('path');
var app = express();

//sets the app instance view folder
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.use(express.static('public'))

//index
app.get('/',function(req,res){
	res.render('index',{message:req.param('text')});
});

//about
app.get('/about',function(req,res){
	res.render('about');
});

app.listen(8081);
console.log('8081 is the magic port');