const NoConditionsFound = () => {
    return (
        <tr>
            <td colSpan="6" className="py-16 text-center">
                <div className="flex flex-col items-center gap-2">
                    <div className="text-4xl text-gray-300">
                        &#9776;
                    </div>
                    <p className="font-medium text-gray-700">
                        No conditions found
                    </p>
                    <p className="text-xs text-gray-400">
                        Add a new condition or try another search.
                    </p>
                </div>
            </td>
        </tr>
    )
}
export default NoConditionsFound
