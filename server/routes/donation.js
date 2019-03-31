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

// add new donation
router.post('/', function(req, res){
	sqlQuery = "INSERT INTO `new_schema`.`donation` (`donor_id`, `amount`, `date`) VALUES ('" + req.body.donor_id + "', '" + req.body.amount + "', '" + req.body.date + "');";
	db.query(sqlQuery,
		function(err, result){
			if (err) throw err;
			res.send(result);
		})
});

module.exports = router;