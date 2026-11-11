const AppointmentTableContent = ({days, times, formatDisplayDate, getAppointment, appointmentData, handleClickDetail, getStatusStyle}) => {
    return (
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
                            {formatDisplayDate(day.date)}
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

                    {days.map((day, colIndex) => {
                        const appointment = getAppointment(day, time);
                        const status = appointmentData[rowIndex][colIndex];

                        return (
                            <td
                                key={colIndex}
                                className="border border-gray-200 p-1"
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleClickDetail(
                                            appointment,
                                            day
                                        )
                                    }
                                    className={`w-full whitespace-nowrap px-1 py-2 text-xs btn-appointment cursor-pointer ${getStatusStyle(status)}`}
                                >
                                    {status}
                                </button>
                            </td>
                        );
                    })}
                </tr>
            ))}
            </tbody>
        </table>
    )
}
export default AppointmentTableContent
