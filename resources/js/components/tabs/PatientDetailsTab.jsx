import React from 'react'

const PatientDetails = () => {
    let datas = [
        { label: "Name", value: "Lorem" },
        { label: "Ic/Passport", value: "1032654789" },
        { label: "Phone No", value: "1032654789" },
        { label: "Gender", value: "Male" },
        { label: "Email", value: "email@gmail.com" },
        { label: "Student/Staff id", value: "D032410335" },
    ];
    function PatientInfoLabel({ label, value }) {
        return (
            <tr>
                <td>{label}</td>
                <td>{value}</td>
            </tr>
        );
    }

    return (
        <div className="mb-2 p-4 flex flex-col flex-wrap gap-2">
            <h1 className="font-semibold tracking-tight text-gray-900 sm:text-3xl">
                Patient Details
            </h1>

            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-white text-black">
                <table className="table">
                    <tbody>
                        {datas.map((data, idx) => (
                            <PatientInfoLabel
                                key={idx}
                                label={data.label}
                                value={data.value}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PatientDetails
