const createProject = require('../controllers/project/create-project')
const deleteProject = require('../controllers/project/delete-project')
const getProjectById = require('../controllers/project/get-project-by-id')
const getProjectList = require('../controllers/project/get-project-list')
const updateProject = require('../controllers/project/update-project')

const projectRoutes = require('express').Router()

projectRoutes.post('/create-project', createProject)
projectRoutes.post('/get-projects-list', getProjectList)
projectRoutes.post('/get-project-by-id', getProjectById)
projectRoutes.post('/update-project', updateProject)
projectRoutes.post('/delete-project', deleteProject)

module.exports = projectRoutes