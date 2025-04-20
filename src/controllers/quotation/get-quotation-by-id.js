const { idValidation } = require("../../utils/validation/user.validation");
const quotationService = require("../../services/quotation.service")

const getQuotationById = async (request, response) => {
    try {
        // Extract data from request body
        const { quotationId } = request.body;

        //check validation
        const validationResult = await idValidation.validate({ id:quotationId }, { abortEarly: true });
        if (validationResult.error) {
            response.status(200).json({
                status: "FAILED",
                message: validationResult?.error?.details[0]?.message,
            });
            return;
        };

        // Get data from DB & send response to client
        const quotation = await quotationService.getQuotationById(quotationId);
        if (quotation) {
            return response.status(200).json({
                status: "SUCCESS",
                message: "Quotation fetched successfully",
                quotation
            });
        } else {
            return response.status(200).json({
                status: "FAILED",
                message: "Quotation not found"
            });
        }
    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message
        });
    }
}

module.exports = getQuotationById;