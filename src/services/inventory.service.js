const { ObjectId } = require("mongodb");
const countPages = require("../../helper/count-pages");
const Inventory = require("../models/inventory.model");
const limit = Number(process.env.LIMIT) ?? 20

const inventoryService = {
    createProduct: async function (dataToInsert) {
        try {
            return await Inventory.create(dataToInsert);
        } catch (error) {
            throw error;
        }
    },
    getProductByName: async function (name) {
        try {
            return await Inventory.findOne({ name: name })
        } catch (error) {
            throw error
        }
    },
    getProductById: async function (id) {
        try {
            return await Inventory.findOne({ _id: new ObjectId(id) });
        } catch (error) {
            throw error;
        }
    },
    updateProduct: async (id, dataToUpdate) => {
        try {
            return await Inventory.updateOne({ _id: new ObjectId(id) }, { $set: dataToUpdate })
        } catch (error) {
            throw error
        }
    },
    getProductList: async (searchString, page = 1) => {
        try {
            let filter = {}
            if (searchString) {
                filter["$or"] = [
                    { name: { $regex: searchString, $options: "i" } },
                    { description: { $regex: searchString, $options: "i" } },
                    { unitPrice: { $regex: searchString, $options: "i" } },
                    { quantity: { $regex: searchString, $options: "i" } },
                ];
            }
            if (page < 1) {
                page = 1;
            }
            const totalRecords = await Inventory.countDocuments(filter);
            const result = await Inventory.find(filter, {})
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
    },
    deleteProductById: async (id) => {
        try {
            return await Inventory.deleteOne({ _id: new ObjectId(id) })
        } catch (error) {
            throw error
        }
    }

};

module.exports = inventoryService