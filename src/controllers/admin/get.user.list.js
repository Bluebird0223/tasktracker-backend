const userServices = require("../../services/user.service")


const getUserList = async (request, response) => {
    try {


        const { searchString, page } = request.body

        //get data from db & send response to client
        const userList = await userServices.getUserList(searchString, page)
        if (userList?.totalPages > 0) {
            return response.status(200).json({
                status: "SUCCESS",
                message: "User list fetch successfully",
                ...userList
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
module.exports = getUserList