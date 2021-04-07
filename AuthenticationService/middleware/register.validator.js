function sendOTPSMSValid(req, res, next){
    req.check('userNumber','Please enter a number').notEmpty();

    if(req.validationErrors()){
        console.log(req.validationErrors())
        return returnFirstError(res, req.validationErrors());
    }
    next();
}

function validateOTPValid(req, res, next){
    req.check('userNumber','Please enter a number').notEmpty();
    req.check('userLanguage','Please select a language.').notEmpty();
    req.check('userOTP','Please enter OTP.').notEmpty();

    if(req.validationErrors()){
        return returnFirstError(res, req.validationErrors());
    }
    next();


}

function returnFirstError(res, errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
}

module.exports ={
    sendOTPSMSValid,
    validateOTPValid
}