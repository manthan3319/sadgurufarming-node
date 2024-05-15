/**
 * This is Contain Save router/api.
 * @author Sandip Vaghasiya
 *
 */

const { Joi } = require("../../../../utilities/schemaValidate");
const { Router } = require("express");
const commonResolver = require("../../../../utilities/commonResolver");
const { addContractor } = require("../../../../services/customer/customer");
const router = new Router();

/**
 * @swagger
 * /api/v1/Customer/add:
 *  post:
 *   tags: ["Customer"]
 *   summary: Save Customer information.
 *   description: api used for Save Customer information.
 *   parameters:
 *      - in: body
 *        name: lead
 *        description: Save Customer information.
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

const dataSchema = Joi.object({
  firstName: Joi.string().required().label("firstName"),
  lastName: Joi.string().required().label("lastName"),
  surName: Joi.string().required("surName"),
  instrumentName: Joi.string().required("instrumentName"),
  phone: Joi.number().required("phone"),
  hours: Joi.number().required("hours"),
  price: Joi.number().required("price"),
});

router.post(
  "/add",
  commonResolver.bind({
    modelService: addContractor,
    isRequestValidateRequired: true,
    schemaValidate: dataSchema,
  })
);

module.exports = router;
