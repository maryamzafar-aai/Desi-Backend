const registerService = require('../services/register.service');
const {sendTwilioSMS,getDateTimeNow} = require('../helpers/register.helpers');

//const authy = require('authy')('APIKEY');
/* const authHelper = require('../helpers/auth.helper');
 const bcrypt = require('bcryptjs');
*/
async function sendOTPSMS(number){
    const OTP = Math.floor(100000 + Math.random() * 900000); //a random 6 digit number

    try{
        sendTwilioSMS(OTP, number);
    await registerService.updateOrInsertOTPRecord(number, OTP);
    } catch(e){  
        console.log(e);
    }
    return number;
}

async function validateOTP(user){
    const userNumber = user.userNumber;
    const storedOTP = await registerService.findStoredOTP(userNumber);
if(storedOTP){
    if(storedOTP.userOTP==user.userOTP && storedOTP.expiryDateTime > getDateTimeNow()){
        
        //mark otp end date
        await registerService.markOTPEndDate(userNumber);
        
        //check if user exists
        const existingUser = await registerService.checkUserExists(userNumber);
        
        if(!existingUser){
            //register user
            console.log('register');
            const registeredUser = await registerService.registerUser(user);
            console.log(registeredUser);
            return{
                ...registeredUser._doc, _id: registeredUser._doc._id.toString()
            };
        }
        else{
            //login
            const loggenInUser = await registerService.loginUser(userNumber);
            console.log(loggenInUser);
            return{
                ...loggenInUser._doc, _id: loggenInUser._doc._id.toString()
            };
        }
    }
    else{
        return {}

    }
}
else{
    return {}
}

}

module.exports = {
    sendOTPSMS,
    validateOTP
}   