import React from "react";

const Showinput = ({ label, name, value, onChange, errorText }) => {
    return (
        <div className="flex flex-col">
            <label className="label">{label}</label>

            <input
                type="text"
                name={name}
                className="input w-full border border-gray-400 bg-white"
                value={value ?? ""}
                onChange={onChange}
            />

            <p className="text-red-600 hidden">
                {errorText}
            </p>
        </div>
    );
}

export default Showinput
