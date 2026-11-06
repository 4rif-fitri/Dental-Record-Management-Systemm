import React, { useState } from "react";
import MainLayout from '../../layout/mainLayout'
import AppointmentDetails from "../../components/modal/AppointmentDetails";

const ListAppointment = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
      <MainLayout>
          {showPopup && <AppointmentDetails setShowPopup={setShowPopup} />}

          <div className="mx-auto overflow-hidden rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-8 lg:p-10">
              <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  Appoinment List
              </h2>

              <div className="overflow-x-auto text-base-200">
                  <table className="table">
                      <thead className="text-black">
                          <tr>
                              <th>ID</th>
                              <th>Date</th>
                              <th>Time</th>
                              <th className="hidden md:table-cell">Purpose</th>
                              <th>Status</th>
                              <th>Action</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <th>1</th>
                              <td>17 Nov 2026</td>
                              <td>8:00 AM</td>
                              <td className="hidden md:table-cell">
                                  Dental Check-up
                              </td>
                              <td>
                                  <span className="badge badge-success font-semibold w-full">
                                      Approved
                                  </span>
                              </td>
                              <td>
                                  <button
                                      onClick={() => setShowPopup(true)}
                                      className="btn btn-primary font-semibold btn-wide roun"
                                  >
                                      View
                                  </button>
                              </td>
                          </tr>
                          <tr>
                              <th>2</th>
                              <td>17 Nov 2026</td>
                              <td>8:00 AM</td>
                              <td className="hidden md:table-cell">
                                  Dental Check-up
                              </td>
                              <td>
                                  <span className="badge badge-warning font-semibold w-full">
                                      Pending
                                  </span>
                              </td>
                              <td>
                                  <button
                                      onClick={() => setShowPopup(true)}
                                      className="btn btn-primary font-semibold btn-wide roun"
                                  >
                                      View
                                  </button>
                              </td>
                          </tr>
                          <tr>
                              <th>3</th>
                              <td>17 Nov 2026</td>
                              <td>8:00 AM</td>
                              <td className="hidden md:table-cell">
                                  Dental Check-up
                              </td>
                              <td>
                                  <span className="badge badge-error font-semibold w-full">
                                      Rejected
                                  </span>
                              </td>
                              <td>
                                  <button
                                      onClick={() => setShowPopup(true)}
                                      className="btn btn-primary font-semibold btn-wide roun"
                                  >
                                      View
                                  </button>
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>
      </MainLayout>
  );
}

export default ListAppointment
