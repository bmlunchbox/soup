var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect("mongodb+srv://brandon:<pw>@soup-dmnpg.mongodb.net/test?retryWrites=true", {useNewUrlParser: true},
	function(err){
		if(err){
			console.log("fail");
			console.log(err);
			throw err;
		}
		console.log("success");
	});

mongoose.Promise = Promise;

module.exports.Recipe = require("./recipe");