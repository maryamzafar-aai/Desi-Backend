const express = require('express');
const app = express();

const isAuth = require('../middleware/auth');
app.use(isAuth);

//graphql
const registerResolvers = require('./register.resolvers');
const registerValidator = require('../middleware/register.validator');

app.use('/register', registerResolvers);
//graphql end

module.exports = app;