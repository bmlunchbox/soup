var express = require('express'),
	app = express(),
	port = 5000,
	bodyParser = require('body-parser');

var recipeRoutes = require("./routes/recipes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res){
	res.sendFile("index.html");
});

app.use('/api/recipe', recipeRoutes);

app.listen(port, function(){
	console.log("App on port " + port);
});