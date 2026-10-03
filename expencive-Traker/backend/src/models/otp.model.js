const mongoose = require("mongoose");



const otpSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true,"Emial is require"],
    },

    user:{
        type: mongoose.Types.ObjectId,
        ref: "user",
        require:[true,'user is require'],

    },
     otpHash:{
        type:String,
        required: [true,"OTP is require"],
     },

     otpExpireIn: {
  type: Date,
  
  expires: 0, 
}
   
},{timestamps:true})


const otpModel = mongoose.model("otp",otpSchema)
module.exports = otpModel;