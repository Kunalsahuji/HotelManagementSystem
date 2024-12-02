const mongoose = require('mongoose');
const dbConnection = async () => {
    try {
        mongoose.connect(process.env.MONGO_URL)
        console.log(`Database Connection Established!`)
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = dbConnection