const userServices = require("../../services/user.service");
const { loginValidationSchema } = require("../../utils/validation/user.validation");
const generateUserJWT = require('../../utils/middleware/generate.token')
const login = async (request, response) => {
    try {
        //extract data from request body
        const { userId, password } = request.body;

        //check validation
        const validationResult = await loginValidationSchema.validate({ userId, password }, { abortEarly: true });
        if (validationResult.error) {
            response.status(200).json({
                status: "FAILED",
                message: validationResult?.error?.details[0]?.message,
            });
            return;
        };

        //check user exist or not
        const isUserExist = await userServices.getUserByUserId(userId);
        if (!isUserExist) {
            return response.status(200).json({
                status: "FAILED",
                message: "Invalid userId, check your userId & try again!"
            })
        };

        if (isUserExist.password === password) {
            const userDetails = { _id: isUserExist._id, name: isUserExist.name, designationName: isUserExist?.designationName, userId: isUserExist?.userId }
            const token = generateUserJWT(userDetails)
            if (token) {
                return response.status(200).json({
                    status: "SUCCESS",
                    message: "Login Successfully",
                    token,
                    userDetails: { ...isUserExist.toObject() },
                })
            }
        } else {
            response.status(200).json({
                status: "FAILED",
                message: "Incorrect password ,please check your password and try again!",
            });
            return;
        }
    } catch (error) {
        response.status(500).json({
            status: "FAILED",
            message: error.message,
        });
        return;
    }
};
module.exports = login;