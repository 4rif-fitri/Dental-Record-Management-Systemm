
import React, { useState } from 'react';

const Medicine = ({ medicines = [], setShowAddMedicine }) => {

    const [medicine, setMedicine] = useState({
        medicine_id: "",
        dosage: "",
        frequency: "",
        duration: "",
        quantity: "",
        instruction: "",
        notes: ""
    });

    const inputStyle =
        "w-full h-[55px] border-2 border-gray-300 rounded-lg px-4 outline-none focus:border-blue-500";

    const labelStyle =
        "block text-lg font-medium mb-1";

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setMedicine(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Selected medicine:", medicine);

        // TODO: Submit medicine data to Laravel API
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 text-black">

            <div className="w-[95vw] sm:w-[80vw] lg:w-[40vw] rounded-xl bg-white p-6 sm:p-10 shadow-xl">

                {/* Header */}
                <div className="mb-4 flex flex-wrap justify-between items-center">

                    <h2 className="font-bold text-3xl">
                        Add Medicine
                    </h2>

                    <button type="button" className="btn w-24"
                        onClick={() => setShowAddMedicine(false)}>
                        Close
                    </button>

                </div>

                <form onSubmit={handleSubmit}>

                    {/* Medicine Selection */}
                    <div className="mb-6">

                        <label className={labelStyle}>
                            Medicine
                        </label>

                        <select
                            name="medicine_id"
                            value={medicine.medicine_id}
                            onChange={handleChange}
                            className={inputStyle}
                            required
                        >
                            <option value="">
                                Select Medicine
                            </option>

                            {(medicines ?? []).map((item) => (
                                <option
                                    key={item.id}
                                    value={item.id}
                                >
                                    {item.name}
                                </option>
                            ))}

                        </select>

                    </div>

                    {/* Dosage and Frequency */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">

                        <div>

                            <label className={labelStyle}>
                                Dosage
                            </label>

                            <input
                                type="text"
                                name="dosage"
                                value={medicine.dosage}
                                onChange={handleChange}
                                placeholder="e.g. 500mg"
                                className={inputStyle}
                                required
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
                                onChange={handleChange}
                                placeholder="e.g. 3 times daily"
                                className={inputStyle}
                                required
                            />

                        </div>

                    </div>

                    {/* Duration and Quantity */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">

                        <div>

                            <label className={labelStyle}>
                                Duration
                            </label>

                            <input
                                type="text"
                                name="duration"
                                value={medicine.duration}
                                onChange={handleChange}
                                placeholder="e.g. 5 days"
                                className={inputStyle}
                                required
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
                                onChange={handleChange}
                                placeholder="Enter quantity"
                                min="1"
                                className={inputStyle}
                                required
                            />

                        </div>

                    </div>

                    {/* Instruction */}
                    <div className="mb-6">

                        <label className={labelStyle}>
                            Instruction
                        </label>

                        <input
                            type="text"
                            name="instruction"
                            value={medicine.instruction}
                            onChange={handleChange}
                            placeholder="e.g. After meal"
                            className={inputStyle}
                        />

                    </div>

                    {/* Notes */}
                    <div className="mb-7">

                        <label className={labelStyle}>
                            Notes
                        </label>

                        <input
                            type="text"
                            name="notes"
                            value={medicine.notes}
                            onChange={handleChange}
                            placeholder="Additional notes"
                            className={inputStyle}
                        />

                    </div>

                    {/* Buttons */}
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
