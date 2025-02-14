import React from "react";

const ProfileSidebar = ({ user, valid, activePage, setActivePage, handleVerify }) => {
    return (
        <aside className="w-1/4 bg-gray-800 text-white p-5">
            <div className="flex flex-col items-center mb-4">
                <img
                    src={user.profileImage}
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-2 border-white mb-2"
                />
                <h2 className="text-lg font-bold">{user.name}</h2>
                <p className="text-sm text-gray-300">{user.email}</p>
            </div>
            <nav className="space-y-2">
                <button onClick={() => setActivePage("info")} className={`block w-full text-left py-2 px-4 rounded ${activePage === "info" ? "bg-gray-700" : ""}`}>
                    Profile Info
                </button>
                <button onClick={() => setActivePage("reset")} className={`block w-full text-left py-2 px-4 rounded ${activePage === "reset" ? "bg-gray-700" : ""}`}>
                    Reset Password
                </button>
                {valid ? (
                    <button className="block w-full text-center py-3 rounded bg-blue-500 text-white justify-center">
                        Verified User ✅
                    </button>
                ) : (
                    <button onClick={handleVerify} className="block w-full text-center py-3 rounded bg-blue-500 text-white justify-center">
                        Get Verify
                    </button>
                )}
            </nav>
        </aside>
    );
};

export default ProfileSidebar;