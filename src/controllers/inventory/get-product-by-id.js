const inventoryService = require("../../services/inventory.service");
const { idValidation } = require("../../utils/validation/user.validation");

const getProductById = async (request, response) => {
    try {
        // Extract data from request body
        const { id } = request.body;

        //check validation
        const validationResult = await idValidation.validate({ id }, { abortEarly: true });
        if (validationResult.error) {
            return response.status(200).json({
                status: "FAILED",
                message: validationResult?.error?.details[0]?.message,
            });
        };

        // Get data from DB & send response to client
        const result = await inventoryService.getProductById(id);
        if (result) {
            return response.status(200).json({
                status: "SUCCESS",
                message: "Product fetched successfully",
                result
            });
        } else {
            return response.status(200).json({
                status: "FAILED",
                message: "Product not found"
            });
        }
    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message
        });
    }
}

module.exports = getProductById;