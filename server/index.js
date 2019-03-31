var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	port = 5000;

var sql = require('./db.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

var inventoryRoutes = require("./routes/inventory");
var restrictionRoutes = require("./routes/restrictions");
var donorRoutes = require("./routes/donor");
var donationRoutes = require("./routes/donation");

app.get('/', function(req, res){
	res.send("root");
});

app.use('/api/inventory', inventoryRoutes);
app.use('/api/restrictions', restrictionRoutes);
app.use('/api/donor', donorRoutes);
app.use('/api/donation', donationRoutes);

app.listen(port, function(){
	console.log("App on port " + port + ".");
});

