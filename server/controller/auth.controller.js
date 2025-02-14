import User from "../model/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateToken = (user) => {
    return jwt.sign({id: user.id, role: user.role},process.env.JWT_SECRET_KEY,{expiresIn: "1d"});
}

const RegisterUser = async(req,res,next) => {
    const {name,email,password} = req.body;
    try {
        let user = await User.findOne({email:email});

        if(user){
            return res.status(400).json({message:"email already exists",success:false});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        user = new User({name:name,email:email,password:hashedPassword});
        await user.save();
        return res.status(200).json({message:"Registration Successful",success:true});
    } catch (error) {
        return res.status(500).json({message:"Server Error",success:false});
    }
}

const Login = async(req,res,next) => {
    const {email,password} = req.body;

    const user = await User.findOne({email:email});

    if(!user){
        return res.status(404).json({message:"User not found with this email",success:false});
    }

    const isPasswordMatch = await bcrypt.compare(password,user.password);
    if(!isPasswordMatch){
        return res.status(400).json({message:"Wrong Password",success:false});
    }

    const token = generateToken(user);
    const {password:pass,...rest} = user._doc;
    return res.status(200).json({message:"Login Successful",success:true,data:rest,token:token});
}
export {RegisterUser,Login};