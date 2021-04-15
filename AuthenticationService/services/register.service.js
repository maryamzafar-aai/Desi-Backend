const UserOTP = require('../../models/UserOTP'); //get model
const User = require('../../models/User'); //get model

const {getOTPExpiryDate,getDateTimeNow} = require('../helpers/register.helpers');


async function updateOrInsertOTPRecord(number, OTP) {
    await UserOTP.updateOne(
        { userNumber: number },
        { $set: { userOTP: OTP, expiryDateTime: getOTPExpiryDate(), endDate: null } },
        { upsert: true })
        .catch(err => console.log(err));
}

async function registerUser(body,token) {
    return await new User({
        userNumber: body.userNumber,
        userLanguage: body.userLanguage
    }).save()
        .catch(err => console.log(err));
}

async function checkUserExists(number) {
    return await User.findOne({ userNumber: number })
        .catch(err => console.log(err));
}

async function markOTPEndDate(number) {
    await UserOTP.updateOne(
        { userNumber: number },
        { $set: { endDate: getDateTimeNow() } })
        .catch(err => console.log(err));
}

async function findStoredOTP(number) {
    console.log(number);
    return await UserOTP.findOne({ userNumber: number });
}

async function loginUser(number){
    return await User.findOne({userNumber: number})
                        .catch(err => console.log(err));
}

module.exports = {
    updateOrInsertOTPRecord,
    registerUser,
    loginUser,
    findStoredOTP,
    markOTPEndDate,
    checkUserExists
}