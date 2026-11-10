
const SelectInput = ({label,name,value,onChange,options = [], errorText}) => {
    return (
        <div className="flex flex-col">
            <label className="label">{label}</label>

            <select
                name={name}
                value={value ?? ""}
                onChange={onChange}
                className="select w-full border border-gray-400 bg-white"
            >
                <option value="" disabled={true}>Select {label}</option>

                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            <p className="text-red-600 hidden">
                {errorText}
            </p>
        </div>
    );
};
export default SelectInput
