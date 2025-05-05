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
    status: Joi.string().required().valid("pending", "ongoing","completed").default("ongoing")
});

// update project
exports.updateProjectValidationSchema = Joi.object().keys({
    id: Joi.string().length(24).required(),
    projectName: Joi.string().allow("", null).optional(),
    companyName: Joi.string().allow("", null).optional(),
    ownerName: Joi.string().allow("", null).optional(),
    ownerNumber: Joi.string().pattern(/^[0-9]{10}$/).allow("", null).optional().messages({
        'string.pattern.base': 'Mobile No must be 10 digit',
    }),
    startDate: Joi.string().allow("", null).optional(),
    endDate: Joi.string().allow("", null).optional(),
    status: Joi.string().allow("", null).optional()
})
