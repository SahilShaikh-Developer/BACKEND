const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"Username already exists"],
        required:[true,"Username already required"]
    },
    email:{
        type:String,
        unique:[true,"Email already exists"],
        required:[true,"Email is required"]
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    bio:{
        type:String
    },
    profileImage:{
        type:String,
        default:"https://ik.imagekit.io/tecfk8rb7/360_F_1168505794_IBCEiafsIrHFJ09e65P2vh5115C1XI7e.webp"
    }
})


const userModel = mongoose.model("users",userSchema)

module.exports = userModel