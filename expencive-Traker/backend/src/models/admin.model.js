const mongoose = require ("mongoose");

const adminSchema = new mongoose.Schema({

    userName:{
        type:String,
        required:true,
        unique:true
    },
    
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        require:true
    }

},{timestamps:true})

const adminModel = mongoose.model("admin",adminSchema)

module.exports = adminModel;