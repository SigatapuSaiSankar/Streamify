import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import LoadingBtn from '../loading/Loading';

export default function Uploading() {
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        // for(const [name, value] of formData){
        //     console.log(`${name} ${value}`);
        // }

        try {
            setUploading(true);
            const file = e.target.avatar.files[0];
            if(file){
                if (file.size > 15 * 1024 * 1024) {
                    toast.error("File size must be less than 15MB");
                    // setError("File size must be less than 15MB");
                    return;
                }
                const allowedTypes = ["video/mp4", "video/avi", "video/mkv", "video/mov"];
                if (!allowedTypes.includes(file.type)) {
                    toast.error("Please upload a valid video file (MP4, AVI, MKV, MOV)");
                    return;
                }
            }
            else{
                toast.error("Please upload a valid video file");
                return;
            }
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/upload/singlevideo`, {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();

            if (response.ok) {
                toast.success("Upload successful");
                e.target.reset();
            } else {
                toast.error("Upload failed. Please try again.");
            }
            navigate('/');
        } catch (error) {
            toast.error("An error occurred during the upload.");
        }
        finally {
            setUploading(false);
        }

    }
    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <form
                    className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md"
                    method="post" encType="multipart/form-data" onSubmit={handleSubmit}
                >
                    <h2 className="text-2xl font-bold mb-6 text-center">Submit Your Details</h2>

                    {/* Title */}
                    <div className="mb-4">
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="mt-1 p-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter title"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows="4"
                            className="mt-1 p-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter description"
                            required
                        ></textarea>
                    </div>

                    {/* File Upload */}
                    <div className="mb-4">
                        <label
                            htmlFor="file"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Upload File
                        </label>
                        <input
                            type="file"
                            id="file"
                            name="avatar"
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                            required
                        />
                    </div>

                    {!uploading ? (
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            Submit
                        </button>
                    ) : (
                        <LoadingBtn/>
                    )}

                </form>
            </div>
        </div>
    )
}
