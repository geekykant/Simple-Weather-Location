var express = require('express');
var ejs = require('ejs');
var path = require('path');
var request = require('request-promise');

var app = express();

//sets the app instance view folder
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.use(express.static('public'))

//index
app.get('/',function(req,res){
	res.render('index', {location_data: '', location_name: ''});
});

//about
app.get('/about',function(req,res){
	res.render('about');
});

app.get('/get_weather',function(req,res){
	var url = "http://api.openweathermap.org/data/2.5/weather";
	let appid = "af9b69f5927b1ad56e894921325ab85e";

	var request_url = `${url}?appid=${appid}&lat=${req.param('lat')}&lon=${req.param('lon')}`;

	const options = {  
	    url: request_url,
	    method: 'GET',
	    headers: {'Accept': 'application/json'}
	};

	request(options)
		.then(function(msg){
			let json = JSON.parse(msg);
			res.send({location_data: json['weather'][0]['main'] + "," + json['weather'][0]['description'], 
				location_name: json['name']});
			console.log("done!!")
		})
		.catch(function(err){
			console.log(err);
			res.send(500, 'Something went wrong');
		});
});

app.listen(8081);
console.log('8081 is the magic port');