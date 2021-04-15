const { buildSchema } = require('graphql');
module.exports = buildSchema(`
    type AuthData {
        userNumber: String!
        token: String!
    }
    type User {
        _id : ID
        userId: String
        userNumber: String
        userLanguage:String
        userOTP: Int
        userToken: String
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
        validateOTP(userInput: UserInput): AuthData
    }
    schema {
        query : RootQuery
        mutation : RootMutation
  }
`);
