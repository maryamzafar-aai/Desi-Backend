//graphql
const { buildSchema } = require('graphql');
module.exports = buildSchema(`
    type User {
        _id : ID
        userId: String
        userNumber: String
        userLanguage:String
        userOTP: Int
    }
    input UserInput {
        userNumber: String
        userLanguage: String
        userOTP: Int
    }
    type RootQuery{
        user: User
    }
    type RootMutation{
        sendOTPSMS(userNumber: String): String
        validateOTP(userInput: UserInput): User
    }
    schema {
        query : RootQuery
        mutation : RootMutation
  }
`);
