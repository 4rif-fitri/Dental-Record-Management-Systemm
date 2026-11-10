import InfoRow from "@/components/atom/InfoRow.jsx";
import React from "react";

const DataSection = ({userProfile}) => {
    return (
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
