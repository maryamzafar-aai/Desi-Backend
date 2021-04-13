const User = require('../../models/User'); //get model
const registerController = require('../controllers/register.controller');
const registerValidator = require('../middleware/register.validator');
const {graphqlHTTP} = require('express-graphql');
const registerSchema = require('../graphql-schema/register.schema');



const rootValue =  {
    user: async function(){
       return await User.findOne().catch(err => console.log(err));
   },
   async sendOTPSMS(args){
        return await registerController.sendOTPSMS(args.userNumber);
   },
   async validateOTP(args){
       //console.log(args.userInput.userOTP);
       return await registerController.validateOTP(args.userInput);

   }
}

module.exports = graphqlHTTP({
    schema: registerSchema,
    rootValue: rootValue,
    graphiql: true
})