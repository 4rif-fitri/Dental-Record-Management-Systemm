import React from 'react'
import { Link } from "@inertiajs/react";

const PatientTable = ({role = "Dentist"}) => {
  return (
      <>
          <div className="overflow-x-auto text-base-200">
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
                          {role != "Dentist" ? <th>Action</th> : ""}
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <th>1</th>
                          <td>Lorem ipsum dolor sit amet</td>
                          <td className="hidden md:table-cell">106232477896</td>
                          <td className="hidden md:table-cell">Student</td>
                          <td>0197865423</td>
                          {role == "Dentist" ? (
                              <td>
                                  <Link
                                      href="/dentist-examination/1"
                                      className="btn btn-primary font-semibold btn-wide h-7"
                                  >
                                      View
                                  </Link>
                              </td>
                          ) : (
                              ""
                          )}
                      </tr>
                  </tbody>
              </table>
          </div>
      </>
  );
}

export default PatientTable
