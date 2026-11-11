const AppointmentTableContent = ({days,handleClickDetail,}) => {

    const times = [
        "08:00", "09:00", "10:00",
        "11:00", "12:00", "13:00",
        "14:00", "15:00", "16:00",
    ];

    const getStatusStyle = (status) => {
        if (status === "Available")
            return "bg-green-100 text-green-600";
        if (status === "Booked")
            return "bg-blue-100 text-blue-700";
        if (status === "Unavailable")
            return "bg-red-100 text-red-600";
        if (status === "None")
            return "bg-gray-200 text-gray-700";
    };

    const formatDisplayDate = (date) => {
        return new Date(`${date}T12:00:00`).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    return (
        <table className="w-full min-w-[700px] table-fixed border-collapse text-center text-sm">
            <thead>
            <tr className="bg-gray-200">
                <th className="w-[88px] border border-gray-300 px-2 py-4 text-lg font-normal">
                    Time
                </th>

                {days.map((day) => (
                    <th
                        key={day.date}
                        className="border border-gray-300 px-1 py-3 font-normal"
                    >
                        <div>{day.name}</div>
                        <div className="text-xs">
                            {formatDisplayDate(day.date)}
                        </div>
                    </th>
                ))}
            </tr>
            </thead>

            <tbody>
            {times.map((time) => (
                <tr key={time}>
                    <td className="border border-gray-300 px-1 py-2 text-base">
                        {time}
                    </td>

                    {days.map((day) => {
                        const appointment = day.appointments.find(
                            (item) => item.time_slot === time
                        );

                        const status = appointment
                            ? appointment.status
                            : "none";

                        const displayStatus =
                            status.charAt(0).toUpperCase() +
                            status.slice(1).toLowerCase();

                        return (
                            <td
                                key={day.date}
                                className="border border-gray-200 p-1"
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleClickDetail(
                                            appointment,
                                            day,
                                            time
                                        )
                                    }
                                    className={`w-full cursor-pointer whitespace-nowrap px-1 py-2 text-xs btn-appointment ${getStatusStyle(displayStatus)}`}
                                >
                                    {displayStatus}
                                </button>
                            </td>
                        );
                    })}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default AppointmentTableContent;
