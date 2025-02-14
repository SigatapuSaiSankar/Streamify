import React from "react";

const ResetPassword = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg w-2/3">
            <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
            <input type="password" placeholder="New Password" className="block w-full p-2 border rounded mt-2" />
            <button className="mt-3 px-4 py-2 bg-green-500 text-white rounded">Submit</button>
        </div>
    );
};

export default ResetPassword;