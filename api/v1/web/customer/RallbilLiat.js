/**
 * This is Contain Save router/api.
 * @author Manthan Vaghasiya
 *
 */
const { Joi } = require("../../../../utilities/schemaValidate");
const { Router } = require("express");
const commonResolver = require("../../../../utilities/commonResolver");
const { RallbilLiat } = require("../../../../services/customer/customer");
const router = new Router();

/**
 * @swagger
 * /api/v1/Customer/RallbilLiat:
 *  post:
 *   tags: ["Customer"]
 *   summary: get RallbilLiat information.
 *   description: api used for get RallbilLiat information.
 *   parameters:
 *      - in: body
 *        name: lead
 *        description: get RallbilLiat information.
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
  "/RallbilLiat",
  commonResolver.bind({
    modelService: RallbilLiat,
  })
);
module.exports = router;
