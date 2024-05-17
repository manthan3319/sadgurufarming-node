/**
 * This is Contain Save router/api.
 * @author Manthan Vaghasiya
 *
 */
const { Joi } = require("../../../../utilities/schemaValidate");
const { Router } = require("express");
const commonResolver = require("../../../../utilities/commonResolver");
const { getCustomer } = require("../../../../services/customer/customer");
const router = new Router();

/**
 * @swagger
 * /api/v1/Customer/getCustomer:
 *  post:
 *   tags: ["Customer"]
 *   summary: get Contractor information.
 *   description: api used for get Contractor information.
 *   parameters:
 *      - in: body
 *        name: lead
 *        description: get Contractor information.
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
  "/getCustomer",
  commonResolver.bind({
    modelService: getCustomer,
    isRequestValidateRequired: true,
    schemaValidate: dataSchema,
  })
);
module.exports = router;
