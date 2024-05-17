/*
 * @file: login.js
 * @description: It Contain login router/api.
 * @author: Sandip Vaghasiya
 */
const { Joi } = require("../../../../utilities/schemaValidate");
const { Router } = require("express");
const commonResolver = require("../../../../utilities/commonResolver");
const { onLogin } = require("../../../../services/customer/customer");
const router = new Router();

/**
 * @swagger
 * /api/v1/customer/login:
 *  post:
 *   tags: ["Customer"]
 *   summary: user login api
 *   description: api used to login users
 *   parameters:
 *      - in: body
 *        name: user
 *        description: The user to login.
 *        schema:
 *         type: object
 *         required:
 *          - user login
 *         properties:
 *           email:
 *             type: string
 *             required:
 *           password:
 *             type: string
 *             required:
 *   responses:
 *    "200":
 *     description: success
 */

const loginSchema = Joi.object({
    email: Joi.string()
        .required()
        .label("Email or username")
    , password: Joi.string()
        .required()
        .label("Password")
});

router.post('/login', commonResolver.bind({ modelService: onLogin, isRequestValidateRequired: true, schemaValidate: loginSchema }))


module.exports = router;
