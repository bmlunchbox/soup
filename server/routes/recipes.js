var express = require('express'),
	router = express.Router(),
	db = require("../db.js");

// get all recipes
router.get('/', function(req, res, next){
	db.query("SELECT r.recipe_id, r.url, r.name, fi.name AS Ingredient, ri.quantity AS Required, r.description, r.portion AS Serves FROM new_schema.recipe r LEFT JOIN new_schema.recipe_ingredients ri ON r.recipe_id = ri.recipe_id LEFT JOIN new_schema.food_items fi ON fi.item_id = ri.item_id ORDER BY r.recipe_id ASC", 
		function (err, results){
			if (err) throw err;
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	})
});

router.post('/', function(req, res){
	sqlQuery = "INSERT INTO `new_schema`.`recipe` (`name`, `description`, `portion`, `url`) VALUES ('" + req.body.title + "', '" + req.body.instructions + "', '" + req.body.portions + "', '" + req.body.img + "');";
	db.query(sqlQuery,
		function(err, result){
			if (err) throw err;
			res.send(JSON.stringify({"status": 201, "error": null, "response": result}));
		})
});

router.post('/ingredient', function(req, res){
	sqlQuery = "INSERT INTO `new_schema`.`recipe_ingredients` (`recipe_id`, `item_id`, `quantity`) VALUES ('" + req.body.recipe_id + "', '" + req.body.item + "', '" + req.body.amount + "');";
	console.log(sqlQuery);
	db.query(sqlQuery,
		function(err, result){
			if (err) throw err;
			res.send(JSON.stringify({"status": 201, "error": null, "response": result}));
		})
});

module.exports = router;