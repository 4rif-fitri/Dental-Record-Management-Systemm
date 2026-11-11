
import React, { useState, useEffect } from "react";

const AppointmenStatusNone = ({selectedAppointment,handleStatusChange}) => {
    const [status, setStatus] = useState("None");

    useEffect(() => {
        setStatus(
            selectedAppointment?.status === "Available" ||
            selectedAppointment?.status === "Unavailable" ?
            selectedAppointment.status : "None"
        );
    }, [selectedAppointment]);

    return (
        <>
            <div className="grid grid-cols-[90px_minmax(0,1fr)] items-center gap-2 text-sm">
                <span>Status</span>
                <div className="px-2 py-2 text-center text-xs bg-gray-200 text-gray-700 font-semibold">
                    {selectedAppointment?.status || "None"}
                </div>

                <span>Day</span>
                <div className="px-2 py-2 text-xs text-gray-700 font-semibold">
                    {selectedAppointment?.day || "-"}
                </div>

                <span>Time</span>
                <div className="px-2 py-2 text-xs text-gray-700 font-semibold">
                    {selectedAppointment?.time || "-"}
                </div>

                <span>Date</span>
                <div className="px-2 py-2 text-xs text-gray-700 font-semibold">
                    {selectedAppointment?.date || "-"}
                </div>

                <span>Change Status</span>
                <select value={status} className="select bg-white"
                    onChange={(e) => setStatus(e.target.value)}>
                    <option value="None">None</option>
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                </select>
            </div>

            <div className="flex">
                <button type="button"
                    // disabled={
                    //     !selectedAppointment?.id ||
                    //     status === "None" ||
                    //     status === selectedAppointment?.status
                    // }
                    onClick={() => handleStatusChange("Save", status)}
                    className="min-w-[100px] flex-1 rounded-md bg-primary px-4 py-2 text-sm text-white">
                    Save
                </button>
            </div>
        </>
    );
};

export default AppointmenStatusNone;
