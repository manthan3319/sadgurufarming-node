/**
 * This is Contain Save router/api.
 * @author Manthan Vaghasiya
 *
 */

const { Joi } = require("../../../../utilities/schemaValidate");
const { Router } = require("express");
const commonResolver = require("../../../../utilities/commonResolver");
const { getbill } = require("../../../../services/customer/customer");
const router = new Router();

/**
 * @swagger
 * /api/v1/Customer/getbill:
 *  post:
 *   tags: ["Customer"]
 *   summary: Save getbill information.
 *   description: api used for Save getbill information.
 *   parameters:
 *      - in: body
 *        name: lead
 *        description: Save getbill information.
 *        schema:
 *         type: object
 *         properties:
 *           firstName:
 *             type: string
 *           lastName:
 *             type: string
 *           surName:
 *             type: string
 *           instrumentName:
 *             type: string
 *           billtotalamount:
 *             type: number
 *           phone:
 *             type: number
 *           hours:
 *             type: number
 *           price:
 *             type: number
 *   responses:
 *    "200":
 *     description: success
 *    "400":
 *     description: fail
 */



router.post(
  "/getbill",
  commonResolver.bind({
    modelService: getbill,
  })
);

module.exports = router;
