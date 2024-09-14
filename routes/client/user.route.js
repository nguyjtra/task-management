const express = require("express");
const router = express.Router();
const auth=require('../../middlewares/client/auth.middleware')
const controller = require("../../controllers/client/user.controller");

router.post('/register',controller.register)

router.post('/login',controller.login)

router.post('/password/forgot',controller.forgot)

router.post('/password/otp',controller.otp)

router.post('/password/reset',controller.reset)

router.get('/profile',auth.requireAuth,controller.profile)

module.exports=router