const AppointmenStatusBooked = ({selectedAppointment,handleStatusChange}) => {
    return (
        <>
            <div className="grid grid-cols-[90px_minmax(0,1fr)] items-center gap-2 text-sm">
                <span>Status</span>

                <div className="bg-blue-100 px-2 py-2 text-center text-xs text-blue-700">
                    {selectedAppointment.status}
                </div>
            </div>

            {[
                ["Patient Name", selectedAppointment.patientName],
                ["Ic/Passport", selectedAppointment.ic],
                ["Phone Number", selectedAppointment.phone],
                ["Student/Staff ID", selectedAppointment.staffId],
                ["Patient Category", selectedAppointment.category],
                ["Gender", selectedAppointment.gender],
                ["Email Address", selectedAppointment.email],
                ["Is Approved", selectedAppointment.approval],
            ].map(([label, value]) => (
                <div
                    key={label}
                    className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-2 text-xs"
                >
                    <span>{label}</span>
                    <span className="break-words">{value}</span>
                </div>
            ))}

            <div className="flex flex-wrap justify-end gap-3 pt-12">
                <button
                    type="button"
                    onClick={() => handleStatusChange("Reject")}
                    className="min-w-[100px] flex-1 rounded-md bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
                >
                    Reject
                </button>

                <button
                    type="button"
                    onClick={() => handleStatusChange("Accept")}
                    className="min-w-[100px] flex-1 rounded-md bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
                >
                    Accept
                </button>
            </div>
        </>
    )
}
export default AppointmenStatusBooked
