
import React, { useState } from 'react';
import AuthLayout from '../../layout/AuthLayout';
import api from "@/lib/axios.js";
import Swal from "sweetalert2";

const Register = () => {

    const [formData, setFormData] = useState({
        name: "",
        ic_passport: "",
        email: "",
        password: "",
        password_confirmation: ""
    });

    const [loading, setLoading] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Register account
    const handleRegister = async (e) => {
        e.preventDefault();

        // Check password
        if (formData.password !== formData.password_confirmation) {
            Swal.fire({
                title: "Password Mismatch",
                text: "Password and confirm password do not match.",
                icon: "warning"
            });

            return;
        }

        try {
            setLoading(true);

            const response = await api.post(
                route("userregister"),
                formData
            );

            await Swal.fire({
                title: "Registration Successful!",
                text: "Your account has been created successfully.",
                icon: "success",
                confirmButtonText: "Continue",
                confirmButtonColor: "#16a34a"
            });

            window.location.href = route("login");

        } catch (error) {

            console.error(
                "Registration failed:",
                error.response?.data ?? error
            );

            const errors = error.response?.data?.errors;

            const errorMessage = errors
                ? Object.values(errors).flat().join("\n")
                : error.response?.data?.message ??
                "Unable to create your account.";

            Swal.fire({
                title: "Registration Failed",
                text: errorMessage,
                icon: "error",
                confirmButtonColor: "#dc2626"
            });

        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>

            <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Create an account
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                    Register your patient account to get started.
                </p>
            </div>

            <form onSubmit={handleRegister} className="grid gap-4">

                <fieldset className="fieldset">

                    <label htmlFor="name" className="fieldset-legend text-sm font-medium text-gray-900">
                        Full Name
                    </label>

                    <input type="text" id="name" name="name"
                        value={formData.name} onChange={handleChange}
                        className="input input-bordered w-full bg-white border-gray-200 focus:outline-none focus:border-gray-400"
                        placeholder="Enter your full name"
                        autoComplete="name" required
                    />

                </fieldset>

                <fieldset className="fieldset">

                    <label htmlFor="ic_passport" className="fieldset-legend text-sm font-medium text-gray-900">
                        IC / Passport Number
                    </label>
                    <input type="text" id="ic_passport" name="ic_passport"
                        value={formData.ic_passport} onChange={handleChange}
                        className="input input-bordered w-full bg-white border-gray-200 focus:outline-none focus:border-gray-400"
                        placeholder="Enter your IC / Passport Number"
                        autoComplete="off" required
                    />

                </fieldset>

                <fieldset className="fieldset">

                    <label htmlFor="email" className="fieldset-legend text-sm font-medium text-gray-900">
                        Email Address
                    </label>
                    <input type="email" id="email" name="email"
                        value={formData.email} onChange={handleChange}
                        className="input input-bordered w-full bg-white border-gray-200 focus:outline-none focus:border-gray-400"
                        placeholder="Enter your email address"
                        autoComplete="email" required
                    />
                </fieldset>

                <fieldset className="fieldset">
                    <label htmlFor="password" className="fieldset-legend text-sm font-medium text-gray-900">
                        Password
                    </label>
                    <input type="password" id="password" name="password"
                        value={formData.password} onChange={handleChange}
                        className="input input-bordered w-full bg-white border-gray-200 focus:outline-none focus:border-gray-400"
                        placeholder="Create a password"
                        autoComplete="new-password"
                        minLength={8} required
                    />
                    <p className="text-xs text-gray-400 mt-1">
                        Password must contain at least 8 characters.
                    </p>
                </fieldset>

                <fieldset className="fieldset">
                    <label htmlFor="password_confirmation" className="fieldset-legend text-sm font-medium text-gray-900">
                        Confirm Password
                    </label>
                    <input type="password" id="password_confirmation" name="password_confirmation"
                        value={formData.password_confirmation} onChange={handleChange}
                        className="input input-bordered w-full bg-white border-gray-200 focus:outline-none focus:border-gray-400"
                        placeholder="Confirm your password"
                        autoComplete="new-password"
                        minLength={8} required
                    />
                </fieldset>

                <button
                    type="submit"
                    disabled={loading}
                    className="btn w-full bg-gray-950 text-white border-gray-950 hover:bg-gray-800 hover:border-gray-800 rounded-lg mt-2"
                >
                    {loading ? "Creating Account..." : "Create Account"}
                </button>

            </form>

            {/* Login Link */}
            <div className="text-center mt-6">

                <p className="text-sm text-gray-500">

                    Already have an account?{" "}

                    <a
                        href={route("login")}
                        className="text-gray-900 font-medium hover:underline"
                    >
                        Sign in
                    </a>

                </p>

            </div>

        </AuthLayout>
    );
};

export default Register;
