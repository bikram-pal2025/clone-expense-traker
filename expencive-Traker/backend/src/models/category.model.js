const mongoose = require("mongoose");



const categorySchema = new mongoose.Schema({

    category:{
        type: String,
        required:true
    },
    type:{
        type: String,
        enum: ["income", "expense", ],
        required:true
    }
},{
    timestamps:true
})

const categoryModel = mongoose.model( "catecory" ,categorySchema);

module.exports = categoryModel;