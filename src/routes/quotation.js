const createQuotation = require('../controllers/quotation/create-quotaion')

const quotationRoutes = require('express').Router()

quotationRoutes.post('/create-quotation', createQuotation)

module.exports = quotationRoutes