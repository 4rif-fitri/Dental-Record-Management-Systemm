import React from 'react'
import { Link } from "@inertiajs/react";

const PatientList = ({ datas = [], role }) => {
    return (
        datas.map((patient, index) => (
            <tr key={patient.id}>
                <th>{index + 1}</th>
                <td>{patient.name}</td>
                <td className="hidden md:table-cell">
                    {patient.ic_passport}
                </td>
                <td className="hidden md:table-cell">
                    {patient.role}
                </td>
                <td>{patient.phone_number}</td>

                {role === "Dentist" && (
                    <td>
                        <Link href={`/examination/${patient.id}`}
                            className="btn btn-primary font-semibold btn-wide h-7">
                            View
                        </Link>
                    </td>
                )}
            </tr>
        ))
    );
};

const NoPatientList = ({role}) => {
    return(<tr>
                <td colSpan={role === "Dentist" ? 6 : 5} className="text-center py-5">
                    No patient found.
                </td>
            </tr>)
}
const PatientTable = ({role = "Dentist", datas = []}) => {

  return (
      <div className="overflow-x-auto text-black">
          <table className="table">
              <thead className="text-black">
                  <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th className="hidden md:table-cell">
                          IC/Passport Number
                      </th>
                      <th className="hidden md:table-cell">Catagory</th>
                      <th>Phone Number</th>
                      {role === "Dentist" ? <th>Action</th> : ""}
                  </tr>
              </thead>
              <tbody>
                {datas.length === 0 ?
                    <NoPatientList role={role} /> :
                    <PatientList datas={datas} role={role}/>
                }
              </tbody>
          </table>
      </div>
  );
}

export default PatientTable
