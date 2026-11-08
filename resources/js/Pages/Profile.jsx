import React, {useEffect} from 'react'
import MainLayout from '../layout/mainLayout'
import { useState } from 'react';
import UpdateProfile from '../components/modal/UpdateProfile';
import { route } from 'ziggy-js';
import api from '@/lib/axios';

function InfoRow({label, value}){
    return (
        <div className="flex items-start gap-3 py-2">
            <p className="min-w-0 text-sm leading-6">
                <span className="mr-2 text-gray-500">{label}:</span>
                <span className="break-words font-medium text-gray-800">
                    {value}
                </span>
            </p>
        </div>
    );
}

const Profile = () => {
    const [userProfile,setUserProfile] = useState(null)

    const getProfileData = async () => {
        try {
            const response = await api.get(route('getProfileData'));

            setUserProfile(response.data);

            console.log('Profile:', response.data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProfileData()
    },[])

    const [showPopup, setShowPopup] = useState(false);

    return (
        <MainLayout>
            {console.log(userProfile)}
            {showPopup && <UpdateProfile setShowPopup={setShowPopup} />}
            <div className="min-h-screen  text-gray-900">
                <div className="min-h-screen w-full">
                    <main className="mx-auto w-full px-4 py-6">
                        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                            <div
                                className="relative h-36 overflow-hidden bg-gray-50 sm:h-44"
                                style={{
                                    backgroundImage:
                                        "linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)",
                                    backgroundSize: "36px 36px",
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-gray-200/30" />
                                <div className="absolute -right-10 -top-24 h-64 w-64 rounded-full border border-gray-200/80" />
                                <div className="absolute -right-2 -top-16 h-48 w-48 rounded-full border border-gray-200/80" />
                            </div>

                            <div className="relative flex flex-col gap-5 px-5 pb-6 sm:px-7 md:flex-row md:items-end md:justify-between">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                                    <div
                                        className="relative mt-10 h-24 w-24 rounded-xl border-4 border-white bg-cover bg-center shadow-sm sm:-mt-12 sm:h-28 sm:w-28"
                                        // style={{
                                        //     backgroundImage: `url("${user.image}")`,
                                        // }}
                                    >
                                        <button
                                            type="button"
                                            className="absolute bottom-0 right-0 flex min-h-8 min-w-8 items-center justify-center rounded-lg border border-gray-950 bg-gray-950 p-1 text-white hover:border-gray-800 hover:bg-gray-800"
                                            onClick={() =>
                                                alert(
                                                    "Connect this button to your profile edit page.",
                                                )
                                            }
                                        >
                                            <i className="fa-solid fa-pencil"></i>
                                        </button>
                                    </div>
                                    <div className="pb-1">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <h2 className="text-2xl font-semibold tracking-tight text-black">
                                                {userProfile ? userProfile.name : 'Loading...'}
                                            </h2>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className="btn min-h-10 rounded-lg border-gray-950 bg-gray-950 px-4 text-white hover:border-gray-800 hover:bg-gray-800"
                                    onClick={() => setShowPopup(true)}
                                >
                                    <i className="fa-solid fa-pencil"></i>
                                    Edit Profile
                                </button>
                            </div>
                        </section>

                        <div className="mt-4 grid grid-cols-1 items-start gap-5 w-full">
                            <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
                                <div className="mb-5">
                                    <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                                        About
                                    </p>
                                    <h3 className="mt-1 text-lg font-semibold">
                                        Personal Information
                                    </h3>
                                </div>

                                <div className="space-y-1 w-full grid sm:grid-cols-2 grid-cols-1">
                                    <div>
                                        <InfoRow
                                            label="Full Name"
                                            value={userProfile?.name}
                                        />
                                        <InfoRow
                                            label="Ic/Passport"
                                            value={userProfile?.ic_passport}
                                        />
                                        <InfoRow
                                            label="Gender"
                                            value={userProfile?.gender}
                                        />
                                        <InfoRow
                                            label="Phone Number"
                                            value={userProfile?.phone_number}
                                        />
                                        <InfoRow
                                            label="Role"
                                            value={userProfile?.role}
                                        />
                                    </div>
                                    <div>
                                        {/*<InfoRow*/}
                                        {/*    label="Student/Staff ID"*/}
                                        {/*    value={userProfile.Student_Staff_iD}*/}
                                        {/*/>*/}
                                        {/*<InfoRow*/}
                                        {/*    label="Email Address"*/}
                                        {/*    value={userProfile.email}*/}
                                        {/*/>*/}
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* <footer className="flex flex-col items-center justify-between gap-2 py-7 text-xs text-gray-400 sm:flex-row">
                <p>© 2026 DentalCare. Dental Treatment Management System.</p>

                <div className="flex items-center gap-4">
                    <a href="/privacy" className="hover:text-gray-700">
                    Privacy
                    </a>

                    <a href="/help" className="hover:text-gray-700">
                    Help & Support
                    </a>
                </div>
                </footer> */}
                    </main>
                </div>
            </div>
        </MainLayout>
    );
}

export default Profile
