var db = require('../models/recipe.js');

exports.getRecipes = function(req, res){
	db.Recipe.find()
		.then(function(recipes){
			res.json(recipes);
		})
		.catch(function(err){
			res.send(err);
		})
}

exports.createRecipe = function(req, res){
	db.Recipe.create(req.body)
		.then(function(newRecipe){
			res.status(201).json(newRecipe);
		})
		.catch(function(err){
			res.send(err);
		})
}

exports.updateRecipe =  function(req, res){
   db.Recipe.findOneAndUpdate({_id: req.params.recipeId}, req.body, {new: true})
   .then(function(recipe){
       res.json(recipe);
   })
   .catch(function(err){
       res.send(err);
   })
}

exports.deleteRecipe = function(req, res){
   db.Recipe.remove({_id: req.params.recipeId}) 
   .then(function(){
       res.json({message: 'Deleted!'});
   })
   .catch(function(err){
       res.send(err);
   })
}

module.exports = exports;