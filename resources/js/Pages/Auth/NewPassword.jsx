import React, { useState } from 'react'
import AuthLayout from "../../layout/AuthLayout";

const NewPassword = () => {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        setError("");
        setSubmitted(false);

        if (password.length < 8) {
            setError("Password must contain at least 8 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setSubmitted(true);
    };

    return (
        <AuthLayout>
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
                    Change Password
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    Create a new password for your account.
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="grid gap-5">
                {/* New Password */}
                <fieldset className="fieldset">
                    <label
                        htmlFor="password"
                        className="fieldset-legend text-sm font-medium text-gray-950"
                    >
                        New Password
                    </label>

                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setSubmitted(false);
                            setError("");
                        }}
                        className="input input-bordered w-full border-gray-200 bg-white focus:border-gray-400 focus:outline-none"
                        placeholder="Enter new password"
                        autoComplete="new-password"
                        minLength={8}
                        required
                    />

                    <p className="text-xs text-gray-400 mt-1">
                        Password must contain at least 8 characters.
                    </p>
                </fieldset>

                {/* Confirm Password */}
                <fieldset className="fieldset">
                    <label
                        htmlFor="confirmPassword"
                        className="fieldset-legend text-sm font-medium text-gray-950"
                    >
                        Confirm Password
                    </label>

                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            setSubmitted(false);
                            setError("");
                        }}
                        className="input input-bordered w-full border-gray-200 bg-white focus:border-gray-400 focus:outline-none"
                        placeholder="Confirm new password"
                        autoComplete="new-password"
                        minLength={8}
                        required
                    />
                </fieldset>

                {/* Error Message */}
                {error && (
                    <div
                        role="alert"
                        className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600"
                    >
                        {error}
                    </div>
                )}

                {/* Success Message */}
                {submitted && (
                    <div
                        role="status"
                        className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700"
                    >
                        Password changed successfully!
                    </div>
                )}

                <button
                    type="submit"
                    className="btn w-full rounded-lg border-gray-950 bg-gray-950 text-white hover:border-gray-800 hover:bg-gray-800"
                >
                    Change Password
                </button>
            </form>

            <div className="mt-7 flex justify-center">
                <a
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-950 transition hover:text-gray-500"
                    href={"route(login)"}
                ></a>
            </div>
        </AuthLayout>
    );
}

export default NewPassword

