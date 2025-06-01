const createProduct = require('../controllers/inventory/create-product')
const deleteProductById = require('../controllers/inventory/delete-product-by-id')
const getProductById = require('../controllers/inventory/get-product-by-id')
const getProductList = require('../controllers/inventory/get-product-list')
const updateProduct = require('../controllers/inventory/update-product')

const inventoryRoutes = require('express').Router()

inventoryRoutes.post('/create-product', createProduct)
inventoryRoutes.post('/update-product', updateProduct)
inventoryRoutes.post('/get-product-list', getProductList)
inventoryRoutes.post('/get-product-by-id', getProductById)
inventoryRoutes.post('/delete-product-by-id', deleteProductById)


module.exports = inventoryRoutes