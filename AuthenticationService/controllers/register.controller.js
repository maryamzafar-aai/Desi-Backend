const registerService = require('../services/register.service');
const { sendTwilioSMS, getDateTimeNow } = require('../helpers/register.helpers');
const jwt = require('jsonwebtoken');
//const authy = require('authy')('APIKEY');
/* const authHelper = require('../helpers/auth.helper');
 const bcrypt = require('bcryptjs');
*/
async function sendOTPSMS(number) {
    const OTP = Math.floor(100000 + Math.random() * 900000); //a random 6 digit number
    console.log(number);
    try {
        sendTwilioSMS(OTP, number);
        await registerService.updateOrInsertOTPRecord(number, OTP);
    } catch (e) {
        console.log(e);
    }
    return number;
}

async function validateOTP(user) {
    const userNumber = user.userNumber;
    const storedOTP = await registerService.findStoredOTP(userNumber);
    if (storedOTP) {
        if (storedOTP.userOTP == user.userOTP && storedOTP.expiryDateTime > getDateTimeNow()) {

            //mark otp end date
            await registerService.markOTPEndDate(userNumber);

            const token = jwt.sign({ userNumber: user.userNumber }, 'somesupersecretkey');

            //check if user exists
            const existingUser = await registerService.checkUserExists(userNumber);

            if (!existingUser) {
                //register user
                console.log('register');
                //generate token

                const registeredUser = await registerService.registerUser(user);
                console.log(registeredUser);
            }
            else {
                //login
                const loggenInUser = await registerService.loginUser(userNumber);
                console.log(loggenInUser);
            }

            return {
                userNumber: userNumber, token: token
            }
        }
        else {
            return {
                userNumber: userNumber, token: 'Error generating token'
            }

        }
    }
    else {
        return {
            userNumber: userNumber, token: 'Error generating token'
        }
    }

}

module.exports = {
    sendOTPSMS,
    validateOTP
}