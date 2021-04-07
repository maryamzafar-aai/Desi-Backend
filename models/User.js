const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    userNumber: {
        type: Number
    },
    userLanguage:{
        type: String
    },
    userOTP: {
        type: Number
    }
});
let User = mongoose.model("User", userSchema);
module.exports = User;