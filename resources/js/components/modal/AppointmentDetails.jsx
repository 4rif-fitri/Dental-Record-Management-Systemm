import React from 'react'

function Showinput({ label, data, isInput, className }) {
    return (
        <>
            {isInput === "Large" ? (
                <div className="flex flex-col">
                    <label className="label">{label}</label>
                    <textarea
                        readOnly
                        className=" h-20 input border border-gray-400 bg-white w-full"
                    >
                        data
                    </textarea>
                </div>
            ) : (
                <div className="flex flex-col">
                    <label className="label">{label}</label>
                    <input
                        className={`input w-full border border-gray-400 ${className}`}
                        value={data}
                        readOnly
                    />
                </div>
            )}
        </>
    );
}

const AppointmentDetails = ({ setShowPopup }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 text-base-100">
            <div className="w-11/12 max-w-lg rounded-xl bg-white p-6 shadow-xl">
                <div className="mb-4">
                    <h2 className="text-xl font-bold">Appointment Details</h2>
                    <p>View your appointment information</p>
                </div>

                <div className="space-y-3">
                    <div className="rounded-box w-full grid sm:grid-cols-2 grid-cols-1 gap-2">
                        <Showinput
                            label={"Appointment ID"}
                            data={"1"}
                            isInput={"Small"}
                            className={"bg-white"}
                        />
                        <Showinput
                            label={"Date"}
                            data={"17 November 2026 "}
                            isInput={"Small"}
                            className={"bg-white"}
                        />
                        <Showinput
                            label={"Day"}
                            data={"Tuesday"}
                            isInput={"Small"}
                            className={"bg-white"}
                        />
                        <Showinput
                            label={"Time"}
                            data={"8:00 AM"}
                            isInput={"Small"}
                            className={"bg-white"}
                        />
                    </div>
                    <div className="rounded-box w-full">
                        <Showinput
                            label={"Time"}
                            data={"8:00 AM"}
                            isInput={"Large"}
                            className={""}
                        />
                    </div>
                    <div className="w-full">
                        <Showinput
                            label={"Status"}
                            data={"Accepted"}
                            isInput={"Small"}
                            className={"badge badge-success p-4 font-bold"}
                        />
                    </div>
                </div>

                <div className="mt-6 w-full flex justify-end gap-2">
                    <div className="w-full">
                        <button
                            className="btn btn-error w-full"
                            onClick={() => setShowPopup(false)}
                        >
                            Cancel
                        </button>
                    </div>
                    <div className="w-full">
                        <button
                            className="btn btn-neutral w-full"
                            onClick={() => setShowPopup(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentDetails
