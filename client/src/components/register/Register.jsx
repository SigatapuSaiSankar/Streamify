import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import LoadingBtn from '../loading/Loading';

export default function Register() {
    const [registering, setRegistering] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, reenterPassword } = e.target;
        
        if (password.value !== reenterPassword.value) {
            toast.error("Passwords do not match.");
            return;
        }

        const userData = {
            name: name.value,
            email: email.value,
            password: password.value,
        };

        try {
            setRegistering(true);
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            const data = await response.json();

            if (data.success==true) {
                toast.success("Registration successful");
                navigate('/login');
                e.target.reset();
            } else {
                toast.error(data.message || "Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            toast.error("An error occurred during registration.");
        } finally {
            setRegistering(false);
        }
    }

    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <form
                    className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md"
                    onSubmit={handleSubmit}
                >
                    <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

                    {/* Name */}
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="mt-1 p-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your name"
                            required
                        />
                    </div>

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

                    {/* Re-enter Password */}
                    <div className="mb-4">
                        <label
                            htmlFor="reenterPassword"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Re-enter Password
                        </label>
                        <input
                            type="password"
                            id="reenterPassword"
                            name="reenterPassword"
                            className="mt-1 p-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Re-enter your password"
                            required
                        />
                    </div>

                    {!registering?(
                        <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Register
                    </button>
                    ):(
                        <LoadingBtn/>
                    )}

                </form>
            </div>
        </div>
    )
}
