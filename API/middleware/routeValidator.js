const joi = require('joi');

module.exports = {
	validateParam: (schema, name) => {
		return (req, res, next) => {
			const result = joi.validate({ param: req['params'][name] }, schema);

			if (result.error) {
				return res.status(400).json(result.error);
			} else {
				if (!req.value) req.value = {};

				if (!req.value['params']) req.value['params'] = {};

				req.value['params'][name] = result.value.param;

				next();
			}
		};
	},

	validateBody: (schema) => {
		return (req, res, next) => {
			const result = joi.validate(req.body, schema);

			if (result.error) {
				return res.status(400).json({
					error: {
						message: result.error.details[0]['message']
					}
				});
			} else {
				if (!req.value) req.value = {};
				if (!req.value['body']) req.value = {};

				req.value['body'] = result.value;
				next();
			}
		};
	},

	schemas: {
		bodySchema: joi.object().keys({
			title: joi.string().required(),
			ingredient: joi.string().required(),
			direction: joi.string().required()
		}),

		idSchema: joi.object().keys({
			param: joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
		})
	}
};
