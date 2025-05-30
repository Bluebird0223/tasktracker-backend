const { ObjectId } = require("mongodb");
const countPages = require("../../helper/count-pages");
const Quotation = require("../models/quotation.model")
const limit = Number(process.env.LIMIT) ?? 20

const quotationService = {
    createQuotation: async function (dataToInsert) {
        try {
            return await Quotation.create(dataToInsert);
        } catch (error) {
            throw error;
        }
    },
    getQuotationList: async function (searchString, page = 1) {
        try {
            let filter = {}
            if (searchString) {
                filter["$or"] = [
                    { name: { $regex: searchString, $options: "i" } }
                ];
            }
            if (page < 1) {
                page = 1;
            }

            const totalRecords = await Quotation.countDocuments(filter);
            const result = await Quotation.find(filter, {})
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit)
            return {
                totalPages: await countPages(totalRecords),
                result,
            };
        } catch (error) {
            throw error;
        }
    },
    getQuotationById: async function (id) {
        try {
            return await Quotation.findById({ _id: new ObjectId(id) });
        } catch (error) {
            throw error;
        }
    },
    updateQuotation: async function (id, dataToUpdate) {
        try {
            return await Quotation.findByIdAndUpdate(
                { _id: new ObjectId(id) },
                { $set: dataToUpdate },
                { new: true, runValidators: true }
            );
        } catch (error) {
            throw error;
        }
    },
    deleteQuotation: async function (quotationId) {
        try {
            if (!ObjectId.isValid(quotationId)) {
                throw new Error("Invalid quotation ID");
            }
            const deletedQuotation = await Quotation.findByIdAndDelete(quotationId);
            if (!deletedQuotation) {
                throw new Error("Quotation not found or delete failed");
            }
            return deletedQuotation;
        } catch (error) {
            throw error;
        }
    },
    getQuotationByNameAndMobile: async function (name, mobile) {
        try {
            return await Quotation.findOne({ client: name, mobile: mobile })
        } catch (error) {
            throw error
        }

    }
};

module.exports = quotationService  