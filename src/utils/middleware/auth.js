const jwt = require("jsonwebtoken");
const userServices = require("../../services/user.service");

const userAuthentication = async (request, response, next) => {
    try {
        const authHeader = request.header('authorization')
        if (authHeader) {
            const token = authHeader.split(' ')[1];

            jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, userDetails) => {
                if (err) {
                    response.status(200).json({
                        status: "JWT_INVALID",
                        message: "Your session has ended. Please login again.",
                    });
                    return;
                } else {
                    // check if user exists
                    request._id = userDetails._id
                    const doesUserExist = await userServices.getUserByObjectId(userDetails?._id);
                    if (!doesUserExist) {
                        response.status(200).json({
                            status: "JWT_INVALID",
                            message: "Your session has ended. Please login again.",
                        });
                        return;
                    }
                    //pass in request
                    request.userId = doesUserExist?.userId;
                    request.fullName = doesUserExist?.fullName;
                    request.phoneNumber = doesUserExist?.phoneNumber;
                }
                next();
            });
        } else {
            response.status(200).json({
                status: "JWT_INVALID",
                message: "Your session has ended. Please login again.",
            });
            return;
        }
    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = userAuthentication;