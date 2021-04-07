const express = require('express');
const morgan = require('morgan'); //to display incoming request details
const expressValidator = require('express-validator'); // for validation of requests
const dotenv = require('dotenv');

const authRoutes = require('./AuthenticationService/routes/index.routes');

const app = express();

dotenv.config();
//middleware
app.use(morgan("dev"));
app.use(expressValidator());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use("/auth",authRoutes);

const port = process.env.PORT  || 5050; 
app.listen(port,()=>{
    console.log(`Authentication service  is running on port ${port}`);
});

const listEndpoints = require('express-list-endpoints')
console.log('listing endpoint' +listEndpoints(app));

module.exports = app;