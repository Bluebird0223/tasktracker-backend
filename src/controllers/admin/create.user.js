const userServices = require("../../services/user.service");
const { createUserValidationSchema } = require("../../utils/validation/user.validation");


const createAdmin = async (request, response) => {
    try {
        //extract data from request body
        const { name, email, designation, tabAccess } = request.body;

        //check validation
        const validationResult = await createUserValidationSchema.validate({ name, email, designation, tabAccess }, { abortEarly: true });
        if (validationResult.error) {
            response.status(200).json({
                status: "FAILED",
                message: validationResult?.error?.details[0]?.message
            });
            return;
        };

        //check admin already exist or not
        // const isAdminExist = await userServices.getUserByName(name?.toLowerCase())
        // if (isAdminExist) {
        //     return response.status(200).json({
        //         status: "FAILED",
        //         message: `${name} is already exist.`
        //     })
        // }

        // let userId;
        // //get all users for userId
        // const users = await userServices.getLatestCreatedRecord();
        // if (users.length > 0) {
        //     const lastUserUserId = (Number(users[0].userId.substring(3)) + 1);
        //     userId = `OHNO${lastUserUserId}`
        // } else {
        //     userId = "OHNO1000"
        // }


        const dataToInsert = {
            name: name?.toLowerCase(),
            email: email?.toLowerCase(),
            designation: designation?.toLowerCase(),
            tabAccess: [{
                tabName: "dashboard",
                access: "write"
            }],
            password: "password@123",
            isActive: true
        };

        //insert data into db & send response to client
        const result = await userServices.createUser(dataToInsert);
        if (result?._id) {
            return response.status(200).json({
                status: "SUCCESS",
                message: "User created successfully"
            });
        } else {
            return response.status(200).json({
                status: "FAILED",
                message: "Failed to create user, Please try again!"
            })
        };
    } catch (error) {
        console.log(error)
        return response.status(500).json({
            status: "FAILED",
            message: error.message
        });
    };
};
module.exports = createAdmin;