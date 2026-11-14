
import React from 'react';

const MedicineTab = ({
                         examinationMedicine = [],
                         setShowAddMedicine
                     }) => {

    return (
        <div>

            <div className="flex justify-between items-center mb-4">

                <h1 className="text-2xl font-semibold">
                    Medicine
                </h1>

                <button
                    onClick={() => setShowAddMedicine(true)}
                    className="btn btn-primary w-40"
                >
                    Add Medicine
                </button>

            </div>

            {/* Table */}
            <div className="w-full overflow-x-auto border border-gray-300 rounded-lg">

                <table className="w-full text-sm text-left">

                    <thead className="bg-gray-100 ">
                    <tr>
                        <th className="px-4 py-3">No.</th>
                        <th className="px-4 py-3">Medicine</th>
                        <th className="px-4 py-3">Notes</th>
                        <th className="px-4 py-3 text-center">Action</th>
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

                                <td className="px-4 py-3">
                                    {item.notes ?? "-"}
                                </td>

                                <td className="px-4 py-3">
                                    <div className="flex justify-center gap-3">

                                        <button
                                            type="button"
                                            title="Edit"
                                            onClick={() => console.log("Edit:", item)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <i className="fa-solid fa-pencil"></i>
                                        </button>

                                        <button
                                            type="button"
                                            title="Delete"
                                            onClick={() => console.log("Delete ID:", item.id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <i className="fa-solid fa-trash"></i>
                                        </button>

                                    </div>
                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>
                            <td
                                colSpan="9"
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
