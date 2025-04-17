const express = require("express");
const adminRoutes = require("./admin.routes");
const quotationRoutes = require("./quotation");
const routes = express();

routes.use('/admin', adminRoutes)
routes.use('/quotation', quotationRoutes)


module.exports = routes