import React, { useState } from "react";
import MainLayout from '../../layout/mainLayout'
import Swal from "sweetalert2";
import PageTitle from "@/components/layout/PageTitle.jsx";
import AppointmenStatusNone from "@/components/molecules/Appointmen/AppointmenStatusNone.jsx";
import AppointmenStatusBooked from "@/components/molecules/Appointmen/AppointmenStatusBooked.jsx";

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
        "8:00 AM","9:00 AM","10:00 AM",
        "11:00 AM","12:00 PM","1:00 PM",
        "2:00 PM","3:00 PM","4:00 PM",
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
        ["Available","Booked","Booked","Booked","Booked","Unavailable","Unavailable",],
        ["Available","Booked","Booked","Booked","Booked","Unavailable","Unavailable",],
        ["Available","Booked","Booked","Booked","Booked","Unavailable","Unavailable",],
        ["Available","Booked","Booked","Booked","Booked","Unavailable","Unavailable",],
        ["Unavailable","Unavailable","Unavailable","Unavailable","Unavailable","Unavailable","Unavailable",],
        ["Unavailable","Unavailable","Unavailable","Unavailable","Unavailable","Unavailable","Unavailable",],
        ["Available","Booked","Available","Booked","Booked","Unavailable","Unavailable",],
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
              <PageTitle title={"Appointment List"} />

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
                          {currentStatus === "Booked" && <AppointmenStatusBooked selectedAppointment={selectedAppointment} handleStatusChange={handleStatusChange} /> }
                          {currentStatus === "None" && <AppointmenStatusNone /> }
                          {currentStatus === "Available" && <AppointmenStatusNone /> }
                          {currentStatus === "Unavailable" && <AppointmenStatusNone /> }
                      </div>
                  </div>
              </div>
          </div>
      </MainLayout>
  );
}

export default ListAppointment
