import React from 'react'
import { useState } from 'react';
import Swal from "sweetalert2";

const UpdateProfile = ({ setShowPopup }) => {
    const [Name, setName] = useState("");

    function Showinput({ label, data, setData, className, errorText }) {
        return (
            <div className="flex flex-col">
                <label className="label">{label}</label>

                <input
                    className={`input w-full border border-gray-400 ${className ?? ""}`}
                    value={data ?? ""}
                    onChange={(e) => setData(e.target.value)}
                />

                <p className="text-red-600">{errorText}</p>
            </div>
        );
    }

    function handleUpdateProfile() {
        Swal.fire({
            title: "Success!",
            text: "New profile data has been saved successfully",
            icon: "success",
            confirmButtonText: "OK",
        });

        setShowPopup(false);
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 text-base-100">
            <div className="w-11/12 max-w-lg rounded-xl bg-white p-6 shadow-xl">
                <div className="mb-4">
                    <h2 className="text-xl font-bold">Update Profile</h2>
                </div>

                <div className="space-y-3">
                    <Showinput
                        label={"Full Name"}
                        setData={setName}
                        className={" bg-white"}
                        errorText={"The Full Name field is required"}
                    />
                    <Showinput
                        label={"student/staff ID"}
                        setData={setName}
                        className={" bg-white"}
                        errorText={"The student/staff ID field is required"}
                    />
                    <Showinput
                        label={"Phone Number"}
                        setData={setName}
                        className={" bg-white"}
                        errorText={"The Phone Number field is required"}
                    />
                    <Showinput
                        label={"Patient Category"}
                        setData={setName}
                        className={" bg-white"}
                        errorText={"Please Select Patient Category"}
                    />
                    <Showinput
                        label={"Email Address"}
                        setData={setName}
                        className={" bg-white"}
                        errorText={"The Email Address field is required"}
                    />
                    <Showinput
                        label={"Gender"}
                        setData={setName}
                        className={" bg-white"}
                        errorText={"The Gender field is required"}
                    />
                </div>

                <div className="mt-6 w-full flex justify-end gap-2">
                    <div className="w-full">
                        <button
                            className="btn btn-neutral w-full"
                            onClick={handleUpdateProfile}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile
