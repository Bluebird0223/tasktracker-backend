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
};

module.exports = quotationService  