
import React, { useState, useEffect } from "react";
import MainLayout from '../../layout/mainLayout';
import Swal from "sweetalert2";
import api from "@/lib/axios";
import PageTitle from "@/components/layout/PageTitle.jsx";
import AppointmenStatusNone from "@/components/molecules/Appointment/AppointmenStatusNone.jsx";
import AppointmenStatusBooked from "@/components/molecules/Appointment/AppointmenStatusBooked.jsx";
import AppointmentNavigation from "@/components/molecules/Appointment/AppointmentNavigation.jsx";
import AppointmentTableContent from "@/components/molecules/Appointment/AppointmentTableContent.jsx";
import Loading from "@/components/atom/Loading.jsx";
import ErrorMesage from "@/components/atom/ErrorMesage.jsx";

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

const formatDisplayDate = (date) => {
    return new Date(`${date}T12:00:00`).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
};

const getTimeValue = (time) => {
    if (!time) return 0;

    const match = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);

    if (!match) return 0;

    let hour = Number(match[1]);
    const minute = Number(match[2]);
    const period = match[3]?.toUpperCase();

    if (period === "PM" && hour !== 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;

    return hour * 60 + minute;
};

const formatStatus = (status) => {
    if (!status) return "None";

    return status.charAt(0).toUpperCase() +
        status.slice(1).toLowerCase();
};

