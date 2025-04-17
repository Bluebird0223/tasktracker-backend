const userServices = require("../../services/user.service");

const updateUser = async (request, response) => {
    try {
        const { id, name, email, designation, tabAccess } = request.body

        //check validation
        const validationResult = await updateUserValidationSchema.validate({ id, name, email, designation, tabAccess }, { abortEarly: true });
        if (validationResult.error) {
            response.status(200).json({
                status: "FAILED",
                message: validationResult?.error?.details[0]?.message,
            });
            return;
        };

        // Check if user exist
        const isUserExist = await userServices.getEmployeeByObjectId(id);
        if (!isUserExist) {
            return response.status(200).json({
                status: 'FAILED',
                message: 'Event does not exist.'
            });
        }

        let dataToUpdate = {
            name, email, designation, tabAccess
        }

        const result = await userServices.updateUser(id, dataToUpdate);
        if (result) {
            return response.status(200).json({
                status: "SUCCESS",
                message: "User updated successfully.",
            });
        } else {
            return response.status(200).json({
                status: "FAILED",
                message: "Failed to update user.",
            });
        }

    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message
        })
    }
}
module.exports = updateUser