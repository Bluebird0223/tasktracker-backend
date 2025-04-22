const projectServices = require("../../services/project.service")

const getProjectList = async (request, response) => {
    try {

        //extract data from request body
        const { searchString, page } = request.body

        //get data from db & send response to client
        const projectList = await projectServices.getProjectList(searchString, page)
        if (projectList?.totalPages > 0) {
            return response.status(200).json({
                status: "SUCCESS",
                message: "User list fetch successfully",
                ...projectList
            })
        } else {
            return response.status(200).json({
                status: "FAILED",
                message: "User list not available"
            })
        }

    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message
        })
    }
}
module.exports = getProjectList