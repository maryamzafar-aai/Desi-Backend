const express = require('express');
const router = express.Router();

const registerController = require('../controllers/register.controller');
const registerValidator = require('../middleware/register.validator');

router.post('/sendOTPSMS', registerValidator.sendOTPSMSValid ,registerController.sendOTPSMS);
router.post('/validateOTP', registerValidator.validateOTPValid ,registerController.validateOTP);

module.exports = router;