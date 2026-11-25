import React, { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import AuthLayout from "@/layout/AuthLayout.jsx";

import api from "@/lib/axios.js";

const VerifyPin = () => {
    const { email } = usePage().props;

    const [pin, setPin] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            await api.post("/api/auth/verify-pin", {
                email,
                pin,
            });

            router.visit(route("password.new.page"), {
                data: {
                    email,
                    pin,
                },
            });

        } catch (err) {
            setError(err.response?.data?.message || "Invalid PIN. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <div className="w-full max-w-md mx-auto">
                <div className=" mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Verify Your PIN
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Enter the 6-digit PIN sent to:
                    </p>
                    <p className="font-semibold text-gray-800 mt-1">
                        {email}
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
                            Verification PIN
                        </label>

                        <input type="text" inputMode="numeric" required
                            maxLength={6} className="form-control w-full  tracking-[0.5em] text-xl p-2"
                            placeholder="000000" value={pin}
                            onChange={(e) =>
                                setPin(e.target.value.replace(/\D/g, "").slice(0, 6))
                            }
                        />
                    </div>

                    <button type="submit" disabled={loading || pin.length !== 6}
                        className="btn btn-primary w-full">
                        {loading ? "Verifying..." : "Verify PIN"}
                    </button>
                </form>

                <div className=" mt-6">
                    <a href={route("password.forgot.page")} className="btn bg-neutral w-full text-white rounded-xl">
                        Back
                    </a>
                </div>
            </div>
        </AuthLayout>
    );
};

export default VerifyPin;
