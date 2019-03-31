var express = require('express'),
	router = express.Router(),
	db = require("../db.js");

// get all donors
router.get('/', function(req, res, next){
	db.query("SELECT name, donor_id FROM new_schema.donor", 
		function (err, results){
			if (err) throw err;
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	})
});

// add new donor
router.post('/', function(req, res){
	sqlQuery = "INSERT INTO `new_schema`.`donor` (`name`, `address`, `email`, `cell`) VALUES ('"+ req.body.name + "', '" + req.body.address + "', '" + req.body.email + "', '" + req.body.phone + "');";
	db.query(sqlQuery,
		function(err, result){
			if (err) throw err;
			res.send(result);
		})
});

module.exports = router;