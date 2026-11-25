import InfoRow from "@/components/atom/InfoRow.jsx";
import React from "react";
import PageTitle from "@/components/atom/PageTitle.jsx";

const DataSection = ({userProfile, setShowPopup}) => {
    return (
        <div className="mt-4 grid grid-cols-1 items-start gap-5 w-full">
            <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
                <div className="mb-5 flex justify-between">
                    <PageTitle title={"My Profile"} />

                    <button type="button"
                            className="btn btn-primary"
                            onClick={() => setShowPopup(true)}>
                        Edit Profile
                    </button>
                </div>
                <div className="space-y-1 w-full grid sm:grid-cols-2 grid-cols-1">
                    <div>
                        <InfoRow label="Full Name" value={userProfile?.name}/>
                        <InfoRow label="Ic/Passport" value={userProfile?.ic_passport}/>
                        <InfoRow label="Gender" value={userProfile?.gender}/>
                        <InfoRow label="Phone Number" value={userProfile?.phone_number}/>
                        <InfoRow label="Role" value={userProfile?.role}/>
                    </div>
                    <div>
                        <InfoRow label="Student/Staff ID" value={userProfile?.student_staff_id}/>
                        <InfoRow label="Email Address" value={userProfile?.email}/>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default DataSection
