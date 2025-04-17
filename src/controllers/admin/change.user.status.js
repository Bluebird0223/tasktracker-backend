
const userService = require("../../services/user.service");
const { idValidation } = require("../../utils/validation/user.validation");

const changeUserStatus = async (request, response) => {
    try {
        //extract data from request body
        const id = request.body.id;

        //check validation
        const validationResult = await idValidation.validate({ id }, { abortEarly: true });
        if (validationResult?.error) {
            return response.status(200).json({
                status: "FAILED",
                message: validationResult?.error?.details[0]?.message
            });
        };

        //check user exist or not
        const isUserExist = await userService.getEmployeeByObjectId(id)
        if (!isUserExist) {
            return response.status(200).json({
                status: "FAILED",
                message: "User does not exist."
            })
        };

        const status = isUserExist?.isActive === true ? 'disable' : "enable";

        // format to update announcement status
        const dataToUpdate = {
            isActive: !isUserExist?.isActive
        };

        //update data into db and send response to client
        const result = await userService.updateUser(id, dataToUpdate);
        if (result?.acknowledged && result?.modifiedCount > 0) {
            return response.status(200).json({
                status: "SUCCESS",
                message: `User mark as ${status} successfully`
            });
        } else {
            return response.status(200).json({
                status: "FAILED",
                message: `Failed to mark as ${status}, please try again.`
            });
        }
    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message
        })
    }
};


module.exports = changeUserStatus;