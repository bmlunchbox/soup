var mongoose = require('mongoose');

var recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name cannot be blank.'
    },
    completed: {
        type: Boolean,
        default: false
    },
    created_date: {
        type: Date,
        default: Date.now
    }
}, {collection: 'Recipes'});

var Recipe = mongoose.model('Recipe', todoSchema);

module.exports = Recipe;