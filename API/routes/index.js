const express = require('express');
const router = require('express-promise-router')();
const recipeController = require('../controller');
const { validateParam, validateBody, schemas } = require('../middleware/routeValidator');

// middleware for all routes
router.route('/').get(recipeController.index).post(validateBody(schemas.bodySchema), recipeController.newRecipe);

router
	.route('/:recipeId')
	.get(validateParam(schemas.idSchema, 'recipeId'), recipeController.getSingleRecipe)
	.put(
		[ validateBody(schemas.bodySchema), validateParam(schemas.idSchema, 'recipeId') ],
		recipeController.replaceRecipe
	)
	.delete(validateParam(schemas.idSchema, 'recipeId'), recipeController.removeRecipe);
module.exports = router;
