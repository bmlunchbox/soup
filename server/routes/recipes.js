var express = require('express'),
	router = express.Router(),
	db = require("../models");
	helpers = require("../helpers/recipes");

router.route('/')
	.get(helpers.getRecipes)
	.post(helpers.createRecipe);

router.route('/:recipeId')
	.put(helpers.updateRecipe)
	.delete(helpers.deleteRecipe);

module.exports = router;