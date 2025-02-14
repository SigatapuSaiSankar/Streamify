import React from "react";
import EditProfileForm from "./EditProfileForm";

const ProfileInfo = ({ user, isEditing, setIsEditing, handleSave, handleCancelSave, handleFileChange, newProfileImage }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg w-2/3">
            <h1 className="text-2xl font-bold mb-4">User Profile</h1>
            {isEditing ? (
                <EditProfileForm
                    handleSave={handleSave}
                    handleCancelSave={handleCancelSave}
                    handleFileChange={handleFileChange}
                    newProfileImage={newProfileImage}
                />
            ) : (
                <div>
                    <div className="flex items-center space-x-4 mb-4">
                        <img src={newProfileImage} alt="Profile" className="w-16 h-16 rounded-full border-2 border-gray-300" />
                        <div className="text-lg">
                            <p className="mb-2"><strong>Name:</strong> {user.name}</p>
                            <p className="mb-2"><strong>Email:</strong> {user.email}</p>
                        </div>
                    </div>
                    <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-green-500 text-white rounded">Edit Profile</button>
                </div>
            )}
        </div>
    );
};

export default ProfileInfo;