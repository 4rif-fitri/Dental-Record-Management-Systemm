
import React from 'react';
import api from "@/lib/axios.js";
import {route} from "ziggy-js";
import Swal from "sweetalert2";
import {usePage} from "@inertiajs/react";

const MedicineTab = ({
    examinationMedicine = [], setShowAddMedicine,
    setSelectedMedicine, getExaminationMedicine
}) => {
    const { auth } = usePage().props;
    const currentRole = auth?.user?.role;

    const handleDeletePatientMedicine = async (id) => {

        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This medicine will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel"
        });

        if (!result.isConfirmed) return;

        try {

            const response = await api.delete(
                route("deleteExaminationMedicine", id)
            );

            await getExaminationMedicine();

            await Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: response.data.message || "MedicineModal deleted successfully.",
                confirmButtonColor: "#3085d6"
            });

        } catch (error) {
            console.log(error)
        }
    };

    const handleUpdatePatientMedicine = (item) => {
        console.log(item)
        setSelectedMedicine(item);
        setShowAddMedicine(true);

    };

    return (
        <div>

            <div className="flex justify-between items-center mb-4">

                <h1 className="text-2xl font-semibold">
                    Medicine
                </h1>

                {currentRole === "dentist" ?? <>
                    <button onClick={() => {setSelectedMedicine(null); setShowAddMedicine(true);}}
                        className="btn btn-primary w-40">
                        Add Medicine
                    </button>
                </>}

            </div>

            <div className="w-full overflow-x-auto border border-gray-300 rounded-lg">

                <table className="w-full text-sm text-left">

                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-3">No.</th>
                        <th className="px-4 py-3">Medicine</th>
                        <th className="px-4 py-3">Quantity</th>
                        <th className="px-4 py-3">Notes</th>
                        {currentRole === "dentist" ?? <>
                            <th className="px-4 py-3 text-center">Action</th>
                        </>}
                    </tr>
                    </thead>

                    <tbody>

                    {examinationMedicine.length > 0 ? (

                        examinationMedicine.map((item, index) => (

                            <tr
                                key={item.id}
                                className="border-t border-gray-200 hover:bg-gray-50"
                            >

                                <td className="px-4 py-3">
                                    {index + 1}
                                </td>

                                <td className="px-4 py-3 font-medium">
                                    {item.medicine?.name ?? "-"}
                                </td>

                                <td className="px-4 py-3 font-medium">
                                    {item.quantity ?? "-"}
                                </td>

                                <td className="px-4 py-3">
                                    {item.notes ?? "-"}
                                </td>

                                {currentRole === "dentist" ?? <>
                                    <td className="px-4 py-3">

                                        <div className="flex justify-center gap-3">

                                            <button
                                                type="button"
                                                title="Edit"
                                                onClick={() =>
                                                    handleUpdatePatientMedicine(item)
                                                }
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                <i className="fa-solid fa-pencil"></i>
                                            </button>

                                            <button
                                                type="button"
                                                title="Delete"
                                                onClick={() =>
                                                    handleDeletePatientMedicine(item.id)
                                                }
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                <i className="fa-solid fa-trash"></i>
                                            </button>

                                        </div>

                                    </td>
                                </>}

                            </tr>

                        ))

                    ) : (

                        <tr>
                            <td
                                colSpan="5"
                                className="text-center py-8 text-gray-500"
                            >
                                No medicine prescribed yet.
                            </td>
                        </tr>

                    )}

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default MedicineTab;
