const mongoose = require('mongoose');

const userOTPSchema = new mongoose.Schema({
    userNumber: {
        type: Number
    },
    userOTP: {
        type: Number
    },
    expiryDateTime: {
        type: Date
    },
    endDate: {
        type: Date
    }
});
let UserOTP = mongoose.model("UserOTP", userOTPSchema);
 module.exports = UserOTP;