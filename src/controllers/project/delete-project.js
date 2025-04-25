const projectServices = require("../../services/project.service");

const deleteProject = async (request, response) => {
    try {
        //extract data from request body
        const { id } = request.body;

        //check validation
        if (!id) {
            response.status(200).json({
                status: "FAILED",
                message: "Project ID is required"
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

        //insert data into db & send response to client
        const result = await projectServices.deleteProject(id);
        if (result?.acknowledged && result?.deletedCount > 0) {
            return response.status(200).json({
                status: "SUCCESS",
                message: "Project deleted successfully"
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
}

module.exports = deleteProject;