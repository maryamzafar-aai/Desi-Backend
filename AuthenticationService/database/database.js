const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
console.log('db')
const DB_URI = process.env.MONGO_URI;
console.log(DB_URI);
mongoose.connect(process.env.MONGO_URI,
    {useNewUrlParser: true, useUnifiedTopology: true }
	)
    .then(()=> console.log("DB connected"))
    .catch((err) => {
        //fail to connect database and print error
        console.log("DB failed :  " + process.env.MONGO_URI + " : " + err)
    });

module.exports = mongoose;