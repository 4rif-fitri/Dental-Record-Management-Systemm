
import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import api from '@/lib/axios';
import Showinput from "@/components/atom/Showinput.jsx";
import SelectInput from "@/components/atom/SelectInput.jsx";
import PageTitle from "@/components/layout/PageTitle.jsx";

const UpdateProfile = ({ setShowPopup, userProfile, onUpdated}) => {
    const profile = userProfile?.userProfile;
    const [loading, setLoading] = useState(false);

    const genderOption = [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" }
    ]

    const roles = [
        { value: "student", label: "Student" },
        { value: "staff", label: "staff" },
        { value: "staff_family", label: "Staff family" },
    ]

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        gender: "",
        ic_passport: "",
        student_staff_id: "",
        phone_number: "",
        role: "",
    });

    useEffect(() => {
        console.log(profile)
        if (profile) {
            setFormData({
                name: profile.name ?? "",
                email: profile.email ?? "",
                gender: profile.gender ?? "",
                ic_passport: profile.ic_passport ?? "",
                student_staff_id: profile.student_staff_id ?? "",
                phone_number: profile.phone_number ?? "",
                role: profile.role ?? ""
            });
        }
    }, [profile]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const handleSubmit = async () => {
        try {
            setLoading(true);

            const response = await api.put(
                route('updateProfile'),
                formData
            );

            await onUpdated();

            setShowPopup(false);

            Swal.fire({
                icon: "success",
                title: "Profile Updated Successfully!",
                text: "Your profile changes have been saved successfully.",
            });

        } catch (error) {
            console.error(error);

            if (error.response?.status === 422) {
                const errors = error.response.data.errors;

                Swal.fire({
                    icon: "warning",
                    title: "Validation Error",
                    text: Object.values(errors).flat().join("\n"),
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error.response?.data?.message ?? "Failed to update profile.",
                });
            }

        } finally {
            setLoading(false);
        }
    };


    const handleCancelUpdateProfile = () => {
        setShowPopup(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            <div className="w-11/12 max-w-lg rounded-xl bg-white p-6 shadow-xl">

                <div className="mb-4">
                    <PageTitle title={"Update Profile"} />
                </div>

                <div className="space-y-3 text-black">

                    <Showinput label="Full Name" name="name" value={formData.name} onChange={handleChange} errorText="Please enter your full name"/>
                    <Showinput label="student / staff id" name="student_staff_id" value={formData.student_staff_id} onChange={handleChange} errorText="Please enter your student staff_ d"/>
                    <Showinput label="ic / passport Number" name="ic_passport" value={formData.ic_passport} onChange={handleChange} errorText="Please enter your ic / passport number"/>
                    <Showinput label="Phone Number" name="phone_number" value={formData.phone_number} onChange={handleChange} errorText="Please enter your phone_number"/>
                    {profile.role != 'dentist' &&
                        <SelectInput label="Patient Category" name="role" value={formData.role} onChange={handleChange} options={roles}  errorText="Please select patient category"/>
                    }
                    <Showinput label="Email" name="email" value={formData.email} onChange={handleChange} errorText="Please enter your email"/>
                    <SelectInput label="Gender" name="gender" value={formData.gender} onChange={handleChange} options={genderOption}  errorText="Please select gender"/>

                </div>

                <div className="mt-6 flex justify-end gap-2">
                    <button type="button" className="btn btn-error" onClick={handleCancelUpdateProfile}>
                        Cancel
                    </button>
                    <button type="button" className="btn btn-neutral" onClick={handleSubmit} disabled={loading}>
                        {loading ? "Saving..." : "Save"}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default UpdateProfile;