const ListAppointment = () => {
    const [weekStart, setWeekStart] = useState(() =>
        getMonday(new Date())
    );

    const [daysFromApi, setDaysFromApi] = useState([]);
    const [currentStatus, setCurrentStatus] = useState("None");
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/asd", {
                params: {
                    date: formatDate(weekStart),
                },
            });

            setDaysFromApi(response.data.days || []);

        } catch (error) {
            console.error("API Error:", error);
            console.log("Error Response:", error.response?.data);

            setError(
                error.response?.data?.message ||
                "Failed to load appointments."
            );

            setDaysFromApi([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, [weekStart]);

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

    // Default time slots when API has no appointment
    const defaultTimes = [
        "08:00","09:00","10:00",
        "11:00","12:00","13:00",
        "14:00","15:00","16:00",
    ];

    // Get all unique time slots from API
    const apiTimes = daysFromApi.flatMap((day) =>
        (day.appointments || []).map(
            (appointment) => appointment.time_slot
        )
    );

    const times = [
        ...new Set([
            ...defaultTimes,
            ...apiTimes,
        ]),
    ].sort((a, b) => getTimeValue(a) - getTimeValue(b));

    // Find appointment by date and time
    const getAppointment = (day, time) => {
        return day.appointments.find(
            (appointment) => appointment.time_slot === time
        );
    };

    // Generate appointment data for full week
    const appointmentData = times.map((time) =>
        days.map((day) => {
            const appointment = getAppointment(day, time);

            return appointment
                ? formatStatus(appointment.status)
                : "None";
        })
    );

    // Previous week
    const handlePreviousWeek = () => {
        setWeekStart((previous) => {
            const newDate = new Date(previous);
            newDate.setDate(newDate.getDate() - 7);

            return newDate;
        });

        setSelectedAppointment(null);
        setCurrentStatus("None");
    };

    // Next week
    const handleNextWeek = () => {
        setWeekStart((previous) => {
            const newDate = new Date(previous);
            newDate.setDate(newDate.getDate() + 7);

            return newDate;
        });

        setSelectedAppointment(null);
        setCurrentStatus("None");
    };

    // Select appointment
    function handleClickDetail(appointment, day, time) {
        if (!appointment) {
            setCurrentStatus("None");

            setSelectedAppointment({
                id: null,
                status: "None",
                day: day.name,
                time: time,
                date: day.date,
            });

            return;
        }

        const status = formatStatus(appointment.status);
        const booking = appointment.booking;
        const patient = booking?.patient || {};

        setCurrentStatus(status);

        setSelectedAppointment({
            id: appointment.id,
            bookingId: booking?.id || null,

            status: status,

            day: day.name,
            time: appointment.time_slot,
            date: day.date,

            patientName: patient.name || "-",
            ic: patient.ic_passport || "-",
            phone: patient.phone_number || "-",
            staffId: patient.student_staff_id || "-",
            category: patient.patient_category || "-",
            gender: patient.gender || "-",
            email: patient.email || "-",

            reason: booking?.reason || "-",
            approval: booking?.status || "None",

            booking: booking || null,
            patient: patient,
        });
    }

    const handleStatusChange = async (action, value = null) => {

        console.log(value)

        if (action === "Save") {
            if (!selectedAppointment?.id) return;

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
                await api.patch(
                    `/appointment/${selectedAppointment.id}/status`,
                    { status: value.toLowerCase() }
                );

                await Swal.fire("Success!", "Appointment status updated.", "success");

                await fetchAppointments();

                setSelectedAppointment(null);
                setCurrentStatus("None");

            } catch (error) {
                Swal.fire(
                    "Error",
                    error.response?.data?.message || "Unable to update status.",
                    "error"
                );
            }

            return;
        }

        if (!selectedAppointment?.bookingId) {
            Swal.fire("Error", "Booking information not found.", "error");
            return;
        }

        const isAccept = action === "Accept";

        const result = await Swal.fire({
            title: "Are you sure?",
            text: `Do you want to ${action.toLowerCase()} this appointment?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
            confirmButtonColor: isAccept ? "#16a34a" : "#ef4444",
        });

        if (!result.isConfirmed) return;

        try {
            const bookingId = selectedAppointment.bookingId;

            await api.patch(
                `/appointment/booking/${bookingId}/${isAccept ? "accept" : "reject"}`
            );

            await Swal.fire(
                "Success!",
                `Appointment ${isAccept ? "accepted" : "rejected"} successfully.`,
                "success"
            );

            await fetchAppointments();

            setSelectedAppointment(null);
            setCurrentStatus("None");

        } catch (error) {
            Swal.fire(
                "Error",
                error.response?.data?.message || "Unable to update appointment.",
                "error"
            );
        }
    };

    const getStatusStyle = (status) => {
        if (status == "Available") return "bg-green-100 text-green-600";
        else if (status == "Booked") return "bg-blue-100 text-blue-700";
        else if (status == "Unavailable") return "bg-red-100 text-red-600";
        else return "bg-gray-200 text-gray-700";
    };

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);

    return (
        <MainLayout>
            <div className="w-full rounded-2xl border border-gray-200 text-black bg-white p-6">
                <PageTitle title={"Appointment List"} />

                <div className="grid grid-cols-1 gap-2 lg:grid-cols-[minmax(0,3fr)_400px]">
                    <div className="min-w-0 rounded-lg">

                        <AppointmentNavigation handlePreviousWeek={handlePreviousWeek} formatDate={formatDate} weekStart={weekStart} weekEnd={weekEnd} handleNextWeek={handleNextWeek} />

                        <div className="w-full overflow-x-auto">
                            {loading ? <Loading /> : error ? <ErrorMesage error={error} /> :
                                <AppointmentTableContent days={days} times={times} formatDisplayDate={formatDisplayDate} getAppointment={getAppointment} appointmentData={appointmentData} handleClickDetail={handleClickDetail} getStatusStyle={getStatusStyle} />}
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-lg border border-gray-200">
                        <h2 className="border-b border-gray-200 px-3 py-3 text-xl font-semibold">
                            Appointment Detail
                        </h2>

                        <div className="space-y-4 p-3">
                            {currentStatus === "Booked" && (
                                <AppointmenStatusBooked
                                    selectedAppointment={selectedAppointment}
                                    handleStatusChange={handleStatusChange}
                                />
                            )}

                            {currentStatus !== "Booked" && (
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
