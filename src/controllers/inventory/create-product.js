const runMiddleware = require("../../utils/middleware/multer-middleware")
const { productValidationSchema } = require("../../utils/validation/inventory.validation");
const deleteMultipleFiles = require("../../utils/helper/delete-multiple-file");
const inventoryService = require("../../services/inventory.service");
const uploadImage = require("../../utils/multer/upload-image");

const createProduct = async (request, response) => {
    try {

        console.log("here")
        // Upload document
        const fileResponse = await runMiddleware(request, response, uploadImage.single("attachment"));
        if (fileResponse) {
            return response.status(400).json({
                status: "FAILED",
                message: fileResponse.code
            });
        }

        const data = JSON.parse(request.body.data)
        const { name, description, unitPrice, quantity } = data;
         console.log("here",data)
        // check validation
        const validationResult = await productValidationSchema.validate({ name, description, unitPrice, quantity }, { abortEarly: true })
        if (validationResult?.error) {
            await deleteMultipleFiles(request?.files);
            return response.status(400).json({
                status: "FAILED",
                message: validationResult?.error?.details[0]?.message
            })
        };

        // Check if entry for name already exists
        const existingEntry = await inventoryService.getProductByName(name);
        if (existingEntry) {
            await deleteMultipleFiles(request?.files);
            return response.status(400).json({
                status: "FAILED",
                message: `Product already exist with ${name}.`
            });
        }

        // get file path
        let file = request?.file;
        let fileUrl = "";
        if (!!file) {
            const splitUrlArray = file?.destination.split("/");
            fileUrl = splitUrlArray[splitUrlArray.length - 3] + '/' + splitUrlArray[splitUrlArray.length - 2] + '/' + splitUrlArray[splitUrlArray.length - 1] + file?.filename;
        };

        // check if Image is attached
        if (!fileUrl) {
            // await deleteSingleFile(request?.file)
            return response.status(400).json({
                status: "FAILED",
                message: "Image is required"
            })
        }

        const dataToInsert = {
            image: fileUrl,
            name: name?.toLowerCase(),
            description: description?.toLowerCase(),
            unitPrice,
            quantity,
        };

        // save data into db
        const result = await inventoryService.createProduct(dataToInsert)
        if (result?._id) {
            return response.status(200).json({
                status: "SUCCESS",
                message: "Product added successfully!"
            })
        } else {
            await deleteMultipleFiles(request?.files);
            return response.status(400).json({
                status: "FAILED",
                message: "Failed to add product"
            })
        }
    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message
        })
    }
}

module.exports = createProduct
