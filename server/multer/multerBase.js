import { uploadOnCloudinary, uploadProfileinDB, uploadToDB } from "../controller/upload.controller.js";
import User from "../model/user.model.js";

const uploadSingleVideo = async (req, res, next) => {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    // file is a object that contains the details of the file 
    const { path } = req.file;
    const {title,description} = req.body;
    try {
        const response = await uploadOnCloudinary(path);
        return await uploadToDB(title, description, response.url,req,res);
        // response.public_id
    } catch (error) {
        return res.status(500).json({message:"Server error", success:false});
    }

    // the responce contains the URL which can be used to access the file that iss uploaded to cloudinary
}


// const uploadProfile = async (req, res, next) => {
//     const { path } = req.file;
//     const {_id,name,email} = req.body;
//     try {
//         const response = await uploadOnCloudinary(path);
//         const updatedUsernameEmail = await User.findByIdAndUpdate(_id, { $set: { name: name, email: email } }, { new: true });
//         return await uploadProfileinDB(_id,response.url,updatedUsernameEmail,req,res);
//     } catch (error) {
//         return res.status(500).json({message:"Server error", success:false});
//     }
// }

const uploadProfile = async (req, res, next) => {
    const { path } = req.file;
    const { _id, name, email } = req.body;

    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        let updateData = { name };

        // Check if email is being changed
        if (email && email !== user.email) {
            updateData.email = email;
            updateData.valid = false;  // Set valid to false if email is updated
        }

        const response = await uploadOnCloudinary(path);
        const updatedUser = await User.findByIdAndUpdate(_id, { $set: updateData }, { new: true });

        return await uploadProfileinDB(_id, response.url, updatedUser, req, res);
    } catch (error) {
        return res.status(500).json({ message: "Server error", success: false });
    }
};

export { uploadSingleVideo,uploadProfile };