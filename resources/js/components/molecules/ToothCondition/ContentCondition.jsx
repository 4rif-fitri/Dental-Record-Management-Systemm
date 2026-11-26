import React from "react";

const ContentCondition = ({
    condition,index,handleDelete,handleEdit
}) => {

    return (
        <tr key={condition.id} className="hover:bg-gray-50 transition">
            <td className="px-5 py-4 text-gray-500">
                {index + 1}
            </td>

            <td className="px-5 py-4">
                <div className="w-9 h-9 rounded-lg border border-gray-200 shadow-sm"
                    style={{backgroundColor: condition.color_code}}
                    title={condition.color_code}/>
            </td>

            <td className="px-5 py-4">
                <span className="font-medium text-gray-800">
                    {condition.condition_name}
                </span>
            </td>
            <td className="px-5 py-4">
                <span className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-semibold">
                    {condition.condition_code}
                </span>
            </td>
            <td className="px-5 py-4">
                <span className="font-mono text-xs text-gray-600">
                    {condition.color_code}
                    </span>
            </td>

            <td className="px-5 py-4">
                <div className="flex justify-center gap-2">
                    <button type="button" onClick={() => handleEdit(condition)}
                        className="px-3 py-1.5 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-medium transition">
                        Edit
                    </button>
                    <button type="button" onClick={() => handleDelete(condition)}
                        className="px-3 py-1.5 rounded-md bg-red-50 text-red-600 hover:bg-red-100 text-xs font-medium transition">
                        Delete
                    </button>
                </div>
            </td>

        </tr>
    )
}
export default ContentCondition
