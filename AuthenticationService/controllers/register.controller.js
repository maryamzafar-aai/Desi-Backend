const registerService = require('../services/register.service');
const {sendTwilioSMS,getDateTimeNow} = require('../helpers/register.helpers');

//const authy = require('authy')('APIKEY');
/* const authHelper = require('../helpers/auth.helper');
 const bcrypt = require('bcryptjs');
*/
async function sendOTPSMS(req,res){
    const OTP = Math.floor(100000 + Math.random() * 900000); //a random 6 digit number
    sendTwilioSMS(OTP, req.body);
    try{
    await registerService.updateOrInsertOTPRecord(req.body, OTP);
    } catch(e){  
        console.log(e);
    }
    res.json(req.body);
}

async function validateOTP(req,res){
    const userNumber = req.body.userNumber;
    const storedOTP = await registerService.findStoredOTP(userNumber);

    if(storedOTP.userOTP==req.body.userOTP && storedOTP.expiryDateTime > getDateTimeNow()){
        
        //mark otp end date
        await registerService.markOTPEndDate(userNumber);
        
        //check if user exists
        const existingUser = await registerService.checkUserExists(userNumber);
        
        if(!existingUser){
            //register user
            const registeredUser = await registerService.registerUser(req.body);
            console.log(registeredUser);
            res.json(registeredUser);
        }
        else{
            //login
            const loggenInUser = await registerService.loginUser(userNumber);
            console.log(loggenInUser);
            res.json(loggenInUser);
        }
    }
    else{
        res.json({

        })

    }

}

module.exports = {
    sendOTPSMS,
    validateOTP
}   