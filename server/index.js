var express = require('express'),
	app = express(),
	port = 5000,
	mongoose = require('mongoose'),
	bodyParser = require('body-parser');

var recipeRoutes = require("./routes/recipes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

app.get('/', function(req, res){
	res.send("root");
});

app.use('/api/recipe', recipeRoutes);

app.listen(port, function(){
	console.log("App on port " + port);
});