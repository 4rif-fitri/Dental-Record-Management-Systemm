
import React, {useEffect, useState} from 'react';
import api from "@/lib/axios.js";
import Swal from "sweetalert2";
import PageTitle from "@/components/atom/PageTitle.jsx";

const MedicineModal = ({
    medicines = [], patientDetails, setShowAddMedicine,
    getExaminationMedicine, selectedMedicine }) => {

    const [medicine, setMedicine] = useState({
        medicine_id: "",
        dosage: "",
        frequency: "",
        duration: "",
        quantity: "",
        instructions: "",
        notes: ""
    });

    const [loading, setLoading] = useState(false);

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

    useEffect(() => {
        if (selectedMedicine) {
            setMedicine({
                medicine_id: selectedMedicine.medicine_id,
                dosage: selectedMedicine.dosage,
                frequency: selectedMedicine.frequency,
                duration: selectedMedicine.duration,
                quantity: selectedMedicine.quantity,
                instructions: selectedMedicine.instructions,
                notes: selectedMedicine.notes
            });
        } else {
            setMedicine({
                medicine_id: "",
                dosage: "",
                frequency: "",
                duration: "",
                quantity: "",
                instructions: "",
                notes: ""
            });
        }
    }, [selectedMedicine]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const payload = {
                patient_id: patientDetails.id,
                medicine_id: medicine.medicine_id,
                dosage: medicine.dosage,
                frequency: medicine.frequency,
                duration: medicine.duration,
                quantity: medicine.quantity,
                instructions: medicine.instructions,
                notes: medicine.notes
            };

            let response;

            if (selectedMedicine) {
                // UPDATE
                response = await api.put(
                    route("updateExaminationMedicine", {
                        id: selectedMedicine.id
                    }),
                    payload
                );
            } else {
                // CREATE
                response = await api.post(
                    route("createExaminationMedicine"),
                    payload
                );
            }

            await getExaminationMedicine();

            setShowAddMedicine(false);

            await Swal.fire({
                icon: "success",
                title: "Success!",
                text: response.data.message ||
                    (selectedMedicine
                        ? "MedicineModal updated successfully."
                        : "MedicineModal added successfully.")
            });

        } catch (error) {
            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Failed!",
                text: error.response?.data?.message ||
                    "Something went wrong."
            });

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 text-black">

            <div className="w-[95vw] sm:w-[80vw] lg:w-[40vw] rounded-xl bg-white p-6 sm:p-10 shadow-xl">

                {/* Header */}
                <div className="mb-4 flex flex-wrap justify-between items-center">

                    <PageTitle title={selectedMedicine ? "Update MedicineModal" : "Add MedicineModal"} />

                    <button
                        type="button"
                        className="btn btn-neutral w-24"
                        onClick={() => setShowAddMedicine(false)}
                    >
                        Close
                    </button>

                </div>

                <form onSubmit={handleSubmit}>

                    <div className="mb-6">

                        <label className={labelStyle}>
                            Medicine
                        </label>

                        <select name="medicine_id"
                            value={medicine.medicine_id}
                            onChange={handleChange}
                            className={inputStyle}
                            required>

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

                    {/* Instructions */}
                    <div className="mb-6">

                        <label className={labelStyle}>
                            Instructions
                        </label>

                        <input
                            type="text"
                            name="instructions"
                            value={medicine.instructions}
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

                    <div className="flex justify-end gap-3">

                        <button className={"btn btn-primary"} type="submit" disabled={loading}>
                            {loading
                                ? "Processing..."
                                : selectedMedicine
                                    ? "Update MedicineModal"
                                    : "Add MedicineModal"
                            }
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default MedicineModal;
