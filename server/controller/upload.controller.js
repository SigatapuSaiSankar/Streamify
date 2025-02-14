import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
import videoInfo from "../model/video.model.js";
import User from "../model/user.model.js";



dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });
        // console.log("File uploaded on cloudinary and the src is: ", response.url);
        fs.unlinkSync(localFilePath); // delete file after the file is uploaded to cloudinary\
        return response;
    } catch (error) {
        // console.log("Error Uploading the file to cloudinary:", error.message);
        fs.unlinkSync(localFilePath);
        return null;
    }
};

const uploadToDB = async (title, description, videoURL, req, res) => {
    // console.log(`${title} ${description} ${videoURL} from uploadDB middleware`);
    try {
        const videoData = new videoInfo({
            title: title,
            description: description,
            videoURL: videoURL
        })

        await videoData.save();
        return res.status(200).json({ message: "Updated to DB successfully", success: true });
    } catch (error) {
        return res.status(500).json({ message: "Error uploading", success: false });
    }

}

const getPublicIdFromURL = (url) => {
    const parts = url.split("/");
    const publicIdWithExtension = parts[parts.length - 1];
    return publicIdWithExtension.split(".")[0]; // Remove the file extension
};

const deletefromCloudinaryAndDB = async (req, res) => {
    const { videoId } = req.params; // Assuming the video ID is passed as a parameter

    try {
        // Find video details in the DB
        const videoData = await videoInfo.findById(videoId);

        if (!videoData) {
            return res.status(404).json({ message: "Video not found", success: false });
        }

        const publicId = getPublicIdFromURL(videoData.videoURL); // Extract public ID from Cloudinary URL

        // Delete the file from Cloudinary
        await cloudinary.uploader.destroy(publicId, { resource_type: "video" });

        // Delete the video from the database
        await videoInfo.findByIdAndDelete(videoId);

        return res.status(200).json({ message: "Video deleted successfully", success: true });
    } catch (error) {
        console.error("Error deleting video:", error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};

const deleteFromCloudinary = async (url) => {
    try {
        await cloudinary.uploader.destroy(url);
        return true;
    } catch (error) {
        console.log("Error deleting from cloudinary:", error);
        return false;
    }
}


const uploadProfileinDB = async (_id, url,beforeUpdate, req, res) => {
    try {
        const response = await User.findByIdAndUpdate(_id, { $set: { profileImage: url } }, { new: true });
        if (url == "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png") {
            // if default then no need to delete from Cloudinary
            return res.status(200).json({ message: "Profile Image updated successfully", success: true, data: response });
        }
        else {
            await deleteFromCloudinary(beforeUpdate.profileImage.split("/").at(-1).split(".")[0]);
        }

        return res.status(200).json({ message: "Profile Image updated successfully", success: true, data: response });
    } catch (error) {
        return res.status(500).json({ message: "Error updating profile image", success: false });

    }
}

export { uploadOnCloudinary, uploadToDB, deletefromCloudinaryAndDB, uploadProfileinDB };