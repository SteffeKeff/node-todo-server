'use strict';
var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	jsonParser = bodyParser.json(),
	items = [
		'bread',
		'eggs'
	],
	//lastId = 2, (behövs ej då vi kan använda oss av items.length)
	port = 8001;

// Create a static web server to serve our html, css and javascript that is in the public directory
app.use(express.static(__dirname + '/public'));

// The following code also pulls out form encoded data, not just json. This is the default that jQuery sends.
app.use(bodyParser.urlencoded({
	extended: true
}));

app.get('/items', function (req, res) {
	//Eftersom items redan är en array så behöver föremålen inte läggas in i en ny array
	//var itemsArray = [];
	//for (var key = 0; key < items.length; key++) {
	//	itemsArray.push(
	//		items[key]
	//	);
	//}
	//res.json(itemsArray);
	res.json(items);
});

app.get('/items/:id', function (req, res) {
	//res.send('get item with id ' + req.params.id);
	var item = items[req.params.id];
	if (item === undefined) {
		res.status(404).send('Not found');
	} else {
		res.json(item);
		res.status(200).send();
	}
});

app.post('/items', jsonParser, function (req, res) {
	//items[lastId] = req.body.item;
	items[items.length] = req.body.item;
	res.setHeader('Location', '/books' + items.length - 1);
	//res.setHeader('Location', '/books' + lastId);
	//lastId++;
	res.status(201).send();
});

app.delete('/items/:id', function (req, res) {
	var item = items[req.params.id];
	if (item === undefined) {
		res.status(404).send('Not found');
	} else {
		var position = req.params.id;
		items.splice(position, 1);
		//lastId--; //minskar id att lägga in på
		res.status(204).send();
	}
});

app.listen(port);
console.log('server started on port ' + port);