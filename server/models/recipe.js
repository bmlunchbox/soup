var mongoose = require('mongoose');

var recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Name cannot be blank.'
    },
    instructions: {
        type: String,
    },
    url: {
        type: String
    },
    created_date: {
        type: Date,
        default: Date.now
    }
}, {collection: 'Recipes'});

var Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;