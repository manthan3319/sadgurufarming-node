/**
 * This is Contain Save router/api.
 * @author Manthan Vaghasiya
 *
 */
const { Joi } = require("../../../../utilities/schemaValidate");
const { Router } = require("express");
const commonResolver = require("../../../../utilities/commonResolver");
const { listAllBill } = require("../../../../services/customer/customer");
const router = new Router();

/**
 * @swagger
 * /api/v1/Customer/listAllBill:
 *  post:
 *   tags: ["Customer"]
 *   summary: get listAllBill information.
 *   description: api used for get listAllBill information.
 *   parameters:
 *      - in: body
 *        name: lead
 *        description: get listAllBill information.
 *        schema:
 *         type: object
 *         properties:
 *           phone:
 *             type: number
 *   responses:
 *    "200":
 *     description: success
 *    "400":
 *     description: fail
 */


const dataSchema = Joi.object({
  phone: Joi.number().required("phone")
});

router.post(
  "/listAllBill",
  commonResolver.bind({
    modelService: listAllBill,
    isRequestValidateRequired: true,
    schemaValidate: dataSchema,
  })
);
module.exports = router;
