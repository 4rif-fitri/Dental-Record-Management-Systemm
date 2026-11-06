import React from "react";
import AuthLayout from "../../layout/AuthLayout";
import { route } from "ziggy-js";
import { Link } from "@inertiajs/react";

const Login = () => {

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

            <form className="grid gap-5">
                <fieldset className="fieldset">
                    <label
                        htmlFor="email"
                        className="fieldset-legend text-sm font-medium text-gray-900"
                    >
                        Email Address
                    </label>

                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="input input-bordered w-full bg-white border-gray-200 focus:outline-none focus:border-gray-400"
                        placeholder="Enter your email address"
                        autoComplete="email"
                    />
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
                        className="input input-bordered w-full bg-white border-gray-200 focus:outline-none focus:border-gray-400"
                        placeholder="Enter your password"
                        autoComplete="current-password"
                    />
                </fieldset>

                <a href=""></a>

                {/* <button type="button" className="btn w-full bg-gray-950 text-white border-gray-950 hover:bg-gray-800 hover:border-gray-800 rounded-lg mt-2">
                    Sign In
                </button> */}
            </form>

            <div className="text-center mt-6">
                <p className="text-sm text-gray-500">
                    New to our platform?
                    <a
                        href={route("register")}
                        className="text-gray-900 font-medium hover:underline text-blue-600"
                    >
                        Create an account
                    </a>
                </p>
            </div>
        </AuthLayout>
    );
};

export default Login;
