import React from "react";

const LoadingTreatment = () => {
    return (
        <tr>
            <td colSpan="5" className="py-16 text-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-9 h-9 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
                    <p className="text-sm text-gray-500">
                        Loading treatments...
                    </p>
                </div>
            </td>
        </tr>
    )
}
export default LoadingTreatment
