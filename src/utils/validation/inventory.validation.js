const Joi = require("joi");

// create product
exports.productValidationSchema = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    unitPrice: Joi.string().required(),
    quantity: Joi.string().required()
});

// update product
exports.updateProductValidationSchema = Joi.object().keys({
    id: Joi.string().length(24).required(),
    name: Joi.string().allow("", null).optional(),
    description: Joi.string().allow("", null).optional(),
    unitPrice: Joi.string().allow("", null).optional(),
    quantity: Joi.string().allow("", null).optional()
})
