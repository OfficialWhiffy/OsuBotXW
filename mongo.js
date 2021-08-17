const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();
const mongoPath   = process.env.mongoPath

module.exports = async () => {
    await mongoose.connect(mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
    return mongoose
}