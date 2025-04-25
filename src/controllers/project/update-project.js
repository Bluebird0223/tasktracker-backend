
const projectServices = require("../../services/project.service");
const { updateProjectValidationSchema } = require("../../utils/validation/project.validation");


const updateProject = async (request, response) => {
    try {
        //extract data from request body
        const { id, projectName, companyName, ownerName, ownerNumber, startDate, endDate, status } = request.body;

        //check validation
        const validationResult = await updateProjectValidationSchema.validate({ id, projectName, companyName, ownerName, ownerNumber, startDate, endDate, status }, { abortEarly: true });
        if (validationResult.error) {
            response.status(200).json({
                status: "FAILED",
                message: validationResult?.error?.details[0]?.message
            });
            return;
        };

        //check project already exist or not
        const isExist = await projectServices.getProjectById(id)
        if (!isExist) {
            return response.status(200).json({
                status: "FAILED",
                message: "Project not found"
            })
        }


        const dataToInsert = {
            projectName,
            companyName,
            ownerName,
            ownerNumber,
            startDate,
            endDate,
            status
        };

        //insert data into db & send response to client
        const result = await projectServices.updateProject(id, dataToInsert);
        if (result?.acknowledged && result?.modifiedCount > 0) {
            return response.status(200).json({
                status: "SUCCESS",
                message: "Project updated successfully"
            });
        } else {
            return response.status(200).json({
                status: "FAILED",
                message: "Failed, Please try again!"
            })
        };
    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message
        });
    };
};
module.exports = updateProject;