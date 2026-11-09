import React from 'react'

const PatientDetails = ({patientDetails}) => {

    return (
        <div className="mb-2 p-4 flex flex-col flex-wrap gap-2">
            <h1 className="font-semibold tracking-tight text-gray-900 sm:text-3xl">
                Patient Details
            </h1>

            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-white text-black">
                <table className="table">
                    <tbody>
                        <tr><td>Name</td><td className="font-semibold">{patientDetails.name}</td></tr>
                        <tr><td>Phone Number</td><td className="font-semibold">{patientDetails.phone_number}</td></tr>
                        <tr><td>Email</td><td className="font-semibold">{patientDetails.email}</td></tr>
                        <tr><td>Gender</td><td className="font-semibold">{patientDetails.gender}</td></tr>
                        <tr><td>Ic Passport</td><td className="font-semibold">{patientDetails.ic_passport}</td></tr>
                        <tr><td>student staff id</td><td className="font-semibold">{patientDetails.student_staff_id}</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PatientDetails
