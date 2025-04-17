const Joi = require('joi');

// create user
exports.createUserValidationSchema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    designation: Joi.string().required(),
    tabAccess: Joi.array().min(1).items(
        Joi.object({
            tabName: Joi.string().optional(),
            access: Joi.string().valid("read", "write", "none").optional()
        })
    ).optional().allow("", null),
})

// update user
exports.createUserValidationSchema = Joi.object().keys({
    id: Joi.string().length(24).required(),
    name: Joi.string().allow("", null).optional(),
    email: Joi.string().allow("", null).optional(),
    designation: Joi.string().allow("", null).optional(),
    tabAccess: Joi.array().min(1).items(
        Joi.object({
            tabName: Joi.string().optional(),
            access: Joi.string().valid("read", "write", "none").optional()
        })
    ).optional().allow("", null),
})

//validation for login
exports.loginValidationSchema = Joi.object().keys({
    userId: Joi.string().required(),
    password: Joi.string().required(),
});

//reset password 
exports.resetPasswordValidationSchema = Joi.object().keys({
    userId: Joi.string().required(),
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().min(8).max(32).required(),
    confirmPassword: Joi.string().min(8).max(32).required()
});



// Id validation
exports.idValidation = Joi.object().keys({
    id: Joi.string().length(24).required()
});
