const express = require('express');
const morgan = require('morgan'); //to display incoming request details
const expressValidator = require('express-validator'); // for validation of requests
const dotenv = require('dotenv');

const app = express();

//middleware
dotenv.config();
app.use(morgan("dev"));
app.use(expressValidator());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//routes
const authRoutes = require('./AuthenticationService/resolvers/index.resolvers');

//adding routes
app.use('/auth', authRoutes);

//set port and create server
const port = process.env.PORT || 5050;
app.listen(port, () => {
    console.log(`Authentication service  is running on port ${port}`);
});

module.exports = app;