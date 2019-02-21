const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const recipeSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	ingredient: {
		type: String,
		required: true
	},
	direction: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('recipe', recipeSchema);