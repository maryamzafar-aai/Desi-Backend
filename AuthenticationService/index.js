const express = require('express');
const app = express();

//graphql
const registerResolvers = require('./resolvers/register.resolvers');

app.use('/register',registerResolvers);
//graphql end

module.exports = app;