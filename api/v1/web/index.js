/*
 * @file: index.js
 * @description: It's combine all routers.
 * @author: Sandip Vaghasiya
 */
const { Router } = require("express");
const app = Router();

const contractor = require("./contractor");
const customer = require("./customer");
/*********** Combine all Routes ********************/
app.use("/contractor", contractor);
app.use("/customer",customer);
module.exports = app;
