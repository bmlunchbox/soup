var express = require('express'),
	router = express.Router(),
	db = require("../db.js");

// get all recipes
router.get('/', function(req, res, next){
	db.query("SELECT r.recipe_id, r.url, r.name, fi.name AS Ingredient, ri.quantity AS Required, r.description, r.portion AS Serves FROM new_schema.recipe r LEFT JOIN new_schema.recipe_ingredients ri ON r.recipe_id = ri.recipe_id LEFT JOIN new_schema.food_items fi ON fi.name = ri.name ORDER BY r.recipe_id ASC", 
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
	sqlQuery = "INSERT INTO `new_schema`.`recipe_ingredients` (`recipe_id`, `name`, `quantity`) VALUES ('" + req.body.recipe_id + "', '" + req.body.item + "', '" + req.body.amount + "');";
	db.query(sqlQuery,
		function(err, result){
			if (err) throw err;
			res.send(JSON.stringify({"status": 201, "error": null, "response": result}));
		})
});

// get all recipes for menu page
router.get('/menu', function(req, res, next){
	db.query("SELECT r.recipe_id, r.name, r.portion AS Serves, fi.name AS Ingredient, ri.quantity AS Required, d.description AS Restriction FROM new_schema.recipe r LEFT JOIN new_schema.recipe_ingredients ri ON r.recipe_id = ri.recipe_id LEFT JOIN new_schema.food_items fi ON fi.name = ri.name LEFT JOIN new_schema.diet_restriction d ON d.restriction_id = fi.restriction_id ORDER BY r.name DESC", 
		function (err, results){
			if (err) throw err;
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	})
});

module.exports = router;