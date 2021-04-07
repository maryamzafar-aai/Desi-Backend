const mongoose = require('mongoose');
const DB_URI = process.env.MONGO_URI;
mongoose.connect(
    process.env.MONGO_URI,
    {useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log(`DB connected to ${DB_URI}`)
}).catch((err) => {
    console.log(`DB failed to connect to ${DB_URI} : ${err}`);
});

module.exports = {
    mongoose
};