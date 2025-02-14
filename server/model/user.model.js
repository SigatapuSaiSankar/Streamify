import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum:["user", "admin","superadmin"],
        default: "user"
    },
    profileImage:{
        type: String,
        default : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
    valid:{
        type: Boolean,
        default: false
    }
})


export default mongoose.model("users",userSchema);