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
	res.render('index', {location_data: '', location_name: '',icon: ""});
});

//about
app.get('/about',function(req,res){
	res.render('about');
});

app.get('/get_weather',function(req,res){
	var url = "http://api.openweathermap.org/data/2.5/weather";
	let appid = "af9b69f5927b1ad56e894921325ab85e";

	var request_url = `${url}?appid=${appid}&lat=${req.param('lat')}&lon=${req.param('lon')}`;

	if(req.param('location')!=undefined){
		request_url += `&q=${req.param('location')}`;
	}

	const options = {  
	    url: request_url,
	    method: 'GET',
	    headers: {'Accept': 'application/json'}
	};

	request(options)
		.then(function(msg){
			let json = JSON.parse(msg);
			res.render('partials/data',{location_data: `${json['weather'][0]['main']}, ${json['weather'][0]['description']}`, 
				location_name: `${json['name']} (${json['sys']['country']})`,icon:`http://openweathermap.org/img/w/${json['weather'][0]['icon']}.png`,
				location_celsius: `Min: ${ Math.floor((json['main']['temp_min']-273)* 100)/100 } Max:${Math.floor((json['main']['temp_max']-273)* 100)/100}`});
		})
		.catch(function(err){
			console.log(err);
			res.send(404, 'Something went wrong');
		});
});

app.listen(8081);
console.log('8081 is the magic port');