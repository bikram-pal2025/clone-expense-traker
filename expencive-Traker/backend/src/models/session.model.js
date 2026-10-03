const mongoose = require("mongoose");
const { refreshToken } = require("../controller/auth.controller");

const sessionSchema = new  mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref:"user",
        require:[true, "user is  require"],
    },
    refreshTokenHash:{
        type: String,
        require:[true, "refresh token is require"],
    },
    ip:{
        type: String,
        require:[true,"ip is required"],
    },
    userAgent:{
        type: String,
        require: [true, "user agent is require"],
    },
    revoked:{
        type: Boolean,
       
        default:false
    }

},{
    timestamps:true
})


const sessionModel = mongoose.model("session", sessionSchema)

module.exports = sessionModel