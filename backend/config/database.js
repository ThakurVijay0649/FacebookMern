const mongoose = require('mongoose');

exports.connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URI).then(c => {
        console.log(`Mongodb Connected to ${c.connection.host}`)
    }).catch(err => console.log(err))
}