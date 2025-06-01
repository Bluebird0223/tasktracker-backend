const inventoryService = require("../../services/inventory.service")

const getProductList = async (request, response) => {
    try {

        //extract data from request body
        const { searchString, page } = request.body

        //get data from db & send response to client
        const result = await inventoryService.getProductList(searchString, page)
        if (result?.totalPages > 0) {
            return response.status(200).json({
                status: "SUCCESS",
                message: "Product list fetch successfully",
                ...result
            })
        } else {
            return response.status(200).json({
                status: "FAILED",
                message: "list not available"
            })
        }

    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message
        })
    }
}
module.exports = getProductList