const { ObjectId } = require("mongodb");
const User = require("../models/admin.user.model");
const countPages = require("../../helper/count-pages");
const limit = Number(process.env.LIMIT) ?? 20

const userServices = {
    createUser: async function (dataToInsert) {
        try {
            return await User.create(dataToInsert);
        } catch (error) {
            throw error;
        }
    },
    updateUser: async (id, dataToUpdate) => {
        try {
            return await User.updateOne({ _id: new ObjectId(id) }, { $set: dataToUpdate })
        } catch (error) {
            throw error
        }
    },
    getEmployeeByObjectId: async function (id) {
        try {
            return await User.findOne({ _id: new ObjectId(id) });
        } catch (error) {
            throw error;
        }
    },
    getUserByNameAndMobile: async function (fullName, phoneNumber) {
        try {
            return await User.findOne({ fullName: fullName, phoneNumber: phoneNumber })
        } catch (error) {
            throw error
        }
    },
    getLatestCreatedUser: async function () {
        try {
            const result = await User.find({}).sort({ createdAt: -1 }).limit(1)
            return result[0]
        } catch (error) {
            throw error
        }
    },
    getUserByObjectId: async (id) => {
        try {
            return await User.findOne({ _id: new ObjectId(id) });
        } catch (error) {
            throw error
        }
    },
    getUserList: async (searchString, page = 1) => {
        try {

            let filter = {}
            if (searchString) {
                filter["$or"] = [
                    { name: { $regex: searchString, $options: "i" } },
                    { designation: { $regex: searchString, $options: "i" } },
                    { email: { $regex: searchString, $options: "i" } },
                ];
            }
            if (page < 1) {
                page = 1;
            }
            const totalRecords = await User.countDocuments(filter);
            const result = await User.find(filter, {})
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit);
            return {
                totalPages: await countPages(totalRecords),
                result,
            };

        } catch (error) {
            throw error
        }
    }
};

module.exports = userServices