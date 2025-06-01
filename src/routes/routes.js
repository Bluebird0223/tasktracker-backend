const express = require("express");
const adminRoutes = require("./admin.routes");
const quotationRoutes = require("./quotation");
const projectRoutes = require("./projects.routes");
const inventoryRoutes = require("./inventory.routes");
const routes = express();

routes.use('/admin', adminRoutes)
routes.use('/quotation', quotationRoutes)
routes.use('/project', projectRoutes)
routes.use('/inventory', inventoryRoutes)


module.exports = routes