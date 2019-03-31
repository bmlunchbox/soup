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

module.exports = router;