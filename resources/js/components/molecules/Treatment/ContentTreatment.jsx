
import React from "react";

const ContentTreatment = ({
                              index,
                              procedure,
                              handleEdit,
                              handleDelete
                          }) => {

    return (
        <tr className="hover:bg-gray-50 transition">

            <td className="px-5 py-4 text-gray-500">
                {index + 1}
            </td>

            {/* Procedure Code */}
            <td className="px-5 py-4">
                <span className="font-mono text-xs font-medium text-gray-600">
                    {procedure.procedure_code}
                </span>
            </td>

            {/* Treatment Name */}
            <td className="px-5 py-4">
                <span className="font-medium text-gray-800">
                    {procedure.procedure_name}
                </span>
            </td>

            {/* Description */}
            <td className="px-5 py-4 text-gray-600 max-w-sm">
                {procedure.procedure_description}
            </td>

            {/* Type */}
            <td className="px-5 py-4">
                <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700">
                    {procedure.procedure_type}
                </span>
            </td>

            {/* Actions */}
            <td className="px-5 py-4">
                <div className="flex justify-center gap-2">

                    <button
                        type="button"
                        onClick={() => handleEdit(procedure)}
                        className="px-3 py-1.5 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-medium transition"
                    >
                        Edit
                    </button>

                    <button
                        type="button"
                        onClick={() => handleDelete(procedure)}
                        className="px-3 py-1.5 rounded-md bg-red-50 text-red-600 hover:bg-red-100 text-xs font-medium transition"
                    >
                        Delete
                    </button>

                </div>
            </td>

        </tr>
    );
};

export default ContentTreatment;
