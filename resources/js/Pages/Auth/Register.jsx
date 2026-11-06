import React from 'react'
import AuthLayout from '../../layout/AuthLayout'

const Register = () => {
  return (
      <AuthLayout>
          <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Create an account
              </h2>

              <p className="text-sm text-gray-500 mt-2">
                  Create your account to get started.
              </p>
          </div>

          <form className="grid gap-4">
              <fieldset className="fieldset">
                  <label htmlFor="name" className="fieldset-legend text-sm font-medium text-gray-900">
                      Full Name
                  </label>

                  <input
                      type="text"
                      id="name"
                      name="name"
                      className="input input-bordered w-full bg-white border-gray-200 focus:outline-none focus:border-gray-400"
                      placeholder="Enter your full name"
                      autoComplete="name"
                      required
                  />
              </fieldset>

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
                      required
                  />
              </fieldset>

              <fieldset className="fieldset">
                  <label
                      htmlFor="password"
                      className="fieldset-legend text-sm font-medium text-gray-900"
                  >
                      Password
                  </label>

                  <input
                      type="password"
                      id="password"
                      name="password"
                      className="input input-bordered w-full bg-white border-gray-200 focus:outline-none focus:border-gray-400"
                      placeholder="Create a password"
                      autoComplete="new-password"
                      minLength={8}
                      required
                  />

                  <p className="text-xs text-gray-400 mt-1">
                      Password must contain at least 8 characters.
                  </p>
              </fieldset>

              <fieldset className="fieldset">
                  <label
                      htmlFor="password_confirmation"
                      className="fieldset-legend text-sm font-medium text-gray-900"
                  >
                      Confirm Password
                  </label>

                  <input
                      type="password"
                      id="password_confirmation"
                      name="password_confirmation"
                      className="input input-bordered w-full bg-white border-gray-200 focus:outline-none focus:border-gray-400"
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                      minLength={8}
                      required
                  />
              </fieldset>

              <button
                  type="submit"
                  className="btn w-full bg-gray-950 text-white border-gray-950 hover:bg-gray-800 hover:border-gray-800 rounded-lg mt-2"
              >
                  Create Account
              </button>
          </form>

          <div className="text-center mt-6">
              <p className="text-sm text-gray-500">
                  Already have an account?{" "}
                  <a href={route("login")} className="text-gray-900 font-medium hover:underline">
                      Sign in
                  </a>
              </p>
          </div>
      </AuthLayout>
  );
}

export default Register
