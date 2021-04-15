const User = require('../../models/User'); //get model
const mongoose = require('../database/database');
const registerController = require('../controllers/register.controller');
const registerValidator = require('../middleware/register.validator');
const { graphqlHTTP } = require('express-graphql');
const registerSchema = require('../graphql-schema/register.schema');



const rootValue = {
    user: async function (args, req) {
        if (!req.isAuth) {
            //logic in caase of not authenticated, error
            throw new Error('Unauthenticated');
        }
        return await User.findOne({ userNumber: req.userNumber }).catch(err => console.log(err));
    },
    async sendOTPSMS(args, req) {
        if (!req.isAuth) {
            //logic in caase of not authenticated, error
        }
        console.log(args.userNumber);
        return await registerController.sendOTPSMS(args.userNumber);
    },
    async validateOTP(args, req) {
        if (!req.isAuth) {
            //logic in caase of not authenticated, error
        }
        //console.log(args.userInput.userOTP);
        return await registerController.validateOTP(args.userInput);

    }
}

module.exports = graphqlHTTP({
    schema: registerSchema,
    rootValue: rootValue,
    graphiql: true
})