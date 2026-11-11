
import React, { useState, useEffect } from "react";
import MainLayout from "../../layout/mainLayout";
import PageTitle from "@/components/layout/PageTitle.jsx";
import ErrorMesage from "@/components/atom/ErrorMesage.jsx";
import Loading from "@/components/atom/Loading.jsx";
import AppointmenStatusNone from "@/components/molecules/Appointment/AppointmenStatusNone.jsx";
import AppointmenStatusBooked from "@/components/molecules/Appointment/AppointmenStatusBooked.jsx";
import AppointmentNavigation from "@/components/molecules/Appointment/AppointmentNavigation.jsx";
import AppointmentTableContent from "@/components/molecules/Appointment/AppointmentTableContent.jsx";
import Swal from "sweetalert2";
import api from "@/lib/axios";

const getMonday = (date) => {
    const result = new Date(date);
    const day = result.getDay();

    result.setDate(result.getDate() - (day === 0 ? 6 : day - 1));
    result.setHours(12, 0, 0, 0);

    return result;
};

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

const formatStatus = (status) => {
    if (!status) return "None";

    return status.charAt(0).toUpperCase() +
        status.slice(1).toLowerCase();
};

const ListAppointment = () => {
    const [daysFromApi, setDaysFromApi] = useState([]);
    const [currentStatus, setCurrentStatus] = useState("None");
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [weekStart, setWeekStart] = useState(() =>
        getMonday(new Date())
    );

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/appointment/getWeeklySchedule",
                { params: { date: formatDate(weekStart) } }
            );

            console.log(response)
            setDaysFromApi(response.data.days || []);

        } catch (error) {
            setError(error.response?.data?.message || "Failed to load appointments.");
            setDaysFromApi([]);

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, [weekStart]);

    const handlePreviousWeek = () => {
        setWeekStart((previous) => {
            const newDate = new Date(previous);
            newDate.setDate(newDate.getDate() - 7);
            return newDate;
        });
        setSelectedAppointment(null);
        setCurrentStatus("None");
    };

    const handleNextWeek = () => {
        setWeekStart((previous) => {
            const newDate = new Date(previous);
            newDate.setDate(newDate.getDate() + 7);
            return newDate;
        });
        setSelectedAppointment(null);
        setCurrentStatus("None");
    };

    // Generate 7 days
    const days = Array.from({ length: 7 }, (_, index) => {

        const date = new Date(weekStart);
        date.setDate(date.getDate() + index);

        const formattedDate = formatDate(date);

        const apiDay = daysFromApi.find(
            (day) => day.date === formattedDate
        );

        return {
            name: date.toLocaleDateString("en-US", {
                weekday: "long",
            }),

            date: formattedDate,

            appointments: apiDay?.appointments || [],
        };
    });

    // Select appointment detail
    const handleClickDetail = (appointment, day, time) => {

        // CASE 1: None
        if (!appointment) {

            setCurrentStatus("None");

            setSelectedAppointment({
                id: null,
                status: "None",

                date: day.date,
                day: day.name,
                time: time,
            });

            return;
        }

        const status = formatStatus(appointment.status);

        // CASE 2: Available / Unavailable
        if (status === "Available" || status === "Unavailable") {
            setCurrentStatus(status);

            setSelectedAppointment({
                id: appointment.id,
                status: status,

                date: day.date,
                day: day.name,
                time: appointment.time_slot,
            });

            return;
        }


        // CASE 3: Booked
        if (status === "Booked") {
            const booking = appointment.booking;
            const patient = booking?.patient || {};

            setCurrentStatus("Booked");

            setSelectedAppointment({

                id: appointment.id,
                bookingId: booking?.id || null,

                status: status,

                date: day.date,
                day: day.name,
                time: appointment.time_slot,

                // Patient details
                patientName: patient.name || "-",
                ic: patient.ic_passport || "-",
                phone: patient.phone_number || "-",
                staffId: patient.student_staff_id || "-",
                category: patient.patient_category || "-",
                gender: patient.gender || "-",
                email: patient.email || "-",

                // Booking details
                reason: booking?.reason || "-",
                approval: booking?.status || "None",

                booking: booking || null,
                patient: patient,
            });

        }
    };

    const handleStatusChange = async (action, value = null) => {
        let response

        if (action === "Save") {

            if (!selectedAppointment) return;

            const result = await Swal.fire({
                title: "Are you sure?",
                text: `Change appointment status to ${value}?`,
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Yes",
                cancelButtonText: "Cancel",
            });

            if (!result.isConfirmed) return;

            try {
                // CASE 1: Create new appointment (None)
                if (!selectedAppointment.id) {
                    response = await api.post("/appointment/store",
                        {
                            appointment_date: selectedAppointment.date,
                            time_slot: selectedAppointment.time,
                            status: value.toLowerCase()
                        }
                    );

                    await Swal.fire("Success!", "Appointment created successfully.", "success");

                    await fetchAppointments();

                    setSelectedAppointment(null);
                    setCurrentStatus("None");

                    return;
                }

                if(value === "none" || value === "None"){
                    // if none so delete la
                    response = await api.delete(`appointment/delete/${selectedAppointment.id}`)

                }else{
                    // CASE 2: Update existing appointment
                    response = await api.put(`/appointment/update/${selectedAppointment.id}`,
                        { status: value.toLowerCase() }
                    );

                }

                await Swal.fire("Success!", "Appointment status updated.", "success");

                await fetchAppointments();
                setSelectedAppointment(null);
                setCurrentStatus("None");

            } catch (error) {
                console.error("API Error:", error.response?.data || error);
                Swal.fire("Error",error.response?.data?.message || "Unable to save appointment.", "error");
            }

            return;
        }

        // CASE 3: Accept / Reject booking
        if (!selectedAppointment?.bookingId) {
            Swal.fire("Error", "Booking information not found.", "error");
            return;
        }

        const bookingAction = action === "Accept" ? "accept" : "reject";

        const result = await Swal.fire({
            title: "Are you sure?",
            text: `Do you want to ${bookingAction} this appointment?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
            confirmButtonColor: bookingAction === "accept" ? "#16a34a" : "#ef4444",
        });

        if (!result.isConfirmed) return;

        try {
            response = await api.patch(
                route("updateBookingStatus", {
                    id: selectedAppointment.bookingId,
                    action: bookingAction
                })
            );

            await Swal.fire("Success!", `Appointment ${bookingAction}ed successfully.`, "success");
            await fetchAppointments();

            setSelectedAppointment(null);
            setCurrentStatus("None");

        } catch (error) {
            console.error("API Error:", error.response?.data || error);
            Swal.fire("Error", error.response?.data?.message || "Unable to update booking.", "error");
        }
    };

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);

    return (
        <MainLayout>
            <div className="w-full rounded-2xl border border-gray-200 bg-white p-6 text-black">

                <PageTitle title="Appointment List" />

                <div className="grid grid-cols-1 gap-2 lg:grid-cols-[minmax(0,3fr)_400px]">

                    <div className="min-w-0 rounded-lg">

                        <AppointmentNavigation
                            handlePreviousWeek={handlePreviousWeek}
                            formatDate={formatDate}
                            weekStart={weekStart}
                            weekEnd={weekEnd}
                            handleNextWeek={handleNextWeek}
                        />

                        <div className="w-full overflow-x-auto">
                            {loading ? <Loading /> : error ? <ErrorMesage error={error} /> :
                                <AppointmentTableContent days={days}
                                    handleClickDetail={handleClickDetail}
                                />
                            }
                        </div>

                    </div>

                    <div className="overflow-hidden rounded-lg border border-gray-200">
                        <h2 className="border-b border-gray-200 px-3 py-3 text-xl font-semibold">
                            Appointment Detail
                        </h2>

                        <div className="space-y-4 p-3">
                            {currentStatus === "Booked" ? (
                                <AppointmenStatusBooked
                                    selectedAppointment={selectedAppointment}
                                    handleStatusChange={handleStatusChange}
                                />
                            ) : (
                                <AppointmenStatusNone
                                    selectedAppointment={selectedAppointment}
                                    handleStatusChange={handleStatusChange}
                                />
                            )}

                        </div>
                    </div>

                </div>
            </div>

        </MainLayout>
    );
};

export default ListAppointment;
