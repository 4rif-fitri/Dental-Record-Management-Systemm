
import React, { useState } from 'react';
import PageTitle from "@/components/atom/PageTitle.jsx";
import api from "@/lib/axios.js";
import Swal from "sweetalert2";

function Showinput({ label, data, isInput, className = "" }) {

    return (
        <div className="flex flex-col text-black">
            <label className="label">{label}</label>

            {isInput === "Large" ? (
                <textarea
                    readOnly
                    value={data ?? ""}
                    className="textarea h-20 border border-gray-400 bg-white w-full"
                />
            ) : (
                <input
                    readOnly
                    value={data ?? ""}
                    className={`input w-full border border-gray-400 ${className}`}
                />
            )}
        </div>
    );
}

const AppointmentDetailsModal = ({setShowPopup,appointment,loadBooking}) => {

    const appointmentData = appointment.appointment;

    const appointmentDate = appointmentData?.appointment_date
        ? new Date(appointmentData.appointment_date)
        : null;


    const [cancelling, setCancelling] = useState(false);


    const handleCancel = async () => {

        const result = await Swal.fire({
            title: "Cancel Appointment?",
            text: "Are you sure you want to cancel this appointment?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Cancel",
            cancelButtonText: "No, Keep It",
            confirmButtonColor: "#d33",
            cancelButtonColor: "#6b7280",
            reverseButtons: true
        });

        if (!result.isConfirmed) return;

        try {
            setCancelling(true);

            const response = await api.put(
                route("updateBooking", appointment.id),
                {
                    status: "cancelled"
                }
            );

            console.log("Cancel appointment:", response.data);

            await Swal.fire({
                title: "Cancelled!",
                text: "Your appointment has been cancelled successfully.",
                icon: "success",
                confirmButtonColor: "#16a34a"
            });

            setShowPopup(false);
            loadBooking()

        } catch (error) {

            console.error(
                "Cancel appointment failed:",
                error.response?.data ?? error
            );

            Swal.fire({
                title: "Failed!",
                text: error.response?.data?.message ??
                    "Failed to cancel appointment.",
                icon: "error",
                confirmButtonColor: "#d33"
            });

        } finally {
            setCancelling(false);
        }
    };



    const formattedDate = appointmentDate
        ? appointmentDate.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            timeZone: "UTC"
        })
        : "-";

    const formattedDay = appointmentDate
        ? appointmentDate.toLocaleDateString("en-US", {
            weekday: "long",
            timeZone: "UTC"
        })
        : "-";

    const statusClass = {
        pending: "badge-warning",
        approved: "badge-success",
        rejected: "badge-error"
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 text-base-100">

            <div className="w-11/12 max-w-lg rounded-xl bg-white p-6 shadow-xl">

                <div className="mb-4">
                    <PageTitle title={"Appointment Details"} />
                </div>

                <div className="space-y-3">

                    <div className="rounded-box w-full grid sm:grid-cols-2 grid-cols-1 gap-2">

                        <Showinput
                            label="Appointment ID"
                            data={appointmentData?.id}
                        />

                        <Showinput
                            label="Date"
                            data={formattedDate}
                        />

                        <Showinput
                            label="Day"
                            data={formattedDay}
                        />

                        <Showinput
                            label="Time"
                            data={appointmentData?.time_slot}
                        />

                    </div>

                    <div className="rounded-box w-full">

                        <Showinput
                            label="Purpose"
                            data={appointment.reason}
                            isInput="Large"
                        />

                    </div>

                    <div className="w-full flex gap-4">

                        <label className="label text-black">
                            Status:
                        </label>

                        <span className={`badge p-4 font-bold ${
                            statusClass[appointment.status?.toLowerCase()]
                            ?? "badge-neutral"
                        }`}>
                            {appointment.status}
                        </span>

                    </div>

                </div>

                <div className="mt-6 w-full flex justify-end gap-2">

                    <button
                        type="button"
                        className="btn btn-error flex-1"
                        onClick={handleCancel}
                        disabled={
                            cancelling ||
                            appointment.status?.toLowerCase() !== "pending"
                        }
                    >
                        {cancelling ? "Cancelling..." : "Cancel"}
                    </button>

                    <button
                        type="button"
                        className="btn btn-neutral flex-1"
                        onClick={() => setShowPopup(false)}
                    >
                        Close
                    </button>

                </div>

            </div>
        </div>
    );
};

export default AppointmentDetailsModal;
