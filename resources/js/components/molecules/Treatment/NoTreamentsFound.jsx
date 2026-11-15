import React from "react";

const NoTreamentsFound = () => {
    return (
        <tr>
            <td colSpan="5" className="py-16 text-center">
                <p className="font-medium text-gray-700">
                    No treatments found
                </p>
                <p className="text-xs text-gray-400 mt-1">
                    Add a new treatment or try another search.
                </p>
            </td>
        </tr>
    )
}
export default NoTreamentsFound
