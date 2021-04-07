function getOTPExpiryDate() {
    const expiryMinutes = 20;
    let expiryDate = getDateTimeNow()
    //set date to current time zone (plus 300 minutes) plus 2 minutes timer
    expiryDate.setMinutes(expiryDate.getMinutes() + expiryMinutes);
    return expiryDate;
}

function getDateTimeNow() {
    console.log('getting time');
    const timezoneOffset = 300;
    let dt = new Date();
    //set date to current time zone (plus 300 minutes)
    dt.setMinutes(dt.getMinutes() + timezoneOffset);
    return dt;
}

function sendTwilioSMS(OTP, user) {
    const accountSid = 'ACe7e1557fd07bc3cb50316da2809a9d0e';
    const authToken = 'fbda390d913f6e91f62944eaca5e7e93';
    const client = require('twilio')(accountSid, authToken);

    client.messages
        .create({
            body: `Your OTP for Desi App is ${OTP}`,
            messagingServiceSid: 'MGa9081cedff5b1146aa53059ac6396e3d',
            to: user.userNumber
        })
        .then(message => console.log(message.sid))
        .catch(err => console.log(err.message))
        .done();
}

module.exports ={
    getOTPExpiryDate,
    sendTwilioSMS,
    getDateTimeNow
}