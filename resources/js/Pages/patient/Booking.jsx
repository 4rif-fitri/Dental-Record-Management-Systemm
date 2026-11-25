
import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/mainLayout";
import api from "@/lib/axios.js";
import { route } from "ziggy-js";
import Swal from "sweetalert2";

const Booking = () => {
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [appointments, setAppointments] = useState([]);
    const [isLoadingAppointments, setIsLoadingAppointments] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const timeSlots = [
        "08:00","09:00","10:00",
        "11:00","12:00","13:00",
        "14:00","15:00","16:00",
    ];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const month = currentMonth.getMonth();
    const year = currentMonth.getFullYear();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const startOffset = (firstDay + 6) % 7;

    const weekdays = [
        "MON", "TUE", "WED", "THU",
        "FRI", "SAT", "SUN"
    ];

    const formatDate = (date) => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, "0");
        const d = String(date.getDate()).padStart(2, "0");

        return `${y}-${m}-${d}`;
    };

    const normalizeTime = (time) => {
        if (!time) return "";

        const value = String(time).trim();

        const match = value.match(
            /^(\d{1,2}):(\d{2})(?::\d{2})?\s*(AM|PM)?$/i
        );

        if (!match) return value;

        let hour = Number(match[1]);
        const minute = match[2];
        const period = match[3]?.toUpperCase();

        if (period === "PM" && hour !== 12) {
            hour += 12;
        }

        if (period === "AM" && hour === 12) {
            hour = 0;
        }

        return `${String(hour).padStart(2, "0")}:${minute}`;
    };

    const formatDisplayTime = (time) => {
        if (!time) return "-";

        const normalized = normalizeTime(time);
        const [hour, minute] = normalized.split(":");

        const h = Number(hour);
        const period = h >= 12 ? "PM" : "AM";
        const displayHour = h % 12 || 12;

        return `${displayHour}:${minute} ${period}`;
    };

    const extractAppointments = (response) => {

        if (Array.isArray(response.data)) {
            return response.data;
        }

        if (Array.isArray(response.data?.data)) {
            return response.data.data;
        }

        return [];
    };

    const fetchAppointments = async (date) => {

        if (!date) {
            setAppointments([]);
            return;
        }

        try {
            setIsLoadingAppointments(true);

            const response = await api.get(route("getAppointmentsByDate", {
                date: date
            }));

            const data = extractAppointments(response);
            setAppointments(data);

        } catch (error) {

            setAppointments([]);

            Swal.fire({
                title: "Error",
                text: "Unable to load appointment slots.",
                icon: "error"
            });

        } finally {
            setIsLoadingAppointments(false);
        }
    };

    useEffect(() => {
        setSelectedTime("");
        setAppointments([]);

        if (!selectedDate) return;

        let ignore = false;

        const loadAppointments = async () => {

            try {
                setIsLoadingAppointments(true);
                const response = await api.get(route("getAppointmentsByDate", {
                    date: selectedDate
                }));

                const data = extractAppointments(response);

                if (!ignore) setAppointments(data)

            } catch (error) {

                if (!ignore) {
                    setAppointments([]);
                }

            } finally {
                if (!ignore) setIsLoadingAppointments(false);
            }
        };

        loadAppointments();

        return () => {
            ignore = true;
        };

    }, [selectedDate]);

    const getSlotAppointment = (time) => {

        return appointments.find((appointment) => {
            return (
                normalizeTime(appointment.time_slot) ===
                normalizeTime(time)
            );
        });
    };

    const isSlotAvailable = (time) => {

        const appointment = getSlotAppointment(time);

        if (!appointment) return false;

        const status = appointment.status?.toLowerCase();

        const activeBookings = Number(
            appointment.active_bookings_count ?? 0
        );

        return (
            status === "available" &&
            activeBookings === 0
        );
    };

    const getSlotStatus = (time) => {

        const appointment = getSlotAppointment(time);

        if (!appointment) return "Unavailable";

        const status = appointment.status?.toLowerCase();
        const activeBookings = Number(appointment.active_bookings_count ?? 0);

        if (activeBookings > 0 || status === "booked") return "Booked";
        if (status === "available") return "Available";
        if (status === "unavailable") return "Unavailable";
        return "Unavailable";
    };

    const handleTimeChange = (time) => {
        if (!isSlotAvailable(time)) return;
        setSelectedTime(time);
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
        setSelectedTime("");
    };

    const changeMonth = (direction) => {
        setCurrentMonth((prev) => {
            return new Date(
                prev.getFullYear(),
                prev.getMonth() + direction,
                1
            );

        });
    };

    const renderCalendarDays = () => {

        const calendarDays = [];

        for (let i = 0; i < startOffset; i++) {

            calendarDays.push(
                <div
                    key={`empty-${i}`}
                    className="h-10"
                />
            );

        }

        // Calendar dates
        for (let day = 1; day <= daysInMonth; day++) {

            const date = new Date(year, month, day);

            const dateString = formatDate(date);

            const isPast = date < today;

            const isSelected = selectedDate === dateString;

            const isToday = formatDate(today) === dateString;

            calendarDays.push(

                <button
                    key={day}
                    type="button"
                    disabled={isPast}
                    onClick={() => {
                        setSelectedDate(dateString);
                        setSelectedTime("");
                    }}
                    className={`
                        relative flex h-10 w-full items-center justify-center
                        rounded-lg text-sm transition
                        ${
                        isSelected
                            ? "bg-blue-600 font-semibold text-white"
                            : isPast
                                ? "cursor-not-allowed text-gray-300"
                                : "text-gray-700 hover:bg-blue-50"
                    }
                        ${
                        isToday && !isSelected
                            ? "ring-1 ring-blue-400"
                            : ""
                    }
                    `}
                >
                    {day}
                </button>

            );

        }

        return calendarDays;
    };

    // Selected date display
    const formattedSelectedDate = selectedDate
        ? new Date(`${selectedDate}T12:00:00`).toLocaleDateString(
            "en-MY",
            {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        )
        : "Please select a date";

    // Submit booking
    const handleSubmit = async (event) => {

        event.preventDefault();

        if (isSubmitting) return;

        if (!selectedDate || !selectedTime) {

            Swal.fire({
                title: "Warning",
                text: "Please select an appointment date and time.",
                icon: "warning"
            });

            return;
        }

        // Get selected appointment
        const appointment = getSlotAppointment(selectedTime);

        // Recheck availability
        if (!appointment || !isSlotAvailable(selectedTime)) {

            await Swal.fire({
                title: "Unavailable",
                text: "This appointment slot is no longer available.",
                icon: "error"
            });

            setSelectedTime("");

            await fetchAppointments(selectedDate);

            return;
        }

        const confirmation = await Swal.fire({
            title: "Confirm Appointment?",
            html: `
                <div>
                    <p><strong>Date:</strong> ${formattedSelectedDate}</p>
                    <p><strong>Time:</strong> ${formatDisplayTime(selectedTime)}</p>
                </div>
            `,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Confirm Booking",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#16a34a",
            cancelButtonColor: "#6b7280",
            reverseButtons: true
        });

        if (!confirmation.isConfirmed) return;

        try {
            setIsSubmitting(true);
            const response = await api.post(route("createBooking"),{
                appointment_id: appointment.id,
                reason: "Dental appointment"
            });

            await Swal.fire({
                title: "Booking Successful!",
                text: "Your appointment booking has been submitted.",
                icon: "success",
                confirmButtonColor: "#16a34a"
            });

            setSelectedTime("");
            await fetchAppointments(selectedDate);

        } catch (error) {
            const message = error.response?.data?.message ?? "Unable to create appointment booking.";

            await Swal.fire({
                title: "Booking Failed",
                text: message,
                icon: "error",
                confirmButtonColor: "#dc2626"
            });

            await fetchAppointments(selectedDate);
            setSelectedTime("");

        } finally {
            setIsSubmitting(false);
        }
    };

    return (

        <MainLayout>

            <div className="mx-auto overflow-hidden rounded-2xl border border-gray-200 bg-white text-black shadow-sm">
                <form onSubmit={handleSubmit} className="p-5 sm:p-8 lg:p-10">

                    <div>
                        <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            Book Appointment
                        </h2>
                        <p className="mt-2 text-sm text-gray-500">
                            Select your preferred appointment date and time.
                        </p>
                    </div>
                    <section className="pt-8">
                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-gray-900">
                                Appointment Date & Time
                                <span className="ml-1 text-red-500">*</span>
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Choose an available date and appointment time.
                            </p>
                        </div>
                        <div className="grid gap-6 lg:grid-cols-2">
                            <div className="rounded-2xl border border-gray-200 p-4 sm:p-5">
                                <label htmlFor="appointmentDate" className="mb-2 block text-sm font-medium text-gray-700">
                                    Selected date
                                </label>
                                <input id="appointmentDate" type="date"
                                    value={selectedDate}
                                    min={formatDate(today)}
                                    onChange={handleDateChange}
                                    className="input input-bordered w-full bg-white"
                                    required
                                />

                                <div className="mt-5 flex items-center justify-between">
                                    <button type="button"
                                        onClick={() => changeMonth(-1)}
                                        disabled={
                                            currentMonth.getFullYear() === today.getFullYear() &&
                                            currentMonth.getMonth() <= today.getMonth()
                                        }
                                        className="btn btn-sm">
                                        Previous
                                    </button>

                                    <h4 className="font-semibold text-gray-900">
                                        {currentMonth.toLocaleDateString(
                                            "en-US",
                                            {
                                                month: "long",
                                                year: "numeric"
                                            }
                                        )}
                                    </h4>

                                    <button type="button" onClick={() => changeMonth(1)}
                                        className="btn btn-sm">
                                        Next
                                    </button>

                                </div>

                                <div className="mt-4 grid grid-cols-7 gap-1">
                                    {weekdays.map((day) => (
                                        <div key={day} className="py-2 text-center text-[10px] font-semibold text-gray-400 sm:text-xs">
                                            {day}
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-7 gap-1">
                                    {renderCalendarDays()}
                                </div>

                            </div>

                            <div className="rounded-2xl border border-gray-200 p-4 sm:p-5">
                                <div className="mb-5">
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Selected Date
                                    </p>
                                    <h4 className="mt-2 text-base font-bold text-gray-900">
                                        {formattedSelectedDate}
                                    </h4>
                                </div>
                                <p className="mb-3 text-sm font-semibold text-gray-700">
                                    Available Time Slots
                                </p>

                                {isLoadingAppointments && (
                                    <div className="flex items-center justify-center gap-2 py-8 text-sm text-gray-500">
                                        <span className="loading loading-spinner loading-sm" />
                                            Loading appointments...
                                    </div>
                                )}

                                {!isLoadingAppointments && (
                                    <div className="grid grid-cols-2 gap-3">
                                        {timeSlots.map((time) => {

                                            const appointment = getSlotAppointment(time);
                                            const available = isSlotAvailable(time);
                                            const isSelected = selectedTime === time;
                                            const status = getSlotStatus(time);

                                            return (
                                                <button key={time} type="button"
                                                    disabled={
                                                        !selectedDate ||
                                                        !available
                                                    }
                                                    onClick={() =>
                                                        handleTimeChange(time)
                                                    }
                                                    className={`
                                                        rounded-xl border px-3 py-3 text-sm font-medium transition
                                                        ${!selectedDate ? "cursor-not-allowed border-gray-100 bg-gray-50 text-gray-300" : !available
                                                                ? "cursor-not-allowed border-red-100 bg-red-50 text-red-400"
                                                                : isSelected
                                                                    ? "border-gray-950 bg-gray-950 text-white"
                                                                    : "border-green-200 bg-green-50 text-green-700 hover:border-green-600"
                                                    }`}
                                                >

                                                    <span className="block">
                                                        {formatDisplayTime(time)}
                                                    </span>

                                                    <span className="mt-1 block text-[10px] font-normal">
                                                        {!selectedDate
                                                            ? "Select date"
                                                            : status}
                                                    </span>

                                                </button>

                                            );

                                        })}

                                    </div>

                                )}

                                {!selectedDate && (

                                    <p className="mt-4 text-xs text-amber-600">
                                        Please select an appointment date first.
                                    </p>

                                )}

                                {selectedDate &&
                                    !isLoadingAppointments &&
                                    !timeSlots.some(isSlotAvailable) && (

                                        <p className="mt-4 text-xs text-red-500">
                                            No available time slots for this date.
                                        </p>

                                    )}

                                <div className="mt-5 flex flex-wrap gap-4 text-xs">

                                    <div className="flex items-center gap-2">
                                        <span className="h-3 w-3 rounded bg-green-200" />
                                        <span className="text-gray-600">
                                            Available
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="h-3 w-3 rounded bg-red-200" />
                                        <span className="text-gray-600">
                                            Booked / Unavailable
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="h-3 w-3 rounded bg-gray-900" />
                                        <span className="text-gray-600">
                                            Selected
                                        </span>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </section>

                    <div className="flex flex-col-reverse gap-3 border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-between">

                        <div />

                        <button type="submit"
                            disabled={
                                !selectedDate ||
                                !selectedTime ||
                                isLoadingAppointments ||
                                isSubmitting
                            }
                            className="btn border-gray-950 bg-gray-950 px-8 text-white hover:border-gray-800 hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50">

                            {isSubmitting ? "Submitting..." : "Submit Appointment"}
                        </button>
                    </div>
                </form>
            </div>
        </MainLayout>

    );
};

export default Booking;
