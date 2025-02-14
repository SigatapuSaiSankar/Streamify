import React, { useContext, useState } from "react";
import { userContext } from "../context/Context";
import { toast } from "react-toastify";

const EditProfileForm = ({ handleSave, handleCancelSave, handleFileChange }) => {
    const { user } = useContext(userContext);
    const [selectedFileName, setSelectedFileName] = useState("");

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setSelectedFileName(file.name);
            handleFileChange(e);
        } else {
            toast.error("Please upload a valid image file!");
            setSelectedFileName("");
            e.target.value = null; // Clear the file input
        }
    };

    return (
        <form onSubmit={handleSave}>
            <input type="text" name="name" defaultValue={user.name} className="block w-full p-2 border rounded mb-2" />
            <input type="email" name="email" defaultValue={user.email} className="block w-full p-2 border rounded mb-2" />
            <label className="block w-fit px-3 py-1 border rounded bg-gray-200 text-center cursor-pointer text-sm">
                Change Profile
                <input type="file" accept="image/*" name="profile" onChange={handleFileInputChange} className="hidden" />
            </label>
            {selectedFileName && <p className="text-gray-600">Selected file: {selectedFileName}</p>}
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded mr-2 mt-2">Save</button>
            <button type="button" onClick={handleCancelSave} className="px-4 py-2 bg-gray-500 text-white rounded mt-2">Cancel</button>
        </form>
    );
};

export default EditProfileForm;