
const projectServices = require("../../services/project.service");
const { createProjectValidationSchema } = require("../../utils/validation/project.validation");


const createProject = async (request, response) => {
    try {
        //extract data from request body
        const { projectName, companyName, ownerName, ownerNumber, startDate, endDate, status } = request.body;

        //check validation
        const validationResult = await createProjectValidationSchema.validate({ projectName, companyName, ownerName, ownerNumber, startDate, endDate, status }, { abortEarly: true });
        if (validationResult.error) {
            response.status(200).json({
                status: "FAILED",
                message: validationResult?.error?.details[0]?.message
            });
            return;
        };

        //check project already exist or not
        const isExist = await projectServices.getUserByProjectName(projectName?.toLowerCase())
        if (isExist) {
            return response.status(200).json({
                status: "FAILED",
                message: `${projectName} is already exist.`
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
        const result = await projectServices.createUser(dataToInsert);
        if (result?._id) {
            return response.status(200).json({
                status: "SUCCESS",
                message: "Project created successfully"
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
module.exports = createProject;