const Joi = require("joi");

// create employee
exports.employeeValidationSchema = Joi.object().keys({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    mobile: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
        'string.pattern.base': 'Mobile No must be 10 digit',
    }),
    position: Joi.string().required(),
    role: Joi.string().required(),
});

// id validation
exports.idValidationSchema = Joi.object().keys({
    id: Joi.string().length(24).required()
})

// update employee
exports.updateEmployeeValidationSchema = Joi.object().keys({
    id: Joi.string().length(24).required(),
    fullName: Joi.string().allow("", null).optional(),
    email: Joi.string().allow("", null).email().optional(),
    mobile: Joi.string().pattern(/^[0-9]{10}$/).allow("", null).optional().messages({
        'string.pattern.base': 'Mobile No must be 10 digit',
    }),
    birthDate: Joi.string().allow("", null).optional(),
    location: Joi.string().allow("", null).optional(),
    role: Joi.string().allow("", null).optional()
})
