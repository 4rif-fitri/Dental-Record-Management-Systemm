
import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/mainLayout";
import AppointmentDetailsModal from "../../components/modal/AppointmentDetailsModal.jsx";
import api from "@/lib/axios.js";

const Appointments = () => {

    const [appointments, setAppointments] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [loading, setLoading] = useState(false);

    const loadBooking = async () => {
        try {
            setLoading(true);

            const response = await api.get(
                route("getAppointmentPatient")
            );

            console.log("Appointment Data:", response.data);

            setAppointments(response.data ?? []);

        } catch (error) {
            console.error("Failed to load appointment:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBooking();
    }, []);

    const getStatusBadge = (status) => {

        switch (status?.toLowerCase()) {

            case "approved":
                return "badge-success";

            case "pending":
                return "badge-warning";

            case "rejected":
                return "badge-error";

            default:
                return "badge-neutral";
        }
    };

    const handleViewAppointment = (item) => {
        setSelectedAppointment(item);
        setShowPopup(true);
    };

    return (
        <MainLayout>

            {showPopup && (
                <AppointmentDetailsModal
                    setShowPopup={setShowPopup}
                    appointment={selectedAppointment}
                    loadBooking={loadBooking}
                />
            )}

            <div className="mx-auto overflow-hidden rounded-2xl border border-gray-200 shadow-sm p-4">

                <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    Appointment List
                </h2>

                <div className="overflow-x-auto">

                    <table className="table text-black">

                        <thead className="text-black">
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th className="hidden md:table-cell">
                                Purpose
                            </th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        </thead>

                        <tbody>

                        {loading ? (
                            <tr>
                                <td colSpan="6" className="text-center py-8">
                                    Loading appointments...
                                </td>
                            </tr>
                        ) : appointments.length > 0 ? (

                            appointments.map((item, index) => (

                                <tr key={item.id}>

                                    <th>{index + 1}</th>

                                    <td>
                                        {item.appointment?.appointment_date ?
                                            new Date( item.appointment.appointment_date)
                                                .toLocaleDateString("en-GB") : "-"}
                                    </td>

                                    <td>
                                        {item.appointment.time_slot ?? "-"}
                                    </td>

                                    <td className="hidden md:table-cell">
                                        {item.reason ?? "-"}
                                    </td>

                                    <td>
                                        <span className={`badge ${getStatusBadge(item.status)} font-semibold`}>
                                            {item.status}
                                        </span>
                                    </td>

                                    <td>
                                        <button
                                            onClick={() => handleViewAppointment(item)}
                                            className="btn btn-primary font-semibold"
                                        >
                                            View
                                        </button>
                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>
                                <td colSpan="6" className="text-center py-8 text-gray-500">
                                    No appointments found.
                                </td>
                            </tr>

                        )}

                        </tbody>

                    </table>

                </div>

            </div>

        </MainLayout>
    );
};

export default Appointments;
