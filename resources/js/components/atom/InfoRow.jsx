const InfoRow = ({label,value}) => {
    return (
        <div className="flex items-start gap-3 py-2">
            <p className="min-w-0 text-sm leading-6">
                <span className="mr-2 text-gray-500">{label}:</span>
                <span className="break-words font-medium text-gray-800">
                    {value}
                </span>
            </p>
        </div>
    );
}

export default InfoRow
