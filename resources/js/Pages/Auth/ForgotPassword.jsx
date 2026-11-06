import React, { useState } from 'react'
import AuthLayout from "../../layout/AuthLayout";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <AuthLayout>
            {/* Header */}
            <div className="mb-7">
                <h1 className="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
                    Forgot Password?
                </h1>

                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    Enter your email and we'll send you instructions to reset
                    your password.
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="grid gap-5">
                {/* Email */}
                <fieldset className="fieldset">
                    <label
                        htmlFor="email"
                        className="fieldset-legend text-sm font-medium text-gray-950"
                    >
                        Email Address
                        <span className="text-red-500">*</span>
                    </label>

                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setSubmitted(false);
                        }}
                        className="input input-bordered w-full border-gray-200 bg-white focus:border-gray-400 focus:outline-none"
                        placeholder="Enter your email address"
                        autoComplete="email"
                        required
                    />
                </fieldset>

                {/* Success Message */}
                {submitted && (
                    <div
                        role="status"
                        className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700"
                    >
                        If an account exists for this email, password reset
                        instructions can be sent to it.
                    </div>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    className="btn w-full rounded-lg border-gray-950 bg-gray-950 text-white hover:border-gray-800 hover:bg-gray-800"
                >
                    Send Reset Link
                </button>
            </form>

            {/* Back to Login */}
            <div className="mt-7 flex justify-center">
                <a
                    href={route("login")}
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-950 transition hover:text-gray-500"
                >
                    Back to login
                </a>
            </div>
        </AuthLayout>
    );
}

export default ForgotPassword
