import React, { useState } from "react";
import MainLayout from '../../layout/mainLayout'
import Swal from "sweetalert2";

const ListAppointment = () => {
    let [currentStatus, setCurrentStatus] = useState("None");

    const [selectedAppointment, setSelectedAppointment] = useState({
        status: "Booked",
        patientName: "Patient Name",
        ic: "1025364",
        phone: "01978456312",
        staffId: "D0325641",
        category: "Student",
        gender: "Male",
        email: "lorem@gamil.com",
        approval: "None",
    });

    function AppointmenStatusBooked() {
        return (
            <>
                <div className="grid grid-cols-[90px_minmax(0,1fr)] items-center gap-2 text-sm">
                    <span>Status</span>

                    <div className="bg-blue-100 px-2 py-2 text-center text-xs text-blue-700">
                        {selectedAppointment.status}
                    </div>
                </div>

                {[
                    ["Patient Name", selectedAppointment.patientName],
                    ["Ic/Passport", selectedAppointment.ic],
                    ["Phone Number", selectedAppointment.phone],
                    ["Student/Staff ID", selectedAppointment.staffId],
                    ["Patient Category", selectedAppointment.category],
                    ["Gender", selectedAppointment.gender],
                    ["Email Address", selectedAppointment.email],
                    ["Is Approved", selectedAppointment.approval],
                ].map(([label, value]) => (
                    <div
                        key={label}
                        className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-2 text-xs"
                    >
                        <span>{label}</span>
                        <span className="break-words">{value}</span>
                    </div>
                ))}

                <div className="flex flex-wrap justify-end gap-3 pt-12">
                    <button
                        type="button"
                        onClick={() => handleStatusChange("Reject")}
                        className="min-w-[100px] flex-1 rounded-md bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
                    >
                        Reject
                    </button>

                    <button
                        type="button"
                        onClick={() => handleStatusChange("Accept")}
                        className="min-w-[100px] flex-1 rounded-md bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
                    >
                        Accept
                    </button>
                </div>
            </>
        );
    }

    function AppointmenStatusNone() {
        return (
            <>
                <div className="grid grid-cols-[90px_minmax(0,1fr)] items-center gap-2 text-sm">
                    <span>Status</span>
                    <div className="px-2 py-2 text-center text-xs bg-gray-200 text-gray-700 font-semibold">
                        None
                    </div>

                    <span>Day</span>
                    <div className="px-2 py-2 text-xs text-gray-700 font-semibold">
                        8:00 AM
                    </div>

                    <span>Time</span>
                    <div className="px-2 py-2 text-xs text-gray-700 font-semibold">
                        Monday
                    </div>

                    <span>Date</span>
                    <div className="px-2 py-2 text-xs text-gray-700 font-semibold">
                        10/12/2026
                    </div>

                    <span>Change Status</span>
                    <select
                        defaultValue="Pick a color"
                        className="select bg-white"
                    >
                        <option>None</option>
                        <option>Available</option>
                        <option>Unavailable</option>
                    </select>
                </div>

                <div className="flex">
                    <button
                        type="button"
                        onClick={() => handleStatusChange("Save")}
                        className="min-w-[100px] flex-1 rounded-md bg-primary px-4 py-2 text-sm text-white"
                    >
                        Save
                    </button>
                </div>
            </>
        );
    }

    function handleClickDetail(e) {
        let status = e.target.textContent;

        setCurrentStatus(status);

        document.querySelectorAll(".btn-appointment").forEach((element) => {
            element.classList.remove("highlight");
        });

        e.target.classList.add("highlight");
    }

    const handleStatusChange = async (status) => {
        const result = await Swal.fire({
            title: `Are you sure?`,
            text: `Do you want to ${status.toLowerCase()} this appointment?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
            confirmButtonColor: status === "Accept" ? "#16a34a" : "#ef4444",
        });

        if (result.isConfirmed) {
            setSelectedAppointment((prev) => ({
                ...prev,
                approval: status,
            }));

            await Swal.fire({
                title: "Success!",
                text: `Appointment ${status.toLowerCase()}ed successfully.`,
                icon: "success",
                confirmButtonText: "OK",
            });
        }
    };

    const times = [
        "8:00 AM",
        "9:00 AM",
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
        "1:00 PM",
        "2:00 PM",
        "3:00 PM",
        "4:00 PM",
    ];

    const days = [
        { name: "Monday", date: "10/12/2026" },
        { name: "Tuesday", date: "11/12/2026" },
        { name: "Wednesday", date: "12/12/2026" },
        { name: "Thursday", date: "12/12/2026" },
        { name: "Friday", date: "13/12/2026" },
        { name: "Saturday", date: "14/12/2026" },
        { name: "Sunday", date: "15/12/2026" },
    ];

    const appointmentData = [
        [
            "Available",
            "Booked",
            "Booked",
            "Booked",
            "Booked",
            "Unavailable",
            "Unavailable",
        ],
        [
            "Available",
            "Booked",
            "Booked",
            "Booked",
            "Booked",
            "Unavailable",
            "Unavailable",
        ],
        [
            "Available",
            "Booked",
            "Booked",
            "Booked",
            "Booked",
            "Unavailable",
            "Unavailable",
        ],
        [
            "Available",
            "Booked",
            "Booked",
            "Booked",
            "Booked",
            "Unavailable",
            "Unavailable",
        ],
        [
            "Unavailable",
            "Unavailable",
            "Unavailable",
            "Unavailable",
            "Unavailable",
            "Unavailable",
            "Unavailable",
        ],
        [
            "Unavailable",
            "Unavailable",
            "Unavailable",
            "Unavailable",
            "Unavailable",
            "Unavailable",
            "Unavailable",
        ],
        [
            "Available",
            "Booked",
            "Available",
            "Booked",
            "Booked",
            "Unavailable",
            "Unavailable",
        ],
        ["None", "None", "None", "None", "None", "Unavailable", "Unavailable"],
        ["None", "None", "None", "None", "None", "Unavailable", "Unavailable"],
    ];

    const getStatusStyle = (status) => {
        if (status == "Available") return "bg-green-100 text-green-600";
        else if (status == "Booked") return "bg-blue-100 text-blue-700";
        else if (status == "Unavailable") return "bg-red-100 text-red-600";
        else return "bg-gray-200 text-gray-700";
    };

  return (
      <MainLayout>
          <div className="w-full rounded-2xl border border-gray-200 text-black bg-white p-6">
              <h1 className="mb-8 text-4xl font-normal text-black">
                  Appointment List
              </h1>

              <div className="grid grid-cols-1 gap-2 lg:grid-cols-[minmax(0,3fr)_400px]">
                  <div className="min-w-0 rounded-lg">
                      <div className="mb-5 flex flex-wrap items-center gap-2">
                          <button
                              type="button"
                              aria-label="Previous week"
                              className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-full text-xl text-white"
                          >
                              <i className="fa-solid fa-lg fa-circle-arrow-left text-black"></i>
                          </button>

                          <div className="flex items-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-xs font-semibold text-blue-950">
                              <span>17 Nov 2026 – 23 Nov 2026</span>
                          </div>

                          <button
                              type="button"
                              aria-label="Next week"
                              className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-full text-xl text-white"
                          >
                              <i className="fa-solid fa-lg fa-circle-arrow-right text-black"></i>
                          </button>
                      </div>

                      <div className="w-full overflow-x-auto">
                          <table className="w-full min-w-[700px] table-fixed border-collapse text-center text-sm">
                              <thead>
                                  <tr className="bg-gray-200">
                                      <th className="w-[88px] border border-gray-300 px-2 py-4 text-lg font-normal">
                                          Time
                                      </th>

                                      {days.map((day, index) => (
                                          <th
                                              key={index}
                                              className="border border-gray-300 px-1 py-3 font-normal"
                                          >
                                              <div>{day.name}</div>
                                              <div className="text-xs">
                                                  {day.date}
                                              </div>
                                          </th>
                                      ))}
                                  </tr>
                              </thead>

                              <tbody>
                                  {times.map((time, rowIndex) => (
                                      <tr key={time}>
                                          <td className="border border-gray-300 px-1 py-2 text-base text-start">
                                              {time}
                                          </td>

                                          {appointmentData[rowIndex].map(
                                              (status, colIndex) => (
                                                  <td
                                                      key={colIndex}
                                                      className="border border-gray-200 p-1"
                                                  >
                                                      <button
                                                          type="button"
                                                          onClick={
                                                              handleClickDetail
                                                          }
                                                          className={`w-full whitespace-nowrap px-1 py-2 text-xs btn-appointment cursor-pointer ${getStatusStyle(status)}`}
                                                      >
                                                          {status}
                                                      </button>
                                                  </td>
                                              ),
                                          )}
                                      </tr>
                                  ))}
                              </tbody>
                          </table>
                      </div>
                  </div>

                  <div className="overflow-hidden rounded-lg border border-gray-200">
                      <h2 className="border-b border-gray-200 px-3 py-3 text-xl font-semibold">
                          Appointment Detail
                      </h2>

                      <div className="space-y-4 p-3">
                          {currentStatus === "Booked" && (
                              <AppointmenStatusBooked />
                          )}
                          {currentStatus === "None" && <AppointmenStatusNone />}
                          {currentStatus === "Available" && (
                              <AppointmenStatusNone />
                          )}
                          {currentStatus === "Unavailable" && (
                              <AppointmenStatusNone />
                          )}
                      </div>
                  </div>
              </div>
          </div>
      </MainLayout>
  );
}

export default ListAppointment
