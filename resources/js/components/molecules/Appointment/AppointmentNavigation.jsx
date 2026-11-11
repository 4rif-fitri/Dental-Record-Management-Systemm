const AppointmentNavigation = ({handlePreviousWeek,formatDate, weekStart, weekEnd, handleNextWeek}) => {
    return (
        <div className="mb-5 flex flex-wrap items-center gap-2">
            <button type="button" aria-label="Previous week" onClick={handlePreviousWeek}
                className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-full text-xl text-white">
                <i className="fa-solid fa-lg fa-circle-arrow-left text-black"></i>
            </button>

            <div className="flex items-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-xs font-semibold text-blue-950">
                <span>
                    {new Date(`${formatDate(weekStart)}T12:00:00`).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    })}
                    {" – "}
                    {new Date(`${formatDate(weekEnd)}T12:00:00`).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    })}
                </span>
            </div>

            <button type="button" aria-label="Next week" onClick={handleNextWeek}
                className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-full text-xl text-white">
                <i className="fa-solid fa-lg fa-circle-arrow-right text-black"></i>
            </button>
        </div>
    )
}
export default AppointmentNavigation
