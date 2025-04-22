const createProject = require('../controllers/project/create-project')
const getProjectList = require('../controllers/project/get-project-list')

const projectRoutes = require('express').Router()

projectRoutes.post('/create-project', createProject)
projectRoutes.post('/get-projects-list', getProjectList)
// projectRoutes.post('/get-project-by-id', getProjectById)
// projectRoutes.post('/update-project', updateProject)
// projectRoutes.post('/delete-project', deleteProject)

module.exports = projectRoutes