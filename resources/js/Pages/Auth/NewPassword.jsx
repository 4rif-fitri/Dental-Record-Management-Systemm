
import React, { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import AuthLayout from "@/layout/AuthLayout.jsx";

import api from "@/lib/axios.js";

const NewPassword = () => {
    const { email, pin } = usePage().props;

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");
        setSuccess("");

        if (password !== confirmPassword) {
            setError("Password confirmation does not match.");
            setLoading(false);
            return;
        }

        try {
            const response = await api.post(
                "/api/auth/reset-password",
                {
                    email,
                    pin,
                    password,
                    password_confirmation: confirmPassword,
                }
            );

            setSuccess(
                response.message || "Password reset successfully."
            );

            setPassword("");
            setConfirmPassword("");

        } catch (err) {
            setError(
                err.response?.data?.message ||
                err.response?.data?.errors?.password?.[0] ||
                "Unable to reset password."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <div className="w-full max-w-md mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Create New Password
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Enter your new password below.
                    </p>
                </div>

                {error && (
                    <div className="alert alert-danger mb-4">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="alert alert-success mb-4">
                        {success}
                    </div>
                )}

                {!success && (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block mb-2 font-medium">
                                New Password
                            </label>

                            <input
                                type="password"
                                className="form-control w-full"
                                placeholder="Enter new password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                minLength={8}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2 font-medium">
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                className="form-control w-full"
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                minLength={8}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-full"
                        >
                            {loading ? "Resetting..." : "Reset Password"}
                        </button>
                    </form>
                )}

                {success && (
                    <button
                        type="button"
                        onClick={() => router.visit(route("login"))}
                        className="btn btn-primary w-full"
                    >
                        Back to Login
                    </button>
                )}
            </div>
        </AuthLayout>
    );
};

export default NewPassword;
