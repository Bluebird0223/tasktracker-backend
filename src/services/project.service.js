const { ObjectId } = require("mongodb");
const User = require("../models/admin.user.model");
const countPages = require("../../helper/count-pages");
const Project = require("../models/project.model");
const limit = Number(process.env.LIMIT) ?? 20

const projectServices = {
    createProject: async function (dataToInsert) {
        try {
            return await Project.create(dataToInsert);
        } catch (error) {
            throw error;
        }
    },
    getUserByProjectName: async function (projectNameame) {
        try {
            return await Project.findOne({ projectName: projectNameame });
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
    getProjectList: async (searchString, page = 1) => {
        try {
            let filter = {}
            if (searchString) {
                filter["$or"] = [
                    { projectName: { $regex: searchString, $options: "i" } },
                    { companyName: { $regex: searchString, $options: "i" } },
                    { ownerName: { $regex: searchString, $options: "i" } },
                    { ownerNumber: { $regex: searchString, $options: "i" } },
                    { status: { $regex: searchString, $options: "i" } },
                ];
            }
            if (page < 1) {
                page = 1;
            }
            const totalRecords = await Project.countDocuments(filter);
            const result = await Project.find(filter, {})
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

module.exports = projectServices