import React from "react";

const AppointmenStatusNone = () => {
    return (
        <>
            <div className="grid grid-cols-[90px_minmax(0,1fr)] items-center gap-2 text-sm">
                <span>Status</span>
                <div className="px-2 py-2 text-center text-xs bg-gray-200 text-gray-700 font-semibold">
                    None
                </div>

                <span>Day</span>
                <div className="px-2 py-2 text-xs text-gray-700 font-semibold">
                    8:00 AM
                </div>

                <span>Time</span>
                <div className="px-2 py-2 text-xs text-gray-700 font-semibold">
                    Monday
                </div>

                <span>Date</span>
                <div className="px-2 py-2 text-xs text-gray-700 font-semibold">
                    10/12/2026
                </div>

                <span>Change Status</span>
                <select
                    defaultValue="Pick a color"
                    className="select bg-white"
                >
                    <option>None</option>
                    <option>Available</option>
                    <option>Unavailable</option>
                </select>
            </div>

            <div className="flex">
                <button
                    type="button"
                    onClick={() => handleStatusChange("Save")}
                    className="min-w-[100px] flex-1 rounded-md bg-primary px-4 py-2 text-sm text-white"
                >
                    Save
                </button>
            </div>
        </>
    )
}
export default AppointmenStatusNone
