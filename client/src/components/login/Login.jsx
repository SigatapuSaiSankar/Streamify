import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import LoadingBtn from '../loading/Loading';
import { userContext } from '../context/Context';

export default function Login() {
    const [loggingIn, setLoggingIn] = useState(false);

    const {dispatch} = useContext(userContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = e.target;

        const loginData = {
            email: email.value,
            password: password.value,
        };

        try {
            setLoggingIn(true);
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();
            // console.log(data)

            if (data.success == true) {
                toast.success("Login successful");
                e.target.reset();
                dispatch({type:"LOGIN_SUCCESSFUL",payload:data})
                navigate('/');
            } else {
                toast.error(data.message || "Invalid credentials. Please try again.");
            }
        } catch (error) {
            console.log("Error during login:", error);
            toast.error("An error occurred during login.");
        } finally {
            setLoggingIn(false);
        }
    };

    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <form
                    className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md"
                    onSubmit={handleSubmit}
                >
                    <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                    {/* Email */}
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="mt-1 p-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="mt-1 p-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {!loggingIn ? (
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            Login
                        </button>
                    ) : (
                        <LoadingBtn />
                    )}
                </form>
            </div>
        </div>
    );
}
