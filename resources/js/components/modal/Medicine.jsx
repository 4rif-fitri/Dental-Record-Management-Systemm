import React, { useState } from 'react';

const Medicine = ({ showAddMedicine }) => {

    const [medicine, setMedicine] = useState({
        name: "",
        dosage: "",
        frequency: "",
        duration: "",
        quantity: "",
        instruction: "",
        notes: ""
    });

    const inputStyle = "w-full h-[55px] border-2 border-gray-300 rounded-lg px-4 outline-none focus:border-blue-500";

    const labelStyle = "block text-lg font-medium mb-1";

    return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 text-black">

                <div className="w-[95vw] sm:w-[80vw] lg:w-[40vw] rounded-xl bg-white p-6 sm:p-10 shadow-xl">

                <div className="mb-4 flex flex-wrap justify-between items-center">

                    <h2 className="font-bold text-3xl">
                        Add Medicine
                    </h2>

                    <button
                        className="btn w-24"
                    >
                        Close
                    </button>

                </div>

                    <form>

                        <div className="mb-6">
                            <select
                                name="name"
                                className={`${inputStyle} px-4`}
                                required
                            >
                                <option value="">Select Medicine</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">

                            <div>
                                <label className={labelStyle}>
                                    Dosage
                                </label>
                                <input
                                    type="text"
                                    name="dosage"
                                    value={medicine.dosage}
                                    className={inputStyle}
                                />
                            </div>

                            <div>
                                <label className={labelStyle}>
                                    Frequency
                                </label>
                                <input
                                    type="text"
                                    name="frequency"
                                    value={medicine.frequency}
                                    className={inputStyle}
                                />
                            </div>

                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">

                            <div>
                                <label className={labelStyle}>
                                    Duration
                                </label>
                                <input
                                    type="text"
                                    name="duration"
                                    value={medicine.duration}
                                    className={inputStyle}
                                />
                            </div>

                            <div>
                                <label className={labelStyle}>
                                    Quantity
                                </label>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={medicine.quantity}
                                    className={inputStyle}
                                />
                            </div>

                        </div>

                        <div className="mb-6">
                            <label className={labelStyle}>
                                Instruction
                            </label>
                            <input
                                type="text"
                                name="instruction"
                                value={medicine.instruction}
                                className={inputStyle}
                            />
                        </div>

                        <div className="mb-7">
                            <label className={labelStyle}>
                                Notes
                            </label>
                            <input
                                type="text"
                                name="notes"
                                value={medicine.notes}
                                className={inputStyle}
                            />
                        </div>

                        <div className="flex justify-end gap-3">

                            <button
                                type="submit"
                                className="bg-blue-700 w-full hover:bg-blue-800 text-white px-10 py-3 rounded-lg"
                            >
                                Save
                            </button>

                        </div>

                    </form>

                </div>
            </div>
    );
};

export default Medicine;
