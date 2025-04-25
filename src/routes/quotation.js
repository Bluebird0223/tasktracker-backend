const createQuotation = require('../controllers/quotation/create-quotaion')
const getQuotationById = require('../controllers/quotation/get-quotation-by-id')
const getQuotationList = require('../controllers/quotation/get-quotation-list')
const updateQuotation = require('../controllers/quotation/update-quotation')

const quotationRoutes = require('express').Router()

quotationRoutes.post('/create-quotation', createQuotation)
quotationRoutes.post('/update-quotation', updateQuotation)
quotationRoutes.post('/get-quotation-list', getQuotationList)
quotationRoutes.post('/get-quotation-by-id', getQuotationById)

module.exports = quotationRoutes