import React from 'react'
import Swal from 'sweetalert2';

async function handleRegister() {
    const result = await Swal.fire({
        title: `Are you sure?`,
        text: `Do you want to this appointment?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
        confirmButtonColor: status === "Accept" ? "#16a34a" : "#ef4444",
    });

    if (result.isConfirmed) {
        Swal.fire({
            icon: "success",
            title: "Success",
            text: "Success Register Patient",
        });
    }
}

const RegisterQueue = ({ setShowPopup }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 text-base-100">
            <div className="w-[95vw] sm:w-[80vw] lg:w-[50vw] rounded-xl bg-white p-4 shadow-xl sm:p-6">
                <div className="mb-4 flex flex-wrap justify-between">
                    <h2 className="text-xl font-bold">
                        Register Patient to Queue
                    </h2>
                    <button
                        onClick={() => setShowPopup(false)}
                        className="btn w-30 h-8"
                    >
                        Close
                    </button>
                </div>

                <div className="mb-2">
                    <label className="mb-1 block text-sm text-black">
                        Ic / Passport Number / Student ID/ Staff ID
                    </label>

                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            className="h-10 min-w-0 flex-1 border border-gray-200 px-2 text-sm outline-none focus:border-blue-500"
                        />

                        <button
                            type="button"
                            className="h-9 w-25 rounded bg-black text-xs text-white hover:bg-gray-800"
                        >
                            Search
                        </button>
                    </div>

                    <div className="border border-gray-300 p-5 mt-4 flex justify-center">
                        <h1 className="text-red-500">No Patient Found</h1>
                    </div>

                    <div className="border border-gray-300 p-4 mt-4 flex flex-col">
                        <h1 className=" font-semibold">Patient Detail</h1>

                        <div className=" flex justify-between items-center flex-wrap">
                            <div className="text-base flex items-center">
                                <span className="text-s text-gray-500">
                                    Name:{" "}
                                </span>
                                <div className="px-2 py-2 text-s text-gray-700 font-semibold">
                                    Lorem Ipsum
                                </div>
                            </div>
                            <div className="text-base flex items-center">
                                <span className="text-s text-gray-500">
                                    Ic/Passport Number
                                </span>
                                <div className="px-2 py-2 text-s text-gray-700 font-semibold">
                                    123654789
                                </div>
                            </div>
                            <div>
                                <button
                                    onClick={handleRegister}
                                    className="btn btn-primary"
                                >
                                    Register
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterQueue
