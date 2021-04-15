const { buildSchema } = require('graphql');
module.exports = buildSchema(`
    interface BaseResponse {
        status : Boolean
        statuscode: Int
        message: String
    }
`);