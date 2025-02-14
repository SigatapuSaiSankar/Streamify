import React from "react";

const ProfileImage = ({ newProfileImage }) => {
    return (
        <img
            src={newProfileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-white mb-2"
        />
    );
};

export default ProfileImage;