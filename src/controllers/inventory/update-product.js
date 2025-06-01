const inventoryService = require("../../services/inventory.service");
const runMiddleware = require("../../utils/middleware/multer-middleware");
const { updateProductValidationSchema } = require("../../utils/validation/inventory.validation");
const uploadImage = require("../../utils/multer/upload-image");

const updateProduct = async (request, response) => {
    try {

        // Upload document
        const fileResponse = await runMiddleware(request, response, uploadImage.single("attachment"));
        if (fileResponse) {
            return response.status(400).json({
                status: "FAILED",
                message: fileResponse.code
            });
        }

        const data = JSON.parse(request.body.data)
        const { id, name, description, unitPrice, quantity } = data;

        // check validation
        const validationResult = await updateProductValidationSchema.validate({ id, name, description, unitPrice, quantity }, { abortEarly: true })
        if (validationResult?.error) {
            return response.status(200).json({
                status: "FAILED",
                message: validationResult?.error?.details[0]?.message
            })
        };

        // check if title already exists
        const isExist = await inventoryService.getProductById(id);
        if (!isExist) {
            return response.status(200).json({
                status: "FAILED",
                message: 'record not found'
            })
        }

        // get file path
        let file = request?.file;
        let fileUrl = "";
        if (!!file) {
            const splitUrlArray = file?.destination.split("/");
            fileUrl = splitUrlArray[splitUrlArray.length - 3] + '/' + splitUrlArray[splitUrlArray.length - 2] + '/' + splitUrlArray[splitUrlArray.length - 1] + file?.filename;
        };


        const dataToUpdate = {
            name, 
            description, 
            unitPrice, 
            quantity,
            image: fileUrl,
        };

        // save data into db
        const result = await inventoryService.updateProduct(id, dataToUpdate)
        if (result?.acknowledged && result?.modifiedCount > 0) {
            return response.status(200).json({
                status: "SUCCESS",
                message: "Product updated successfully!"
            })
        } else {
            return response.status(200).json({
                status: "FAILED",
                message: "Failed to submit!"
            })
        }
    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message
        })
    }
}

module.exports = updateProduct;