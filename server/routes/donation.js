var express = require('express'),
	router = express.Router(),
	db = require("../db.js");

// get all donations items
router.get('/', function(req, res, next){
	db.query("SELECT n.date, d.name, n.amount, n.donation_id FROM new_schema.donation n INNER JOIN new_schema.donor d ON d.donor_id = n.donor_id", 
		function (err, results){
			if (err) throw err;
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	})
});

module.exports = router;