const Joi = require("joi");

// create project
exports.createProjectValidationSchema = Joi.object().keys({
    projectName: Joi.string().required(),
    companyName: Joi.string().required(),
    ownerName: Joi.string().required(),
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
    ownerNumber: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
        'string.pattern.base': 'Owner Number must be 10 digit',
    }),
    status: Joi.string().required(),
});

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
