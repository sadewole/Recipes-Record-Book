const mongoose = require('mongoose');
const Recipe = require('../model');

module.exports = {
	index: async (req, res, next) => {
		const allRecipe = await Recipe.find();
		res.status(200).json(allRecipe);
	},
	newRecipe: async (req, res, next) => {
		const newRecipe = {
			title: req.value.body.title,
			ingredient: req.value.body.ingredient,
			direction: req.value.body.direction
		};
		const recipe = await new Recipe(newRecipe);

		await recipe.save();
		res.status(201).json({
			TYPE: 'POST',
			status: 201,
			data: {
				title: req.body.title.trim(),
				ingredient: req.body.ingredient.trim(),
				direction: req.body.direction.trim()
			},
			message: 'Recipe added Successfully'
		});
	},
	replaceRecipe: async (req, res, next) => {
		const { recipeId } = req.value.params;
		const rep = req.value.body;
		const newRecipe = await Recipe.findByIdAndUpdate(recipeId, rep);

		await newRecipe.save();
		res.status(201).json({
			TYPE: 'PUT',
			status: 201,
			data: {
				title: req.body.title.trim(),
				ingredient: req.body.ingredient.trim(),
				direction: req.body.direction.trim()
			},
			message: 'Recipe updated Successfully'
		});
	},
	removeRecipe: async (req, res, next) => {
		const { recipeId } = req.value.params;
		const removeRecipe = await Recipe.findByIdAndRemove(recipeId);

		res.status(200).json({
			TYPE: 'DELETE',
			status: 200,
			message: 'Successfully deleted'
		});
	}
};
