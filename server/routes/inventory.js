var express = require('express'),
	router = express.Router(),
	db = require("../db.js");

// get all inventory items
router.get('/', function(req, res, next){
	db.query("SELECT f.name, f.stock, d.description FROM new_schema.food_items f LEFT JOIN new_schema.diet_restriction d ON f.restriction_id = d.restriction_id", 
		function (err, results){
			if (err) throw err;
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	})
});

router.post('/', function(req, res){
	name = req.body.item;
	stock = req.body.stock;
	res_id = req.body.restriction_id;
	sqlQuery = "INSERT INTO `new_schema`.`food_items` (`name`, `stock`, `restriction_id`) VALUES ('" + name + "', '" + stock + "', '" + res_id + "');";
	db.query(sqlQuery,
		function(err, result){
			if (err) throw err;
			res.send(JSON.stringify({"status": 201, "error": null, "response": "inserted"}));
		})
});

router.put('/:item', function(req, res){
	name = req.params.item;
	stock = req.body.stock;
	sqlQuery = "UPDATE `new_schema`.`food_items` SET `stock`='" + stock + "' WHERE `name`='" + name + "';";
	db.query(sqlQuery, 
		function (err, results){
			if (err) throw err;
			res.send(JSON.stringify({"status": 200, "error": null, "response": "updated"}));
	})
});

module.exports = router;