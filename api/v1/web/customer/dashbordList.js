/**
 * This is Contain Save router/api.
 * @author Manthan Vaghasiya
 *
 */
const { Joi } = require("../../../../utilities/schemaValidate");
const { Router } = require("express");
const commonResolver = require("../../../../utilities/commonResolver");
const { dashbordList } = require("../../../../services/customer/customer");
const router = new Router();

/**
 * @swagger
 * /api/v1/Customer/dashbordList:
 *  post:
 *   tags: ["Customer"]
 *   summary: get dashbordList information.
 *   description: api used for get dashbordList information.
 *   parameters:
 *      - in: body
 *        name: lead
 *        description: get dashbordList information.
 *        schema:
 *         type: object
 *         properties:
 *   responses:
 *    "200":
 *     description: success
 *    "400":
 *     description: fail
 */



router.post(
  "/dashbordList",
  commonResolver.bind({
    modelService: dashbordList,
  })
);
module.exports = router;
