import React from 'react'
import { Link } from "@inertiajs/react";

const QueueTable = ({role}) => {
  return (
      <div className="space-y-3">
          <div className="overflow-x-auto text-base-200">
              <table className="table">
                  <thead className="text-black text-center">
                      <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>IC/Passport Number</th>
                          <th>Create At</th>
                          <th>Status</th>
                          {role !== "Clinic Staff" && <th>Action</th>}
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <th>1</th>
                          <td>Lorem ipsum dolor sit amet</td>
                          <td>106232477896</td>
                          <td>15:00 PM</td>
                          <td>
                              <div className=" badge badge-warning w-full">
                                  Waiting
                              </div>
                          </td>
                          <td className="flex gap-2">
                              {role !== "Clinic Staff" && (
                                  <button className="btn btn-primary font-semibold h-7">
                                      Call
                                  </button>
                              )}
                              {role !== "Clinic Staff" && (
                                  <Link
                                      href="/dentist-examination/1"
                                      className="btn btn-primary font-semibold h-7"
                                  >
                                      View
                                  </Link>
                              )}
                          </td>
                      </tr>
                      <tr>
                          <th>1</th>
                          <td>Lorem ipsum dolor sit amet</td>
                          <td>106232477896</td>
                          <td>15:00 PM</td>
                          <td>
                              <div className=" badge badge-success w-full">
                                  Called
                              </div>
                          </td>
                          <td className="flex gap-2">
                              {role !== "Clinic Staff" && (
                                  <button className="btn btn-primary font-semibold h-7">
                                      Call
                                  </button>
                              )}
                              {role !== "Clinic Staff" && (
                                  <Link
                                      to="/patient-examination"
                                      className="btn btn-primary font-semibold h-7"
                                  >
                                      View
                                  </Link>
                              )}
                          </td>
                      </tr>
                  </tbody>
              </table>
          </div>
      </div>
  );
}

export default QueueTable
