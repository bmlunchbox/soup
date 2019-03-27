var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect("mongodb+srv://brandon:Brandon@soup-dmnpg.mongodb.net/test?retryWrites=true", {useNewUrlParser: true},
	function(err){
		if(err){
			console.log("DB failed.");
			console.log(err);
			throw err;
		}
		console.log("DB success.");
	});

mongoose.Promise = Promise;

module.exports.Recipe = require("./recipe");