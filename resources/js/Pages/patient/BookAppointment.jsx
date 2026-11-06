import React, { useState } from "react";
import MainLayout from "../../layout/mainLayout";

const BookAppointment = () => {
    const [patientCategory, setPatientCategory] = useState("family");

    const [formData, setFormData] = useState({
        staffStudentName: "",
        patientName: "",
        staffStudentNo: "",
        faculty: "",
        phone: "",
        email: "",
    });

    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const timeSlots = [
        "8:00 AM",
        "9:00 AM",
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
        "2:00 PM",
        "3:00 PM",
        "4:00 PM",
    ];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const month = currentMonth.getMonth();
    const year = currentMonth.getFullYear();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Calendar starts on Monday
    const startOffset = (firstDay + 6) % 7;

    const weekdays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

    const formatDate = (date) => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, "0");
        const d = String(date.getDate()).padStart(2, "0");

        return `${y}-${m}-${d}`;
    };

    const changeMonth = (direction) => {
        setCurrentMonth((prev) => {
            return new Date(prev.getFullYear(), prev.getMonth() + direction, 1);
        });
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
        setSelectedTime("");
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!selectedDate || !selectedTime) {
            alert("Please select an appointment date and time.");
            return;
        }

        const appointmentData = {
            patientCategory,
            ...formData,
            appointmentDate: selectedDate,
            appointmentTime: selectedTime,
        };

        console.log("Appointment Data:", appointmentData);

        alert("Appointment form submitted successfully!");
    };

    const renderCalendarDays = () => {
        const calendarDays = [];

        for (let i = 0; i < startOffset; i++) {
            calendarDays.push(<div key={`empty-${i}`} className="h-10" />);
        }

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
            ${isToday && !isSelected ? "ring-1 ring-blue-400" : ""}
          `}
                >
                    {day}
                </button>,
            );
        }

        return calendarDays;
    };

    const formattedSelectedDate = selectedDate
        ? new Date(`${selectedDate}T12:00:00`).toLocaleDateString("en-MY", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
          })
        : "Please select a date";

    return (
        <MainLayout>
            <div className="mx-auto overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm text-black">
                <form onSubmit={handleSubmit} className="p-5 sm:p-8 lg:p-10">
                    <div className="border-gray-200">
                        <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            Book Appointment
                        </h2>
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
                                <label
                                    htmlFor="appointmentDate"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Selected date
                                </label>

                                <input
                                    id="appointmentDate"
                                    type="date"
                                    value={selectedDate}
                                    min={formatDate(today)}
                                    onChange={handleDateChange}
                                    className="input input-bordered w-full bg-white"
                                    required
                                />

                                <div className="mt-5 flex items-center justify-between">
                                    <button
                                        type="button"
                                        onClick={() => changeMonth(-1)}
                                        className="btn btn-sm"
                                        aria-label="Previous month"
                                    >
                                        Previous
                                    </button>

                                    <h4 className="font-semibold text-gray-900">
                                        {currentMonth.toLocaleDateString(
                                            "en-US",
                                            {
                                                month: "long",
                                                year: "numeric",
                                            },
                                        )}
                                    </h4>

                                    <button
                                        type="button"
                                        onClick={() => changeMonth(1)}
                                        className="btn btn-sm"
                                        aria-label="Next month"
                                    >
                                        Next
                                    </button>
                                </div>

                                <div className="mt-4 grid grid-cols-7 gap-1">
                                    {weekdays.map((day) => (
                                        <div
                                            key={day}
                                            className="py-2 text-center text-[10px] font-semibold text-gray-400 sm:text-xs"
                                        >
                                            {day}
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-7 gap-1">
                                    {renderCalendarDays()}
                                </div>
                            </div>

                            {/* Time Slots */}
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

                                <div className="grid grid-cols-2 gap-3">
                                    {timeSlots.map((time) => {
                                        const isSelected =
                                            selectedTime === time;

                                        return (
                                            <button
                                                key={time}
                                                type="button"
                                                disabled={!selectedDate}
                                                onClick={() =>
                                                    setSelectedTime(time)
                                                }
                                                className={` rounded-xl border px-3 py-3 text-sm font-medium
                          transition
                          ${
                              !selectedDate
                                  ? "cursor-not-allowed border-gray-100 bg-gray-50 text-gray-300"
                                  : isSelected
                                    ? "border-gray-950 bg-gray-950 text-white"
                                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-950"
                          }`}
                                            >
                                                {time}
                                            </button>
                                        );
                                    })}
                                </div>

                                {!selectedDate && (
                                    <p className="mt-4 text-xs text-amber-600">
                                        Please select an appointment date first.
                                    </p>
                                )}

                                {selectedDate && selectedTime && (
                                    <div className="mt-5 rounded-xl bg-green-50 p-4">
                                        <p className="text-xs font-medium text-green-700">
                                            Appointment selected
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-green-800">
                                            {selectedDate} at {selectedTime}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    <div className="flex flex-col-reverse gap-3 border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                        <div></div>
                        <button
                            type="submit"
                            className="btn border-gray-950 bg-gray-950 px-8 text-white
              hover:border-gray-800 hover:bg-gray-800"
                        >
                            Submit Appointment
                        </button>
                    </div>
                </form>
            </div>
        </MainLayout>
    );
};

export default BookAppointment;
