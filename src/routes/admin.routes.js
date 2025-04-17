const login = require('../controllers/admin/admin.login')
const changeUserStatus = require('../controllers/admin/change.user.status')
const createUser = require('../controllers/admin/create.user')
const getUserList = require('../controllers/admin/get.user.list')
const updateUser = require('../controllers/admin/update.user')

const adminRoutes = require('express').Router()

adminRoutes.post('/admin-login', login)
adminRoutes.post('/create-user', createUser)
adminRoutes.post('/get-user-list', getUserList)
adminRoutes.post('/change-user-status', changeUserStatus)
adminRoutes.post('/update-user-status', updateUser)

module.exports = adminRoutes