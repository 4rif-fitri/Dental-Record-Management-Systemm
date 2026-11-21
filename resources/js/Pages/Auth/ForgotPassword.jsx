import React, { useState } from "react";
import { router } from "@inertiajs/react";
import AuthLayout from "@/layout/AuthLayout.jsx";
import api from "@/lib/axios.js";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            await api.post("/api/auth/forgot-password", {email,});

            router.visit(route("password.verify.page"), {data: { email },});

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to send PIN. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <div className="w-full max-w-md mx-auto">
                <div className=" mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Forgot Password?
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Enter your registered email address.
                        We will send you a 6-digit PIN.
                    </p>
                </div>

                {error && (
                    <div className="alert alert-danger mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">
                            Email Address
                        </label>

                        <input type="email" className="form-control w-full"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" disabled={loading} className="btn bg-black text-white w-full">
                        {loading ? "Sending PIN..." : "Send PIN"}
                    </button>
                </form>

                <div className="text-center mt-6">
                    <a href={route("login")} className="">
                        Back to Login
                    </a>
                </div>
            </div>
        </AuthLayout>
    );
};

export default ForgotPassword;
