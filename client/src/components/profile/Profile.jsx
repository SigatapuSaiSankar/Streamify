import React, { useContext, useState, useEffect } from "react";
import { userContext } from "../context/Context";
import { toast } from "react-toastify";
import ProfileSidebar from "./ProfileSidebar";
import ProfileInfo from "./ProfileInfo";
import ResetPassword from "./ResetPassword";
import OtpModal from "./OtpModal";

const Profile = () => {
    const [activePage, setActivePage] = useState("info");
    const { user, dispatch, valid } = useContext(userContext);

    const [isEditing, setIsEditing] = useState(false);
    const [newProfileImage, setNewProfileImage] = useState(user.profileImage);
    const [selectedFile, setSelectedFile] = useState(null);

    const [isVerifying, setIsVerifying] = useState(false);
    const [displayTimer, setDisplayTimer] = useState(false);
    const [otp, setOtp] = useState("");
    const [timer, setTimer] = useState(0);
    const [isResendEnabled, setIsResendEnabled] = useState(false);
    const [openSending, setOpenSending] = useState(false);

    useEffect(() => {
        let interval;
        if (isVerifying && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            setIsResendEnabled(true);
            clearInterval(interval);
            setDisplayTimer(false);
        }
        return () => clearInterval(interval);
    }, [isVerifying, timer]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setSelectedFile(file);
            setNewProfileImage(URL.createObjectURL(file));
        } else {
            alert("Please upload a valid image file!");
            setSelectedFile(null);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append("_id", user._id);

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/upload/uploadprofile`, {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            if (data.success) {
                toast.success(data.message);
                setIsEditing(false);
                dispatch({type:"LOGIN_SUCCESSFUL",payload:data})
                e.target.reset();
            } else {
                toast.error(data.message);
                e.target.reset();
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleVerify = async () => {
        setIsVerifying(true);
        setOpenSending(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/otp/sendotp`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ _id: user._id, email: user.email }),
            });
            const data = await response.json();
            if (data.success) {
                toast.success(data.message);
                setTimer(120); // Start the timer only if the response is successful
                setDisplayTimer(true);
                setIsResendEnabled(false);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
        setOpenSending(false);
    };

    const handleOtpSubmit = async () => {
        try {
            if (otp.length == 0) {
                toast.error("Please Enter OTP");
            }
            else if (otp.length < 4) {
                toast.error("Enter all four Digits");
            }
            else {
                const responce = await fetch(`${import.meta.env.VITE_BASE_URL}/otp/verifyotp`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ _id: user._id, otp: otp })
                })
                const data = await responce.json();

                if (data.success) {
                    toast.success(data.message);
                    dispatch({ type: "VALID", payload: { validvalue: true } });
                    setIsVerifying(false);
                }
                else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleCancelOtp = () => {
        setIsVerifying(false); // Close OTP form and show the previous content
    };

    const handleCancelSave = () => {
        setNewProfileImage(user.profileImage);
        setSelectedFile(null);
        setIsEditing(false);
    }

    return (
        <div className="flex h-screen">
            <ProfileSidebar user={user} valid={valid} activePage={activePage} setActivePage={setActivePage} handleVerify={handleVerify} />
            <main className="flex-1 p-5">
                {isVerifying ? (
                    <OtpModal
                        otp={otp}
                        setOtp={setOtp}
                        handleOtpSubmit={handleOtpSubmit}
                        handleCancelOtp={handleCancelOtp}
                        displayTimer={displayTimer}
                        timer={timer}
                        isResendEnabled={isResendEnabled}
                        handleVerify={handleVerify}
                        openSending={openSending}
                    />
                ) : (
                    <>
                        {activePage === "info" && (
                            <ProfileInfo
                                user={user}
                                isEditing={isEditing}
                                setIsEditing={setIsEditing}
                                handleSave={handleSave}
                                handleCancelSave={handleCancelSave}
                                handleFileChange={handleFileChange}
                                newProfileImage={newProfileImage}
                            />
                        )}
                        {activePage === "reset" && <ResetPassword />}
                    </>
                )}
            </main>
        </div>
    );
};

export default Profile;