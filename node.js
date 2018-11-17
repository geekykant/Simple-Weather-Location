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
	res.render('index', {location_name:"Hello!", location_data:"Yoo!" });
});

//about
app.get('/about',function(req,res){
	res.render('about');
});

app.get('/get_weather',function(req,res){
	var url = "http://api.openweathermap.org/data/2.5/weather";
	let appid = "af9b69f5927b1ad56e894921325ab85e";

	var lat = req.param('lat');
	var lon = req.param('lon');

	var request_url = `${url}?appid=${appid}&lat=${lat}&lon=${lon}`;

	console.log("url: " + request_url);

	const options = {  
	    url: request_url,
	    method: 'GET',
	    headers: {'Accept': 'application/json'}
	};

	// request(options, function(err, res, body) {  
	//     let json = JSON.parse(body);
	//     console.log(json['weather'][0]['main'] + "," + json['weather'][0]['description'] + "\n" + json['name'] );
	// });		

	request(options)
		.then(function(msg){
			let json = JSON.parse(msg);
			console.log(json['weather'][0]['main'] + "," + json['weather'][0]['description'] + "\n" + json['name'] )
			res.send({location_data: "asldnjasdasda", location_name: "saasdnasd"});
		})
		.catch(function(err){

		});

	// res.send({location_data: json['weather'][0]['main'] + "," + json['weather'][0]['description'] , 
	// 	location_name: json['name']});
	console.log("DONE LOG!")
	res.send({location_data: "asd", location_name: "sad"});
});

app.listen(8081);
console.log('8081 is the magic port');