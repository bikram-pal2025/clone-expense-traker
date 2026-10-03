const mongoose = require("mongoose");


async function connectDb () {
    try {

        await mongoose.connect(process.env.DB_SECRET)
        console.log("db connected")

    } catch(err){

        console.log( "error in db folder",err)

    }
}

module.exports = connectDb 