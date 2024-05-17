/*
 * @file: index.js
 * @description: It's combine all contractor routers.
 * @author: Manthan Vaghasiya
 */

const save = require("./save");
const list = require("./list");
const getbill = require("./getbill.js");
const listtotalbill = require("./listtotalbill.js");
const listAllBill = require("./listAllBill.js");
const login = require("./login.js");
const RallbilLiat = require("./RallbilLiat.js");
const dashbordList = require("./dashbordList.js");

module.exports = [
    save, 
    list, 
    getbill,
    listtotalbill,
    listAllBill,
    login,
    RallbilLiat,
    dashbordList];
