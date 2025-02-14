import React from "react";
import CircleLoading from "../loading/CircleLoading";

const OtpModal = ({ otp, setOtp, handleOtpSubmit, handleCancelOtp, displayTimer, timer, isResendEnabled, handleVerify, openSending }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-2/3 md:w-1/3 max-w-lg">
                <h2 className="text-2xl font-bold mb-4">Enter OTP</h2>
                <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="block w-full p-2 border rounded mb-2"
                    placeholder="Enter OTP"
                />
                {!openSending ? (
                    <button onClick={handleOtpSubmit} className="px-4 py-2 bg-blue-500 text-white rounded mr-2">Verify OTP</button>
                ) : (
                    <button className="px-4 py-2 bg-blue-500 text-white rounded mr-2"><div className="flex items-center"><CircleLoading />Sending OTP</div></button>
                )}
                <button onClick={handleCancelOtp} className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
                <div className="mt-2">
                    {displayTimer && (
                        <p className="text-sm">
                            You can request OTP again in: {Math.floor(timer / 60)}:
                            {timer % 60 < 10 ? `0${timer % 60}` : timer % 60} minutes
                        </p>
                    )}
                    {isResendEnabled ? (
                        <button onClick={handleVerify} className="mt-1 px-4 py-2 bg-green-500 text-white rounded">
                            Resend OTP
                        </button>
                    ) : (
                        <button disabled className="mt-1 px-4 py-2 bg-gray-500 text-white rounded">
                            Resend OTP
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OtpModal;