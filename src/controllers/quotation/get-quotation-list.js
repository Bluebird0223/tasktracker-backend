const quotationService = require("../../services/quotation.service")

const getQuotationList = async (request, response) => {
    try {

        //extract data from request body
        const { searchString, page } = request.body

        //get data from db & send response to client
        const quotationList = await quotationService.getQuotationList(searchString, page)
        if (quotationList?.totalPages > 0) {
            return response.status(200).json({
                status: "SUCCESS",
                message: "Quotation list fetch successfully",
                ...quotationList
            })
        } else {
            return response.status(200).json({
                status: "FAILED",
                message: "Quotation list not available"
            })
        }

    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message
        })
    }
}
module.exports = getQuotationList