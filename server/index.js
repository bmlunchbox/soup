var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	port = 5000;

var sql = require('./models/db.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

//var recipeRoutes = require("./routes/recipes");

app.get('/', function(req, res){
	res.send("root");
});

//app.use('/api/recipe', recipeRoutes);

app.listen(port, function(){
	console.log("App on port " + port + ".");
});

