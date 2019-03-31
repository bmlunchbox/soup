var express = require('express'),
	router = express.Router(),
	db = require("../db.js");

// get all restrictions
router.get('/', function(req, res, next){
	db.query("SELECT d.description, d.restriction_id, d.quantity FROM new_schema.diet_restriction d", 
		function (err, results){
			if (err) throw err;
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	})
});

module.exports = router;