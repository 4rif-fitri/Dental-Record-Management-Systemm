import React from "react";
import AuthLayout from "../../layout/AuthLayout";
import { route } from "ziggy-js";
import { useForm } from "@inertiajs/react";

const Login = () => {
    const { data, setData, post, processing, errors } = useForm({
        username: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("userLogin"));
    };

    return (
        <AuthLayout>
            <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Sign In
                </h2>

                <p className="text-sm text-gray-500 mt-2">
                    Welcome back! Please sign in to your account.
                </p>
            </div>

            <form className="grid gap-5" onSubmit={handleSubmit}>
                <fieldset className="fieldset">
                    <label
                        htmlFor="username"
                        className="fieldset-legend text-sm font-medium text-gray-900"
                    >
                        Email Address / IC / Passport Number
                    </label>

                    <input
                        type="text"
                        id="username"
                        name="username"
                        autoComplete="username"
                        value={data.username}
                        onChange={(e) => setData("username", e.target.value)}
                        className="input input-bordered w-full bg-white border-gray-200 focus:outline-none focus:border-gray-400"
                        placeholder="Enter your email / IC / Passport"
                    />

                    {errors.username && (
                        <span className="text-error text-sm">
                            {errors.username}
                        </span>
                    )}
                </fieldset>

                <fieldset className="fieldset">
                    <div className="flex items-center justify-between gap-2">
                        <label
                            htmlFor="password"
                            className="fieldset-legend text-sm font-medium text-gray-900"
                        >
                            Password
                        </label>

                        <a
                            href={route("forgotPassword")}
                            className="text-sm text-gray-700 hover:underline"
                        >
                            Forgot password?
                        </a>
                    </div>

                    <input
                        type="password"
                        id="password"
                        name="password"
                        autoComplete="current-password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        className="input input-bordered w-full bg-white border-gray-200 focus:outline-none focus:border-gray-400"
                        placeholder="Enter your password"
                    />

                    {errors.password && (
                        <span className="text-error text-sm">
                            {errors.password}
                        </span>
                    )}
                </fieldset>

                <button
                    type="submit"
                    disabled={processing}
                    className="btn w-full bg-gray-950 text-white border-gray-950 hover:bg-gray-800 hover:border-gray-800 rounded-lg mt-2"
                >
                    {processing ? "Signing In..." : "Sign In"}
                </button>
            </form>
        </AuthLayout>
    );
};

export default Login;
