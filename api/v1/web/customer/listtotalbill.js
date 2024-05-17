/**
 * This is Contain Save router/api.
 * @author Manthan Vaghasiya
 *
 */
const { Joi } = require("../../../../utilities/schemaValidate");
const { Router } = require("express");
const commonResolver = require("../../../../utilities/commonResolver");
const { listtotalbill } = require("../../../../services/customer/customer");
const router = new Router();

/**
 * @swagger
 * /api/v1/Customer/listtotalbill:
 *  post:
 *   tags: ["Customer"]
 *   summary: get listtotalbill information.
 *   description: api used for get listtotalbill information.
 *   parameters:
 *      - in: body
 *        name: lead
 *        description: get listtotalbill information.
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
  "/listtotalbill",
  commonResolver.bind({
    modelService: listtotalbill,
    isRequestValidateRequired: true,
    schemaValidate: dataSchema,
  })
);
module.exports = router;
